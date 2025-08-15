export class OrderEffects {
  constructor() {
    this.init();
  }

  init() {
    this.addCardAnimations();
    this.addSearchEffects();
    this.addButtonEffects();
    this.addMessageEffects();
  }

  // Thêm hiệu ứng animation cho food cards
  addCardAnimations() {
    const cards = document.querySelectorAll('.food-card');
    
    cards.forEach((card, index) => {
      // Hiệu ứng entrance
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);

      // Hiệu ứng hover
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.2)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
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
    const buttons = document.querySelectorAll('.add-food-btn, .submit-btn, .back-btn, .remove-btn, .pagination-btn');
    
    buttons.forEach(button => {
      // Hiệu ứng click
      button.addEventListener('click', (e) => {
        this.createRippleEffect(e, button);
      });

      // Hiệu ứng hover cho các button khác nhau
      if (button.classList.contains('add-food-btn')) {
        button.addEventListener('mouseenter', () => {
          button.style.transform = 'scale(1.1)';
        });
        button.addEventListener('mouseleave', () => {
          button.style.transform = 'scale(1)';
        });
      }

      if (button.classList.contains('submit-btn')) {
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
    const messages = document.querySelectorAll('.order-message');
    
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

  // Thêm hiệu ứng khi thêm item vào giỏ hàng
  addItemAnimation(foodId) {
    const card = document.querySelector(`[data-food-id="${foodId}"]`);
    if (!card) return;

    // Hiệu ứng pulse
    card.style.animation = 'pulse 0.6s ease-in-out';
    
    setTimeout(() => {
      card.style.animation = '';
    }, 600);

    // Hiệu ứng cho selected items
    const selectedItems = document.querySelectorAll('.selected-item');
    selectedItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        item.style.transition = 'all 0.4s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, index * 100);
    });
  }

  // Thêm hiệu ứng cho quantity input
  addQuantityEffects() {
    const quantityInputs = document.querySelectorAll('.quantity-input');
    
    quantityInputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.style.borderColor = '#667eea';
        input.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
      });

      input.addEventListener('blur', () => {
        input.style.borderColor = '#e5e7eb';
        input.style.boxShadow = 'none';
      });

      input.addEventListener('input', () => {
        if (input.value > 0) {
          input.style.borderColor = '#10b981';
          input.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
        } else {
          input.style.borderColor = '#ef4444';
          input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        }
      });
    });
  }

  // Thêm hiệu ứng cho pagination
  addPaginationEffects() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    paginationBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Hiệu ứng loading cho food grid
        const foodGrid = document.querySelector('.food-grid');
        if (foodGrid) {
          foodGrid.style.opacity = '0.5';
          foodGrid.style.transition = 'opacity 0.3s ease';
          
          setTimeout(() => {
            foodGrid.style.opacity = '1';
          }, 500);
        }
      });
    });
  }

  // Thêm hiệu ứng cho logo
  addLogoEffects() {
    const logo = document.querySelector('.order-logo');
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

  // Thêm hiệu ứng cho total price
  addTotalPriceEffects() {
    const totalAmount = document.querySelector('.total-amount');
    if (!totalAmount) return;

    // Hiệu ứng khi giá thay đổi
    const observer = new MutationObserver(() => {
      totalAmount.style.animation = 'priceUpdate 0.3s ease';
      setTimeout(() => {
        totalAmount.style.animation = '';
      }, 300);
    });

    observer.observe(totalAmount, { childList: true, subtree: true });
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
}

// CSS animations
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
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  @keyframes logoBounce {
    0% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.2) rotate(10deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
  
  @keyframes priceUpdate {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
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

export default OrderEffects; 