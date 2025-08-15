// Profile Effects Component
export class ProfileEffects {
  constructor() {
    this.init();
  }

  init() {
    this.addFormAnimations();
    this.addAvatarAnimation();
    this.addBackgroundEffects();
    this.addButtonEffects();
  }

  addFormAnimations() {
    const inputs = document.querySelectorAll('.form-input:not(.disabled)');
    
    inputs.forEach((input, index) => {
      // Hiệu ứng entrance
      input.style.opacity = '0';
      input.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        input.style.transition = 'all 0.6s ease';
        input.style.opacity = '1';
        input.style.transform = 'translateY(0)';
      }, index * 100);

      // Hiệu ứng focus
      input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        input.parentElement.style.transition = 'transform 0.3s ease';
      });

      input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
      });
    });
  }

  // Thêm hiệu ứng animation cho avatar
  addAvatarAnimation() {
    const avatar = document.querySelector('.profile-avatar');
    if (!avatar) return;

    // Hiệu ứng entrance
    avatar.style.opacity = '0';
    avatar.style.transform = 'scale(0.5) rotate(-180deg)';
    
    setTimeout(() => {
      avatar.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      avatar.style.opacity = '1';
      avatar.style.transform = 'scale(1) rotate(0deg)';
    }, 500);

    // Hiệu ứng hover
    avatar.addEventListener('mouseenter', () => {
      avatar.style.animation = 'avatarPulse 0.6s ease-in-out';
    });

    avatar.addEventListener('animationend', () => {
      avatar.style.animation = '';
    });
  }

  // Thêm hiệu ứng background
  addBackgroundEffects() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
      // Thêm hiệu ứng parallax khi di chuyển chuột
      document.addEventListener('mousemove', (e) => {
        const speed = (index + 1) * 0.3;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        shape.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    });
  }

  // Thêm hiệu ứng cho buttons
  addButtonEffects() {
    const buttons = document.querySelectorAll('.edit-button, .save-button, .cancel-button, .back-btn');
    
    buttons.forEach(button => {
      // Hiệu ứng ripple
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
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
      });

      // Hiệu ứng loading cho save button
      if (button.classList.contains('save-button')) {
        button.addEventListener('click', () => {
          const originalText = button.textContent;
          button.innerHTML = '<span class="loading-spinner"></span> Đang lưu...';
          button.style.pointerEvents = 'none';
          
          setTimeout(() => {
            button.innerHTML = originalText;
            button.style.pointerEvents = 'auto';
          }, 2000);
        });
      }
    });
  }

  // Thêm hiệu ứng cho role badge
  addRoleBadgeEffect() {
    const roleBadge = document.querySelector('.role-badge');
    if (!roleBadge) return;

    roleBadge.addEventListener('mouseenter', () => {
      roleBadge.style.animation = 'badgeGlow 0.6s ease-in-out';
    });

    roleBadge.addEventListener('animationend', () => {
      roleBadge.style.animation = '';
    });
  }

  // Thêm hiệu ứng cho message
  addMessageEffects() {
    const messages = document.querySelectorAll('.message');
    
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

  // Thêm hiệu ứng cho form validation
  addFormValidation() {
    const inputs = document.querySelectorAll('.form-input:not(.disabled)');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });

      input.addEventListener('input', () => {
        this.clearFieldError(input);
      });
    });
  }

  // Validate field
  validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (input.name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Email không hợp lệ';
      }
    }

    if (input.name === 'phone') {
      const phoneRegex = /^[0-9]{10,11}$/;
      if (value && !phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Số điện thoại không hợp lệ';
      }
    }

    if (!isValid) {
      this.showFieldError(input, errorMessage);
    } else {
      this.showFieldSuccess(input);
    }

    return isValid;
  }

  // Show field error
  showFieldError(input, message) {
    this.clearFieldError(input);
    
    input.style.borderColor = '#ef4444';
    input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      color: #ef4444;
      font-size: 12px;
      margin-top: 5px;
      animation: slideDown 0.3s ease;
    `;
    
    input.parentElement.appendChild(errorDiv);
  }

  // Show field success
  showFieldSuccess(input) {
    input.style.borderColor = '#10b981';
    input.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
  }

  // Clear field error
  clearFieldError(input) {
    const errorDiv = input.parentElement.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.remove();
    }
  }
}

// CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes avatarPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  @keyframes badgeGlow {
    0% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(102, 126, 234, 0); }
    100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); }
  }
  
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
  
  .field-error {
    color: #ef4444;
    font-size: 12px;
    margin-top: 5px;
    animation: slideDown 0.3s ease;
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
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default ProfileEffects; 