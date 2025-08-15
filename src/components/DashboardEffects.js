// Dashboard Effects Component
export class DashboardEffects {
  constructor() {
    this.init();
  }

  init() {
    this.addCardAnimations();
    this.addParallaxEffect();
    this.addTypingEffect();
    this.addNotificationSystem();
  }

  // Thêm hiệu ứng animation cho các card
  addCardAnimations() {
    const cards = document.querySelectorAll('.dashboard-card, .dashboard-button');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }

  // Thêm hiệu ứng parallax cho background
  addParallaxEffect() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('body');
      const speed = scrolled * 0.5;
      
      if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
      }
    });
  }

  // Thêm hiệu ứng typing cho tiêu đề
  addTypingEffect() {
    const title = document.querySelector('.logo-text h1');
    if (!title) return;

    const text = title.textContent;
    title.textContent = '';
    title.style.borderRight = '2px solid #667eea';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        title.style.borderRight = 'none';
      }
    };
    
    setTimeout(typeWriter, 1000);
  }

  // Thêm hệ thống thông báo
  addNotificationSystem() {
    this.showNotification = (message, type = 'info') => {
      const notification = document.createElement('div');
      notification.className = `notification notification-${type}`;
      notification.innerHTML = `
        <div class="notification-content">
          <span class="notification-message">${message}</span>
          <button class="notification-close">&times;</button>
        </div>
      `;
      
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
      `;
      
      document.body.appendChild(notification);
      
      // Hiển thị notification
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 100);
      
      // Tự động ẩn sau 5 giây
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 5000);
      
      // Nút đóng
      const closeBtn = notification.querySelector('.notification-close');
      closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      });
    };
  }

  // Thêm hiệu ứng hover cho logo
  addLogoHoverEffect() {
    const logo = document.querySelector('.header-logo');
    if (!logo) return;

    logo.addEventListener('mouseenter', () => {
      logo.style.animation = 'logoSpin 0.6s ease-in-out';
    });

    logo.addEventListener('animationend', () => {
      logo.style.animation = '';
    });
  }

  // Thêm hiệu ứng click cho các card
  addCardClickEffects() {
    const cards = document.querySelectorAll('.dashboard-card');
    
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Tạo hiệu ứng ripple
        const ripple = document.createElement('span');
        const rect = card.getBoundingClientRect();
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
        
        card.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  // Thêm hiệu ứng loading cho logout
  addLogoutLoadingEffect() {
    const logoutBtn = document.querySelector('.dashboard-button.logout');
    if (!logoutBtn) return;

    logoutBtn.addEventListener('click', (e) => {
      const originalText = logoutBtn.textContent;
      logoutBtn.textContent = '🔄 Đang đăng xuất...';
      logoutBtn.style.pointerEvents = 'none';
      
      // Khôi phục sau 2 giây (hoặc khi logout hoàn thành)
      setTimeout(() => {
        logoutBtn.textContent = originalText;
        logoutBtn.style.pointerEvents = 'auto';
      }, 2000);
    });
  }
}

// CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes logoSpin {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.1); }
    100% { transform: rotate(360deg) scale(1); }
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    margin-left: 10px;
  }
  
  .notification-close:hover {
    opacity: 0.8;
  }
`;
document.head.appendChild(style);

export default DashboardEffects; 