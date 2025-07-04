"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.OrderEffects = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OrderEffects =
/*#__PURE__*/
function () {
  function OrderEffects() {
    _classCallCheck(this, OrderEffects);

    this.init();
  }

  _createClass(OrderEffects, [{
    key: "init",
    value: function init() {
      this.addCardAnimations();
      this.addSearchEffects();
      this.addButtonEffects();
      this.addMessageEffects();
    } // Thêm hiệu ứng animation cho food cards

  }, {
    key: "addCardAnimations",
    value: function addCardAnimations() {
      var cards = document.querySelectorAll('.food-card');
      cards.forEach(function (card, index) {
        // Hiệu ứng entrance
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(function () {
          card.style.transition = 'all 0.6s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100); // Hiệu ứng hover

        card.addEventListener('mouseenter', function () {
          card.style.transform = 'translateY(-8px) scale(1.02)';
          card.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.2)';
        });
        card.addEventListener('mouseleave', function () {
          card.style.transform = 'translateY(0) scale(1)';
          card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
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

      var buttons = document.querySelectorAll('.add-food-btn, .submit-btn, .back-btn, .remove-btn, .pagination-btn');
      buttons.forEach(function (button) {
        // Hiệu ứng click
        button.addEventListener('click', function (e) {
          _this.createRippleEffect(e, button);
        }); // Hiệu ứng hover cho các button khác nhau

        if (button.classList.contains('add-food-btn')) {
          button.addEventListener('mouseenter', function () {
            button.style.transform = 'scale(1.1)';
          });
          button.addEventListener('mouseleave', function () {
            button.style.transform = 'scale(1)';
          });
        }

        if (button.classList.contains('submit-btn')) {
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
      var messages = document.querySelectorAll('.order-message');
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
    } // Thêm hiệu ứng khi thêm item vào giỏ hàng

  }, {
    key: "addItemAnimation",
    value: function addItemAnimation(foodId) {
      var card = document.querySelector("[data-food-id=\"".concat(foodId, "\"]"));
      if (!card) return; // Hiệu ứng pulse

      card.style.animation = 'pulse 0.6s ease-in-out';
      setTimeout(function () {
        card.style.animation = '';
      }, 600); // Hiệu ứng cho selected items

      var selectedItems = document.querySelectorAll('.selected-item');
      selectedItems.forEach(function (item, index) {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(function () {
          item.style.transition = 'all 0.4s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, index * 100);
      });
    } // Thêm hiệu ứng cho quantity input

  }, {
    key: "addQuantityEffects",
    value: function addQuantityEffects() {
      var quantityInputs = document.querySelectorAll('.quantity-input');
      quantityInputs.forEach(function (input) {
        input.addEventListener('focus', function () {
          input.style.borderColor = '#667eea';
          input.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
        });
        input.addEventListener('blur', function () {
          input.style.borderColor = '#e5e7eb';
          input.style.boxShadow = 'none';
        });
        input.addEventListener('input', function () {
          if (input.value > 0) {
            input.style.borderColor = '#10b981';
            input.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
          } else {
            input.style.borderColor = '#ef4444';
            input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
          }
        });
      });
    } // Thêm hiệu ứng cho pagination

  }, {
    key: "addPaginationEffects",
    value: function addPaginationEffects() {
      var paginationBtns = document.querySelectorAll('.pagination-btn');
      paginationBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          // Hiệu ứng loading cho food grid
          var foodGrid = document.querySelector('.food-grid');

          if (foodGrid) {
            foodGrid.style.opacity = '0.5';
            foodGrid.style.transition = 'opacity 0.3s ease';
            setTimeout(function () {
              foodGrid.style.opacity = '1';
            }, 500);
          }
        });
      });
    } // Thêm hiệu ứng cho logo

  }, {
    key: "addLogoEffects",
    value: function addLogoEffects() {
      var logo = document.querySelector('.order-logo');
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
    } // Thêm hiệu ứng cho total price

  }, {
    key: "addTotalPriceEffects",
    value: function addTotalPriceEffects() {
      var totalAmount = document.querySelector('.total-amount');
      if (!totalAmount) return; // Hiệu ứng khi giá thay đổi

      var observer = new MutationObserver(function () {
        totalAmount.style.animation = 'priceUpdate 0.3s ease';
        setTimeout(function () {
          totalAmount.style.animation = '';
        }, 300);
      });
      observer.observe(totalAmount, {
        childList: true,
        subtree: true
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
  }]);

  return OrderEffects;
}(); // CSS animations


exports.OrderEffects = OrderEffects;
var style = document.createElement('style');
style.textContent = "\n  @keyframes ripple {\n    to {\n      transform: scale(4);\n      opacity: 0;\n    }\n  }\n  \n  @keyframes slideDown {\n    from {\n      opacity: 0;\n      transform: translateY(-10px);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n  \n  @keyframes slideUp {\n    from {\n      opacity: 1;\n      transform: translateY(0);\n    }\n    to {\n      opacity: 0;\n      transform: translateY(-10px);\n    }\n  }\n  \n  @keyframes slideInUp {\n    from {\n      opacity: 0;\n      transform: translateY(20px);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n  \n  @keyframes slideInLeft {\n    from {\n      opacity: 0;\n      transform: translateX(-20px);\n    }\n    to {\n      opacity: 1;\n      transform: translateX(0);\n    }\n  }\n  \n  @keyframes pulse {\n    0% { transform: scale(1); }\n    50% { transform: scale(1.05); }\n    100% { transform: scale(1); }\n  }\n  \n  @keyframes logoBounce {\n    0% { transform: scale(1) rotate(0deg); }\n    50% { transform: scale(1.2) rotate(10deg); }\n    100% { transform: scale(1) rotate(0deg); }\n  }\n  \n  @keyframes priceUpdate {\n    0% { transform: scale(1); }\n    50% { transform: scale(1.1); }\n    100% { transform: scale(1); }\n  }\n  \n  @keyframes float {\n    0%, 100% { transform: translateY(0px); }\n    50% { transform: translateY(-10px); }\n  }\n  \n  @keyframes spin {\n    to { transform: rotate(360deg); }\n  }\n  \n  .loading-spinner {\n    display: inline-block;\n    width: 16px;\n    height: 16px;\n    border: 2px solid rgba(255, 255, 255, 0.3);\n    border-radius: 50%;\n    border-top-color: white;\n    animation: spin 1s ease-in-out infinite;\n    margin-right: 8px;\n  }\n";
document.head.appendChild(style);
var _default = OrderEffects;
exports["default"] = _default;