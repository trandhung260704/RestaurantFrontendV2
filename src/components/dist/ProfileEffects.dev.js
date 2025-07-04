"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ProfileEffects = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Profile Effects Component
var ProfileEffects =
/*#__PURE__*/
function () {
  function ProfileEffects() {
    _classCallCheck(this, ProfileEffects);

    this.init();
  }

  _createClass(ProfileEffects, [{
    key: "init",
    value: function init() {
      this.addFormAnimations();
      this.addAvatarAnimation();
      this.addBackgroundEffects();
      this.addButtonEffects();
    }
  }, {
    key: "addFormAnimations",
    value: function addFormAnimations() {
      var inputs = document.querySelectorAll('.form-input:not(.disabled)');
      inputs.forEach(function (input, index) {
        // Hiệu ứng entrance
        input.style.opacity = '0';
        input.style.transform = 'translateY(20px)';
        setTimeout(function () {
          input.style.transition = 'all 0.6s ease';
          input.style.opacity = '1';
          input.style.transform = 'translateY(0)';
        }, index * 100); // Hiệu ứng focus

        input.addEventListener('focus', function () {
          input.parentElement.style.transform = 'scale(1.02)';
          input.parentElement.style.transition = 'transform 0.3s ease';
        });
        input.addEventListener('blur', function () {
          input.parentElement.style.transform = 'scale(1)';
        });
      });
    } // Thêm hiệu ứng animation cho avatar

  }, {
    key: "addAvatarAnimation",
    value: function addAvatarAnimation() {
      var avatar = document.querySelector('.profile-avatar');
      if (!avatar) return; // Hiệu ứng entrance

      avatar.style.opacity = '0';
      avatar.style.transform = 'scale(0.5) rotate(-180deg)';
      setTimeout(function () {
        avatar.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        avatar.style.opacity = '1';
        avatar.style.transform = 'scale(1) rotate(0deg)';
      }, 500); // Hiệu ứng hover

      avatar.addEventListener('mouseenter', function () {
        avatar.style.animation = 'avatarPulse 0.6s ease-in-out';
      });
      avatar.addEventListener('animationend', function () {
        avatar.style.animation = '';
      });
    } // Thêm hiệu ứng background

  }, {
    key: "addBackgroundEffects",
    value: function addBackgroundEffects() {
      var shapes = document.querySelectorAll('.shape');
      shapes.forEach(function (shape, index) {
        // Thêm hiệu ứng parallax khi di chuyển chuột
        document.addEventListener('mousemove', function (e) {
          var speed = (index + 1) * 0.3;
          var x = (window.innerWidth - e.pageX * speed) / 100;
          var y = (window.innerHeight - e.pageY * speed) / 100;
          shape.style.transform = "translateX(".concat(x, "px) translateY(").concat(y, "px)");
        });
      });
    } // Thêm hiệu ứng cho buttons

  }, {
    key: "addButtonEffects",
    value: function addButtonEffects() {
      var buttons = document.querySelectorAll('.edit-button, .save-button, .cancel-button, .back-btn');
      buttons.forEach(function (button) {
        // Hiệu ứng ripple
        button.addEventListener('click', function (e) {
          var ripple = document.createElement('span');
          var rect = button.getBoundingClientRect();
          var size = Math.max(rect.width, rect.height);
          var x = e.clientX - rect.left - size / 2;
          var y = e.clientY - rect.top - size / 2;
          ripple.style.cssText = "\n          position: absolute;\n          width: ".concat(size, "px;\n          height: ").concat(size, "px;\n          left: ").concat(x, "px;\n          top: ").concat(y, "px;\n          background: rgba(255, 255, 255, 0.6);\n          border-radius: 50%;\n          transform: scale(0);\n          animation: ripple 0.6s linear;\n          pointer-events: none;\n        ");
          button.appendChild(ripple);
          setTimeout(function () {
            ripple.remove();
          }, 600);
        }); // Hiệu ứng loading cho save button

        if (button.classList.contains('save-button')) {
          button.addEventListener('click', function () {
            var originalText = button.textContent;
            button.innerHTML = '<span class="loading-spinner"></span> Đang lưu...';
            button.style.pointerEvents = 'none';
            setTimeout(function () {
              button.innerHTML = originalText;
              button.style.pointerEvents = 'auto';
            }, 2000);
          });
        }
      });
    } // Thêm hiệu ứng cho role badge

  }, {
    key: "addRoleBadgeEffect",
    value: function addRoleBadgeEffect() {
      var roleBadge = document.querySelector('.role-badge');
      if (!roleBadge) return;
      roleBadge.addEventListener('mouseenter', function () {
        roleBadge.style.animation = 'badgeGlow 0.6s ease-in-out';
      });
      roleBadge.addEventListener('animationend', function () {
        roleBadge.style.animation = '';
      });
    } // Thêm hiệu ứng cho message

  }, {
    key: "addMessageEffects",
    value: function addMessageEffects() {
      var messages = document.querySelectorAll('.message');
      messages.forEach(function (message) {
        // Auto hide message after 5 seconds
        setTimeout(function () {
          message.style.animation = 'slideUp 0.3s ease';
          setTimeout(function () {
            message.remove();
          }, 300);
        }, 5000); // Click to dismiss

        message.addEventListener('click', function () {
          message.style.animation = 'slideUp 0.3s ease';
          setTimeout(function () {
            message.remove();
          }, 300);
        });
      });
    } // Thêm hiệu ứng cho form validation

  }, {
    key: "addFormValidation",
    value: function addFormValidation() {
      var _this = this;

      var inputs = document.querySelectorAll('.form-input:not(.disabled)');
      inputs.forEach(function (input) {
        input.addEventListener('blur', function () {
          _this.validateField(input);
        });
        input.addEventListener('input', function () {
          _this.clearFieldError(input);
        });
      });
    } // Validate field

  }, {
    key: "validateField",
    value: function validateField(input) {
      var value = input.value.trim();
      var isValid = true;
      var errorMessage = '';

      if (input.name === 'email') {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value && !emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Email không hợp lệ';
        }
      }

      if (input.name === 'phone') {
        var phoneRegex = /^[0-9]{10,11}$/;

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
    } // Show field error

  }, {
    key: "showFieldError",
    value: function showFieldError(input, message) {
      this.clearFieldError(input);
      input.style.borderColor = '#ef4444';
      input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
      var errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.textContent = message;
      errorDiv.style.cssText = "\n      color: #ef4444;\n      font-size: 12px;\n      margin-top: 5px;\n      animation: slideDown 0.3s ease;\n    ";
      input.parentElement.appendChild(errorDiv);
    } // Show field success

  }, {
    key: "showFieldSuccess",
    value: function showFieldSuccess(input) {
      input.style.borderColor = '#10b981';
      input.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
    } // Clear field error

  }, {
    key: "clearFieldError",
    value: function clearFieldError(input) {
      var errorDiv = input.parentElement.querySelector('.field-error');

      if (errorDiv) {
        errorDiv.remove();
      }
    }
  }]);

  return ProfileEffects;
}(); // CSS animations


