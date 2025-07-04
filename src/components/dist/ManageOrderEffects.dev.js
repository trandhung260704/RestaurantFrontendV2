"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ManageOrderEffects = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// ManageOrder Effects Component
var ManageOrderEffects =
/*#__PURE__*/
function () {
  function ManageOrderEffects() {
    _classCallCheck(this, ManageOrderEffects);

    this.init();
  }

  _createClass(ManageOrderEffects, [{
    key: "init",
    value: function init() {
      this.addTableAnimations();
      this.addSearchEffects();
      this.addButtonEffects();
      this.addMessageEffects();
      this.addStatusEffects();
      this.addLogoEffects();
      this.addUserInfoEffects();
    } // Thêm hiệu ứng animation cho table rows

  }, {
    key: "addTableAnimations",
    value: function addTableAnimations() {
      var rows = document.querySelectorAll('.order-row');
      rows.forEach(function (row, index) {
        // Hiệu ứng entrance
        row.style.opacity = '0';
        row.style.transform = 'translateX(-30px)';
        setTimeout(function () {
          row.style.transition = 'all 0.6s ease';
          row.style.opacity = '1';
          row.style.transform = 'translateX(0)';
        }, index * 100); // Hiệu ứng hover

        row.addEventListener('mouseenter', function () {
          row.style.transform = 'translateX(8px) scale(1.01)';
          row.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        });
        row.addEventListener('mouseleave', function () {
          row.style.transform = 'translateX(0) scale(1)';
          row.style.boxShadow = 'none';
        });
      });
    } // Thêm hiệu ứng cho search

  }, {
    key: "addSearchEffects",
    value: function addSearchEffects() {
      var searchInput = document.querySelector('.search-input');
      var searchBox = document.querySelector('.search-box');
      if (!searchInput) return; // Hiệu ứng focus

      searchInput.addEventListener('focus', function () {
        searchBox.style.transform = 'scale(1.02)';
        searchBox.style.transition = 'transform 0.3s ease';
      });
      searchInput.addEventListener('blur', function () {
        searchBox.style.transform = 'scale(1)';
      }); // Hiệu ứng typing

      searchInput.addEventListener('input', function () {
        if (searchInput.value.length > 0) {
          searchInput.style.borderColor = '#667eea';
          searchInput.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
        } else {
          searchInput.style.borderColor = '#e5e7eb';
          searchInput.style.boxShadow = 'none';
        }
      });
    } // Thêm hiệu ứng cho buttons

  }, {
    key: "addButtonEffects",
    value: function addButtonEffects() {
      var _this = this;

      var buttons = document.querySelectorAll('.delete-btn, .back-btn, .pagination-btn');
      buttons.forEach(function (button) {
        // Hiệu ứng click
        button.addEventListener('click', function (e) {
          _this.createRippleEffect(e, button);
        }); // Hiệu ứng hover cho các button khác nhau

        if (button.classList.contains('delete-btn')) {
          button.addEventListener('mouseenter', function () {
            button.style.transform = 'scale(1.1)';
          });
          button.addEventListener('mouseleave', function () {
            button.style.transform = 'scale(1)';
          });
        }

        if (button.classList.contains('back-btn')) {
          button.addEventListener('mouseenter', function () {
            button.style.transform = 'translateY(-4px)';
          });
          button.addEventListener('mouseleave', function () {
            button.style.transform = 'translateY(0)';
          });
        }
      });
    } // Tạo hiệu ứng ripple

  }, {
    key: "createRippleEffect",
    value: function createRippleEffect(event, button) {
      var ripple = document.createElement('span');
      var rect = button.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var x = event.clientX - rect.left - size / 2;
      var y = event.clientY - rect.top - size / 2;
      ripple.style.cssText = "\n      position: absolute;\n      width: ".concat(size, "px;\n      height: ").concat(size, "px;\n      left: ").concat(x, "px;\n      top: ").concat(y, "px;\n      background: rgba(255, 255, 255, 0.6);\n      border-radius: 50%;\n      transform: scale(0);\n      animation: ripple 0.6s linear;\n      pointer-events: none;\n    ");
      button.appendChild(ripple);
      setTimeout(function () {
        ripple.remove();
      }, 600);
    } // Thêm hiệu ứng cho message

  }, {
    key: "addMessageEffects",
    value: function addMessageEffects() {
      var messages = document.querySelectorAll('.manage-order-message');
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
    } // Thêm hiệu ứng cho status select

  }, {
    key: "addStatusEffects",
    value: function addStatusEffects() {
      var _this2 = this;

      var statusSelects = document.querySelectorAll('.status-select');
      statusSelects.forEach(function (select) {
        select.addEventListener('change', function () {
          // Hiệu ứng khi thay đổi status
          select.style.animation = 'statusChange 0.3s ease';
          setTimeout(function () {
            select.style.animation = '';
          }, 300); // Thay đổi màu sắc dựa trên status

          select.className = "status-select ".concat(_this2.getStatusClass(select.value));
        });
        select.addEventListener('focus', function () {
          select.style.transform = 'scale(1.02)';
          select.style.transition = 'transform 0.3s ease';
        });
        select.addEventListener('blur', function () {
          select.style.transform = 'scale(1)';
        });
      });
    } // Lấy class cho status

  }, {
    key: "getStatusClass",
    value: function getStatusClass(status) {
      switch (status) {
        case 'PENDING':
          return 'status-pending';

        case 'IN_PROGRESS':
          return 'status-progress';

        case 'COMPLETED':
          return 'status-completed';

        default:
          return 'status-pending';
      }
    } // Thêm hiệu ứng cho logo

  }, {
    key: "addLogoEffects",
    value: function addLogoEffects() {
      var logo = document.querySelector('.manage-order-logo');
      if (!logo) return;
      logo.addEventListener('mouseenter', function () {
        logo.style.animation = 'logoBounce 0.6s ease-in-out';
      });
      logo.addEventListener('animationend', function () {
        logo.style.animation = '';
      });
    } // Thêm hiệu ứng cho user info

  }, {
    key: "addUserInfoEffects",
    value: function addUserInfoEffects() {
      var userInfo = document.querySelector('.user-info');
      if (!userInfo) return;
      userInfo.addEventListener('mouseenter', function () {
        userInfo.style.transform = 'scale(1.05)';
        userInfo.style.transition = 'transform 0.3s ease';
      });
      userInfo.addEventListener('mouseleave', function () {
        userInfo.style.transform = 'scale(1)';
      });
    } // Thêm hiệu ứng cho pagination

  }, {
    key: "addPaginationEffects",
    value: function addPaginationEffects() {
      var paginationBtns = document.querySelectorAll('.pagination-btn');
      paginationBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          // Hiệu ứng loading cho table
          var tableContainer = document.querySelector('.orders-table-container');

          if (tableContainer) {
            tableContainer.style.opacity = '0.5';
            tableContainer.style.transition = 'opacity 0.3s ease';
            setTimeout(function () {
              tableContainer.style.opacity = '1';
            }, 500);
          }
        });
      });
    } // Thêm hiệu ứng cho empty state

  }, {
    key: "addEmptyStateEffects",
    value: function addEmptyStateEffects() {
      var emptyState = document.querySelector('.empty-state');
      if (!emptyState) return;
      var emptyIcon = emptyState.querySelector('.empty-icon');

      if (emptyIcon) {
        emptyIcon.style.animation = 'float 3s ease-in-out infinite';
      }
    }
  }, {
    key: "addTableHeaderEffects",
    value: function addTableHeaderEffects() {
      var tableHeader = document.querySelector('.orders-table thead');
      if (!tableHeader) return;
      tableHeader.style.opacity = '0';
      tableHeader.style.transform = 'translateY(-20px)';
      setTimeout(function () {
        tableHeader.style.transition = 'all 0.6s ease';
        tableHeader.style.opacity = '1';
        tableHeader.style.transform = 'translateY(0)';
      }, 200);
    }
  }, {
    key: "addOrderIdEffects",
    value: function addOrderIdEffects() {
      var orderIds = document.querySelectorAll('.order-id');
      orderIds.forEach(function (id) {
        id.addEventListener('mouseenter', function () {
          id.style.color = '#4f46e5';
          id.style.transform = 'scale(1.1)';
          id.style.transition = 'all 0.3s ease';
        });
        id.addEventListener('mouseleave', function () {
          id.style.color = '#667eea';
          id.style.transform = 'scale(1)';
        });
      });
    }
  }, {
    key: "addTotalPriceEffects",
    value: function addTotalPriceEffects() {
      var totalPrices = document.querySelectorAll('.order-total');
      totalPrices.forEach(function (price) {
        price.addEventListener('mouseenter', function () {
          price.style.transform = 'scale(1.1)';
          price.style.transition = 'transform 0.3s ease';
        });
        price.addEventListener('mouseleave', function () {
          price.style.transform = 'scale(1)';
        });
      });
    }
  }]);

  return ManageOrderEffects;
}();

