import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import logo from './image/favicon-48x48.png';
import './css/order.css';
import OrderEffects from './components/OrderEffects';
import Header from './Header';

export default function OrderFoodForm() {
  const API = 'http://localhost:8099/api/foods';
  const effectsRef = useRef(null);

  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: 'Guest',
    role: 'CUSTOMER'
  });

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Khởi tạo effects
    effectsRef.current = new OrderEffects();
    effectsRef.current.addCardAnimations();
    effectsRef.current.addSearchEffects();
    effectsRef.current.addButtonEffects();
    effectsRef.current.addMessageEffects();
    effectsRef.current.addQuantityEffects();
    effectsRef.current.addPaginationEffects();
    effectsRef.current.addLogoEffects();
    effectsRef.current.addUserInfoEffects();
    effectsRef.current.addTotalPriceEffects();
    effectsRef.current.addEmptyStateEffects();
    
    // Lấy thông tin user
    const fullName = localStorage.getItem('full_name') || 'Guest';
    const role = localStorage.getItem('role') || 'CUSTOMER';
    setUserInfo({ fullName, role });
  }, []);

  const fetchFoods = useCallback(async () => {
    try {
      const res = await axios.get(API, {
        params: {
          keyword: searchTerm,
          page,
          size
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      setFoods(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Lỗi khi tải món ăn:', err);
    }
  }, [searchTerm, page, size]);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const handleAddFood = (food) => {
    const id = food.id ?? food.id_food;
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
      
      effectsRef.current?.addItemAnimation(food.id_food ?? food.id);
    }
  };

  const handleQuantityChange = (id, value) => {
    setSelectedItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: Number(value) } : item)
    );
  };

  const handleRemoveItem = (id) => {
    setSelectedItems(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
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
          id_food: item.id_food,
          quantity: item.quantity
        }))
      };

      await axios.post("http://localhost:8099/api/orders", orderRequest, {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setMessage('✅ Đơn hàng đã được tạo thành công!');
      setSelectedItems([]);
      
      // Auto hide message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      setMessage('❌ Lỗi khi tạo đơn hàng. Vui lòng thử lại.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="order-container">
        {/* Header */}
        <div className="order-header">
          <div className="header-content">
            <div className="logo-section">
              <img src={logo} alt="Restaurant Logo" className="order-logo" />
              <div className="logo-text">
                <h1>Đặt món ăn</h1>
                <p>Hệ thống quản lý nhà hàng</p>
              </div>
            </div>
            <div className="user-section">
              <div className="user-info">
                <div className="user-avatar">
                  <span className="avatar-text">{userInfo.fullName.charAt(0)}</span>
                </div>
                <div className="user-details">
                  <p className="user-name">{userInfo.fullName}</p>
                  <p className="user-role">{userInfo.role}</p>
                </div>
              </div>
              <button 
                onClick={() => window.history.back()} 
                className="back-btn"
              >
                ← Quay lại
              </button>
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`order-message ${message.includes('✅') ? 'success' : 'error'}`}>
            <span>{message}</span>
          </div>
        )}

        {/* Search Section */}
        <div className="search-section">
          <div className="search-box">
            <span className="search-icon">��</span>
            <input
              type="text"
              placeholder="Tìm món ăn..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
              className="search-input"
            />
          </div>
        </div>

        {/* Food List */}
        <div className="food-section">
          <h2 className="section-title">🍽️ Danh sách món ăn</h2>
          <div className="food-grid">
            {foods.map(food => (
              <div key={food.id_food ?? food.id} className="food-card" data-food-id={food.id_food ?? food.id}>
                <div className="food-info">
                  <h3 className="food-name">{food.name}</h3>
                  <p className="food-price">{food.price.toLocaleString()}đ</p>
                </div>
                <button 
                  onClick={() => handleAddFood(food)}
                  className="add-food-btn"
                >
                  ➕ Thêm
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                disabled={page === 0} 
                onClick={() => setPage(prev => prev - 1)}
                className="pagination-btn"
              >
                ◀ Trước
              </button>
              <span className="page-info">Trang {page + 1} / {totalPages}</span>
              <button 
                disabled={page + 1 >= totalPages} 
                onClick={() => setPage(prev => prev + 1)}
                className="pagination-btn"
              >
                Sau ▶
              </button>
            </div>
          )}
        </div>

        {/* Selected Items */}
        {selectedItems.length > 0 && (
          <div className="selected-section">
            <h2 className="section-title">🛒 Giỏ hàng của bạn</h2>
            <form onSubmit={handleSubmit} className="order-form">
              <div className="selected-items">
                {selectedItems.map(item => (
                  <div key={item.id} className="selected-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">{item.price.toLocaleString()}đ</span>
                    </div>
                    <div className="item-controls">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="quantity-input"
                      />
                      <span className="item-total">{(item.quantity * item.price).toLocaleString()}đ</span>
                      <button 
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="remove-btn"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-summary">
                <div className="total-price">
                  <span>Tổng tiền:</span>
                  <span className="total-amount">{totalPrice.toLocaleString()}đ</span>
                </div>
                <button 
                  type="submit" 
                  className={`submit-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Đang xử lý...
                    </>
                  ) : (
                    '✅ Xác nhận đặt món'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Empty State */}
        {selectedItems.length === 0 && foods.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🍽️</div>
            <h3>Chưa có món ăn nào</h3>
            <p>Hãy thử tìm kiếm món ăn khác hoặc liên hệ quản lý để thêm món mới.</p>
          </div>
        )}
      </div>
    </>
  );
}
