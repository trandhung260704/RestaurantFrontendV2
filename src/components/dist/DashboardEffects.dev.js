"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DashboardEffects = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Dashboard Effects Component
var DashboardEffects =
/*#__PURE__*/
function () {
  function DashboardEffects() {
    _classCallCheck(this, DashboardEffects);

    this.init();
  }

  _createClass(DashboardEffects, [{
    key: "init",
    value: function init() {
      this.addCardAnimations();
      this.addParallaxEffect();
      this.addTypingEffect();
      this.addNotificationSystem();
    } // Thêm hiệu ứng animation cho các card

  }, {
    key: "addCardAnimations",
    value: function addCardAnimations() {
      var cards = document.querySelectorAll('.dashboard-card, .dashboard-button');
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, index) {
          if (entry.isIntersecting) {
            setTimeout(function () {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 100);
          }
        });
      }, {
        threshold: 0.1
      });
      cards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
      });
    } // Thêm hiệu ứng parallax cho background

  }, {
    key: "addParallaxEffect",
    value: function addParallaxEffect() {
      window.addEventListener('scroll', function () {
        var scrolled = window.pageYOffset;
        var parallax = document.querySelector('body');
        var speed = scrolled * 0.5;

        if (parallax) {
          parallax.style.transform = "translateY(".concat(speed, "px)");
        }
      });
    } // Thêm hiệu ứng typing cho tiêu đề

  }, {
    key: "addTypingEffect",
    value: function addTypingEffect() {
      var title = document.querySelector('.logo-text h1');
      if (!title) return;
      var text = title.textContent;
      title.textContent = '';
      title.style.borderRight = '2px solid #667eea';
      var i = 0;

      var typeWriter = function typeWriter() {
        if (i < text.length) {
          title.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        } else {
          title.style.borderRight = 'none';
        }
      };

      setTimeout(typeWriter, 1000);
    } // Thêm hệ thống thông báo

  }, {
    key: "addNotificationSystem",
    value: function addNotificationSystem() {
      this.showNotification = function (message) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
        var notification = document.createElement('div');
        notification.className = "notification notification-".concat(type);
        notification.innerHTML = "\n        <div class=\"notification-content\">\n          <span class=\"notification-message\">".concat(message, "</span>\n          <button class=\"notification-close\">&times;</button>\n        </div>\n      ");
        notification.style.cssText = "\n        position: fixed;\n        top: 20px;\n        right: 20px;\n        background: ".concat(type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6', ";\n        color: white;\n        padding: 15px 20px;\n        border-radius: 8px;\n        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n        z-index: 1000;\n        transform: translateX(100%);\n        transition: transform 0.3s ease;\n        max-width: 300px;\n      ");
        document.body.appendChild(notification); // Hiển thị notification

        setTimeout(function () {
          notification.style.transform = 'translateX(0)';
        }, 100); // Tự động ẩn sau 5 giây

        setTimeout(function () {
          notification.style.transform = 'translateX(100%)';
          setTimeout(function () {
            document.body.removeChild(notification);
          }, 300);
        }, 5000); // Nút đóng

        var closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function () {
          notification.style.transform = 'translateX(100%)';
          setTimeout(function () {
            document.body.removeChild(notification);
          }, 300);
        });
      };
    } // Thêm hiệu ứng hover cho logo

  }, {
    key: "addLogoHoverEffect",
    value: function addLogoHoverEffect() {
      var logo = document.querySelector('.header-logo');
      if (!logo) return;
      logo.addEventListener('mouseenter', function () {
        logo.style.animation = 'logoSpin 0.6s ease-in-out';
      });
      logo.addEventListener('animationend', function () {
        logo.style.animation = '';
      });
    } // Thêm hiệu ứng click cho các card

  }, {
    key: "addCardClickEffects",
    value: function addCardClickEffects() {
      var cards = document.querySelectorAll('.dashboard-card');
      cards.forEach(function (card) {
        card.addEventListener('click', function (e) {
          // Tạo hiệu ứng ripple
          var ripple = document.createElement('span');
          var rect = card.getBoundingClientRect();
          var size = Math.max(rect.width, rect.height);
          var x = e.clientX - rect.left - size / 2;
          var y = e.clientY - rect.top - size / 2;
          ripple.style.cssText = "\n          position: absolute;\n          width: ".concat(size, "px;\n          height: ").concat(size, "px;\n          left: ").concat(x, "px;\n          top: ").concat(y, "px;\n          background: rgba(255, 255, 255, 0.6);\n          border-radius: 50%;\n          transform: scale(0);\n          animation: ripple 0.6s linear;\n          pointer-events: none;\n        ");
          card.appendChild(ripple);
          setTimeout(function () {
            ripple.remove();
          }, 600);
        });
      });
    } // Thêm hiệu ứng loading cho logout

  }, {
    key: "addLogoutLoadingEffect",
    value: function addLogoutLoadingEffect() {
      var logoutBtn = document.querySelector('.dashboard-button.logout');
      if (!logoutBtn) return;
      logoutBtn.addEventListener('click', function (e) {
        var originalText = logoutBtn.textContent;
        logoutBtn.textContent = '🔄 Đang đăng xuất...';
        logoutBtn.style.pointerEvents = 'none'; // Khôi phục sau 2 giây (hoặc khi logout hoàn thành)

        setTimeout(function () {
          logoutBtn.textContent = originalText;
          logoutBtn.style.pointerEvents = 'auto';
        }, 2000);
      });
    }
  }]);

  return DashboardEffects;
}(); // CSS animations


exports.DashboardEffects = DashboardEffects;
var style = document.createElement('style');
style.textContent = "\n  @keyframes logoSpin {\n    0% { transform: rotate(0deg) scale(1); }\n    50% { transform: rotate(180deg) scale(1.1); }\n    100% { transform: rotate(360deg) scale(1); }\n  }\n  \n  @keyframes ripple {\n    to {\n      transform: scale(4);\n      opacity: 0;\n    }\n  }\n  \n  .notification-content {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n  }\n  \n  .notification-close {\n    background: none;\n    border: none;\n    color: white;\n    font-size: 18px;\n    cursor: pointer;\n    margin-left: 10px;\n  }\n  \n  .notification-close:hover {\n    opacity: 0.8;\n  }\n";
document.head.appendChild(style);
var _default = DashboardEffects;
exports["default"] = _default;