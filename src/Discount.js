import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './image/favicon-48x48.png';
import './css/discount.css';
import DiscountEffects from './components/DiscountEffects';

export default function DiscountPage() {
  const API = 'http://localhost:8099/api/discounts';
  const navigate = useNavigate();
  const effectsRef = useRef(null);

  const [discounts, setDiscounts] = useState([]);
  const [form, setForm] = useState({
    id: null,
    code: '',
    name: '',
    start_date: '',
    end_date: '',
    discount_percent: ''
  });
  const [searchCode, setSearchCode] = useState('');
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: 'Guest',
    role: 'MANAGER'
  });

  useEffect(() => {
    effectsRef.current = new DiscountEffects();
    effectsRef.current.addTableEffects();
    effectsRef.current.addSearchEffects();
    effectsRef.current.addHeaderEffects();
    effectsRef.current.addMessageEffects();
    effectsRef.current.addLogoEffects();
    effectsRef.current.addUserInfoEffects();
    effectsRef.current.addFormEffects();
    effectsRef.current.addRippleStyles();

    const fullName = localStorage.getItem('full_name') || 'Guest';
    const role = localStorage.getItem('role') || 'MANAGER';
    setUserInfo({ fullName, role });

    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,
      });
      setDiscounts(res.data);
    } catch (err) {
      setMessage('❌ Lỗi khi tải mã giảm giá.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDiscounts = discounts.filter((d) =>
    d.code.toLowerCase().includes(searchCode.toLowerCase()) ||
    d.name.toLowerCase().includes(searchCode.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const dto = {
      code: form.code,
      name: form.name,
      start_date: form.start_date,
      end_date: form.end_date,
      discount_percent: form.discount_percent
    };
    try {
      if (editing) {
        await axios.put(`${API}/${form.id}`, dto, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          withCredentials: true,
        });
        setMessage('✅ Cập nhật mã giảm giá thành công!');
      } else {
        await axios.post(API, dto, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          withCredentials: true,
        });
        setMessage('✅ Thêm mã giảm giá thành công!');
      }
      setForm({ id: null, code: '', name: '', start_date: '', end_date: '', discount_percent: '' });
      setEditing(false);
      fetchDiscounts();
    } catch (err) {
      setMessage('❌ Lỗi khi lưu mã giảm giá.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (d) => {
    setForm({
      id: d.id_discount,
      code: d.code,
      name: d.name,
      start_date: d.start_date?.slice(0, 10),
      end_date: d.end_date?.slice(0, 10),
      discount_percent: d.discount_percent
    });
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa mã này?')) {
      setIsLoading(true);
      try {
        await axios.delete(`${API}/${id}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          withCredentials: true,
        });
        setMessage('🗑️ Đã xoá mã giảm giá.');
        fetchDiscounts();
      } catch (err) {
        setMessage('❌ Lỗi khi xoá mã.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setForm({ id: null, code: '', name: '', start_date: '', end_date: '', discount_percent: '' });
    setEditing(false);
  };

  return (
    <div className="discount-container">
      <header className="discount-header">
        <div className="header-content">
          <div className="logo-section">
            <img src={logo} alt="Restaurant Logo" className="discount-logo" />
            <div className="logo-text">
              <h1>Quản lý mã giảm giá</h1>
              <p>Danh sách và thông tin mã giảm giá</p>
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

      {message && (
        <div className={`discount-message ${message.includes('❌') ? 'error' : 'success'}`}>
          <span>{message}</span>
        </div>
      )}

      <div className="discount-content">
        <div className="content-header">
          <h2 className="section-title">🏷️ Danh sách mã giảm giá</h2>
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon">🏷️</div>
              <div className="stat-info">
                <span className="stat-number">{discounts.length}</span>
                <span className="stat-label">Tổng mã</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔍</div>
              <div className="stat-info">
                <span className="stat-number">{filteredDiscounts.length}</span>
                <span className="stat-label">Kết quả tìm kiếm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="search-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm theo mã hoặc tên chương trình..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="search-input"
            />
          </div>
          {searchCode && (
            <button 
              onClick={() => setSearchCode('')}
              className="clear-search-btn"
            >
              ✕ Xóa tìm kiếm
            </button>
          )}
        </div>

        <div className="form-section">
          <h2 className="section-title">{editing ? '✏️ Cập nhật mã giảm giá' : '➕ Thêm mã giảm giá mới'}</h2>
          <form onSubmit={handleSubmit} className="discount-form">
            <div className="form-row">
              <div className="form-group">
                <label>Mã giảm giá</label>
                <input type="text" name="code" placeholder="Nhập mã giảm giá" value={form.code} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Tên chương trình</label>
                <input type="text" name="name" placeholder="Nhập tên chương trình" value={form.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Phần trăm giảm</label>
                <input type="number" name="discount_percent" placeholder="Nhập phần trăm giảm" value={form.discount_percent} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Ngày bắt đầu</label>
                <input type="date" name="start_date" value={form.start_date} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Ngày kết thúc</label>
                <input type="date" name="end_date" value={form.end_date} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="form-actions">
              <button 
                type="submit" 
                className={`submit-btn${isLoading ? ' loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Đang xử lý...
                  </>
                ) : (
                  editing ? '✏️ Cập nhật' : '➕ Thêm mới'
                )}
              </button>
              {editing && (
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  ❌ Hủy
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="table-section">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Đang tải danh sách mã giảm giá...</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="discount-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Mã</th>
                    <th>Tên</th>
                    <th>Bắt đầu</th>
                    <th>Kết thúc</th>
                    <th>% Giảm</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDiscounts.length > 0 ? (
                    filteredDiscounts.map((d, idx) => (
                      <tr key={d.id_discount} className="discount-row" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <td className="discount-id">
                          <span className="id-badge">#{d.id_discount}</span>
                        </td>
                        <td>{d.code}</td>
                        <td>{d.name}</td>
                        <td>{d.start_date?.slice(0, 10)}</td>
                        <td>{d.end_date?.slice(0, 10)}</td>
                        <td><span className="percent">{d.discount_percent}%</span></td>
                        <td>
                          <button onClick={() => handleEdit(d)} className="edit-btn">Sửa</button>
                          <button className="delete-btn" onClick={() => handleDelete(d.id_discount)}>Xoá</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="no-data-row">
                      <td colSpan="7" className="no-data">
                        <div className="no-data-content">
                          <div className="no-data-icon">🏷️</div>
                          <h3>Không tìm thấy mã giảm giá</h3>
                          <p>
                            {searchCode 
                              ? `Không có kết quả nào cho "${searchCode}"`
                              : 'Chưa có mã giảm giá nào trong hệ thống'
                            }
                          </p>
                          {searchCode && (
                            <button 
                              onClick={() => setSearchCode('')}
                              className="clear-search-btn"
                            >
                              ✕ Xóa tìm kiếm
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      )}
    </div>
  );
}
