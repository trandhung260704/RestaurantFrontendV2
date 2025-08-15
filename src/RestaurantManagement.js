import React, { useState, useEffect } from 'react';
import './css/restaurantManagement.css';

const RestaurantManagement = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [restaurantInfo, setRestaurantInfo] = useState({
        name: 'Nhà Hàng ABC',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        phone: '0123456789',
        email: 'info@nhahangabc.com',
        openingHours: '07:00 - 22:00',
        status: 'OPEN'
    });
    const [statistics, setStatistics] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        totalCustomers: 0,
        totalEmployees: 0,
        popularFoods: [],
        recentOrders: []
    });

    useEffect(() => {
        // Fetch restaurant data
        fetchRestaurantData();
    }, []);

    const fetchRestaurantData = async () => {
        try {
            // Mock data - replace with actual API calls
            setStatistics({
                totalOrders: 156,
                totalRevenue: 25000000,
                totalCustomers: 89,
                totalEmployees: 12,
                popularFoods: [
                    { name: 'Phở Bò', sales: 45 },
                    { name: 'Cơm Tấm', sales: 38 },
                    { name: 'Bún Bò', sales: 32 },
                    { name: 'Gỏi Cuốn', sales: 28 }
                ],
                recentOrders: [
                    { id: 1, customer: 'Nguyễn Văn A', total: 150000, status: 'COMPLETED' },
                    { id: 2, customer: 'Trần Thị B', total: 200000, status: 'IN_PROGRESS' },
                    { id: 3, customer: 'Lê Văn C', total: 180000, status: 'PENDING' }
                ]
            });
        } catch (error) {
            console.error('Error fetching restaurant data:', error);
        }
    };

    const renderDashboard = () => (
        <div className="dashboard-container">
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Tổng Đơn Hàng</h3>
                    <p className="stat-number">{statistics.totalOrders}</p>
                    <span className="stat-label">Hôm nay</span>
                </div>
                <div className="stat-card">
                    <h3>Doanh Thu</h3>
                    <p className="stat-number">{statistics.totalRevenue.toLocaleString('vi-VN')} VNĐ</p>
                    <span className="stat-label">Tháng này</span>
                </div>
                <div className="stat-card">
                    <h3>Khách Hàng</h3>
                    <p className="stat-number">{statistics.totalCustomers}</p>
                    <span className="stat-label">Tổng số</span>
                </div>
                <div className="stat-card">
                    <h3>Nhân Viên</h3>
                    <p className="stat-number">{statistics.totalEmployees}</p>
                    <span className="stat-label">Đang làm việc</span>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="popular-foods">
                    <h3>Món Ăn Bán Chạy</h3>
                    <div className="food-list">
                        {statistics.popularFoods.map((food, index) => (
                            <div key={index} className="food-item">
                                <span className="food-name">{food.name}</span>
                                <span className="food-sales">{food.sales} đơn</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="recent-orders">
                    <h3>Đơn Hàng Gần Đây</h3>
                    <div className="order-list">
                        {statistics.recentOrders.map((order) => (
                            <div key={order.id} className="order-item">
                                <div className="order-info">
                                    <span className="order-id">#{order.id}</span>
                                    <span className="customer-name">{order.customer}</span>
                                    <span className="order-total">{order.total.toLocaleString('vi-VN')} VNĐ</span>
                                </div>
                                <span className={`order-status status-${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderMenuManagement = () => (
        <div className="menu-management">
            <div className="section-header">
                <h2>Quản Lý Menu</h2>
                <button className="btn-primary">Thêm Món Mới</button>
            </div>
            <div className="menu-categories">
                <button className="category-btn active">Tất cả</button>
                <button className="category-btn">Món chính</button>
                <button className="category-btn">Món khai vị</button>
                <button className="category-btn">Món tráng miệng</button>
                <button className="category-btn">Đồ uống</button>
            </div>
            <div className="menu-grid">
                {/* Menu items will be rendered here */}
            </div>
        </div>
    );

    const renderOrderManagement = () => (
        <div className="order-management">
            <div className="section-header">
                <h2>Quản Lý Đơn Hàng</h2>
                <div className="order-filters">
                    <select className="filter-select">
                        <option value="">Tất cả trạng thái</option>
                        <option value="PENDING">Chờ xử lý</option>
                        <option value="IN_PROGRESS">Đang chế biến</option>
                        <option value="COMPLETED">Hoàn thành</option>
                    </select>
                    <input type="date" className="date-filter" />
                </div>
            </div>
            <div className="order-list-container">
                {/* Order list will be rendered here */}
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className="restaurant-settings">
            <h2>Cài Đặt Nhà Hàng</h2>
            <div className="settings-form">
                <div className="form-group">
                    <label>Tên nhà hàng</label>
                    <input 
                        type="text" 
                        value={restaurantInfo.name}
                        onChange={(e) => setRestaurantInfo({...restaurantInfo, name: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label>Địa chỉ</label>
                    <textarea 
                        value={restaurantInfo.address}
                        onChange={(e) => setRestaurantInfo({...restaurantInfo, address: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label>Số điện thoại</label>
                    <input 
                        type="tel" 
                        value={restaurantInfo.phone}
                        onChange={(e) => setRestaurantInfo({...restaurantInfo, phone: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={restaurantInfo.email}
                        onChange={(e) => setRestaurantInfo({...restaurantInfo, email: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label>Giờ mở cửa</label>
                    <input 
                        type="text" 
                        value={restaurantInfo.openingHours}
                        onChange={(e) => setRestaurantInfo({...restaurantInfo, openingHours: e.target.value})}
                    />
                </div>
                <button className="btn-primary">Lưu Thay Đổi</button>
            </div>
        </div>
    );

    return (
        <div className="restaurant-management">
            <div className="management-header">
                <h1>Quản Lý Nhà Hàng</h1>
                <div className="restaurant-status">
                    <span className={`status-indicator ${restaurantInfo.status.toLowerCase()}`}>
                        {restaurantInfo.status === 'OPEN' ? 'Đang mở cửa' : 'Đã đóng cửa'}
                    </span>
                </div>
            </div>

            <div className="management-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                >
                    Dashboard
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
                    onClick={() => setActiveTab('menu')}
                >
                    Quản Lý Menu
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    Quản Lý Đơn Hàng
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                >
                    Cài Đặt
                </button>
            </div>

            <div className="management-content">
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'menu' && renderMenuManagement()}
                {activeTab === 'orders' && renderOrderManagement()}
                {activeTab === 'settings' && renderSettings()}
            </div>
        </div>
    );
};

export default RestaurantManagement; 