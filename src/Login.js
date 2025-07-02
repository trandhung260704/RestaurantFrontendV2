import React, { useState } from 'react';
import axios from 'axios';
import './css/login.css';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:8099/api/login', loginData);
      const { token, full_name, role } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('full_name', full_name);

      navigate('/');
    } catch (err) {
      setError(err.response?.data || 'Đăng nhập thất bại');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:8099/api/auth/google/callback', {
        token: credentialResponse.credential
      });

      const { token, full_name, role } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('full_name', full_name);

      navigate('/');
    } catch (err) {
      console.error('Google login failed:', err);
      setError('Đăng nhập Google thất bại');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Đăng nhập</h2>
        {error && <p className="login-error">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Email hoặc Số điện thoại"
          value={loginData.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={loginData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Đăng nhập</button>

        <p className="auth-link">
          Bạn chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>

        <div className="google-login-section">
          <p>Hoặc đăng nhập bằng Google:</p>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Đăng nhập Google thất bại')}
          />
        </div>
      </form>
    </div>
  );
}
