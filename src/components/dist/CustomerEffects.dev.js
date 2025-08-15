"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomerEffects =
/*#__PURE__*/
function () {
  function CustomerEffects() {
    _classCallCheck(this, CustomerEffects);

    this.isInitialized = false;
  }

  _createClass(CustomerEffects, [{
    key: "addTableEffects",
    value: function addTableEffects() {
      var _this = this;

      var tableRows = document.querySelectorAll('.customer-row');
      tableRows.forEach(function (row, index) {
        row.addEventListener('mouseenter', function () {
          row.style.background = 'rgba(255, 255, 255, 0.1)';
          row.style.transform = 'translateX(5px)';
        });
        row.addEventListener('mouseleave', function () {
          row.style.background = 'transparent';
          row.style.transform = 'translateX(0)';
        });
        row.addEventListener('click', function () {
          _this.createRippleEffect(row);
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
      var header = document.querySelector('.customer-header');
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
      var messages = document.querySelectorAll('.customer-message');
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
      var logo = document.querySelector('.customer-logo');
      if (!logo) return;
      logo.addEventListener('mouseenter', function () {
        logo.style.transform = 'scale(1.1) rotate(5deg)';
      });
      logo.addEventListener('mouseleave', function () {
        logo.style.transform = 'scale(1) rotate(0deg)';
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
    } // Thêm hiệu ứng cho stat cards

  }, {
    key: "addStatCardEffects",
    value: function addStatCardEffects() {
      var statCards = document.querySelectorAll('.stat-card');
      statCards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
          card.style.background = 'rgba(255, 255, 255, 0.15)';
          card.style.transform = 'translateY(-3px)';
          card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
        card.addEventListener('mouseleave', function () {
          card.style.background = 'rgba(255, 255, 255, 0.1)';
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = 'none';
        });
      });
    } // Thêm hiệu ứng cho clear search button

  }, {
    key: "addClearSearchEffects",
    value: function addClearSearchEffects() {
      var _this2 = this;

      var clearButtons = document.querySelectorAll('.clear-search-btn');
      clearButtons.forEach(function (button) {
        button.addEventListener('mouseenter', function () {
          button.style.background = 'rgba(239, 68, 68, 0.3)';
          button.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', function () {
          button.style.background = 'rgba(239, 68, 68, 0.2)';
          button.style.transform = 'translateY(0)';
        });
        button.addEventListener('click', function (e) {
          _this2.createRippleEffect(e, button);
        });
      });
    } // Thêm hiệu ứng cho status badges

  }, {
    key: "addStatusBadgeEffects",
    value: function addStatusBadgeEffects() {
      var statusBadges = document.querySelectorAll('.status-badge');
      statusBadges.forEach(function (badge) {
        badge.addEventListener('mouseenter', function () {
          badge.style.transform = 'scale(1.05)';
        });
        badge.addEventListener('mouseleave', function () {
          badge.style.transform = 'scale(1)';
        });
      });
    } // Thêm hiệu ứng cho customer avatars

  }, {
    key: "addCustomerAvatarEffects",
    value: function addCustomerAvatarEffects() {
      var customerAvatars = document.querySelectorAll('.customer-avatar');
      customerAvatars.forEach(function (avatar) {
        avatar.addEventListener('mouseenter', function () {
          avatar.style.transform = 'scale(1.1)';
          avatar.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
        });
        avatar.addEventListener('mouseleave', function () {
          avatar.style.transform = 'scale(1)';
          avatar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        });
      });
    } // Thêm hiệu ứng cho summary cards

  }, {
    key: "addSummaryCardEffects",
    value: function addSummaryCardEffects() {
      var summaryCards = document.querySelectorAll('.summary-card');
      summaryCards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
          card.style.background = 'rgba(255, 255, 255, 0.15)';
          card.style.transform = 'translateY(-2px)';
        });
        card.addEventListener('mouseleave', function () {
          card.style.background = 'rgba(255, 255, 255, 0.1)';
          card.style.transform = 'translateY(0)';
        });
      });
    } // Thêm hiệu ứng cho back button

  }, {
    key: "addBackButtonEffects",
    value: function addBackButtonEffects() {
      var _this3 = this;

      var backBtn = document.querySelector('.back-btn');
      if (!backBtn) return;
      backBtn.addEventListener('mouseenter', function () {
        backBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        backBtn.style.transform = 'translateY(-2px)';
        backBtn.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
      });
      backBtn.addEventListener('mouseleave', function () {
        backBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        backBtn.style.transform = 'translateY(0)';
        backBtn.style.boxShadow = 'none';
      });
      backBtn.addEventListener('click', function (e) {
        _this3.createRippleEffect(e, backBtn);
      });
    } // Tạo hiệu ứng ripple

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
    } // Thêm hiệu ứng cho loading states

  }, {
    key: "addLoadingEffects",
    value: function addLoadingEffects() {
      var loadingSpinners = document.querySelectorAll('.loading-spinner');
      loadingSpinners.forEach(function (spinner) {
        // Thêm hiệu ứng pulse cho loading spinner
        spinner.style.animation = 'spin 1s ease-in-out infinite, pulse 2s infinite';
      });
    } // Thêm hiệu ứng cho no data state

  }, {
    key: "addNoDataEffects",
    value: function addNoDataEffects() {
      var noDataContent = document.querySelector('.no-data-content');
      if (!noDataContent) return; // Hiệu ứng fade in cho no data content

      noDataContent.style.animation = 'fadeInUp 0.6s ease';
    } // Thêm hiệu ứng cho table headers

  }, {
    key: "addTableHeaderEffects",
    value: function addTableHeaderEffects() {
      var tableHeaders = document.querySelectorAll('.customer-table th');
      tableHeaders.forEach(function (header) {
        header.addEventListener('mouseenter', function () {
          header.style.background = 'rgba(255, 255, 255, 0.15)';
        });
        header.addEventListener('mouseleave', function () {
          header.style.background = 'rgba(255, 255, 255, 0.1)';
        });
      });
    } // Thêm hiệu ứng cho contact items

  }, {
    key: "addContactItemEffects",
    value: function addContactItemEffects() {
      var contactItems = document.querySelectorAll('.contact-item');
      contactItems.forEach(function (item) {
        item.addEventListener('mouseenter', function () {
          item.style.transform = 'translateX(3px)';
        });
        item.addEventListener('mouseleave', function () {
          item.style.transform = 'translateX(0)';
        });
      });
    } // Thêm hiệu ứng cho gender icons

  }, {
    key: "addGenderIconEffects",
    value: function addGenderIconEffects() {
      var genderIcons = document.querySelectorAll('.gender-icon');
      genderIcons.forEach(function (icon) {
        icon.addEventListener('mouseenter', function () {
          icon.style.transform = 'scale(1.2)';
        });
        icon.addEventListener('mouseleave', function () {
          icon.style.transform = 'scale(1)';
        });
      });
    } // Thêm hiệu ứng cho date info

  }, {
    key: "addDateInfoEffects",
    value: function addDateInfoEffects() {
      var dateInfos = document.querySelectorAll('.date-info');
      dateInfos.forEach(function (info) {
        info.addEventListener('mouseenter', function () {
          info.style.transform = 'translateX(3px)';
        });
        info.addEventListener('mouseleave', function () {
          info.style.transform = 'translateX(0)';
        });
      });
    } // Thêm hiệu ứng cho section titles

  }, {
    key: "addSectionTitleEffects",
    value: function addSectionTitleEffects() {
      var sectionTitles = document.querySelectorAll('.section-title');
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
    } // Thêm hiệu ứng cho search section

  }, {
    key: "addSearchSectionEffects",
    value: function addSearchSectionEffects() {
      var searchSection = document.querySelector('.search-section');
      if (!searchSection) return;
      searchSection.addEventListener('mouseenter', function () {
        searchSection.style.background = 'rgba(255, 255, 255, 0.15)';
      });
      searchSection.addEventListener('mouseleave', function () {
        searchSection.style.background = 'rgba(255, 255, 255, 0.1)';
      });
    } // Thêm hiệu ứng cho table section

  }, {
    key: "addTableSectionEffects",
    value: function addTableSectionEffects() {
      var tableSection = document.querySelector('.table-section');
      if (!tableSection) return;
      tableSection.addEventListener('mouseenter', function () {
        tableSection.style.background = 'rgba(255, 255, 255, 0.15)';
      });
      tableSection.addEventListener('mouseleave', function () {
        tableSection.style.background = 'rgba(255, 255, 255, 0.1)';
      });
    }
  }]);

  return CustomerEffects;
}(); // CSS animations


var style = document.createElement('style');
style.textContent = "\n  @keyframes slideUp {\n    from {\n      opacity: 1;\n      transform: translateY(0);\n    }\n    to {\n      opacity: 0;\n      transform: translateY(-20px);\n    }\n  }\n\n  @keyframes pulse {\n    0%, 100% { opacity: 1; }\n    50% { opacity: 0.5; }\n  }\n\n  .ripple {\n    position: absolute;\n    border-radius: 50%;\n    background: rgba(255, 255, 255, 0.3);\n    transform: scale(0);\n    animation: ripple-animation 0.6s linear;\n    pointer-events: none;\n  }\n\n  @keyframes ripple-animation {\n    to {\n      transform: scale(4);\n      opacity: 0;\n    }\n  }\n\n  @keyframes fadeInUp {\n    from {\n      opacity: 0;\n      transform: translateY(30px);\n    }\n    to {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n";
document.head.appendChild(style);
var _default = CustomerEffects;
exports["default"] = _default;