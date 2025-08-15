"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.IngredientEffects = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Ingredient Effects Component
var IngredientEffects =
/*#__PURE__*/
function () {
  function IngredientEffects() {
    _classCallCheck(this, IngredientEffects);

    this.init();
  }

  _createClass(IngredientEffects, [{
    key: "init",
    value: function init() {
      this.addTableAnimations();
      this.addFormEffects();
      this.addSearchEffects();
      this.addButtonEffects();
      this.addMessageEffects();
      this.addLogoEffects();
      this.addUserInfoEffects();
    }
  }, {
    key: "addTableAnimations",
    value: function addTableAnimations() {
      var rows = document.querySelectorAll('.ingredient-row');
      rows.forEach(function (row, index) {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-30px)';
        setTimeout(function () {
          row.style.transition = 'all 0.6s ease';
          row.style.opacity = '1';
          row.style.transform = 'translateX(0)';
        }, index * 100);
        row.addEventListener('mouseenter', function () {
          row.style.transform = 'translateX(8px) scale(1.01)';
          row.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        });
        row.addEventListener('mouseleave', function () {
          row.style.transform = 'translateX(0) scale(1)';
          row.style.boxShadow = 'none';
        });
      });
    }
  }, {
    key: "addFormEffects",
    value: function addFormEffects() {
      var form = document.querySelector('.ingredient-form');
      var inputs = document.querySelectorAll('.form-input');
      if (!form) return;
      form.style.opacity = '0';
      form.style.transform = 'translateY(30px)';
      setTimeout(function () {
        form.style.transition = 'all 0.8s ease';
        form.style.opacity = '1';
        form.style.transform = 'translateY(0)';
      }, 300);
      inputs.forEach(function (input, index) {
        input.style.opacity = '0';
        input.style.transform = 'translateY(20px)';
        setTimeout(function () {
          input.style.transition = 'all 0.6s ease';
          input.style.opacity = '1';
          input.style.transform = 'translateY(0)';
        }, 500 + index * 100);
        input.addEventListener('focus', function () {
          input.parentElement.style.transform = 'scale(1.02)';
          input.parentElement.style.transition = 'transform 0.3s ease';
        });
        input.addEventListener('blur', function () {
          input.parentElement.style.transform = 'scale(1)';
        });
        input.addEventListener('input', function () {
          if (input.value.length > 0) {
            input.style.borderColor = '#667eea';
            input.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
          } else {
            input.style.borderColor = '#e5e7eb';
            input.style.boxShadow = 'none';
          }
        });
      });
    }
  }, {
    key: "addSearchEffects",
    value: function addSearchEffects() {
      var searchInput = document.querySelector('.search-input');
      var searchBox = document.querySelector('.search-box');
      if (!searchInput) return;
      searchInput.addEventListener('focus', function () {
        searchBox.style.transform = 'scale(1.02)';
        searchBox.style.transition = 'transform 0.3s ease';
      });
      searchInput.addEventListener('blur', function () {
        searchBox.style.transform = 'scale(1)';
      });
      searchInput.addEventListener('input', function () {
        if (searchInput.value.length > 0) {
          searchInput.style.borderColor = '#667eea';
          searchInput.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
        } else {
          searchInput.style.borderColor = '#e5e7eb';
          searchInput.style.boxShadow = 'none';
        }
      });
    }
  }, {
    key: "addButtonEffects",
    value: function addButtonEffects() {
      var _this = this;

      var buttons = document.querySelectorAll('.edit-btn, .delete-btn, .back-btn, .search-btn, .reset-btn, .submit-btn, .cancel-btn, .pagination-btn');
      buttons.forEach(function (button) {
        button.addEventListener('click', function (e) {
          _this.createRippleEffect(e, button);
        });

        if (button.classList.contains('edit-btn')) {
          button.addEventListener('mouseenter', function () {
            button.style.transform = 'scale(1.1)';
          });
          button.addEventListener('mouseleave', function () {
            button.style.transform = 'scale(1)';
          });
        }

        if (button.classList.contains('delete-btn')) {
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

        if (button.classList.contains('search-btn')) {
          button.addEventListener('mouseenter', function () {
            button.style.transform = 'scale(1.05)';
          });
          button.addEventListener('mouseleave', function () {
            button.style.transform = 'scale(1)';
          });
        }
      });
    }
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
    }
  }, {
    key: "addMessageEffects",
    value: function addMessageEffects() {
      var messages = document.querySelectorAll('.ingredient-message');
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
      var logo = document.querySelector('.ingredient-logo');
      if (!logo) return;
      logo.addEventListener('mouseenter', function () {
        logo.style.animation = 'logoBounce 0.6s ease-in-out';
      });
      logo.addEventListener('animationend', function () {
        logo.style.animation = '';
      });
    }
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
    }
  }, {
    key: "addPaginationEffects",
    value: function addPaginationEffects() {
      var paginationBtns = document.querySelectorAll('.pagination-btn');
      paginationBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var tableContainer = document.querySelector('.ingredients-table-container');

          if (tableContainer) {
            tableContainer.style.opacity = '0.5';
            tableContainer.style.transition = 'opacity 0.3s ease';
            setTimeout(function () {
              tableContainer.style.opacity = '1';
            }, 500);
          }
        });
      });
    }
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
      var tableHeader = document.querySelector('.ingredients-table thead');
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
    key: "addIngredientIdEffects",
    value: function addIngredientIdEffects() {
      var ingredientIds = document.querySelectorAll('.ingredient-id');
      ingredientIds.forEach(function (id) {
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
    key: "addIngredientPriceEffects",
    value: function addIngredientPriceEffects() {
      var ingredientPrices = document.querySelectorAll('.ingredient-price');
      ingredientPrices.forEach(function (price) {
        price.addEventListener('mouseenter', function () {
          price.style.transform = 'scale(1.1)';
          price.style.transition = 'transform 0.3s ease';
        });
        price.addEventListener('mouseleave', function () {
          price.style.transform = 'scale(1)';
        });
      });
    }
  }, {
    key: "addFormActionsEffects",
    value: function addFormActionsEffects() {
      var formActions = document.querySelector('.form-actions');
      if (!formActions) return;
      formActions.style.opacity = '0';
      formActions.style.transform = 'translateY(20px)';
      setTimeout(function () {
        formActions.style.transition = 'all 0.6s ease';
        formActions.style.opacity = '1';
        formActions.style.transform = 'translateY(0)';
      }, 800);
    }
  }]);

  return IngredientEffects;
}();

