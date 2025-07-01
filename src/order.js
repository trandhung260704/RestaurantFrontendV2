import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/order.css';

export default function OrderFoodForm() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
  const fetchFoods = async () => {
    try {
      const res = await axios.get(`http://localhost:8099/api/search/foods?keyword=${searchTerm}`);
      setFoods(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (searchTerm.trim()) {
    fetchFoods();
  } else {
    axios.get('http://localhost:8099/api/foods', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      withCredentials: true,
    })
      .then(res => setFoods(res.data))
      .catch(err => console.error(err));
  }
}, [searchTerm]);

  const handleAddFood = (food) => {
  const id = food.id ?? food.id_food; // hỗ trợ cả 2
  const exists = selectedItems.find(item => item.id === id);
  if (!exists) {
    setSelectedItems(prev => [
      ...prev,
      {
        id,
        id_food: food.id_food ?? food.id,
        name: food.name,
        price: food.price,
        quantity: 1
      }
    ]);
  }
};

  const handleQuantityChange = (id, value) => {
    setSelectedItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: Number(value) } : item)
    );
  };

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resUser = await axios.get("http://localhost:8099/api/users/me", {
        withCredentials: true,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"), 
          },
      });

      const userId = resUser.data.id_user;

      const orderRequest = {
        id_user: userId,
        items: selectedItems.map(item => ({
          id_food: item.id_food, // dùng id_food rõ ràng
          quantity: item.quantity
        }))
      };


      await axios.post("http://localhost:8099/api/orders", orderRequest, {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });


      setMessage('✅ Đơn hàng đã được tạo!');
      setSelectedItems([]);
    } catch (error) {
      setMessage('❌ Lỗi khi tạo đơn hàng.');
      console.error(error);
    }
  };


  return (
    <div className="order-container">
      <h2>Đặt món ăn</h2>

      {message && <p className="order-message">{message}</p>}

      <div className="search-box">
        <input
          type="text"
          placeholder="Tìm món ăn..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="food-list">
        {foods.map(food => (
          <div key={food.id} className="food-item">
            <div>
              <strong>{food.name}</strong> - {food.price.toLocaleString()}đ
            </div>
            <button onClick={() => handleAddFood(food)}>Chọn</button>
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <form onSubmit={handleSubmit} className="order-form">
          <h3>Danh sách món đã chọn:</h3>
          {selectedItems.map(item => (
            <div key={item.id} className="selected-item">
              <span>{item.name}</span>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              />
              <span>{(item.quantity * item.price).toLocaleString()}đ</span>
            </div>
          ))}
          <div className="total-price">Tổng tiền: {totalPrice.toLocaleString()}đ</div>
          <button type="submit">Xác nhận đặt món</button>
        </form>
      )}
    </div>
  );
}
