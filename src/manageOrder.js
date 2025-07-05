import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import logo from './image/favicon-48x48.png';
import './css/manageOrder.css';
import ManageOrderEffects from './components/ManageOrderEffects';
import Header from './Header';

export default function ManageOrder() {
  const effectsRef = useRef(null);

  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: 'Guest',
    role: 'MANAGER'
  });

  useEffect(() => {
    effectsRef.current = new ManageOrderEffects();
    effectsRef.current.addTableAnimations();
    effectsRef.current.addSearchEffects();
    effectsRef.current.addButtonEffects();
    effectsRef.current.addMessageEffects();
    effectsRef.current.addStatusEffects();
    effectsRef.current.addLogoEffects();
    effectsRef.current.addUserInfoEffects();
    effectsRef.current.addPaginationEffects();
    effectsRef.current.addEmptyStateEffects();
    effectsRef.current.addTableHeaderEffects();
    effectsRef.current.addOrderIdEffects();
    effectsRef.current.addTotalPriceEffects();
    
    const fullName = localStorage.getItem('full_name') || 'Guest';
    const role = localStorage.getItem('role') || 'MANAGER';
    setUserInfo({ fullName, role });
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:8099/api/orders', {
        params: {
          keyword: searchTerm,
          page,
          size
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,
      });
      setOrders(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Lỗi khi tải danh sách đơn hàng:', err);
    }
  }, [searchTerm, page, size]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa đơn hàng này?")) return;
    
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:8099/api/orders/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,
      });
      setMessage("✅ Xóa đơn hàng thành công!");
      fetchOrders();
      
      // Auto hide message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      setMessage("❌ Lỗi khi xóa đơn hàng. Vui lòng thử lại.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:8099/api/orders/${id}?status=${status}`, {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,
      });
      setMessage("✅ Đã cập nhật trạng thái đơn hàng.");
      fetchOrders();
      
      // Auto hide message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      setMessage("❌ Lỗi khi cập nhật trạng thái. Vui lòng thử lại.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'status-pending';
      case 'IN_PROGRESS':
        return 'status-progress';
      case 'COMPLETED':
        return 'status-completed';
      default:
        return 'status-pending';
    }
  };

  return (
    <>
      <Header />
      <div className="manage-order-container">
        {/* Header */}
        <div className="manage-order-header">
          <div className="header-content">
            <div className="logo-section">
              <img src={logo} alt="Restaurant Logo" className="manage-order-logo" />
              <div className="logo-text">
                <h1>Quản lý đơn hàng</h1>
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
          <div className={`manage-order-message ${message.includes('✅') ? 'success' : 'error'}`}>
            <span>{message}</span>
          </div>
        )}

        {/* Search Section */}
        <div className="search-section">
          <div className="search-box">
            <span className="search-icon">��</span>
            <input
              type="text"
              placeholder="Tìm theo tên khách hàng..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
              className="search-input"
            />
          </div>
        </div>

        {/* Orders Section */}
        <div className="orders-section">
          <h2 className="section-title">📋 Danh sách đơn hàng</h2>
          
          {orders.length > 0 ? (
            <div className="orders-table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Khách hàng</th>
                    <th>Thời gian</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.id_order} className="order-row" style={{ animationDelay: `${index * 0.1}s` }}>
                      <td className="order-id">#{order.id_order}</td>
                      <td className="customer-name">{order.user.username}</td>
                      <td className="order-time">{new Date(order.order_time).toLocaleString()}</td>
                      <td className="order-total">{order.total_price.toLocaleString()}đ</td>
                      <td className="order-status">
                        <select 
                          value={order.status} 
                          onChange={(e) => handleStatusChange(order.id_order, e.target.value)}
                          className={`status-select ${getStatusColor(order.status)}`}
                        >
                          <option value="PENDING">🔄 Đang thực hiện</option>
                          <option value="IN_PROGRESS">🍽️ Đã phục vụ</option>
                          <option value="COMPLETED">✅ Đã thanh toán</option>
                        </select>
                      </td>
                      <td className="order-actions">
                        <button 
                          onClick={() => handleDelete(order.id_order)}
                          className="delete-btn"
                          disabled={isLoading}
                        >
                          🗑️ Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>Chưa có đơn hàng nào</h3>
              <p>Hãy chờ khách hàng đặt món hoặc kiểm tra lại bộ lọc tìm kiếm.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                disabled={page === 0} 
                onClick={() => setPage(p => p - 1)}
                className="pagination-btn"
              >
                ◀ Trước
              </button>
              <span className="page-info">Trang {page + 1} / {totalPages}</span>
              <button 
                disabled={page + 1 >= totalPages} 
                onClick={() => setPage(p => p + 1)}
                className="pagination-btn"
              >
                Sau ▶
              </button>
            </div>
          )}
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
