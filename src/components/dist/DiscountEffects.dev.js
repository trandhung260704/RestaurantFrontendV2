"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DiscountEffects =
/*#__PURE__*/
function () {
  function DiscountEffects() {
    _classCallCheck(this, DiscountEffects);

    this.isInitialized = false;
  }

  _createClass(DiscountEffects, [{
    key: "addTableEffects",
    value: function addTableEffects() {
      var _this = this;

      var tableRows = document.querySelectorAll('.discount-row');
      tableRows.forEach(function (row, index) {
        row.addEventListener('mouseenter', function () {
          row.style.background = 'rgba(255, 255, 255, 0.1)';
          row.style.transform = 'translateX(5px)';
        });
        row.addEventListener('mouseleave', function () {
          row.style.background = 'transparent';
          row.style.transform = 'translateX(0)';
        });
        row.addEventListener('click', function (e) {
          _this.createRippleEffect(e, row);
        });
      });
    }
  }, {
    key: "addSearchEffects",
    value: function addSearchEffects() {
      var searchInput = document.querySelector('.search-input');
      if (!searchInput) return;
      searchInput.addEventListener('input', function () {
        if (searchInput.value.length > 0) {
          searchInput.style.borderColor = 'rgba(74, 222, 128, 0.5)';
          searchInput.style.background = 'rgba(255, 255, 255, 0.15)';
        } else {
          searchInput.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          searchInput.style.background = 'rgba(255, 255, 255, 0.1)';
        }
      });
      searchInput.addEventListener('focus', function () {
        searchInput.style.transform = 'translateY(-2px)';
        searchInput.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
      });
      searchInput.addEventListener('blur', function () {
        searchInput.style.transform = 'translateY(0)';
        searchInput.style.boxShadow = 'none';
      });
    }
  }, {
    key: "addHeaderEffects",
    value: function addHeaderEffects() {
      var header = document.querySelector('.discount-header');
      if (!header) return;
      window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
          header.style.background = 'rgba(255, 255, 255, 0.15)';
          header.style.backdropFilter = 'blur(25px)';
        } else {
          header.style.background = 'rgba(255, 255, 255, 0.1)';
          header.style.backdropFilter = 'blur(20px)';
        }
      });
    }
  }, {
    key: "addMessageEffects",
    value: function addMessageEffects() {
      var messages = document.querySelectorAll('.discount-message');
      messages.forEach(function (message) {
        setTimeout(function () {
          message.style.animation = 'slideUp 0.3s ease';
          setTimeout(function () {
            message.remove();
          }, 300);
        }, 5000);
        message.addEventListener('click', function () {
          message.style.animation = 'slideUp 0.3s ease';
          setTimeout(function () {
            message.remove();
          }, 300);
        });
      });
    }
  }, {
    key: "addLogoEffects",
    value: function addLogoEffects() {
      var _this2 = this;

      var logo = document.querySelector('.discount-logo');
      if (!logo) return;
      logo.addEventListener('mouseenter', function () {
        logo.style.transform = 'scale(1.1) rotate(5deg)';
      });
      logo.addEventListener('mouseleave', function () {
        logo.style.transform = 'scale(1) rotate(0deg)';
      });
      logo.addEventListener('click', function (e) {
        _this2.createRippleEffect(e, logo);
      });
    }
  }, {
    key: "addUserInfoEffects",
    value: function addUserInfoEffects() {
      var userInfo = document.querySelector('.user-info');
      if (!userInfo) return;
      userInfo.addEventListener('mouseenter', function () {
        userInfo.style.background = 'rgba(255, 255, 255, 0.2)';
        userInfo.style.transform = 'translateY(-2px)';
      });
      userInfo.addEventListener('mouseleave', function () {
        userInfo.style.background = 'rgba(255, 255, 255, 0.1)';
        userInfo.style.transform = 'translateY(0)';
      });
    }
  }, {
    key: "addFormEffects",
    value: function addFormEffects() {
      var formGroups = document.querySelectorAll('.form-group input');
      formGroups.forEach(function (input) {
        input.addEventListener('focus', function () {
          input.style.boxShadow = '0 8px 25px rgba(59,130,246,0.15)';
          input.style.borderColor = '#6366f1';
        });
        input.addEventListener('blur', function () {
          input.style.boxShadow = 'none';
          input.style.borderColor = '#ccc';
        });
      });
    }
  }, {
    key: "addRippleStyles",
    value: function addRippleStyles() {
      if (!document.getElementById('ripple-styles-discount')) {
        var style = document.createElement('style');
        style.id = 'ripple-styles-discount';
        style.textContent = "\n        .ripple {\n          position: absolute;\n          border-radius: 50%;\n          background: rgba(255, 255, 255, 0.3);\n          transform: scale(0);\n          animation: ripple-animation 0.6s linear;\n          pointer-events: none;\n        }\n        @keyframes ripple-animation {\n          to {\n            transform: scale(4);\n            opacity: 0;\n          }\n        }\n        @keyframes slideUp {\n          from {\n            transform: translateY(0);\n            opacity: 1;\n          }\n          to {\n            transform: translateY(-100%);\n            opacity: 0;\n          }\n        }\n      ";
        document.head.appendChild(style);
      }
    }
  }, {
    key: "createRippleEffect",
    value: function createRippleEffect(event, element) {
      var ripple = document.createElement('span');
      var rect = element.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var x = event.clientX - rect.left - size / 2;
      var y = event.clientY - rect.top - size / 2;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      element.appendChild(ripple);
      setTimeout(function () {
        ripple.remove();
      }, 600);
    }
  }]);

  return DiscountEffects;
}();

var _default = DiscountEffects;
exports["default"] = _default;