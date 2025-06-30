import React, { useState } from 'react';
import axios from 'axios';
import './register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    birthday: '',
    gender: 'Nam',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8099/api/users/register", formData);
      setMessage("Đăng ký thành công!");
      setFormData({
        full_name: '',
        email: '',
        password: '',
        phone: '',
        birthday: '',
        gender: 'Nam',
      });
    } catch (error) {
      const msg = error.response?.data || "Đăng ký thất bại. Vui lòng thử lại.";
      setMessage(msg);
    }
  };

  return (
      <div className="register-background">
        <div className="register-container">
            <h2>Đăng ký tài khoản</h2>
            {message && <p className="register-message">{message}</p>}
            <form onSubmit={handleSubmit} className="register-form">
                <input
                type="text"
                name="full_name"
                placeholder="Họ và tên"
                value={formData.full_name}
                onChange={handleChange}
                required
                />

                <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                />

                <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                />

                <input
                type="text"
                name="phone"
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={handleChange}
                required
                />

                <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                required
                />

                <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
                </select>

                <button type="submit">Đăng ký</button>

                <p className="auth-link">
                    Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
                </p>

            </form>
        </div>
    </div>
  );
}
