import React from 'react';

const SimpleMap = ({ address, restaurantName }) => {
  const encodedAddress = encodeURIComponent(address);
  
  const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <div className="simple-map-container">
      <div className="map-placeholder">
        <div className="map-content">
          <div className="map-icon">🗺️</div>
          <h3>{restaurantName}</h3>
          <p className="address">{address}</p>
          <div className="map-actions">
            <a 
              href={fallbackUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="map-link primary"
            >
              Xem trên Google Maps →
            </a>
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="map-link secondary"
            >
              Chỉ đường →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleMap; 