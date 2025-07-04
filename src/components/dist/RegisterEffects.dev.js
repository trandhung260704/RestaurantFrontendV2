"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RegisterEffects = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Register Effects Component
var RegisterEffects =
/*#__PURE__*/
function () {
  function RegisterEffects() {
    _classCallCheck(this, RegisterEffects);

    this.init();
  }

  _createClass(RegisterEffects, [{
    key: "init",
    value: function init() {
      this.addFormAnimations();
      this.addLogoAnimation();
      this.addBackgroundEffects();
      this.addFormValidation();
    }
  }, {
    key: "addFormAnimations",
    value: function addFormAnimations() {
      var inputs = document.querySelectorAll('.form-input');
      inputs.forEach(function (input, index) {
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
        }); // Hiệu ứng typing

        input.addEventListener('input', function () {
          if (input.value.length > 0 && !input.classList.contains('error')) {
            input.style.borderColor = '#667eea';
          } else if (input.value.length === 0) {
            input.style.borderColor = '#e5e7eb';
          }
        });
      });
    } // Thêm hiệu ứng animation cho logo

  }, {
    key: "addLogoAnimation",
    value: function addLogoAnimation() {
      var logo = document.querySelector('.register-logo');
      if (!logo) return; // Hiệu ứng entrance

      logo.style.opacity = '0';
      logo.style.transform = 'scale(0.5) rotate(-180deg)';
      setTimeout(function () {
        logo.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        logo.style.opacity = '1';
        logo.style.transform = 'scale(1) rotate(0deg)';
      }, 500); // Hiệu ứng hover

      logo.addEventListener('mouseenter', function () {
        logo.style.animation = 'logoBounce 0.6s ease-in-out';
      });
      logo.addEventListener('animationend', function () {
        logo.style.animation = '';
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
    } // Thêm validation và hiệu ứng

  }, {
    key: "addFormValidation",
    value: function addFormValidation() {
      var _this = this;

      var form = document.querySelector('.register-form');
      var inputs = document.querySelectorAll('.form-input');
      if (!form) return; // Real-time validation

      inputs.forEach(function (input) {
        input.addEventListener('blur', function () {
          _this.validateField(input);
        });
        input.addEventListener('input', function () {
          _this.clearFieldError(input);
        });
      }); // Form submission animation

      form.addEventListener('submit', function (e) {
        var submitBtn = form.querySelector('.register-button');

        if (submitBtn) {
          submitBtn.style.transform = 'scale(0.95)';
          setTimeout(function () {
            submitBtn.style.transform = 'scale(1)';
          }, 150);
        }
      });
    } // Validate từng field

  }, {
    key: "validateField",
    value: function validateField(input) {
      var value = input.value.trim();
      var isValid = true;
      var errorMessage = '';

      if (input.name === 'full_name') {
        if (value.length === 0) {
          isValid = false;
          errorMessage = 'Họ và tên không được để trống';
        } else if (value.length < 2) {
          isValid = false;
          errorMessage = 'Họ và tên phải có ít nhất 2 ký tự';
        }
      }

      if (input.name === 'email') {
        if (value.length === 0) {
          isValid = false;
          errorMessage = 'Email không được để trống';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          isValid = false;
          errorMessage = 'Email không hợp lệ';
        }
      }

      if (input.name === 'password') {
        if (value.length === 0) {
          isValid = false;
          errorMessage = 'Mật khẩu không được để trống';
        }
      }

      if (input.name === 'phone') {
        if (value.length === 0) {
          isValid = false;
          errorMessage = 'Số điện thoại không được để trống';
        } else if (!/^[0-9]{10,11}$/.test(value)) {
          isValid = false;
          errorMessage = 'Số điện thoại không hợp lệ';
        }
      }

      if (input.name === 'birthday') {
        if (value.length === 0) {
          isValid = false;
          errorMessage = 'Ngày sinh không được để trống';
        }
      }

      if (!isValid) {
        this.showFieldError(input, errorMessage);
      } else {
        this.showFieldSuccess(input);
      }

      return isValid;
    } // Hiển thị lỗi cho field

  }, {
    key: "showFieldError",
    value: function showFieldError(input, message) {
      this.clearFieldError(input);
      input.style.borderColor = '#ef4444';
      input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
      input.classList.add('error');
      var errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.textContent = message;
      errorDiv.style.cssText = "\n      color: #ef4444;\n      font-size: 12px;\n      margin-top: 5px;\n      animation: slideDown 0.3s ease;\n    ";
      input.parentElement.appendChild(errorDiv);
    } // Hiển thị thành công cho field

  }, {
    key: "showFieldSuccess",
    value: function showFieldSuccess(input) {
      input.style.borderColor = '#10b981';
      input.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
      input.classList.remove('error');
    } // Xóa lỗi field

  }, {
    key: "clearFieldError",
    value: function clearFieldError(input) {
      var errorDiv = input.parentElement.querySelector('.field-error');

      if (errorDiv) {
        errorDiv.remove();
      }
    } // Thêm hiệu ứng ripple cho buttons

  }, {
    key: "addRippleEffect",
    value: function addRippleEffect() {
      var buttons = document.querySelectorAll('.register-button, .password-toggle, .back-btn');
      buttons.forEach(function (button) {
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
        });
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
    } // Thêm hiệu ứng cho form row

  }, {
    key: "addFormRowEffects",
    value: function addFormRowEffects() {
      var formRows = document.querySelectorAll('.form-row');
      formRows.forEach(function (row, index) {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        setTimeout(function () {
          row.style.transition = 'all 0.6s ease';
          row.style.opacity = '1';
          row.style.transform = 'translateY(0)';
        }, (index + 1) * 200);
      });
    }
  }]);

  return RegisterEffects;
}(); // CSS animations


exports.RegisterEffects = RegisterEffects;
var style = document.createElement('style');
style.textContent = "\n  @keyframes logoBounce {\n    0% { transform: scale(1) rotate(0deg); }\n    50% { transform: scale(1.2) rotate(10deg); }\n    100% { transform: scale(1) rotate(0deg); }\n  }\n  \n  @keyframes ripple {\n    to {\n      transform: scale(4);\n      opacity: 0;\n    }\n  }\n  \n  @keyframes slideDown {\n    from {\n      opacity: 0;\n      transform: translateY(-10px);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n  \n  @keyframes slideUp {\n    from {\n      opacity: 1;\n      transform: translateY(0);\n    }\n    to {\n      opacity: 0;\n      transform: translateY(-10px);\n    }\n  }\n  \n  .field-error {\n    color: #ef4444;\n    font-size: 12px;\n    margin-top: 5px;\n    animation: slideDown 0.3s ease;\n  }\n  \n  .loading-spinner {\n    display: inline-block;\n    width: 16px;\n    height: 16px;\n    border: 2px solid rgba(255, 255, 255, 0.3);\n    border-radius: 50%;\n    border-top-color: white;\n    animation: spin 1s ease-in-out infinite;\n    margin-right: 8px;\n  }\n  \n  @keyframes spin {\n    to { transform: rotate(360deg); }\n  }\n";
document.head.appendChild(style);
var _default = RegisterEffects;
exports["default"] = _default;