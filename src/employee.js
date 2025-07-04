import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './image/favicon-48x48.png';
import './css/employee.css';
import EmployeeEffects from './components/EmployeeEffects';

export default function EmployeePage() {
  const navigate = useNavigate();
  const effectsRef = useRef(null);
  
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState({
    fullName: 'Guest',
    role: 'MANAGER'
  });

  useEffect(() => {
    effectsRef.current = new EmployeeEffects();
    effectsRef.current.addTableEffects();
    effectsRef.current.addSearchEffects();
    effectsRef.current.addHeaderEffects();
    effectsRef.current.addMessageEffects();
    effectsRef.current.addLogoEffects();
    effectsRef.current.addUserInfoEffects();
    effectsRef.current.addRippleStyles();
    
    const fullName = localStorage.getItem('full_name') || 'Guest';
    const role = localStorage.getItem('role') || 'MANAGER';
    setUserInfo({ fullName, role });
    
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:8099/api/users', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,
      });
      setEmployees(res.data.filter(user => user.role === 'EMPLOYEE'));
    } catch (error) {
      console.error('Lỗi khi tải nhân viên:', error);
      setMessage('❌ Có lỗi xảy ra khi tải danh sách nhân viên.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (employee.phone || '').includes(searchTerm)
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

  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case 'manager':
        return { text: 'Quản lý', color: 'manager' };
      case 'employee':
        return { text: 'Nhân viên', color: 'employee' };
      default:
        return { text: 'Không xác định', color: 'unknown' };
    }
  };

  return (
    <div className="employee-container">
      <header className="employee-header">
        <div className="header-content">
          <div className="logo-section">
            <img src={logo} alt="Restaurant Logo" className="employee-logo" />
            <div className="logo-text">
              <h1>Quản lý nhân viên</h1>
              <p>Danh sách và thông tin nhân viên</p>
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
        <div className={`employee-message ${message.includes('❌') ? 'error' : 'success'}`}>
          <span>{message}</span>
        </div>
      )}

      <div className="employee-content">
        <div className="content-header">
          <h2 className="section-title">👨‍💼 Danh sách nhân viên</h2>
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <span className="stat-number">{employees.length}</span>
                <span className="stat-label">Tổng nhân viên</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔍</div>
              <div className="stat-info">
                <span className="stat-number">{filteredEmployees.length}</span>
                <span className="stat-label">Kết quả tìm kiếm</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👨‍💼</div>
              <div className="stat-info">
                <span className="stat-number">
                  {employees.filter(e => e.role === 'EMPLOYEE').length}
                </span>
                <span className="stat-label">Nhân viên</span>
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
              <p>Đang tải danh sách nhân viên...</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Thông tin nhân viên</th>
                    <th>Liên hệ</th>
                    <th>Vai trò</th>
                    <th>Giới tính</th>
                    <th>Ngày tham gia</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee, index) => {
                      const roleBadge = getRoleBadge(employee.role);
                      return (
                        <tr key={employee.id_user} className="employee-row" style={{ animationDelay: `${index * 0.1}s` }}>
                          <td className="employee-id">
                            <span className="id-badge">#{employee.id_user}</span>
                          </td>
                          <td className="employee-info">
                            <div className="employee-avatar">
                              <span className="employee-avatar-text">
                                {employee.full_name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="employee-details">
                              <h4 className="employee-name">{employee.full_name}</h4>
                              <p className="employee-email">{employee.email}</p>
                            </div>
                          </td>
                          <td className="contact-info">
                            <div className="contact-item">
                              <span className="contact-icon">📧</span>
                              <span className="contact-text">{employee.email}</span>
                            </div>
                            <div className="contact-item">
                              <span className="contact-icon">📱</span>
                              <span className="contact-text">{employee.phone || 'Chưa có'}</span>
                            </div>
                          </td>
                          <td className="role-cell">
                            <span className={`role-badge ${roleBadge.color}`}>
                              {roleBadge.text}
                            </span>
                          </td>
                          <td className="gender-cell">
                            <div className="gender-info">
                              <span className="gender-icon">{getGenderIcon(employee.gender)}</span>
                              <span className="gender-text">{getGenderText(employee.gender)}</span>
                            </div>
                          </td>
                          <td className="join-date">
                            <div className="date-info">
                              <span className="date-icon">📅</span>
                              <span className="date-text">
                                {new Date(employee.created_at).toLocaleDateString('vi-VN')}
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
                      );
                    })
                  ) : (
                    <tr className="no-data-row">
                      <td colSpan="7" className="no-data">
                        <div className="no-data-content">
                          <div className="no-data-icon">👨‍💼</div>
                          <h3>Không tìm thấy nhân viên</h3>
                          <p>
                            {searchTerm 
                              ? `Không có kết quả nào cho "${searchTerm}"`
                              : 'Chưa có nhân viên nào trong hệ thống'
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

        {filteredEmployees.length > 0 && (
          <div className="summary-section">
            <div className="summary-card">
              <div className="summary-item">
                <span className="summary-label">Tổng nhân viên:</span>
                <span className="summary-value">{employees.length}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Kết quả hiển thị:</span>
                <span className="summary-value">{filteredEmployees.length}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Nam:</span>
                <span className="summary-value">
                  {filteredEmployees.filter(e => e.gender?.toLowerCase() === 'male').length}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Nữ:</span>
                <span className="summary-value">
                  {filteredEmployees.filter(e => e.gender?.toLowerCase() === 'female').length}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Quản lý:</span>
                <span className="summary-value">
                  {filteredEmployees.filter(e => e.role?.toLowerCase() === 'manager').length}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Nhân viên:</span>
                <span className="summary-value">
                  {filteredEmployees.filter(e => e.role?.toLowerCase() === 'employee').length}
                </span>
              </div>
            </div>
          </div>
        )}
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
