import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import logo from './image/favicon-48x48.png';
import './css/ingredient.css';
import IngredientEffects from './components/IngredientEffects';
import Header from './Header';

export default function IngredientManager() {
  const API = 'http://localhost:8099/api/ingredients';
  const effectsRef = useRef(null);

  const [ingredients, setIngredients] = useState([]);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    quantity: '',
    unit_price: '',
    unit: '',
    origin: ''
  });
  const [editing, setEditing] = useState(false);
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
    effectsRef.current = new IngredientEffects();
    effectsRef.current.addTableAnimations();
    effectsRef.current.addFormEffects();
    effectsRef.current.addSearchEffects();
    effectsRef.current.addButtonEffects();
    effectsRef.current.addMessageEffects();
    effectsRef.current.addLogoEffects();
    effectsRef.current.addUserInfoEffects();
    
    const fullName = localStorage.getItem('full_name') || 'Guest';
    const role = localStorage.getItem('role') || 'MANAGER';
    setUserInfo({ fullName, role });
  }, []);

  const fetchIngredients = useCallback(async () => {
    try {
      const res = await axios.get(`${API}${search ? '/search' : ''}`, {
        params: {
          name: search,
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
  }, [search, page, size]);
  
  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const dto = {
      name: formData.name,
      quantity: formData.quantity,
      unit_price: formData.unit_price,
      unit: formData.unit,
      origin: formData.origin
    };

    try {
      if (editing) {
        await axios.put(`${API}/${formData.id}`, dto, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          withCredentials: true,
        });
        setMessage('✅ Cập nhật nguyên liệu thành công!');
      } else {
        await axios.post(API, dto, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          withCredentials: true,
        });
        setMessage('✅ Thêm nguyên liệu thành công!');
      }

      setFormData({ id: null, name: '', quantity: '', unit_price: '', unit: '', origin: '' });
      setEditing(false);
      fetchIngredients();

      // Auto hide message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);

    } catch (err) {
      setMessage('❌ Lỗi khi lưu nguyên liệu. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (ingredient) => {
    setFormData({
      id: ingredient.id_ingredient,
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit_price: ingredient.unit_price,
      unit: ingredient.unit,
      origin: ingredient.origin
    });
    setEditing(true);
    
    // Scroll to form
    document.querySelector('.ingredient-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá nguyên liệu này?')) return;
    
    setIsLoading(true);
    try {
      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,
      });
      setMessage('✅ Đã xoá nguyên liệu thành công!');
      fetchIngredients();
      
      // Auto hide message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (err) {
      setMessage('❌ Lỗi khi xoá nguyên liệu. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ id: null, name: '', quantity: '', unit_price: '', unit: '', origin: '' });
    setEditing(false);
  };

  return (
    <>
      <Header />
      <div className="ingredient-container">
        {/* Header */}
        <div className="ingredient-header">
          <div className="header-content">
            <div className="logo-section">
              <img src={logo} alt="Restaurant Logo" className="ingredient-logo" />
              <div className="logo-text">
                <h1>Quản lý nguyên liệu</h1>
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
          <div className={`ingredient-message ${message.includes('✅') ? 'success' : 'error'}`}>
            <span>{message}</span>
          </div>
        )}

        <div className="ingredient-content">
          <div className="content-header">
            <h2 className="section-title">📦 Quản lý nguyên liệu</h2>
            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-info">
                  <span className="stat-number">{ingredients.length}</span>
                  <span className="stat-label">Tổng nguyên liệu</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🔍</div>
                <div className="stat-info">
                  <span className="stat-number">{ingredients.filter(ing => ing.quantity > 0).length}</span>
                  <span className="stat-label">Còn hàng</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <span className="stat-number">
                    {ingredients.reduce((sum, ing) => sum + (ing.quantity * ing.unit_price), 0).toLocaleString()}
                  </span>
                  <span className="stat-label">Tổng giá trị</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="search-section">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên nguyên liệu..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
                className="search-input"
              />
            </div>
            {search && (
              <button 
                onClick={() => {
                  setSearch('');
                  setPage(0);
                }}
                className="clear-search-btn"
              >
                ✕ Xóa tìm kiếm
              </button>
            )}
          </div>

          {/* Form Section */}
          <div className="form-section">
            <h3 className="form-title">📝 {editing ? 'Cập nhật nguyên liệu' : 'Thêm nguyên liệu mới'}</h3>
            <form onSubmit={handleSubmit} className="ingredient-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Tên nguyên liệu</label>
                  <input 
                    name="name" 
                    placeholder="Nhập tên nguyên liệu" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Số lượng</label>
                  <input 
                    name="quantity" 
                    type="number" 
                    placeholder="Nhập số lượng" 
                    value={formData.quantity} 
                    onChange={handleChange} 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Đơn giá (VNĐ)</label>
                  <input 
                    name="unit_price" 
                    type="number" 
                    placeholder="Nhập đơn giá" 
                    value={formData.unit_price} 
                    onChange={handleChange} 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Đơn vị</label>
                  <input 
                    name="unit" 
                    placeholder="kg, gam, lít..." 
                    value={formData.unit} 
                    onChange={handleChange} 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group full-width">
                  <label className="form-label">Xuất xứ</label>
                  <input 
                    name="origin" 
                    placeholder="Nhập xuất xứ nguyên liệu" 
                    value={formData.origin} 
                    onChange={handleChange} 
                    required 
                    className="form-input"
                  />
                </div>
              </div>
              
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
                    editing ? '✅ Cập nhật' : '➕ Thêm mới'
                  )}
                </button>
                {editing && (
                  <button 
                    type="button" 
                    onClick={handleCancel}
                    className="cancel-btn"
                  >
                    ❌ Hủy
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Ingredients Table */}
          <div className="table-section">
            <h3 className="table-title">📋 Danh sách nguyên liệu</h3>
            
            {ingredients.length > 0 ? (
              <div className="table-container">
                <table className="ingredient-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên nguyên liệu</th>
                      <th>Số lượng</th>
                      <th>Đơn giá</th>
                      <th>Đơn vị</th>
                      <th>Xuất xứ</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.map((ing, index) => (
                      <tr key={ing.id_ingredient} className="ingredient-row" style={{ animationDelay: `${index * 0.1}s` }}>
                        <td className="ingredient-id">
                          <span className="id-badge">#{ing.id_ingredient}</span>
                        </td>
                        <td className="ingredient-name">{ing.name}</td>
                        <td className="ingredient-quantity">
                          <span className={`quantity-badge ${ing.quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
                            {ing.quantity}
                          </span>
                        </td>
                        <td className="ingredient-price">
                          <span className="price">{ing.unit_price.toLocaleString()}đ</span>
                        </td>
                        <td className="ingredient-unit">{ing.unit}</td>
                        <td className="ingredient-origin">{ing.origin}</td>
                        <td className="ingredient-actions">
                          <button 
                            onClick={() => handleEdit(ing)}
                            className="edit-btn"
                          >
                            ✏️ Sửa
                          </button>
                          <button 
                            onClick={() => handleDelete(ing.id_ingredient)}
                            className="delete-btn"
                            disabled={isLoading}
                          >
                            🗑️ Xoá
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h3>Chưa có nguyên liệu nào</h3>
                <p>
                  {search 
                    ? `Không có kết quả nào cho "${search}"`
                    : 'Hãy thêm nguyên liệu mới để bắt đầu quản lý kho hàng.'
                  }
                </p>
                {search && (
                  <button 
                    onClick={() => {
                      setSearch('');
                      setPage(0);
                    }}
                    className="clear-search-btn"
                  >
                    ✕ Xóa tìm kiếm
                  </button>
                )}
              </div>
            )}

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
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Đang xử lý...</p>
          </div>
        )}
      </div>
    </>
  );
}