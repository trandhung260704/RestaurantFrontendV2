import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/discount.css';

export default function DiscountManager() {
  const API = 'http://localhost:8099/api/discounts';
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

  useEffect(() => {
    axios.get(API, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      withCredentials: true,
    })
      .then(res => setDiscounts(res.data))
      .catch(err => {
        console.error('Lỗi khi tải mã giảm giá:', err);
        if (err.response?.status === 403) {
          setMessage('Không có quyền truy cập mã giảm giá. Vui lòng đăng nhập lại hoặc dùng tài khoản phù hợp.');
        }
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setMessage('Cập nhật mã giảm giá thành công!');
      } else {
        await axios.post(API, dto, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          withCredentials: true,
        });
        setMessage('Thêm mã giảm giá thành công!');
      }

      setForm({ id: null, code: '', name: '', start_date: '', end_date: '', discount_percent: '' });
      setEditing(false);
      loadDiscounts();
    } catch (err) {
      setMessage('Lỗi khi lưu mã giảm giá.');
      console.error(err);
    }
  };

  const loadDiscounts = async () => {
    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,
      });
      setDiscounts(res.data);
    } catch (err) {
      console.error(err);
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
      try {
        await axios.delete(`${API}/${id}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          withCredentials: true,
        });
        setMessage('Đã xoá mã giảm giá.');
        loadDiscounts();
      } catch (err) {
        setMessage('Lỗi khi xoá mã.');
        console.error(err);
      }
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${API}/code/${searchCode}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,
      });
      setDiscounts(res.data ? [res.data] : []);
    } catch (err) {
      setMessage('Không tìm thấy mã này.');
    }
  };

  return (
    <div className="discount-container">
      <h2>Quản lý mã giảm giá</h2>
      {message && <p className="message">{message}</p>}

      <div className="search-section">
        <input
          type="text"
          placeholder="Tìm theo mã giảm giá"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm</button>
        <button onClick={loadDiscounts}>Tải lại</button>
      </div>

      <form onSubmit={handleSubmit} className="discount-form">
        <input type="text" name="code" placeholder="Mã giảm giá" value={form.code} onChange={handleInputChange} required />
        <input type="text" name="name" placeholder="Tên chương trình" value={form.name} onChange={handleInputChange} required />
        <input type="date" name="start_date" value={form.start_date} onChange={handleInputChange} required />
        <input type="date" name="end_date" value={form.end_date} onChange={handleInputChange} required />
        <input type="number" name="discount_percent" placeholder="Phần trăm giảm" value={form.discount_percent} onChange={handleInputChange} required />
        <button type="submit">{editing ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

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
          {discounts.map(d => (
            <tr key={d.id_discount}>
              <td>{d.id_discount}</td>
              <td>{d.code}</td>
              <td>{d.name}</td>
              <td>{d.start_date?.slice(0, 10)}</td>
              <td>{d.end_date?.slice(0, 10)}</td>
              <td>{d.discount_percent}%</td>
              <td>
                <button onClick={() => handleEdit(d)}>Sửa</button>
                <button className="delete-btn" onClick={() => handleDelete(d.id_discount)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
