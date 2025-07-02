import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/ingredient.css';

export default function IngredientManager() {
  const API = 'http://localhost:8099/api/ingredients';
  const [ingredients, setIngredients] = useState([]);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    quantity: '',
    unit_price: '',
    unit: '',
    origin: ''
  });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(API, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      withCredentials: true,
    })
      .then(res => setIngredients(res.data))
      .catch(err => {
        console.error('Lỗi khi tải nguyên liệu:', err);
        if (err.response?.status === 403) {
          setMessage('Không có quyền truy cập nguyên liệu. Vui lòng đăng nhập lại hoặc dùng tài khoản phù hợp.');
        }
      });
  }, []);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${API}/search?name=${search}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,
      });
      setIngredients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dto = {
      name: formData.name,
      quantity: formData.quantity,
      unit_price: formData.unit_price,
      unit: formData.unit,
      origin: formData.origin
    };

    try {
      if (editing) {
        await axios.put(`${API}/${formData.id}`, dto, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          withCredentials: true,
        });
        setMessage('Cập nhật nguyên liệu thành công!');
      } else {
        await axios.post(API, dto, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          withCredentials: true,
        });
        setMessage('Thêm nguyên liệu thành công!');
      }

      setFormData({ id: null, name: '', quantity: '', unit_price: '', unit: '', origin: '' });
      setEditing(false);

      // Reload list
      const res = await axios.get(API, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true,
      });
      setIngredients(res.data);

    } catch (err) {
      setMessage('Lỗi khi lưu nguyên liệu.');
      console.error(err);
    }
  };

  const handleEdit = (ingredient) => {
    setFormData({
      id: ingredient.id_ingredient,
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit_price: ingredient.unit_price,
      unit: ingredient.unit,
      origin: ingredient.origin
    });
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá?')) {
      try {
        await axios.delete(`${API}/${id}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          withCredentials: true,
        });
        setMessage('Đã xoá nguyên liệu!');

        const res = await axios.get(API, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          withCredentials: true,
        });
        setIngredients(res.data);
      } catch (err) {
        setMessage('Lỗi khi xoá nguyên liệu.');
        console.error(err);
      }
    }
  };

  return (
    <div className="ingredient-container">
      <h2>Quản lý nguyên liệu</h2>

      {message && <p className="msg">{message}</p>}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm</button>
        <button onClick={() => window.location.reload()}>Tải lại</button>
      </div>

      <form onSubmit={handleSubmit} className="ingredient-form">
        <input name="name" placeholder="Tên" value={formData.name} onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Số lượng" value={formData.quantity} onChange={handleChange} required />
        <input name="unit_price" type="number" placeholder="Đơn giá" value={formData.unit_price} onChange={handleChange} required />
        <input name="unit" placeholder="Đơn vị (kg, gam...)" value={formData.unit} onChange={handleChange} required />
        <input name="origin" placeholder="Xuất xứ" value={formData.origin} onChange={handleChange} required />
        <button type="submit">{editing ? 'Cập nhật' : 'Thêm mới'}</button>
      </form>

      <table className="ingredient-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Đơn vị</th>
            <th>Xuất xứ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map(ing => (
            <tr key={ing.id_ingredient}>
              <td>{ing.id_ingredient}</td>
              <td>{ing.name}</td>
              <td>{ing.quantity}</td>
              <td>{ing.unit_price}</td>
              <td>{ing.unit}</td>
              <td>{ing.origin}</td>
              <td>
                <button onClick={() => handleEdit(ing)}>Sửa</button>
                <button onClick={() => handleDelete(ing.id_ingredient)} className="delete-btn">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
