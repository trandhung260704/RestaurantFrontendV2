import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import logo from './image/favicon-48x48.png';
import DashboardEffects from './components/DashboardEffects';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    role: 'CUSTOMER',
    fullName: 'Guest'
  });
  const navigate = useNavigate();
  const effectsRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserInfo({
        role: localStorage.getItem('role') || 'CUSTOMER',
        fullName: localStorage.getItem('full_name') || 'Guest'
      });
      setIsLoading(false);
      
      // Khởi tạo effects sau khi loading xong
      setTimeout(() => {
        effectsRef.current = new DashboardEffects();
        effectsRef.current.addLogoHoverEffect();
        effectsRef.current.addCardClickEffects();
        effectsRef.current.addLogoutLoadingEffect();
      }, 500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const isManager = userInfo.role === 'MANAGER';
  const isEmployee = userInfo.role === 'EMPLOYEE';
  const isCustomer = userInfo.role === 'CUSTOMER';

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8099/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    } finally {
      localStorage.clear();
      navigate('/login');
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <img src={logo} alt="Restaurant Logo" className="loading-logo" />
          <div className="loading-text">Đang tải...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <img src={logo} alt="Restaurant Logo" className="header-logo" />
            <div className="logo-text">
              <h1>Restaurant Dashboard</h1>
              <p>Hệ thống quản lý nhà hàng</p>
            </div>
          </div>
          <Link to="/profile" className="user-info">
            <div className="user-avatar">
              <span className="avatar-text">{userInfo.fullName.charAt(0).toUpperCase()}</span>
            </div>
            <div className="user-details">
              <p className="user-name">Xin chào, {userInfo.fullName}</p>
              <p className="user-role">{userInfo.role}</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="dashboard-grid">

        {(isManager || isEmployee) && (
          <Link to="/ingredient" className="dashboard-card">📦 Quản lý Nguyên liệu</Link>
        )}

        {(isManager || isEmployee) && (
          <Link to="/food" className="dashboard-card">🍜 Quản lý Món ăn</Link>
        )}

        {(isManager || isEmployee || isCustomer) && (
          <Link to="/order" className="dashboard-card">🧾 Đặt đơn món</Link>
        )}

        {isManager && (
          <Link to="/bill" className="dashboard-card">💵 Quản lý Hóa đơn</Link>
        )}

        {isManager && (
          <Link to="/discount" className="dashboard-card">🏷️ Tạo Mã Giảm Giá</Link>
        )}

        {(isManager || isEmployee) && (
          <Link to="/customer" className="dashboard-card">👤 Quản lý Khách hàng</Link>
        )}

        {isManager && (
          <Link to="/manageOrder" className="dashboard-card">🧑 Quản lý Đơn hàng</Link>
        )}

        {isManager && (
          <Link to="/employee" className="dashboard-card">🧑‍💼 Quản lý Nhân viên</Link>
        )}

        <Link to="/login" className="dashboard-card login">🔐 Đăng nhập</Link>

        <button onClick={handleLogout} className="dashboard-button logout">
          🚪 Đăng xuất
        </button>

      </div>
    </div>
  );
}
