class EmployeeEffects {
  constructor() {
    this.init();
  }

  init() {
    this.addRippleEffects();
    this.addHoverEffects();
  }

  addTableEffects() {
    const tableRows = document.querySelectorAll('.employee-row');
    
    tableRows.forEach((row, index) => {
      row.style.animationDelay = `${index * 0.1}s`;
      
      row.addEventListener('mouseenter', () => {
        row.style.transform = 'translateX(5px) scale(1.01)';
        row.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
      });
      
      row.addEventListener('mouseleave', () => {
        row.style.transform = 'translateX(0) scale(1)';
        row.style.boxShadow = 'none';
      });
      
      row.addEventListener('click', (e) => {
        this.createRipple(e, row);
      });
    });
  }

  addSearchEffects() {
    const searchInput = document.querySelector('.search-input');
    const clearBtn = document.querySelector('.clear-search-btn');
    
    if (searchInput) {
      searchInput.addEventListener('focus', () => {
        searchInput.style.transform = 'translateY(-2px)';
        searchInput.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
      });
      
      searchInput.addEventListener('blur', () => {
        searchInput.style.transform = 'translateY(0)';
        searchInput.style.boxShadow = 'none';
      });
      
      searchInput.addEventListener('input', () => {
        searchInput.style.borderColor = 'rgba(255, 255, 255, 0.8)';
        setTimeout(() => {
          searchInput.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }, 300);
      });
    }
    
    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        this.createRipple(e, clearBtn);
      });
    }
  }

  addHeaderEffects() {
    const header = document.querySelector('.employee-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.15)';
        header.style.backdropFilter = 'blur(25px)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.1)';
        header.style.backdropFilter = 'blur(20px)';
      }
    });
  }

  addMessageEffects() {
    const messages = document.querySelectorAll('.employee-message');
    
    messages.forEach(message => {
      setTimeout(() => {
        message.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
          message.remove();
        }, 300);
      }, 5000);

      message.addEventListener('click', () => {
        message.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
          message.remove();
        }, 300);
      });
    });
  }

  addLogoEffects() {
    const logo = document.querySelector('.employee-logo');
    if (!logo) return;

    logo.addEventListener('mouseenter', () => {
      logo.style.transform = 'scale(1.1) rotate(5deg)';
    });

    logo.addEventListener('mouseleave', () => {
      logo.style.transform = 'scale(1) rotate(0deg)';
    });

    logo.addEventListener('click', (e) => {
      this.createRipple(e, logo);
    });
  }

  addUserInfoEffects() {
    const userInfo = document.querySelector('.user-info');
    const backBtn = document.querySelector('.back-btn');
    
    if (userInfo) {
      userInfo.addEventListener('mouseenter', () => {
        userInfo.style.transform = 'translateY(-2px)';
        userInfo.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
      });

      userInfo.addEventListener('mouseleave', () => {
        userInfo.style.transform = 'translateY(0)';
        userInfo.style.boxShadow = 'none';
      });
    }
    
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        this.createRipple(e, backBtn);
      });
    }
  }

  addRippleEffects() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.createRipple(e, button);
      });
    });
  }

  addHoverEffects() {
    const cards = document.querySelectorAll('.stat-card, .summary-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-3px)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
      });
    });
  }

  createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  addRippleStyles() {
    if (!document.getElementById('ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: ripple-animation 0.6s linear;
          pointer-events: none;
        }

        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-100%);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

export default EmployeeEffects; 