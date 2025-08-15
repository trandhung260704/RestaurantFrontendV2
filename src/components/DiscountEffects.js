class DiscountEffects {
  constructor() {
    this.isInitialized = false;
  }

  addTableEffects() {
    const tableRows = document.querySelectorAll('.discount-row');
    tableRows.forEach((row, index) => {
      row.addEventListener('mouseenter', () => {
        row.style.background = 'rgba(255, 255, 255, 0.1)';
        row.style.transform = 'translateX(5px)';
      });
      row.addEventListener('mouseleave', () => {
        row.style.background = 'transparent';
        row.style.transform = 'translateX(0)';
      });
      row.addEventListener('click', (e) => {
        this.createRippleEffect(e, row);
      });
    });
  }

  addSearchEffects() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    searchInput.addEventListener('input', () => {
      if (searchInput.value.length > 0) {
        searchInput.style.borderColor = 'rgba(74, 222, 128, 0.5)';
        searchInput.style.background = 'rgba(255, 255, 255, 0.15)';
      } else {
        searchInput.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        searchInput.style.background = 'rgba(255, 255, 255, 0.1)';
      }
    });
    searchInput.addEventListener('focus', () => {
      searchInput.style.transform = 'translateY(-2px)';
      searchInput.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
    });
    searchInput.addEventListener('blur', () => {
      searchInput.style.transform = 'translateY(0)';
      searchInput.style.boxShadow = 'none';
    });
  }

  addHeaderEffects() {
    const header = document.querySelector('.discount-header');
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
    const messages = document.querySelectorAll('.discount-message');
    messages.forEach(message => {
      setTimeout(() => {
        message.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => { message.remove(); }, 300);
      }, 5000);
      message.addEventListener('click', () => {
        message.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => { message.remove(); }, 300);
      });
    });
  }

  addLogoEffects() {
    const logo = document.querySelector('.discount-logo');
    if (!logo) return;
    logo.addEventListener('mouseenter', () => {
      logo.style.transform = 'scale(1.1) rotate(5deg)';
    });
    logo.addEventListener('mouseleave', () => {
      logo.style.transform = 'scale(1) rotate(0deg)';
    });
    logo.addEventListener('click', (e) => {
      this.createRippleEffect(e, logo);
    });
  }

  addUserInfoEffects() {
    const userInfo = document.querySelector('.user-info');
    if (!userInfo) return;
    userInfo.addEventListener('mouseenter', () => {
      userInfo.style.background = 'rgba(255, 255, 255, 0.2)';
      userInfo.style.transform = 'translateY(-2px)';
    });
    userInfo.addEventListener('mouseleave', () => {
      userInfo.style.background = 'rgba(255, 255, 255, 0.1)';
      userInfo.style.transform = 'translateY(0)';
    });
  }

  addFormEffects() {
    const formGroups = document.querySelectorAll('.form-group input');
    formGroups.forEach(input => {
      input.addEventListener('focus', () => {
        input.style.boxShadow = '0 8px 25px rgba(59,130,246,0.15)';
        input.style.borderColor = '#6366f1';
      });
      input.addEventListener('blur', () => {
        input.style.boxShadow = 'none';
        input.style.borderColor = '#ccc';
      });
    });
  }

  addRippleStyles() {
    if (!document.getElementById('ripple-styles-discount')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles-discount';
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

  createRippleEffect(event, element) {
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
    setTimeout(() => { ripple.remove(); }, 600);
  }
}

export default DiscountEffects; 