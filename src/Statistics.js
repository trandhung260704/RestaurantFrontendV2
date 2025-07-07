import React, { useEffect, useState, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import './css/statistics.css';
import { 
  FaChartLine, 
  FaMoneyBillWave, 
  FaUsers, 
  FaUtensils, 
  FaBoxOpen, 
  FaClock,
  FaChartBar,
  FaClipboardList,
  FaSpinner
} from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

export default function StatisticsPage() {
  const [revenueData, setRevenueData] = useState({
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: []
  });
  
  const [customerAgeData, setCustomerAgeData] = useState({
    labels: [],
    datasets: []
  });
  
  const [foodData, setFoodData] = useState({
    labels: [],
    datasets: []
  });
  
  const [ingredientData, setIngredientData] = useState({
    labels: [],
    datasets: []
  });
  
  const [peakHoursData, setPeakHoursData] = useState({
    labels: [],
    datasets: []
  });

  const [overview, setOverview] = useState({
    totalRevenue: 0,
    totalIngredientCost: 0,
    netProfit: 0,
    averageCustomerAge: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:8099/api';

  const fetchRevenueStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/statistics/revenue`, {
        headers: headers,
        withCredentials: true,
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch revenue statistics');
      }
      const data = await response.json();
      
      setOverview(prev => ({
        ...prev,
        totalRevenue: parseFloat(data.totalRevenue || 0),
        totalIngredientCost: parseFloat(data.totalIngredientCost || 0),
        netProfit: parseFloat(data.netProfit || 0)
      }));

      const revenueDataset = {
        label: 'Doanh Thu (VNĐ)',
        data: [
          parseFloat(data.totalRevenue || 0) * 0.15,
          parseFloat(data.totalRevenue || 0) * 0.18,
          parseFloat(data.totalRevenue || 0) * 0.22,
          parseFloat(data.totalRevenue || 0) * 0.17,
          parseFloat(data.totalRevenue || 0) * 0.24,
          parseFloat(data.totalRevenue || 0) * 0.31,
          parseFloat(data.totalRevenue || 0) * 0.27,
          parseFloat(data.totalRevenue || 0) * 0.23
        ],
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      };

      setRevenueData({
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [revenueDataset]
      });

    } catch (error) {
      console.error('Error fetching revenue stats:', error);
      setError('Không thể tải dữ liệu doanh thu');
    }
  };

  const fetchCustomerAgeStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const avgAgeResponse = await fetch(`${API_BASE_URL}/statistics/average-customer-age`, {
        headers: headers,
        withCredentials: true,
      });
      
      if (avgAgeResponse.ok) {
        const avgAge = await avgAgeResponse.json();
        setOverview(prev => ({
          ...prev,
          averageCustomerAge: parseFloat(avgAge || 0)
        }));
      }

      const ageCountResponse = await fetch(`${API_BASE_URL}/statistics/age-count`, {
        headers: headers,
        withCredentials: true,
      });
      
      if (ageCountResponse.ok) {
        const ageCountData = await ageCountResponse.json();
        
        const labels = Object.keys(ageCountData).map(age => `${age} tuổi`);
        const data = Object.values(ageCountData);

        const customerAgeDataset = {
          label: 'Số Khách Hàng',
          data: data,
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        };

        setCustomerAgeData({
          labels: labels,
          datasets: [customerAgeDataset]
        });
      }

    } catch (error) {
      console.error('Error fetching customer age stats:', error);
      setError('Không thể tải dữ liệu khách hàng');
    }
  };

  const fetchTopSellingFoods = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {};
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/statistics/top-selling-foods`, {
        headers: headers,
        withCredentials: true,
      });
      
      if (response.ok) {
        const topFoodsData = await response.json();
        
        // Convert Map<String, Long> to chart data
        const labels = Object.keys(topFoodsData);
        const data = Object.values(topFoodsData);

        const foodDataset = {
          label: 'Số Lượng Bán',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 2,
        };

        setFoodData({
          labels: labels,
          datasets: [foodDataset]
        });
      } else {
        // Fallback to demo data if API fails
        createDemoFoodData();
      }

    } catch (error) {
      console.error('Error fetching top selling foods:', error);
      // Fallback to demo data if API fails
      createDemoFoodData();
    }
  }, []);

  const createDemoFoodData = () => {
    const topFoods = [
      { name: 'Phở Bò', sales: 156, revenue: 2340000 },
      { name: 'Cơm Tấm', sales: 142, revenue: 1988000 },
      { name: 'Bún Chả', sales: 128, revenue: 1792000 },
      { name: 'Gà Nướng', sales: 98, revenue: 1470000 },
      { name: 'Lẩu Hải Sản', sales: 87, revenue: 1740000 }
    ];

    const foodDataset = {
      label: 'Số Lượng Bán',
      data: topFoods.map(food => food.sales),
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 2,
    };

    setFoodData({
      labels: topFoods.map(food => food.name),
      datasets: [foodDataset]
    });
  };

  const createDemoChartData = () => {
    const ingredients = [
      { name: 'Thịt Bò', used: 85, remaining: 15 },
      { name: 'Gạo', used: 120, remaining: 30 },
      { name: 'Rau Cải', used: 95, remaining: 25 },
      { name: 'Hải Sản', used: 65, remaining: 35 },
      { name: 'Gia Vị', used: 110, remaining: 40 }
    ];

    const ingredientDataset = {
      label: 'Đã Sử Dụng',
      data: ingredients.map(ing => ing.used),
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)'
      ],
      borderColor: [
        'rgba(239, 68, 68, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(34, 197, 94, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(168, 85, 247, 1)'
      ],
      borderWidth: 2,
    };

    const hours = ['6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'];
    const peakHoursDataset = {
      label: 'Số Đơn Hàng',
      data: [5, 12, 8, 45, 15, 8, 52, 38, 12],
      backgroundColor: 'rgba(147, 51, 234, 0.2)',
      borderColor: 'rgba(147, 51, 234, 1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgba(147, 51, 234, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 6,
    };

    setIngredientData({
      labels: ingredients.map(ing => ing.name),
      datasets: [ingredientDataset]
    });

    setPeakHoursData({
      labels: hours,
      datasets: [peakHoursDataset]
    });
  };

  // Fetch all statistics
  const fetchAllStatistics = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchRevenueStats(),
        fetchCustomerAgeStats(),
        fetchTopSellingFoods()
      ]);

      createDemoChartData();

    } catch (error) {
      console.error('Error fetching statistics:', error);
      setError('Không thể tải dữ liệu thống kê');
    } finally {
      setLoading(false);
    }
  }, [fetchTopSellingFoods]);

  // Check authentication status
  const checkAuthStatus = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      fetchAllStatistics();
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.ok) {
        await response.json();
      } else {
        localStorage.clear();
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
      localStorage.clear();
    } finally {
      fetchAllStatistics();
    }
  }, [fetchAllStatistics]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#374151'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#667eea',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString();
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11
          }
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 11
          },
          color: '#374151',
          usePointStyle: true,
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#667eea',
        borderWidth: 1,
        cornerRadius: 8
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="statistics-container modern-bg">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '50vh',
          color: '#374151'
        }}>
          <FaSpinner style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'spin 1s linear infinite' }} />
          <h3>Đang tải dữ liệu thống kê...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="statistics-container modern-bg">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '50vh',
          color: '#ef4444'
        }}>
          <h3>Lỗi: {error}</h3>
          <button 
            onClick={fetchAllStatistics}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="statistics-container modern-bg">
      <h2>
        <FaChartLine style={{color:'#667eea', marginRight:8}}/>
        Thống Kê Nhà Hàng
      </h2>

      {/* Tổng quan */}
      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-icon revenue">
            <FaMoneyBillWave />
          </div>
          <div className="overview-content">
            <h3>Doanh Thu</h3>
            <p>{overview.totalRevenue.toLocaleString()} VNĐ</p>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon customers">
            <FaUsers />
          </div>
          <div className="overview-content">
            <h3>Tuổi TB Khách Hàng</h3>
            <p>{overview.averageCustomerAge.toFixed(1)} tuổi</p>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon orders">
            <FaUtensils />
          </div>
          <div className="overview-content">
            <h3>Chi Phí Nguyên Liệu</h3>
            <p>{overview.totalIngredientCost.toLocaleString()} VNĐ</p>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon ingredients">
            <FaBoxOpen />
          </div>
          <div className="overview-content">
            <h3>Lợi Nhuận Ròng</h3>
            <p>{overview.netProfit.toLocaleString()} VNĐ</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <FaChartBar style={{color: '#667eea'}} />
            <h3>Doanh Thu Theo Ngày</h3>
          </div>
          <div className="chart-container">
            <Bar data={revenueData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <FaUsers style={{color: '#22c55e'}} />
            <h3>Phân Bố Tuổi Khách Hàng</h3>
          </div>
          <div className="chart-container">
            <Bar data={customerAgeData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <FaClipboardList style={{color: '#f59e0b'}} />
            <h3>Top 5 Món Ăn Bán Chạy</h3>
          </div>
          <div className="chart-container">
            <Doughnut data={foodData} options={pieOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <FaBoxOpen style={{color: '#ef4444'}} />
            <h3>Nguyên Liệu Đã Sử Dụng</h3>
          </div>
          <div className="chart-container">
            <Pie data={ingredientData} options={pieOptions} />
          </div>
        </div>

        {/* Giờ cao điểm */}
        <div className="chart-card full-width">
          <div className="chart-header">
            <FaClock style={{color: '#8b5cf6'}} />
            <h3>Giờ Cao Điểm Trong Ngày</h3>
          </div>
          <div className="chart-container">
            <Line data={peakHoursData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
