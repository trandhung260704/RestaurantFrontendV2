import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/food.css';

export default function AddFoodForm() {
  const [foodData, setFoodData] = useState({
    name: '',
    price: '',
    category: '',
    image_url: '',
    description: '',
    status: 'AVAILABLE',
  });

  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
  axios.get('http://localhost:8099/api/ingredients', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    withCredentials: true,
  })
    .then(res => setIngredients(res.data))
    .catch(err => {
      console.error('Lỗi khi tải nguyên liệu:', err);
      if (err.response?.status === 403) {
        setMessage('Không có quyền truy cập nguyên liệu. Vui lòng đăng nhập lại hoặc dùng tài khoản phù hợp.');
      }
    });
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddIngredient = (ingredient) => {
    const exists = selectedIngredients.some(item => item.id_ingredient === ingredient.id_ingredient);
    if (!exists) {
      setSelectedIngredients(prev => [...prev, { ...ingredient, quantity_used: 1 }]);
    }
  };

  const handleQuantityChange = (id, value) => {
    setSelectedIngredients(prev =>
      prev.map(item =>
        item.id_ingredient === id ? { ...item, quantity_used: Number(value) } : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...foodData,
        price: parseFloat(foodData.price),
        ingredients: selectedIngredients.map(i => ({
          id_ingredient: i.id_ingredient,
          quantity_used: i.quantity_used
        }))
      };

      await axios.post('http://localhost:8099/api/foods', payload);

      setMessage('Món ăn đã được thêm thành công!');
      setFoodData({
        name: '',
        price: '',
        category: '',
        image_url: '',
        description: '',
        status: 'AVAILABLE',
      });
      setSelectedIngredients([]);
      setSearchTerm('');
    } catch (error) {
      console.error('Lỗi khi thêm món ăn:', error);
      setMessage('Có lỗi xảy ra khi thêm món ăn.');
    }
  };

  const filteredIngredients = ingredients.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="food-form-container">
      <h2>Thêm món ăn mới</h2>

      {message && <p className="food-message">{message}</p>}

      <form onSubmit={handleSubmit} className="food-form">
        <input
          type="text"
          name="name"
          placeholder="Tên món ăn"
          value={foodData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Giá món ăn"
          value={foodData.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Loại món ăn"
          value={foodData.category}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image_url"
          placeholder="URL hình ảnh"
          value={foodData.image_url}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Mô tả món ăn"
          value={foodData.description}
          onChange={handleInputChange}
        ></textarea>

        <select name="status" value={foodData.status} onChange={handleInputChange}>
          <option value="AVAILABLE">Còn</option>
          <option value="OUT_OF_STOCK">Hết</option>
          <option value="DISCONTINUED">Ngừng kinh doanh</option>
        </select>

        <div className="ingredient-search">
          <h3>Tìm và chọn nguyên liệu:</h3>
          <input
            type="text"
            placeholder="Tìm nguyên liệu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="ingredient-list">
          {filteredIngredients.map(i => (
            <div key={i.id_ingredient} className="ingredient-item">
              <span>{i.name}</span>
              <button type="button" onClick={() => handleAddIngredient(i)}>Thêm</button>
            </div>
          ))}
        </div>

        {selectedIngredients.length > 0 && (
          <div className="selected-ingredients">
            <h4>Nguyên liệu đã chọn:</h4>
            {selectedIngredients.map(item => (
              <div key={item.id_ingredient} className="selected-item">
                <span>{item.name}</span>
                <input
                  type="number"
                  min="1"
                  value={item.quantity_used}
                  onChange={(e) => handleQuantityChange(item.id_ingredient, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        <button type="submit">➕ Thêm món</button>
      </form>
    </div>
  );
}
