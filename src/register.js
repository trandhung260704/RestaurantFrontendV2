import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from './image/favicon-48x48.png';
import './css/register.css';
import RegisterEffects from './components/RegisterEffects';
import { 
  FaArrowLeft, 
  FaEye, 
  FaEyeSlash, 
  FaUser, 
  FaLock, 
  FaEnvelope, 
  FaPhone, 
  FaCalendarAlt, 
  FaVenusMars,
  FaExclamationTriangle,
  FaCheckCircle
} from 'react-icons/fa';

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
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const effectsRef = useRef(null);

  useEffect(() => {
    effectsRef.current = new RegisterEffects();
    effectsRef.current.addRippleEffect();
    effectsRef.current.addMessageEffects();
    effectsRef.current.addFormRowEffects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Họ và tên không được để trống';
    } else if (formData.full_name.length < 2) {
      newErrors.full_name = 'Họ và tên phải có ít nhất 2 ký tự';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Số điện thoại không được để trống';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!formData.birthday) {
      newErrors.birthday = 'Ngày sinh không được để trống';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Chuyển birthday sang dạng YYYY-MM-DD 00:00:00
      const formattedBirthday = formData.birthday
        ? `${formData.birthday} 00:00:00`
        : '';

      const submitData = {
        ...formData,
        birthday: formattedBirthday,
      };

      await axios.post("http://localhost:8099/api/users/register", submitData);
      setMessage("Đăng ký thành công! Đang chuyển đến trang đăng nhập...");
      
      // Reset form
      setFormData({
        full_name: '',
        email: '',
        password: '',
        phone: '',
        birthday: '',
        gender: 'Nam',
      });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      const msg = error.response?.data || "Đăng ký thất bại. Vui lòng thử lại.";
      setMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-background">
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

      <div className="register-card">
        <div className="register-header">
          <div className="logo-section">
            <img src={logo} alt="Restaurant Logo" className="register-logo" />
            <div className="logo-text">
              <h1>Restaurant</h1>
              <span>Eternity</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <h2>Đăng ký tài khoản</h2>
          <p className="register-subtitle">Tham gia hệ thống quản lý nhà hàng</p>
          
          {message && (
            <div className={`message ${message.includes('thành công') ? 'success' : 'error'}`}>
              {message.includes('thành công') ? (
                <FaCheckCircle className="message-icon" />
              ) : (
                <FaExclamationTriangle className="message-icon" />
              )}
              <span>{message}</span>
            </div>
          )}

          <div className="form-section">
            <h3>Thông tin cá nhân</h3>
            
            <div className="form-group">
              <label>Họ và tên</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="full_name"
                  placeholder="Nhập họ và tên đầy đủ"
                  value={formData.full_name}
                  onChange={handleChange}
                  className={`form-input ${errors.full_name ? 'error' : ''}`}
                  required
                />
              </div>
              {errors.full_name && <div className="field-error">{errors.full_name}</div>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  required
                />
              </div>
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label>Mật khẩu</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Tối thiểu 6 ký tự"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <div className="field-error">{errors.password}</div>}
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <div className="input-wrapper">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="0123456789"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  required
                />
              </div>
              {errors.phone && <div className="field-error">{errors.phone}</div>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Ngày sinh</label>
                <div className="input-wrapper">
                  <FaCalendarAlt className="input-icon" />
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className={`form-input ${errors.birthday ? 'error' : ''}`}
                    required
                  />
                </div>
                {errors.birthday && <div className="field-error">{errors.birthday}</div>}
              </div>

              <div className="form-group">
                <label>Giới tính</label>
                <div className="input-wrapper">
                  <FaVenusMars className="input-icon" />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className={`register-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Đang đăng ký...
                </>
              ) : (
                'Đăng ký tài khoản'
              )}
            </button>
          </div>

          <div className="auth-links">
            <p>Bạn đã có tài khoản? 
              <Link to="/login" className="login-link">
                <strong>Đăng nhập ngay</strong>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
