import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Dashboard from './Dashboard';
import RestaurantManagement from './RestaurantManagement';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'restaurant-management':
        return <RestaurantManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Header onPageChange={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
    </>
  );
}
