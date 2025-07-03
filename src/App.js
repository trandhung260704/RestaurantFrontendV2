import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';

export default function Dashboard() {
  const role = localStorage.getItem('role') || 'CUSTOMER';
  const fullName = localStorage.getItem('full_name') || 'Guest';
  const navigate = useNavigate();

  const isManager = role === 'MANAGER';
  const isEmployee = role === 'EMPLOYEE';
  const isCustomer = role === 'CUSTOMER';

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

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🍽️ Restaurant Dashboard</h1>
        <p>Welcome, {fullName} ({role})</p>
      </header>

      <div className="dashboard-grid">

        {(isManager || isEmployee) && (
          <Link to="/ingredient" className="dashboard-card">📦 Quản lý Nguyên liệu</Link>
        )}

        {(isManager || isEmployee) && (
          <Link to="/food" className="dashboard-card">🍜 Quản lý Món ăn</Link>
        )}

        {(isManager || isEmployee || isCustomer) && (
          <Link to="/order" className="dashboard-card">🧾 Quản lý Đơn hàng</Link>
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
          <Link to="/employee" className="dashboard-card">🧑‍💼 Quản lý Nhân viên</Link>
        )}

        <Link to="/profile" className="dashboard-card">⚙️ Thông tin Cá nhân</Link>

        <Link to="/login" className="dashboard-card login">🔐 Đăng nhập</Link>

        <button onClick={handleLogout} className="dashboard-button logout">
          🚪 Đăng xuất
        </button>

      </div>
    </div>
  );
}
