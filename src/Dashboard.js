import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/dashboard.css';
import SimpleMap from './components/SimpleMap';
import { 
  FaPhone, 
  FaEnvelope, 
  FaFacebook, 
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaArrowRight,
  FaUtensils,
  FaLeaf,
  FaFire
} from 'react-icons/fa';

export default function Dashboard() {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        fetchFoods();
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
          await response.json();
          setIsAuthenticated(true);
        } else {
          localStorage.clear();
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
        localStorage.clear();
        setIsAuthenticated(false);
      } finally {
        fetchFoods();
      }
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8099/api/restaurant/info');
        setRestaurantInfo(response.data);
      } catch (error) {
        console.error('Lỗi khi tải thông tin nhà hàng:', error);
      }
    };
    
    fetchRestaurantInfo();
  }, []);

    // Fetch foods for menu display
  const fetchFoods = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? {
        Authorization: "Bearer " + token,
      } : {};
      
      const response = await axios.get('http://localhost:8099/api/foods', {
        params: { page: 0, size: 8 },
        headers,
        withCredentials: true,
      });
      setFoods(response.data.content || []);
    } catch (error) {
      console.error('Lỗi khi tải menu:', error);
      // Fallback data if API fails
      setFoods([
        { id_food: 1, name: 'Phở Bò', price: 45000, category: 'Món chính' },
        { id_food: 2, name: 'Cơm Tấm', price: 35000, category: 'Món chính' },
        { id_food: 3, name: 'Bún Chả', price: 40000, category: 'Món chính' },
        { id_food: 4, name: 'Gà Nướng', price: 55000, category: 'Món chính' },
        { id_food: 5, name: 'Lẩu Hải Sản', price: 120000, category: 'Lẩu' },
        { id_food: 6, name: 'Chè Ba Màu', price: 15000, category: 'Tráng miệng' },
        { id_food: 7, name: 'Cà Phê Sữa Đá', price: 12000, category: 'Đồ uống' },
        { id_food: 8, name: 'Trà Đá', price: 5000, category: 'Đồ uống' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  const features = [
    {
      icon: <FaUtensils />,
      title: 'Món Ăn Truyền Thống',
      description: 'Hương vị Việt Nam đích thực với các món ăn được chế biến theo công thức gia truyền'
    },
    {
      icon: <FaLeaf />,
      title: 'Nguyên Liệu Tươi',
      description: 'Sử dụng 100% nguyên liệu tươi ngon, được chọn lọc kỹ lưỡng mỗi ngày'
    },
    {
      icon: <FaFire />,
      title: 'Chế Biến Tại Chỗ',
      description: 'Mọi món ăn đều được chế biến tươi ngay tại nhà bếp của chúng tôi'
    }
  ];

  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'Restaurant Eternity',
    address: '1 Võ Văn Ngân, Thủ Đức, TP.HCM',
    phone: '0938 196 822',
    email: 'trandhungeternity@restaurant.com',
    facebook: 'Restaurant Eternity',
    openingHours: '7:00 - 22:00 (Thứ 2 - Chủ nhật)',
    latitude: 10.8231,
    longitude: 106.6297
  });

  const contactInfo = {
    phone: restaurantInfo.phone,
    email: restaurantInfo.email,
    facebook: restaurantInfo.facebook,
    address: restaurantInfo.address,
    hours: restaurantInfo.openingHours
  };

  return (
    <div className="dashboard">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Chào mừng đến với <span className="highlight">Restaurant Eternity</span>
          </h1>
          <p className="hero-subtitle">
            Nơi hội tụ những hương vị truyền thống Việt Nam với không gian ấm cúng, 
            phục vụ những món ăn ngon nhất cho quý khách
          </p>
          <div className="hero-buttons">
            {isAuthenticated ? (
              <>
                <Link to="/order" className="btn btn-primary">
                  Đặt món ngay <FaArrowRight />
                </Link>
                <button className="btn btn-secondary">
                  Xem menu đầy đủ
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">
                  Đăng nhập <FaArrowRight />
                </Link>
                <Link to="/register" className="btn btn-secondary">
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-overlay"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Tại sao chọn chúng tôi?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="menu-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Menu Nổi Bật</h2>
            <p className="section-subtitle">
              Khám phá những món ăn được yêu thích nhất của chúng tôi
            </p>
          </div>
          
          {isLoading ? (
            <div className="loading-menu">
              <div className="loading-spinner"></div>
              <p>Đang tải menu...</p>
            </div>
          ) : (
            <div className="menu-grid">
              {foods.map((food) => (
                <div key={food.id_food} className="menu-item">
                  <div className="menu-item-content">
                    <h3 className="menu-item-name">{food.name}</h3>
                    <p className="menu-item-category">{food.category}</p>
                    <div className="menu-item-price">
                      {food.price.toLocaleString()}đ
                    </div>
                    <div className="menu-item-rating">
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                      <span className="rating-text">5.0</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="menu-cta">
            <Link to="/order" className="btn btn-primary">
              Xem toàn bộ menu <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2 className="section-title">Liên Hệ Với Chúng Tôi</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div className="contact-details">
                  <h3>Điện thoại</h3>
                  <p>{contactInfo.phone}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>{contactInfo.email}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaFacebook />
                </div>
                <div className="contact-details">
                  <h3>Facebook</h3>
                  <p>{contactInfo.facebook}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-details">
                  <h3>Địa chỉ</h3>
                  <p>{contactInfo.address}</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaClock />
                </div>
                <div className="contact-details">
                  <h3>Giờ mở cửa</h3>
                  <p>{contactInfo.hours}</p>
                </div>
              </div>
            </div>

            <div className="contact-map">
              <SimpleMap 
                address={restaurantInfo.address}
                restaurantName={restaurantInfo.name}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Restaurant Eternity</h3>
              <p>Hạnh phúc là khi được thưởng thức bữa ăn ngon với người thương.</p>
            </div>
            <div className="footer-section">
              <h3>Liên kết nhanh</h3>
              <ul>
                <li><Link to="/">Trang chủ</Link></li>
                <li><Link to="/order">Đặt món</Link></li>
                <li><Link to="/profile">Tài khoản</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Theo dõi chúng tôi</h3>
              <div className="social-links">
                <button className="social-link" onClick={() => window.open('https://www.facebook.com/trandinhhung2607', '_blank')}>
                  <FaFacebook />
                </button>
                <button className="social-link" onClick={() => window.open('mailto:trandhungeternity@gmail.com', '_blank')}>
                  <FaEnvelope />
                </button>
                <button className="social-link" onClick={() => window.open('tel:0938196822', '_blank')}>
                  <FaPhone />
                </button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Restaurant Eternity. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 