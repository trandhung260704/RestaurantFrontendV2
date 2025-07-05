import React, { useEffect, useState } from 'react';
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
  FaClipboardList
} from 'react-icons/fa';

// Đăng ký các components cần thiết cho Chart.js
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
  // State cho dữ liệu thống kê
  const [revenueData, setRevenueData] = useState({
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: []
  });
  
  const [customerData, setCustomerData] = useState({
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
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

  // State cho tổng quan
  const [overview, setOverview] = useState({
    totalRevenue: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalFoods: 0,
    totalIngredients: 0
  });

  // Tạo dữ liệu mẫu cho demo
  useEffect(() => {
    // Dữ liệu doanh thu theo ngày trong tuần
    const revenueDataset = {
      label: 'Doanh Thu (triệu VNĐ)',
      data: [12.5, 15.2, 18.7, 14.3, 20.1, 25.8, 22.4, 19.6],
      backgroundColor: 'rgba(102, 126, 234, 0.8)',
      borderColor: 'rgba(102, 126, 234, 1)',
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false,
    };

    // Dữ liệu khách hàng theo ngày
    const customerDataset = {
      label: 'Số Khách Hàng',
      data: [45, 52, 68, 48, 75, 89, 76, 62],
      backgroundColor: 'rgba(34, 197, 94, 0.8)',
      borderColor: 'rgba(34, 197, 94, 1)',
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false,
    };

    // Dữ liệu món ăn bán chạy
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

    // Dữ liệu nguyên liệu sử dụng
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

    // Dữ liệu giờ cao điểm
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

    // Cập nhật state
    setRevenueData({
      labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
      datasets: [revenueDataset]
    });

    setCustomerData({
      labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
      datasets: [customerDataset]
    });

    setFoodData({
      labels: topFoods.map(food => food.name),
      datasets: [foodDataset]
    });

    setIngredientData({
      labels: ingredients.map(ing => ing.name),
      datasets: [ingredientDataset]
    });

    setPeakHoursData({
      labels: hours,
      datasets: [peakHoursDataset]
    });

    // Cập nhật tổng quan
    setOverview({
      totalRevenue: 168.6, // triệu VNĐ
      totalCustomers: 515,
      totalOrders: 195,
      totalFoods: 611,
      totalIngredients: 475
    });

  }, []);

  // Cấu hình chung cho charts
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
            <p>{overview.totalRevenue} triệu VNĐ</p>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon customers">
            <FaUsers />
          </div>
          <div className="overview-content">
            <h3>Khách Hàng</h3>
            <p>{overview.totalCustomers} người</p>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon orders">
            <FaUtensils />
          </div>
          <div className="overview-content">
            <h3>Đơn Hàng</h3>
            <p>{overview.totalOrders} đơn</p>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon ingredients">
            <FaBoxOpen />
          </div>
          <div className="overview-content">
            <h3>Nguyên Liệu</h3>
            <p>{overview.totalIngredients} kg</p>
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
            <h3>Khách Hàng Theo Ngày</h3>
          </div>
          <div className="chart-container">
            <Bar data={customerData} options={chartOptions} />
          </div>
        </div>

        {/* Món ăn bán chạy */}
        <div className="chart-card">
          <div className="chart-header">
            <FaClipboardList style={{color: '#f59e0b'}} />
            <h3>Top 5 Món Ăn Bán Chạy</h3>
          </div>
          <div className="chart-container">
            <Doughnut data={foodData} options={pieOptions} />
          </div>
        </div>

        {/* Nguyên liệu sử dụng */}
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
