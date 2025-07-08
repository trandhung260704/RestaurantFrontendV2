import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './css/header.css';
import logo from './image/favicon-48x48.png';
import { 
  FaHome, 
  FaUtensils, 
  FaChartBar, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaUserPlus
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
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
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle" onClick={toggleDropdown} type="button">
                  <FaBars className="nav-icon" />
                  <span>Quản lý</span>
                </button>
                <ul className={`dropdown-menu${isDropdownOpen ? ' show' : ''}`}>  
                  <li>
                    <Link to="/food" className="dropdown-item" onClick={() => { closeDropdown(); closeMenu(); }}>
                      Món ăn
                    </Link>
                  </li>
                  <li>
                    <Link to="/ingredient" className="dropdown-item" onClick={() => { closeDropdown(); closeMenu(); }}>
                      Nguyên liệu
                    </Link>
                  </li>
                  <li>
                    <Link to="/discount" className="dropdown-item" onClick={() => { closeDropdown(); closeMenu(); }}>
                      Giảm giá
                    </Link>
                  </li>
                  <li>
                    <Link to="/bill" className="dropdown-item" onClick={() => { closeDropdown(); closeMenu(); }}>
                      Hóa đơn
                    </Link>
                  </li>
                  <li>
                    <Link to="/manageOrder" className="dropdown-item" onClick={() => { closeDropdown(); closeMenu(); }}>
                      Quản lý đơn hàng
                    </Link>
                  </li>
                  <li>
                    <Link to="/customer" className="dropdown-item" onClick={() => { closeDropdown(); closeMenu(); }}>
                      Khách hàng
                    </Link>
                  </li>
                  <li>
                    <Link to="/employee" className="dropdown-item" onClick={() => { closeDropdown(); closeMenu(); }}>
                      Nhân viên
                    </Link>
                  </li>
                </ul>
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