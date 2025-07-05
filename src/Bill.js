import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import logo from './image/favicon-48x48.png';
import './css/bill.css';
import BillEffects from './components/BillEffects';
import Header from './Header';

export default function BillPage() {
  const effectsRef = useRef(null);

  const [bills, setBills] = useState([]);
  const [form, setForm] = useState({
    id_bill: null,
    total_price: '',
    payment_method: '',
    bill_time: '',
    id_order: '',
    id_discount: ''
  });
  const [editing, setEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState({
    fullName: 'Guest',
    role: 'MANAGER'
  });

  useEffect(() => {
    effectsRef.current = new BillEffects();
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

    fetchBills();
  }, []);

  const fetchBills = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:8099/api/bills', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,
      });
      setBills(res.data);
    } catch (error) {
      setMessage('❌ Có lỗi xảy ra khi tải danh sách hóa đơn.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBills = bills.filter((bill) =>
    String(bill.id_bill).includes(searchTerm) ||
    String(bill.order?.id_order || '').includes(searchTerm) ||
    String(bill.discount?.id_discount || '').includes(searchTerm)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      total_price: parseFloat(form.total_price),
      payment_method: form.payment_method,
      bill_time: form.bill_time,
      order: { id_order: parseInt(form.id_order) },
      discount: form.id_discount ? { id_discount: parseInt(form.id_discount) } : null
    };
    try {
      if (editing) {
        await axios.put(`http://localhost:8099/api/bills/${form.id_bill}`, payload, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          withCredentials: true,
        });
        setMessage('✅ Cập nhật hóa đơn thành công!');
      } else {
        await axios.post('http://localhost:8099/api/bills', payload, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          withCredentials: true,
        });
        setMessage('✅ Thêm hóa đơn thành công!');
      }
      resetForm();
      fetchBills();
    } catch (err) {
      setMessage('❌ Lỗi khi lưu hóa đơn.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (bill) => {
    setForm({
      id_bill: bill.id_bill,
      total_price: bill.total_price,
      payment_method: bill.payment_method,
      bill_time: bill.bill_time?.slice(0, 16),
      id_order: bill.order?.id_order || '',
      id_discount: bill.discount?.id_discount || ''
    });
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xoá hóa đơn này?')) {
      setIsLoading(true);
      try {
        await axios.delete(`http://localhost:8099/api/bills/${id}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          withCredentials: true,
        });
        setMessage('🗑️ Xoá thành công.');
        fetchBills();
      } catch (err) {
        setMessage('❌ Lỗi khi xoá.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setForm({
      id_bill: null,
      total_price: '',
      payment_method: '',
      bill_time: '',
      id_order: '',
      id_discount: ''
    });
    setEditing(false);
  };

  return (
    <>
      <Header />
      <div className="bill-container">
        {/* Header */}
        <div className="bill-header">
          <div className="header-content">
            <div className="logo-section">
              <img src={logo} alt="Restaurant Logo" className="bill-logo" />
              <div className="logo-text">
                <h1>Quản lý hóa đơn</h1>
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
          <div className={`bill-message ${message.includes('❌') ? 'error' : 'success'}`}>
            <span>{message}</span>
          </div>
        )}

        <div className="bill-content">
        <div className="content-header">
          <h2 className="section-title">🧾 Danh sách hóa đơn</h2>
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon">🧾</div>
              <div className="stat-info">
                <span className="stat-number">{bills.length}</span>
                <span className="stat-label">Tổng hóa đơn</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔍</div>
              <div className="stat-info">
                <span className="stat-number">{filteredBills.length}</span>
                <span className="stat-label">Kết quả tìm kiếm</span>
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
              placeholder="Tìm kiếm theo ID hóa đơn, đơn hàng, mã giảm giá..."
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

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="bill-form">
          <div className="form-row">
            <div className="form-group">
              <span className="form-icon">💵</span>
              <input type="number" name="total_price" placeholder="Tổng tiền" value={form.total_price} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <span className="form-icon">💳</span>
              <input type="text" name="payment_method" placeholder="Phương thức thanh toán" value={form.payment_method} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <span className="form-icon">⏰</span>
              <input type="datetime-local" name="bill_time" value={form.bill_time} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <span className="form-icon">🛒</span>
              <input type="number" name="id_order" placeholder="ID đơn hàng" value={form.id_order} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <span className="form-icon">🏷️</span>
              <input type="number" name="id_discount" placeholder="ID mã giảm giá (nếu có)" value={form.id_discount} onChange={handleInputChange} />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">{editing ? 'Cập nhật' : 'Thêm mới'}</button>
              {editing && <button type="button" className="cancel-btn" onClick={resetForm}>Huỷ</button>}
            </div>
          </div>
        </form>

        {/* Table Section */}
        <div className="table-section">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Đang tải danh sách hóa đơn...</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="bill-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ID Đơn hàng</th>
                    <th>ID Giảm giá</th>
                    <th>Tổng tiền</th>
                    <th>Thanh toán</th>
                    <th>Thời gian</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBills.length > 0 ? (
                    filteredBills.map((bill, idx) => (
                      <tr key={bill.id_bill} className="bill-row" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <td className="bill-id">
                          <span className="id-badge">#{bill.id_bill}</span>
                        </td>
                        <td>{bill.order?.id_order}</td>
                        <td>{bill.discount?.id_discount || <span className="no-discount">-</span>}</td>
                        <td><span className="price">{bill.total_price?.toLocaleString('vi-VN')}₫</span></td>
                        <td><span className="payment-method">{bill.payment_method}</span></td>
                        <td><span className="bill-time">{bill.bill_time?.replace('T', ' ').slice(0, 16)}</span></td>
                        <td>
                          <button onClick={() => handleEdit(bill)} className="edit-btn">Sửa</button>
                          <button className="delete-btn" onClick={() => handleDelete(bill.id_bill)}>Xoá</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="no-data-row">
                      <td colSpan="7" className="no-data">
                        <div className="no-data-content">
                          <div className="no-data-icon">🧾</div>
                          <h3>Không tìm thấy hóa đơn</h3>
                          <p>
                            {searchTerm 
                              ? `Không có kết quả nào cho "${searchTerm}"`
                              : 'Chưa có hóa đơn nào trong hệ thống'
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
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      )}
    </div>
    </>
  );
}
