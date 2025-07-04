import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './image/favicon-48x48.png';
import './css/food.css';
import FoodEffects from './components/FoodEffects';

export default function AddFoodForm() {
  const API = 'http://localhost:8099/api/ingredients';
  const navigate = useNavigate();
  const effectsRef = useRef(null);

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
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: 'Guest',
    role: 'MANAGER'
  });

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Khởi tạo effects
    effectsRef.current = new FoodEffects();
    effectsRef.current.addFormEffects();
    effectsRef.current.addSearchEffects();
    effectsRef.current.addButtonEffects();
    effectsRef.current.addMessageEffects();
    effectsRef.current.addLogoEffects();
    effectsRef.current.addUserInfoEffects();
    effectsRef.current.addIngredientEffects();
    
    // Lấy thông tin user
    const fullName = localStorage.getItem('full_name') || 'Guest';
    const role = localStorage.getItem('role') || 'MANAGER';
    setUserInfo({ fullName, role });
  }, []);

  const fetchIngredients = useCallback(async () => {
    try {
      const res = await axios.get(`${API}${searchTerm ? '/search' : ''}`, {
        params: {
          name: searchTerm,
          page,
          size,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,
      });
      setIngredients(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Lỗi khi tải nguyên liệu:', err);
      if (err.response?.status === 403) {
        setMessage('❌ Không có quyền truy cập nguyên liệu. Vui lòng đăng nhập lại hoặc dùng tài khoản phù hợp.');
      }
    }
  }, [searchTerm, page, size]);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddIngredient = (ingredient) => {
    const exists = selectedIngredients.some(item => item.id_ingredient === ingredient.id_ingredient);
    if (!exists) {
      setSelectedIngredients(prev => [...prev, { ...ingredient, quantity_used: 1 }]);
      
      // Hiệu ứng thêm nguyên liệu
      effectsRef.current?.addIngredientAnimation(ingredient.id_ingredient);
    }
  };

  const handleQuantityChange = (id, value) => {
    setSelectedIngredients(prev =>
      prev.map(item =>
        item.id_ingredient === id ? { ...item, quantity_used: Number(value) } : item
      )
    );
  };

  const handleRemoveIngredient = (id) => {
    setSelectedIngredients(prev => prev.filter(item => item.id_ingredient !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
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
      setMessage('✅ Món ăn đã được thêm thành công!');
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
      setPage(0);
      
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Lỗi khi thêm món ăn:', error);
      setMessage('❌ Có lỗi xảy ra khi thêm món ăn. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return '🟢 Còn hàng';
      case 'OUT_OF_STOCK':
        return '🔴 Hết hàng';
      case 'DISCONTINUED':
        return '⚫ Ngừng kinh doanh';
      default:
        return '🟢 Còn hàng';
    }
  };

  return (
    <div className="food-container">
      {/* Header */}
      <header className="food-header">
        <div className="header-content">
          <div className="logo-section">
            <img src={logo} alt="Restaurant Logo" className="food-logo" />
            <div className="logo-text">
              <h1>Quản lý món ăn</h1>
              <p>Thêm và quản lý món ăn mới</p>
            </div>
          </div>
          <div className="user-section">
            <div className="user-info">
              <div className="user-avatar">
                <span className="avatar-text">{userInfo.fullName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="user-details">
                <p className="user-name">{userInfo.fullName}</p>
                <p className="user-role">{userInfo.role}</p>
              </div>
            </div>
            <button onClick={() => navigate('/')} className="back-btn">
              ← Về Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Message */}
      {message && (
        <div className={`food-message ${message.includes('✅') ? 'success' : 'error'}`}>
          <span>{message}</span>
        </div>
      )}

      {/* Form Section */}
      <div className="form-section">
        <h2 className="section-title">🍽️ Thêm món ăn mới</h2>
        
        <form onSubmit={handleSubmit} className="food-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Tên món ăn</label>
              <input 
                name="name" 
                placeholder="Nhập tên món ăn" 
                value={foodData.name} 
                onChange={handleInputChange} 
                required 
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Giá món ăn</label>
              <input 
                name="price" 
                type="number" 
                placeholder="Nhập giá món ăn" 
                value={foodData.price} 
                onChange={handleInputChange} 
                required 
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Loại món ăn</label>
              <input 
                name="category" 
                placeholder="Nhập loại món ăn" 
                value={foodData.category} 
                onChange={handleInputChange} 
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Trạng thái</label>
              <select 
                name="status" 
                value={foodData.status} 
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="AVAILABLE">🟢 Còn hàng</option>
                <option value="OUT_OF_STOCK">🔴 Hết hàng</option>
                <option value="DISCONTINUED">⚫ Ngừng kinh doanh</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>URL hình ảnh</label>
            <input 
              name="image_url" 
              placeholder="Nhập URL hình ảnh món ăn" 
              value={foodData.image_url} 
              onChange={handleInputChange} 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Mô tả món ăn</label>
            <textarea 
              name="description" 
              placeholder="Nhập mô tả chi tiết về món ăn" 
              value={foodData.description} 
              onChange={handleInputChange}
              className="form-input"
              rows="4"
            />
          </div>

          {/* Ingredient Search Section */}
          <div className="ingredient-section">
            <h3 className="subsection-title">🔍 Tìm và chọn nguyên liệu</h3>
            
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Tìm nguyên liệu..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(0);
                }}
                className="search-input"
              />
            </div>

            <div className="ingredient-grid">
              {ingredients.map(ingredient => (
                <div key={ingredient.id_ingredient} className="ingredient-card" data-ingredient-id={ingredient.id_ingredient}>
                  <div className="ingredient-info">
                    <h4 className="ingredient-name">{ingredient.name}</h4>
                    <p className="ingredient-details">
                      <span className="ingredient-quantity">{ingredient.quantity} {ingredient.unit}</span>
                      <span className="ingredient-price">{ingredient.unit_price.toLocaleString()}đ</span>
                    </p>
                    <p className="ingredient-origin">Xuất xứ: {ingredient.origin}</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleAddIngredient(ingredient)}
                    className="add-ingredient-btn"
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

          {/* Selected Ingredients */}
          {selectedIngredients.length > 0 && (
            <div className="selected-ingredients-section">
              <h3 className="subsection-title">📦 Nguyên liệu đã chọn</h3>
              <div className="selected-ingredients">
                {selectedIngredients.map(item => (
                  <div key={item.id_ingredient} className="selected-ingredient-item">
                    <div className="selected-ingredient-info">
                      <span className="selected-ingredient-name">{item.name}</span>
                      <span className="selected-ingredient-price">{item.unit_price.toLocaleString()}đ/{item.unit}</span>
                    </div>
                    <div className="selected-ingredient-controls">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity_used}
                        onChange={(e) => handleQuantityChange(item.id_ingredient, e.target.value)}
                        className="quantity-input"
                        placeholder="Số lượng"
                      />
                      <button 
                        type="button"
                        onClick={() => handleRemoveIngredient(item.id_ingredient)}
                        className="remove-ingredient-btn"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="form-actions">
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
                '✅ Thêm món ăn'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Đang xử lý...</p>
        </div>
      )}
    </div>
  );
}