exports.ManageOrderEffects = ManageOrderEffects;
var style = document.createElement('style');
style.textContent = "\n  @keyframes ripple {\n    to {\n      transform: scale(4);\n      opacity: 0;\n    }\n  }\n  \n  @keyframes slideDown {\n    from {\n      opacity: 0;\n      transform: translateY(-10px);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n  \n  @keyframes slideUp {\n    from {\n      opacity: 1;\n      transform: translateY(0);\n    }\n    to {\n      opacity: 0;\n      transform: translateY(-10px);\n    }\n  }\n  \n  @keyframes slideInUp {\n    from {\n      opacity: 0;\n      transform: translateY(20px);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n  \n  @keyframes slideInLeft {\n    from {\n      opacity: 0;\n      transform: translateX(-20px);\n    }\n    to {\n      opacity: 1;\n      transform: translateX(0);\n    }\n  }\n  \n  @keyframes logoBounce {\n    0% { transform: scale(1) rotate(0deg); }\n    50% { transform: scale(1.2) rotate(10deg); }\n    100% { transform: scale(1) rotate(0deg); }\n  }\n  \n  @keyframes statusChange {\n    0% { transform: scale(1); }\n    50% { transform: scale(1.05); }\n    100% { transform: scale(1); }\n  }\n  \n  @keyframes float {\n    0%, 100% { transform: translateY(0px); }\n    50% { transform: translateY(-10px); }\n  }\n  \n  @keyframes spin {\n    to { transform: rotate(360deg); }\n  }\n  \n  .loading-spinner {\n    display: inline-block;\n    width: 16px;\n    height: 16px;\n    border: 2px solid rgba(255, 255, 255, 0.3);\n    border-radius: 50%;\n    border-top-color: white;\n    animation: spin 1s ease-in-out infinite;\n    margin-right: 8px;\n  }\n";
document.head.appendChild(style);
var _default = ManageOrderEffects;
exports["default"] = _default;