exports.IngredientEffects = IngredientEffects;
var style = document.createElement('style');
style.textContent = "\n  @keyframes ripple {\n    to {\n      transform: scale(4);\n      opacity: 0;\n    }\n  }\n  \n  @keyframes slideDown {\n    from {\n      opacity: 0;\n      transform: translateY(-10px);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n  \n  @keyframes slideUp {\n    from {\n      opacity: 1;\n      transform: translateY(0);\n    }\n    to {\n      opacity: 0;\n      transform: translateY(-10px);\n    }\n  }\n  \n  @keyframes slideInUp {\n    from {\n      opacity: 0;\n      transform: translateY(20px);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n  \n  @keyframes slideInLeft {\n    from {\n      opacity: 0;\n      transform: translateX(-20px);\n    }\n    to {\n      opacity: 1;\n      transform: translateX(0);\n    }\n  }\n  \n  @keyframes logoBounce {\n    0% { transform: scale(1) rotate(0deg); }\n    50% { transform: scale(1.2) rotate(10deg); }\n    100% { transform: scale(1) rotate(0deg); }\n  }\n  \n  @keyframes float {\n    0%, 100% { transform: translateY(0px); }\n    50% { transform: translateY(-10px); }\n  }\n  \n  @keyframes spin {\n    to { transform: rotate(360deg); }\n  }\n  \n  .loading-spinner {\n    display: inline-block;\n    width: 16px;\n    height: 16px;\n    border: 2px solid rgba(255, 255, 255, 0.3);\n    border-radius: 50%;\n    border-top-color: white;\n    animation: spin 1s ease-in-out infinite;\n    margin-right: 8px;\n  }\n";
document.head.appendChild(style);
var _default = IngredientEffects;
exports["default"] = _default;