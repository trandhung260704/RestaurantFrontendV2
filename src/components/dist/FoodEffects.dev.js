"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FoodEffects =
/*#__PURE__*/
function () {
  function FoodEffects() {
    _classCallCheck(this, FoodEffects);

    this.isInitialized = false;
  }

  _createClass(FoodEffects, [{
    key: "addFormEffects",
    value: function addFormEffects() {
      var form = document.querySelector('.food-form');
      if (!form) return;
      var inputs = form.querySelectorAll('.form-input');
      inputs.forEach(function (input) {
        input.addEventListener('focus', function () {
          input.style.transform = 'translateY(-2px)';
          input.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });
        input.addEventListener('blur', function () {
          input.style.transform = 'translateY(0)';
          input.style.boxShadow = 'none';
        });
        input.addEventListener('input', function () {
          if (input.value.length > 0) {
            input.style.borderColor = 'rgba(74, 222, 128, 0.5)';
          } else {
            input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          }
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
    key: "addButtonEffects",
    value: function addButtonEffects() {
      var _this = this;

      var buttons = document.querySelectorAll('.add-ingredient-btn, .remove-ingredient-btn, .back-btn, .submit-btn, .pagination-btn');
      buttons.forEach(function (button) {
        button.addEventListener('click', function (e) {
          _this.createRippleEffect(e, button);
        });

        if (button.classList.contains('add-ingredient-btn')) {
          button.addEventListener('mouseenter', function () {
            button.style.transform = 'scale(1.05)';
            button.style.boxShadow = '0 8px 25px rgba(74, 222, 128, 0.4)';
          });
          button.addEventListener('mouseleave', function () {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = 'none';
          });
        }

        if (button.classList.contains('remove-ingredient-btn')) {
          button.addEventListener('mouseenter', function () {
            button.style.transform = 'scale(1.1)';
            button.style.background = 'rgba(239, 68, 68, 0.3)';
          });
          button.addEventListener('mouseleave', function () {
            button.style.transform = 'scale(1)';
            button.style.background = 'rgba(239, 68, 68, 0.2)';
          });
        }

        if (button.classList.contains('submit-btn')) {
          button.addEventListener('mouseenter', function () {
            if (!button.disabled) {
              button.style.transform = 'translateY(-3px)';
              button.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
            }
          });
          button.addEventListener('mouseleave', function () {
            if (!button.disabled) {
              button.style.transform = 'translateY(0)';
              button.style.boxShadow = 'none';
            }
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
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      button.appendChild(ripple);
      setTimeout(function () {
        ripple.remove();
      }, 600);
    } // Thêm hiệu ứng cho message

  }, {
    key: "addMessageEffects",
    value: function addMessageEffects() {
      var messages = document.querySelectorAll('.food-message');
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
    } // Thêm hiệu ứng cho logo

  }, {
    key: "addLogoEffects",
    value: function addLogoEffects() {
      var logo = document.querySelector('.food-logo');
      if (!logo) return;
      logo.addEventListener('mouseenter', function () {
        logo.style.transform = 'scale(1.1) rotate(5deg)';
      });
      logo.addEventListener('mouseleave', function () {
        logo.style.transform = 'scale(1) rotate(0deg)';
      });
    } // Thêm hiệu ứng cho user info

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
    } // Thêm hiệu ứng cho ingredient cards

  }, {
    key: "addIngredientEffects",
    value: function addIngredientEffects() {
      var ingredientCards = document.querySelectorAll('.ingredient-card');
      ingredientCards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
          card.style.background = 'rgba(255, 255, 255, 0.15)';
          card.style.transform = 'translateY(-5px)';
          card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        });
        card.addEventListener('mouseleave', function () {
          card.style.background = 'rgba(255, 255, 255, 0.1)';
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = 'none';
        });
      });
    } // Thêm hiệu ứng animation cho ingredient khi thêm

  }, {
    key: "addIngredientAnimation",
    value: function addIngredientAnimation(ingredientId) {
      var card = document.querySelector("[data-ingredient-id=\"".concat(ingredientId, "\"]"));

      if (card) {
        card.style.animation = 'pulse 0.6s ease';
        setTimeout(function () {
          card.style.animation = '';
        }, 600);
      }
    } // Thêm hiệu ứng cho selected ingredients

  }, {
    key: "addSelectedIngredientEffects",
    value: function addSelectedIngredientEffects() {
      var selectedItems = document.querySelectorAll('.selected-ingredient-item');
      selectedItems.forEach(function (item) {
        item.addEventListener('mouseenter', function () {
          item.style.background = 'rgba(255, 255, 255, 0.15)';
          item.style.transform = 'translateX(5px)';
        });
        item.addEventListener('mouseleave', function () {
          item.style.background = 'rgba(255, 255, 255, 0.1)';
          item.style.transform = 'translateX(0)';
        });
      });
    } // Thêm hiệu ứng cho quantity input

  }, {
    key: "addQuantityInputEffects",
    value: function addQuantityInputEffects() {
      var quantityInputs = document.querySelectorAll('.quantity-input');
      quantityInputs.forEach(function (input) {
        input.addEventListener('focus', function () {
          input.style.borderColor = 'rgba(74, 222, 128, 0.5)';
          input.style.background = 'rgba(255, 255, 255, 0.15)';
        });
        input.addEventListener('blur', function () {
          input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          input.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        input.addEventListener('input', function () {
          if (input.value > 0) {
            input.style.borderColor = 'rgba(74, 222, 128, 0.5)';
          } else {
            input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
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
          // Hiệu ứng loading cho ingredient grid
          var ingredientGrid = document.querySelector('.ingredient-grid');

          if (ingredientGrid) {
            ingredientGrid.style.opacity = '0.5';
            ingredientGrid.style.pointerEvents = 'none';
            setTimeout(function () {
              ingredientGrid.style.opacity = '1';
              ingredientGrid.style.pointerEvents = 'auto';
            }, 1000);
          }
        });
      });
    } // Thêm hiệu ứng cho form validation

  }, {
    key: "addFormValidationEffects",
    value: function addFormValidationEffects() {
      var form = document.querySelector('.food-form');
      if (!form) return;
      var requiredInputs = form.querySelectorAll('input[required], textarea[required]');
      requiredInputs.forEach(function (input) {
        input.addEventListener('blur', function () {
          if (!input.value.trim()) {
            input.style.borderColor = 'rgba(239, 68, 68, 0.5)';
            input.style.animation = 'shake 0.5s ease';
          } else {
            input.style.borderColor = 'rgba(74, 222, 128, 0.5)';
            input.style.animation = '';
          }
        });
      });
    } // Thêm hiệu ứng cho loading state

  }, {
    key: "addLoadingEffects",
    value: function addLoadingEffects() {
      var submitBtn = document.querySelector('.submit-btn');
      if (!submitBtn) return;
      submitBtn.addEventListener('click', function () {
        if (submitBtn.classList.contains('loading')) {
          // Hiệu ứng loading
          var overlay = document.createElement('div');
          overlay.className = 'loading-overlay';
          overlay.innerHTML = "\n          <div class=\"loading-spinner\"></div>\n          <p>\u0110ang x\u1EED l\xFD...</p>\n        ";
          document.body.appendChild(overlay);
        }
      });
    } // Thêm hiệu ứng cho empty state

  }, {
    key: "addEmptyStateEffects",
    value: function addEmptyStateEffects() {
      var ingredientGrid = document.querySelector('.ingredient-grid');

      if (ingredientGrid && ingredientGrid.children.length === 0) {
        var emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = "\n        <div class=\"empty-icon\">\uD83D\uDD0D</div>\n        <h3>Kh\xF4ng t\xECm th\u1EA5y nguy\xEAn li\u1EC7u</h3>\n        <p>Th\u1EED t\xECm ki\u1EBFm v\u1EDBi t\u1EEB kh\xF3a kh\xE1c</p>\n      ";
        ingredientGrid.appendChild(emptyState);
      }
    } // Thêm hiệu ứng cho section titles

  }, {
    key: "addSectionTitleEffects",
    value: function addSectionTitleEffects() {
      var sectionTitles = document.querySelectorAll('.section-title, .subsection-title');
      sectionTitles.forEach(function (title) {
        title.addEventListener('mouseenter', function () {
          title.style.transform = 'scale(1.02)';
          title.style.textShadow = '0 4px 8px rgba(0, 0, 0, 0.4)';
        });
        title.addEventListener('mouseleave', function () {
          title.style.transform = 'scale(1)';
          title.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
        });
      });
    } // Thêm hiệu ứng cho form actions

  }, {
    key: "addFormActionsEffects",
    value: function addFormActionsEffects() {
      var formActions = document.querySelector('.form-actions');
      if (!formActions) return;
      formActions.addEventListener('mouseenter', function () {
        formActions.style.transform = 'translateY(-2px)';
      });
      formActions.addEventListener('mouseleave', function () {
        formActions.style.transform = 'translateY(0)';
      });
    }
  }]);

  return FoodEffects;
}(); // CSS animations


var style = document.createElement('style');
style.textContent = "\n  @keyframes pulse {\n    0% { transform: scale(1); }\n    50% { transform: scale(1.05); }\n    100% { transform: scale(1); }\n  }\n\n  @keyframes shake {\n    0%, 100% { transform: translateX(0); }\n    25% { transform: translateX(-5px); }\n    75% { transform: translateX(5px); }\n  }\n\n  @keyframes slideUp {\n    from {\n      opacity: 1;\n      transform: translateY(0);\n    }\n    to {\n      opacity: 0;\n      transform: translateY(-20px);\n    }\n  }\n\n  .empty-state {\n    text-align: center;\n    padding: 3rem;\n    color: rgba(255, 255, 255, 0.7);\n  }\n\n  .empty-icon {\n    font-size: 3rem;\n    margin-bottom: 1rem;\n  }\n\n  .empty-state h3 {\n    color: white;\n    margin-bottom: 0.5rem;\n  }\n\n  .empty-state p {\n    margin: 0;\n    font-size: 0.9rem;\n  }\n";
document.head.appendChild(style);
var _default = FoodEffects;
exports["default"] = _default;