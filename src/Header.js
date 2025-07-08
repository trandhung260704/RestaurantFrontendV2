import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './css/header.css';
import logo from './image/favicon-48x48.png';
import { 
  FaHome, 
  FaUtensils, 
  FaUsers, 
  FaChartBar, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaUserPlus,
  FaDropbox
} from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    role: 'CUSTOMER',
    fullName: 'Guest'
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setUserInfo({
        role: 'CUSTOMER',
        fullName: 'Guest'
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8099/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.ok) {
        const userData = await response.json();
        setIsAuthenticated(true);
        setUserInfo({
          role: userData.role || 'CUSTOMER',
          fullName: userData.full_name || 'User'
        });
      } else {
        localStorage.clear();
        setIsAuthenticated(false);
        setUserInfo({
          role: 'CUSTOMER',
          fullName: 'Guest'
        });
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
      localStorage.clear();
      setIsAuthenticated(false);
      setUserInfo({
        role: 'CUSTOMER',
        fullName: 'Guest'
      });
    }
  };

  const isManager = userInfo.role === 'MANAGER';
  const isEmployee = userInfo.role === 'EMPLOYEE';
  const isCustomer = userInfo.role === 'CUSTOMER';

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('http://localhost:8099/api/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    } finally {
      localStorage.clear();
      navigate('/login');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Restaurant Logo" className="header-logo" />
            <div className="logo-text">
              <h1>Restaurant</h1>
              <span>Eternity</span>
            </div>
          </Link>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <FaHome className="nav-icon" />
                <span>Trang chủ</span>
              </Link>
            </li>

            {(isManager || isEmployee || isCustomer) && (
              <li className="nav-item">
                <Link 
                  to="/order" 
                  className={`nav-link ${isActive('/order') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  <FaUtensils className="nav-icon" />
                  <span>Đặt món</span>
                </Link>
              </li>
            )}

            {(isManager || isEmployee) && (
              <li className="nav-item">
                <Link 
                  to="/ingredient" 
                  className={`nav-link ${isActive('/ingredient') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  <FaDropbox className="nav-icon" />
                  <span>Nguyên liệu</span>
                </Link>
              </li>
            )}

            {(isManager || isEmployee) && (
              <li className="nav-item">
                <Link 
                  to="/food" 
                  className={`nav-link ${isActive('/food') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  <FaUtensils className="nav-icon" />
                  <span>Món ăn</span>
                </Link>
              </li>
            )}

            {isManager && (
              <li className="nav-item">
                <Link 
                  to="/statistics" 
                  className={`nav-link ${isActive('/statistics') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  <FaChartBar className="nav-icon" />
                  <span>Thống kê</span>
                </Link>
              </li>
            )}

            {(isManager || isEmployee) && (
              <li className="nav-item">
                <Link 
                  to="/customer" 
                  className={`nav-link ${isActive('/customer') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  <FaUsers className="nav-icon" />
                  <span>Khách hàng</span>
                </Link>
              </li>
            )}

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link 
                    to="/profile" 
                    className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    <div className="user-avatar-small">
                      <span>{userInfo.fullName.charAt(0).toUpperCase()}</span>
                    </div>
                    <span>{userInfo.fullName}</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <button 
                    onClick={handleLogout}
                    className="nav-link logout-btn"
                  >
                    <FaSignOutAlt className="nav-icon" />
                    <span>Đăng xuất</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link 
                    to="/login" 
                    className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    <FaSignInAlt className="nav-icon" />
                    <span>Đăng nhập</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link 
                    to="/register" 
                    className={`nav-link ${isActive('/register') ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    <FaUserPlus className="nav-icon" />
                    <span>Đăng ký</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
} 