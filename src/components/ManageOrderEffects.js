// ManageOrder Effects Component
export class ManageOrderEffects {
  constructor() {
    this.init();
  }

  init() {
    this.addTableAnimations();
    this.addSearchEffects();
    this.addButtonEffects();
    this.addMessageEffects();
    this.addStatusEffects();
    this.addLogoEffects();
    this.addUserInfoEffects();
  }

  // Thêm hiệu ứng animation cho table rows
  addTableAnimations() {
    const rows = document.querySelectorAll('.order-row');
    
    rows.forEach((row, index) => {
      // Hiệu ứng entrance
      row.style.opacity = '0';
      row.style.transform = 'translateX(-30px)';
      
      setTimeout(() => {
        row.style.transition = 'all 0.6s ease';
        row.style.opacity = '1';
        row.style.transform = 'translateX(0)';
      }, index * 100);

      // Hiệu ứng hover
      row.addEventListener('mouseenter', () => {
        row.style.transform = 'translateX(8px) scale(1.01)';
        row.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
      });

      row.addEventListener('mouseleave', () => {
        row.style.transform = 'translateX(0) scale(1)';
        row.style.boxShadow = 'none';
      });
    });
  }

  // Thêm hiệu ứng cho search
  addSearchEffects() {
    const searchInput = document.querySelector('.search-input');
    const searchBox = document.querySelector('.search-box');
    
    if (!searchInput) return;

    // Hiệu ứng focus
    searchInput.addEventListener('focus', () => {
      searchBox.style.transform = 'scale(1.02)';
      searchBox.style.transition = 'transform 0.3s ease';
    });

    searchInput.addEventListener('blur', () => {
      searchBox.style.transform = 'scale(1)';
    });

    // Hiệu ứng typing
    searchInput.addEventListener('input', () => {
      if (searchInput.value.length > 0) {
        searchInput.style.borderColor = '#667eea';
        searchInput.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
      } else {
        searchInput.style.borderColor = '#e5e7eb';
        searchInput.style.boxShadow = 'none';
      }
    });
  }

  // Thêm hiệu ứng cho buttons
  addButtonEffects() {
    const buttons = document.querySelectorAll('.delete-btn, .back-btn, .pagination-btn');
    
    buttons.forEach(button => {
      // Hiệu ứng click
      button.addEventListener('click', (e) => {
        this.createRippleEffect(e, button);
      });

      // Hiệu ứng hover cho các button khác nhau
      if (button.classList.contains('delete-btn')) {
        button.addEventListener('mouseenter', () => {
          button.style.transform = 'scale(1.1)';
        });
        button.addEventListener('mouseleave', () => {
          button.style.transform = 'scale(1)';
        });
      }

      if (button.classList.contains('back-btn')) {
        button.addEventListener('mouseenter', () => {
          button.style.transform = 'translateY(-4px)';
        });
        button.addEventListener('mouseleave', () => {
          button.style.transform = 'translateY(0)';
        });
      }
    });
  }

  // Tạo hiệu ứng ripple
  createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Thêm hiệu ứng cho message
  addMessageEffects() {
    const messages = document.querySelectorAll('.manage-order-message');
    
    messages.forEach(message => {
      // Auto hide message after 5 seconds
      setTimeout(() => {
        message.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
          message.remove();
        }, 300);
      }, 5000);

      // Click to dismiss
      message.addEventListener('click', () => {
        message.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
          message.remove();
        }, 300);
      });
    });
  }

  // Thêm hiệu ứng cho status select
  addStatusEffects() {
    const statusSelects = document.querySelectorAll('.status-select');
    
    statusSelects.forEach(select => {
      select.addEventListener('change', () => {
        // Hiệu ứng khi thay đổi status
        select.style.animation = 'statusChange 0.3s ease';
        setTimeout(() => {
          select.style.animation = '';
        }, 300);

        // Thay đổi màu sắc dựa trên status
        select.className = `status-select ${this.getStatusClass(select.value)}`;
      });

      select.addEventListener('focus', () => {
        select.style.transform = 'scale(1.02)';
        select.style.transition = 'transform 0.3s ease';
      });

      select.addEventListener('blur', () => {
        select.style.transform = 'scale(1)';
      });
    });
  }

  // Lấy class cho status
  getStatusClass(status) {
    switch (status) {
      case 'PENDING':
        return 'status-pending';
      case 'IN_PROGRESS':
        return 'status-progress';
      case 'COMPLETED':
        return 'status-completed';
      default:
        return 'status-pending';
    }
  }

  // Thêm hiệu ứng cho logo
  addLogoEffects() {
    const logo = document.querySelector('.manage-order-logo');
    if (!logo) return;

    logo.addEventListener('mouseenter', () => {
      logo.style.animation = 'logoBounce 0.6s ease-in-out';
    });

    logo.addEventListener('animationend', () => {
      logo.style.animation = '';
    });
  }

  // Thêm hiệu ứng cho user info
  addUserInfoEffects() {
    const userInfo = document.querySelector('.user-info');
    if (!userInfo) return;

    userInfo.addEventListener('mouseenter', () => {
      userInfo.style.transform = 'scale(1.05)';
      userInfo.style.transition = 'transform 0.3s ease';
    });

    userInfo.addEventListener('mouseleave', () => {
      userInfo.style.transform = 'scale(1)';
    });
  }

  // Thêm hiệu ứng cho pagination
  addPaginationEffects() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    paginationBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Hiệu ứng loading cho table
        const tableContainer = document.querySelector('.orders-table-container');
        if (tableContainer) {
          tableContainer.style.opacity = '0.5';
          tableContainer.style.transition = 'opacity 0.3s ease';
          
          setTimeout(() => {
            tableContainer.style.opacity = '1';
          }, 500);
        }
      });
    });
  }

  // Thêm hiệu ứng cho empty state
  addEmptyStateEffects() {
    const emptyState = document.querySelector('.empty-state');
    if (!emptyState) return;

    const emptyIcon = emptyState.querySelector('.empty-icon');
    if (emptyIcon) {
      emptyIcon.style.animation = 'float 3s ease-in-out infinite';
    }
  }

  addTableHeaderEffects() {
    const tableHeader = document.querySelector('.orders-table thead');
    if (!tableHeader) return;

    tableHeader.style.opacity = '0';
    tableHeader.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      tableHeader.style.transition = 'all 0.6s ease';
      tableHeader.style.opacity = '1';
      tableHeader.style.transform = 'translateY(0)';
    }, 200);
  }

  addOrderIdEffects() {
    const orderIds = document.querySelectorAll('.order-id');
    
    orderIds.forEach(id => {
      id.addEventListener('mouseenter', () => {
        id.style.color = '#4f46e5';
        id.style.transform = 'scale(1.1)';
        id.style.transition = 'all 0.3s ease';
      });

      id.addEventListener('mouseleave', () => {
        id.style.color = '#667eea';
        id.style.transform = 'scale(1)';
      });
    });
  }

  addTotalPriceEffects() {
    const totalPrices = document.querySelectorAll('.order-total');
    
    totalPrices.forEach(price => {
      price.addEventListener('mouseenter', () => {
        price.style.transform = 'scale(1.1)';
        price.style.transition = 'transform 0.3s ease';
      });

      price.addEventListener('mouseleave', () => {
        price.style.transform = 'scale(1)';
      });
    });
  }
}

const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes logoBounce {
    0% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.2) rotate(10deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
  
  @keyframes statusChange {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .loading-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
    margin-right: 8px;
  }
`;
document.head.appendChild(style);

export default ManageOrderEffects; 