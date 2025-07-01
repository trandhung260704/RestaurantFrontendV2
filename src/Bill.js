import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/bill.css';

export default function BillManager() {
  const API = 'http://localhost:8099/api/bills';

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
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    try {
      const res = await axios.get(API);
      setBills(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      total_price: parseFloat(form.total_price),
      payment_method: form.payment_method,
      bill_time: form.bill_time,
      order: { id_order: parseInt(form.id_order) },
      discount: form.id_discount ? { id_discount: parseInt(form.id_discount) } : null
    };

    try {
      if (editing) {
        await axios.put(`${API}/${form.id_bill}`, payload);
        setMessage('Cập nhật hóa đơn thành công!');
      } else {
        await axios.post(API, payload);
        setMessage('Thêm hóa đơn thành công!');
      }

      resetForm();
      loadBills();
    } catch (err) {
      setMessage('Lỗi khi lưu hóa đơn.');
      console.error(err);
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
      try {
        await axios.delete(`${API}/${id}`);
        setMessage('Xoá thành công.');
        loadBills();
      } catch (err) {
        setMessage('Lỗi khi xoá.');
        console.error(err);
      }
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${API}/search?search=${search}`);
      setBills(res.data ? [res.data] : []);
    } catch (err) {
      setMessage('Không tìm thấy hóa đơn.');
    }
  };

  const resetForm = () => {
    setForm({ id_bill: null, total_price: '', payment_method: '', bill_time: '', id_order: '', id_discount: '' });
    setEditing(false);
  };

  return (
    <div className="bill-container">
      <h2>Quản lý hóa đơn</h2>
      {message && <p className="message">{message}</p>}

      <div className="search-section">
        <input
          type="text"
          placeholder="Tìm theo ID đơn hàng"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm</button>
        <button onClick={loadBills}>Tải lại</button>
      </div>

      <form onSubmit={handleSubmit} className="bill-form">
        <input type="number" name="total_price" placeholder="Tổng tiền" value={form.total_price} onChange={handleInputChange} required />
        <input type="text" name="payment_method" placeholder="Phương thức thanh toán" value={form.payment_method} onChange={handleInputChange} required />
        <input type="datetime-local" name="bill_time" value={form.bill_time} onChange={handleInputChange} required />
        <input type="number" name="id_order" placeholder="ID đơn hàng" value={form.id_order} onChange={handleInputChange} required />
        <input type="number" name="id_discount" placeholder="ID mã giảm giá (nếu có)" value={form.id_discount} onChange={handleInputChange} />
        <button type="submit">{editing ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

      <table className="bill-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Order</th>
            <th>ID Discount</th>
            <th>Tổng tiền</th>
            <th>Thanh toán</th>
            <th>Thời gian</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(b => (
            <tr key={b.id_bill}>
              <td>{b.id_bill}</td>
              <td>{b.order?.id_order}</td>
              <td>{b.discount?.id_discount || '-'}</td>
              <td>{b.total_price}</td>
              <td>{b.payment_method}</td>
              <td>{b.bill_time?.replace('T', ' ').slice(0, 16)}</td>
              <td>
                <button onClick={() => handleEdit(b)}>Sửa</button>
                <button className="delete-btn" onClick={() => handleDelete(b.id_bill)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
