// Login Effects Component
export class LoginEffects {
  constructor() {
    this.init();
  }

  init() {
    this.addInputAnimations();
    this.addLogoAnimation();
    this.addBackgroundEffects();
    this.addFormValidation();
  }

  // Thêm hiệu ứng animation cho input fields
  addInputAnimations() {
    const inputs = document.querySelectorAll('.login-input');
    
    inputs.forEach(input => {
      // Hiệu ứng focus
      input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        input.parentElement.style.transition = 'transform 0.3s ease';
      });

      input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
      });

      // Hiệu ứng typing
      input.addEventListener('input', () => {
        if (input.value.length > 0) {
          input.style.borderColor = '#667eea';
        } else {
          input.style.borderColor = '#e5e7eb';
        }
      });
    });
  }

  // Thêm hiệu ứng animation cho logo
  addLogoAnimation() {
    const logo = document.querySelector('.login-logo');
    if (!logo) return;

    // Hiệu ứng entrance
    logo.style.opacity = '0';
    logo.style.transform = 'scale(0.5) rotate(-180deg)';
    
    setTimeout(() => {
      logo.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      logo.style.opacity = '1';
      logo.style.transform = 'scale(1) rotate(0deg)';
    }, 500);

    // Hiệu ứng hover
    logo.addEventListener('mouseenter', () => {
      logo.style.animation = 'logoBounce 0.6s ease-in-out';
    });

    logo.addEventListener('animationend', () => {
      logo.style.animation = '';
    });
  }

  // Thêm hiệu ứng background
  addBackgroundEffects() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
      // Thêm hiệu ứng parallax khi di chuyển chuột
      document.addEventListener('mousemove', (e) => {
        const speed = (index + 1) * 0.5;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        shape.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    });
  }

  // Thêm validation và hiệu ứng
  addFormValidation() {
    const form = document.querySelector('.login-form');
    const inputs = document.querySelectorAll('.login-input');
    
    if (!form) return;

    // Real-time validation
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });

      input.addEventListener('input', () => {
        this.clearFieldError(input);
      });
    });

    // Form submission animation
    form.addEventListener('submit', (e) => {
      const submitBtn = form.querySelector('.login-button');
      if (submitBtn) {
        submitBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          submitBtn.style.transform = 'scale(1)';
        }, 150);
      }
    });
  }

  // Validate từng field
  validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (input.name === 'username') {
      if (value.length === 0) {
        isValid = false;
        errorMessage = 'Vui lòng nhập email hoặc số điện thoại';
      } else if (value.length < 3) {
        isValid = false;
        errorMessage = 'Tên đăng nhập phải có ít nhất 3 ký tự';
      }
    }

    if (input.name === 'password') {
      if (value.length === 0) {
        isValid = false;
        errorMessage = 'Vui lòng nhập mật khẩu';
      }
    }

    if (!isValid) {
      this.showFieldError(input, errorMessage);
    } else {
      this.showFieldSuccess(input);
    }

    return isValid;
  }

  // Hiển thị lỗi cho field
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

  // Hiển thị thành công cho field
  showFieldSuccess(input) {
    input.style.borderColor = '#10b981';
    input.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
  }

  // Xóa lỗi field
  clearFieldError(input) {
    const errorDiv = input.parentElement.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  // Thêm hiệu ứng ripple cho buttons
  addRippleEffect() {
    const buttons = document.querySelectorAll('.login-button, .password-toggle');
    
    buttons.forEach(button => {
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
    });
  }

  // Thêm hiệu ứng loading cho Google login
  addGoogleLoginEffect() {
    const googleLogin = document.querySelector('[data-testid="google-login"]');
    if (googleLogin) {
      googleLogin.addEventListener('click', () => {
        googleLogin.style.opacity = '0.7';
        googleLogin.style.pointerEvents = 'none';
        
        setTimeout(() => {
          googleLogin.style.opacity = '1';
          googleLogin.style.pointerEvents = 'auto';
        }, 2000);
      });
    }
  }
}

// CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes logoBounce {
    0% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.2) rotate(10deg); }
    100% { transform: scale(1) rotate(0deg); }
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
  
  .field-error {
    color: #ef4444;
    font-size: 12px;
    margin-top: 5px;
    animation: slideDown 0.3s ease;
  }
`;
document.head.appendChild(style);

export default LoginEffects; 