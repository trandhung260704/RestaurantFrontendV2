import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './css/order-list.css';

export default function ManageOrder() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [message, setMessage] = useState('');

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
    try {
      await axios.delete(`http://localhost:8099/api/orders/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,
      });
      setMessage("Xóa đơn hàng thành công!");
      fetchOrders();
    } catch (error) {
      setMessage("Lỗi khi xóa đơn hàng.");
      console.error(error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:8099/api/orders/${id}?status=${status}`, {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,
      });
      setMessage("Đã cập nhật trạng thái đơn hàng.");
      fetchOrders();
    } catch (error) {
      setMessage("Lỗi khi cập nhật trạng thái.");
      console.error(error);
    }
  };

  return (
    <div className="order-list-container">
      <h2>Quản lý đơn hàng</h2>
      {message && <p className="message">{message}</p>}

      <input
        type="text"
        placeholder="Tìm theo tên khách hàng..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(0);
        }}
      />

      <table className="order-table">
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
          {orders.map(order => (
            <tr key={order.id_order}>
              <td>{order.id_order}</td>
              <td>{order.user.username}</td>
              <td>{new Date(order.order_time).toLocaleString()}</td>
              <td>{order.total_price.toLocaleString()}đ</td>
              <td>
                <select value={order.status} onChange={(e) => handleStatusChange(order.id_order, e.target.value)}>
                  <option value="PENDING">Đang thực hiện món</option>
                  <option value="IN_PROGRESS">Đã phục vụ món</option>
                  <option value="COMPLETED">Đã thanh toán</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(order.id_order)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>◀</button>
        <span>Trang {page + 1} / {totalPages}</span>
        <button disabled={page + 1 >= totalPages} onClick={() => setPage(p => p + 1)}>▶</button>
      </div>
    </div>
  );
}
