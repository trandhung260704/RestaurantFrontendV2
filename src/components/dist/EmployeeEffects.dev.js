"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EmployeeEffects =
/*#__PURE__*/
function () {
  function EmployeeEffects() {
    _classCallCheck(this, EmployeeEffects);

    this.init();
  }

  _createClass(EmployeeEffects, [{
    key: "init",
    value: function init() {
      this.addRippleEffects();
      this.addHoverEffects();
    }
  }, {
    key: "addTableEffects",
    value: function addTableEffects() {
      var _this = this;

      var tableRows = document.querySelectorAll('.employee-row');
      tableRows.forEach(function (row, index) {
        row.style.animationDelay = "".concat(index * 0.1, "s");
        row.addEventListener('mouseenter', function () {
          row.style.transform = 'translateX(5px) scale(1.01)';
          row.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });
        row.addEventListener('mouseleave', function () {
          row.style.transform = 'translateX(0) scale(1)';
          row.style.boxShadow = 'none';
        });
        row.addEventListener('click', function (e) {
          _this.createRipple(e, row);
        });
      });
    }
  }, {
    key: "addSearchEffects",
    value: function addSearchEffects() {
      var _this2 = this;

      var searchInput = document.querySelector('.search-input');
      var clearBtn = document.querySelector('.clear-search-btn');

      if (searchInput) {
        searchInput.addEventListener('focus', function () {
          searchInput.style.transform = 'translateY(-2px)';
          searchInput.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });
        searchInput.addEventListener('blur', function () {
          searchInput.style.transform = 'translateY(0)';
          searchInput.style.boxShadow = 'none';
        });
        searchInput.addEventListener('input', function () {
          searchInput.style.borderColor = 'rgba(255, 255, 255, 0.8)';
          setTimeout(function () {
            searchInput.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          }, 300);
        });
      }

      if (clearBtn) {
        clearBtn.addEventListener('click', function (e) {
          _this2.createRipple(e, clearBtn);
        });
      }
    }
  }, {
    key: "addHeaderEffects",
    value: function addHeaderEffects() {
      var header = document.querySelector('.employee-header');
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
      var messages = document.querySelectorAll('.employee-message');
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
      var _this3 = this;

      var logo = document.querySelector('.employee-logo');
      if (!logo) return;
      logo.addEventListener('mouseenter', function () {
        logo.style.transform = 'scale(1.1) rotate(5deg)';
      });
      logo.addEventListener('mouseleave', function () {
        logo.style.transform = 'scale(1) rotate(0deg)';
      });
      logo.addEventListener('click', function (e) {
        _this3.createRipple(e, logo);
      });
    }
  }, {
    key: "addUserInfoEffects",
    value: function addUserInfoEffects() {
      var _this4 = this;

      var userInfo = document.querySelector('.user-info');
      var backBtn = document.querySelector('.back-btn');

      if (userInfo) {
        userInfo.addEventListener('mouseenter', function () {
          userInfo.style.transform = 'translateY(-2px)';
          userInfo.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });
        userInfo.addEventListener('mouseleave', function () {
          userInfo.style.transform = 'translateY(0)';
          userInfo.style.boxShadow = 'none';
        });
      }

      if (backBtn) {
        backBtn.addEventListener('click', function (e) {
          _this4.createRipple(e, backBtn);
        });
      }
    }
  }, {
    key: "addRippleEffects",
    value: function addRippleEffects() {
      var _this5 = this;

      var buttons = document.querySelectorAll('button');
      buttons.forEach(function (button) {
        button.addEventListener('click', function (e) {
          _this5.createRipple(e, button);
        });
      });
    }
  }, {
    key: "addHoverEffects",
    value: function addHoverEffects() {
      var cards = document.querySelectorAll('.stat-card, .summary-card');
      cards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
          card.style.transform = 'translateY(-3px)';
          card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
        card.addEventListener('mouseleave', function () {
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = 'none';
        });
      });
    }
  }, {
    key: "createRipple",
    value: function createRipple(event, element) {
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
  }, {
    key: "addRippleStyles",
    value: function addRippleStyles() {
      if (!document.getElementById('ripple-styles')) {
        var style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = "\n        .ripple {\n          position: absolute;\n          border-radius: 50%;\n          background: rgba(255, 255, 255, 0.3);\n          transform: scale(0);\n          animation: ripple-animation 0.6s linear;\n          pointer-events: none;\n        }\n\n        @keyframes ripple-animation {\n          to {\n            transform: scale(4);\n            opacity: 0;\n          }\n        }\n\n        @keyframes slideUp {\n          from {\n            transform: translateY(0);\n            opacity: 1;\n          }\n          to {\n            transform: translateY(-100%);\n            opacity: 0;\n          }\n        }\n      ";
        document.head.appendChild(style);
      }
    }
  }]);

  return EmployeeEffects;
}();

var _default = EmployeeEffects;
exports["default"] = _default;