exports.ProfileEffects = ProfileEffects;
var style = document.createElement('style');
style.textContent = "\n  @keyframes avatarPulse {\n    0% { transform: scale(1); }\n    50% { transform: scale(1.1); }\n    100% { transform: scale(1); }\n  }\n  \n  @keyframes badgeGlow {\n    0% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7); }\n    70% { box-shadow: 0 0 0 10px rgba(102, 126, 234, 0); }\n    100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); }\n  }\n  \n  @keyframes ripple {\n    to {\n      transform: scale(4);\n      opacity: 0;\n    }\n  }\n  \n  @keyframes slideDown {\n    from {\n      opacity: 0;\n      transform: translateY(-10px);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n  \n  @keyframes slideUp {\n    from {\n      opacity: 1;\n      transform: translateY(0);\n    }\n    to {\n      opacity: 0;\n      transform: translateY(-10px);\n    }\n  }\n  \n  .field-error {\n    color: #ef4444;\n    font-size: 12px;\n    margin-top: 5px;\n    animation: slideDown 0.3s ease;\n  }\n  \n  .loading-spinner {\n    display: inline-block;\n    width: 16px;\n    height: 16px;\n    border: 2px solid rgba(255, 255, 255, 0.3);\n    border-radius: 50%;\n    border-top-color: white;\n    animation: spin 1s ease-in-out infinite;\n    margin-right: 8px;\n  }\n  \n  @keyframes spin {\n    to { transform: rotate(360deg); }\n  }\n";
document.head.appendChild(style);
var _default = ProfileEffects;
exports["default"] = _default;