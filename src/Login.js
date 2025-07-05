import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './css/login.css';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import logo from './image/favicon-48x48.png';
import LoginEffects from './components/LoginEffects';
import { FaArrowLeft, FaEye, FaEyeSlash, FaUser, FaLock, FaExclamationTriangle } from 'react-icons/fa';

export default function Login() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const effectsRef = useRef(null);

  useEffect(() => {
    // Khởi tạo effects sau khi component mount
    effectsRef.current = new LoginEffects();
    effectsRef.current.addRippleEffect();
    effectsRef.current.addGoogleLoginEffect();
  }, []);

  const handleChange = (e) => {
    setLoginData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const res = await axios.post('http://localhost:8099/api/login', loginData);
      const { token, full_name, role } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('full_name', full_name);

      // Hiệu ứng chuyển trang
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setError(err.response?.data || 'Đăng nhập thất bại');
      setIsLoading(false);
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
      {/* Background với gradient tím */}
      <div className="login-background">
        <div className="gradient-overlay"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      {/* Button quay về trang chủ */}
      <Link to="/" className="back-home-btn">
        <FaArrowLeft />
        <span>Về trang chủ</span>
      </Link>
      
      <div className="login-card">
        <div className="login-header">
          <div className="logo-section">
            <img src={logo} alt="Restaurant Logo" className="login-logo" />
            <div className="logo-text">
              <h1>Restaurant</h1>
              <span>Eternity</span>
            </div>
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Đăng nhập</h2>
          <p className="login-subtitle">Chào mừng bạn trở lại!</p>
          
          {error && (
            <div className="error-message">
              <FaExclamationTriangle className="error-icon" />
              <span>{error}</span>
            </div>
          )}

          <div className="input-group">
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Email hoặc Số điện thoại"
                value={loginData.username}
                onChange={handleChange}
                required
                className="login-input"
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mật khẩu"
                value={loginData.password}
                onChange={handleChange}
                required
                className="login-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Đang đăng nhập...
              </>
            ) : (
              'Đăng nhập'
            )}
          </button>

          <div className="divider">
            <span>hoặc</span>
          </div>

          <div className="google-login-section">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Đăng nhập Google thất bại')}
              theme="filled_blue"
              size="large"
              text="continue_with"
              shape="rectangular"
            />
          </div>

          <div className="auth-links">
            <Link to="/register" className="register-link">
              Bạn chưa có tài khoản? <strong>Đăng ký ngay</strong>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
