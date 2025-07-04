import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './image/favicon-48x48.png';
import './css/customer.css';
import CustomerEffects from './components/CustomerEffects';

export default function CustomerPage() {
  const navigate = useNavigate();
  const effectsRef = useRef(null);
  
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState({
    fullName: 'Guest',
    role: 'MANAGER'
  });

  useEffect(() => {
    // Khởi tạo effects
    effectsRef.current = new CustomerEffects();
    effectsRef.current.addTableEffects();
    effectsRef.current.addSearchEffects();
    effectsRef.current.addHeaderEffects();
    effectsRef.current.addMessageEffects();
    effectsRef.current.addLogoEffects();
    effectsRef.current.addUserInfoEffects();
    
    // Lấy thông tin user
    const fullName = localStorage.getItem('full_name') || 'Guest';
    const role = localStorage.getItem('role') || 'MANAGER';
    setUserInfo({ fullName, role });
    
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:8099/api/users', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,
      });
      setCustomers(res.data.filter(user => user.role === 'CUSTOMER'));
    } catch (error) {
      console.error('Lỗi khi tải khách hàng:', error);
      setMessage('❌ Có lỗi xảy ra khi tải danh sách khách hàng.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const getGenderIcon = (gender) => {
    switch (gender?.toLowerCase()) {
      case 'male':
        return '👨';
      case 'female':
        return '👩';
      default:
        return '👤';
    }
  };

  const getGenderText = (gender) => {
    switch (gender?.toLowerCase()) {
      case 'male':
        return 'Nam';
      case 'female':
        return 'Nữ';
      default:
        return '---';
    }
  };

  return (
    <div className="customer-container">
      <header className="customer-header">
        <div className="header-content">
          <div className="logo-section">
            <img src={logo} alt="Restaurant Logo" className="customer-logo" />
            <div className="logo-text">
              <h1>Quản lý khách hàng</h1>
              <p>Danh sách và thông tin khách hàng</p>
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
        <div className={`customer-message ${message.includes('❌') ? 'error' : 'success'}`}>
          <span>{message}</span>
        </div>
      )}

      <div className="customer-content">
        <div className="content-header">
          <h2 className="section-title">👤 Danh sách khách hàng</h2>
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <span className="stat-number">{customers.length}</span>
                <span className="stat-label">Tổng khách hàng</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔍</div>
              <div className="stat-info">
                <span className="stat-number">{filteredCustomers.length}</span>
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
              placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="clear-search-btn"
            >
              ✕ Xóa tìm kiếm
            </button>
          )}
        </div>

        <div className="table-section">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Đang tải danh sách khách hàng...</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="customer-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Thông tin khách hàng</th>
                    <th>Liên hệ</th>
                    <th>Giới tính</th>
                    <th>Ngày tham gia</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer, index) => (
                      <tr key={customer.id_user} className="customer-row" style={{ animationDelay: `${index * 0.1}s` }}>
                        <td className="customer-id">
                          <span className="id-badge">#{customer.id_user}</span>
                        </td>
                        <td className="customer-info">
                          <div className="customer-avatar">
                            <span className="customer-avatar-text">
                              {customer.full_name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="customer-details">
                            <h4 className="customer-name">{customer.full_name}</h4>
                            <p className="customer-email">{customer.email}</p>
                          </div>
                        </td>
                        <td className="contact-info">
                          <div className="contact-item">
                            <span className="contact-icon">📧</span>
                            <span className="contact-text">{customer.email}</span>
                          </div>
                          <div className="contact-item">
                            <span className="contact-icon">📱</span>
                            <span className="contact-text">{customer.phone || 'Chưa có'}</span>
                          </div>
                        </td>
                        <td className="gender-cell">
                          <div className="gender-info">
                            <span className="gender-icon">{getGenderIcon(customer.gender)}</span>
                            <span className="gender-text">{getGenderText(customer.gender)}</span>
                          </div>
                        </td>
                        <td className="join-date">
                          <div className="date-info">
                            <span className="date-icon">📅</span>
                            <span className="date-text">
                              {new Date(customer.created_at).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                        </td>
                        <td className="status-cell">
                          <span className="status-badge active">
                            <span className="status-dot"></span>
                            Hoạt động
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="no-data-row">
                      <td colSpan="6" className="no-data">
                        <div className="no-data-content">
                          <div className="no-data-icon">👥</div>
                          <h3>Không tìm thấy khách hàng</h3>
                          <p>
                            {searchTerm 
                              ? `Không có kết quả nào cho "${searchTerm}"`
                              : 'Chưa có khách hàng nào trong hệ thống'
                            }
                          </p>
                          {searchTerm && (
                            <button 
                              onClick={() => setSearchTerm('')}
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

        {/* Summary Section */}
        {filteredCustomers.length > 0 && (
          <div className="summary-section">
            <div className="summary-card">
              <div className="summary-item">
                <span className="summary-label">Tổng khách hàng:</span>
                <span className="summary-value">{customers.length}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Kết quả hiển thị:</span>
                <span className="summary-value">{filteredCustomers.length}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Nam:</span>
                <span className="summary-value">
                  {filteredCustomers.filter(c => c.gender?.toLowerCase() === 'male').length}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Nữ:</span>
                <span className="summary-value">
                  {filteredCustomers.filter(c => c.gender?.toLowerCase() === 'female').length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      )}
    </div>
  );
}
