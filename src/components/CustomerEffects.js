class CustomerEffects {
  constructor() {
    this.isInitialized = false;
  }

  addTableEffects() {
    const tableRows = document.querySelectorAll('.customer-row');
    
    tableRows.forEach((row, index) => {
      row.addEventListener('mouseenter', () => {
        row.style.background = 'rgba(255, 255, 255, 0.1)';
        row.style.transform = 'translateX(5px)';
      });

      row.addEventListener('mouseleave', () => {
        row.style.background = 'transparent';
        row.style.transform = 'translateX(0)';
      });

      row.addEventListener('click', () => {
        this.createRippleEffect(row);
      });
    });
  }

  addSearchEffects() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
      if (searchInput.value.length > 0) {
        searchInput.style.borderColor = 'rgba(74, 222, 128, 0.5)';
        searchInput.style.background = 'rgba(255, 255, 255, 0.15)';
      } else {
        searchInput.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        searchInput.style.background = 'rgba(255, 255, 255, 0.1)';
      }
    });

    searchInput.addEventListener('focus', () => {
      searchInput.style.transform = 'translateY(-2px)';
      searchInput.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
    });

    searchInput.addEventListener('blur', () => {
      searchInput.style.transform = 'translateY(0)';
      searchInput.style.boxShadow = 'none';
    });
  }

  addHeaderEffects() {
    const header = document.querySelector('.customer-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.15)';
        header.style.backdropFilter = 'blur(25px)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.1)';
        header.style.backdropFilter = 'blur(20px)';
      }
    });
  }

  addMessageEffects() {
    const messages = document.querySelectorAll('.customer-message');
    
    messages.forEach(message => {
      setTimeout(() => {
        message.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
          message.remove();
        }, 300);
      }, 5000);

      message.addEventListener('click', () => {
        message.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
          message.remove();
        }, 300);
      });
    });
  }

  addLogoEffects() {
    const logo = document.querySelector('.customer-logo');
    if (!logo) return;

    logo.addEventListener('mouseenter', () => {
      logo.style.transform = 'scale(1.1) rotate(5deg)';
    });

    logo.addEventListener('mouseleave', () => {
      logo.style.transform = 'scale(1) rotate(0deg)';
    });
  }

  addUserInfoEffects() {
    const userInfo = document.querySelector('.user-info');
    if (!userInfo) return;

    userInfo.addEventListener('mouseenter', () => {
      userInfo.style.background = 'rgba(255, 255, 255, 0.2)';
      userInfo.style.transform = 'translateY(-2px)';
    });

    userInfo.addEventListener('mouseleave', () => {
      userInfo.style.background = 'rgba(255, 255, 255, 0.1)';
      userInfo.style.transform = 'translateY(0)';
    });
  }

  // Thêm hiệu ứng cho stat cards
  addStatCardEffects() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.background = 'rgba(255, 255, 255, 0.15)';
        card.style.transform = 'translateY(-3px)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.background = 'rgba(255, 255, 255, 0.1)';
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
      });
    });
  }

  // Thêm hiệu ứng cho clear search button
  addClearSearchEffects() {
    const clearButtons = document.querySelectorAll('.clear-search-btn');
    
    clearButtons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.background = 'rgba(239, 68, 68, 0.3)';
        button.style.transform = 'translateY(-2px)';
      });

      button.addEventListener('mouseleave', () => {
        button.style.background = 'rgba(239, 68, 68, 0.2)';
        button.style.transform = 'translateY(0)';
      });

      button.addEventListener('click', (e) => {
        this.createRippleEffect(e, button);
      });
    });
  }

  // Thêm hiệu ứng cho status badges
  addStatusBadgeEffects() {
    const statusBadges = document.querySelectorAll('.status-badge');
    
    statusBadges.forEach(badge => {
      badge.addEventListener('mouseenter', () => {
        badge.style.transform = 'scale(1.05)';
      });

      badge.addEventListener('mouseleave', () => {
        badge.style.transform = 'scale(1)';
      });
    });
  }

  // Thêm hiệu ứng cho customer avatars
  addCustomerAvatarEffects() {
    const customerAvatars = document.querySelectorAll('.customer-avatar');
    
    customerAvatars.forEach(avatar => {
      avatar.addEventListener('mouseenter', () => {
        avatar.style.transform = 'scale(1.1)';
        avatar.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
      });

      avatar.addEventListener('mouseleave', () => {
        avatar.style.transform = 'scale(1)';
        avatar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
      });
    });
  }

  // Thêm hiệu ứng cho summary cards
  addSummaryCardEffects() {
    const summaryCards = document.querySelectorAll('.summary-card');
    
    summaryCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.background = 'rgba(255, 255, 255, 0.15)';
        card.style.transform = 'translateY(-2px)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.background = 'rgba(255, 255, 255, 0.1)';
        card.style.transform = 'translateY(0)';
      });
    });
  }

  // Thêm hiệu ứng cho back button
  addBackButtonEffects() {
    const backBtn = document.querySelector('.back-btn');
    if (!backBtn) return;

    backBtn.addEventListener('mouseenter', () => {
      backBtn.style.background = 'rgba(255, 255, 255, 0.2)';
      backBtn.style.transform = 'translateY(-2px)';
      backBtn.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
    });

    backBtn.addEventListener('mouseleave', () => {
      backBtn.style.background = 'rgba(255, 255, 255, 0.1)';
      backBtn.style.transform = 'translateY(0)';
      backBtn.style.boxShadow = 'none';
    });

    backBtn.addEventListener('click', (e) => {
      this.createRippleEffect(e, backBtn);
    });
  }

  // Tạo hiệu ứng ripple
  createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Thêm hiệu ứng cho loading states
  addLoadingEffects() {
    const loadingSpinners = document.querySelectorAll('.loading-spinner');
    
    loadingSpinners.forEach(spinner => {
      // Thêm hiệu ứng pulse cho loading spinner
      spinner.style.animation = 'spin 1s ease-in-out infinite, pulse 2s infinite';
    });
  }

  // Thêm hiệu ứng cho no data state
  addNoDataEffects() {
    const noDataContent = document.querySelector('.no-data-content');
    if (!noDataContent) return;

    // Hiệu ứng fade in cho no data content
    noDataContent.style.animation = 'fadeInUp 0.6s ease';
  }

  // Thêm hiệu ứng cho table headers
  addTableHeaderEffects() {
    const tableHeaders = document.querySelectorAll('.customer-table th');
    
    tableHeaders.forEach(header => {
      header.addEventListener('mouseenter', () => {
        header.style.background = 'rgba(255, 255, 255, 0.15)';
      });

      header.addEventListener('mouseleave', () => {
        header.style.background = 'rgba(255, 255, 255, 0.1)';
      });
    });
  }

  // Thêm hiệu ứng cho contact items
  addContactItemEffects() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(3px)';
      });

      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
      });
    });
  }

  // Thêm hiệu ứng cho gender icons
  addGenderIconEffects() {
    const genderIcons = document.querySelectorAll('.gender-icon');
    
    genderIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2)';
      });

      icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
      });
    });
  }

  // Thêm hiệu ứng cho date info
  addDateInfoEffects() {
    const dateInfos = document.querySelectorAll('.date-info');
    
    dateInfos.forEach(info => {
      info.addEventListener('mouseenter', () => {
        info.style.transform = 'translateX(3px)';
      });

      info.addEventListener('mouseleave', () => {
        info.style.transform = 'translateX(0)';
      });
    });
  }

  // Thêm hiệu ứng cho section titles
  addSectionTitleEffects() {
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
      title.addEventListener('mouseenter', () => {
        title.style.transform = 'scale(1.02)';
        title.style.textShadow = '0 4px 8px rgba(0, 0, 0, 0.4)';
      });

      title.addEventListener('mouseleave', () => {
        title.style.transform = 'scale(1)';
        title.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
      });
    });
  }

  // Thêm hiệu ứng cho search section
  addSearchSectionEffects() {
    const searchSection = document.querySelector('.search-section');
    if (!searchSection) return;

    searchSection.addEventListener('mouseenter', () => {
      searchSection.style.background = 'rgba(255, 255, 255, 0.15)';
    });

    searchSection.addEventListener('mouseleave', () => {
      searchSection.style.background = 'rgba(255, 255, 255, 0.1)';
    });
  }

  // Thêm hiệu ứng cho table section
  addTableSectionEffects() {
    const tableSection = document.querySelector('.table-section');
    if (!tableSection) return;

    tableSection.addEventListener('mouseenter', () => {
      tableSection.style.background = 'rgba(255, 255, 255, 0.15)';
    });

    tableSection.addEventListener('mouseleave', () => {
      tableSection.style.background = 'rgba(255, 255, 255, 0.1)';
    });
  }
}

// CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

document.head.appendChild(style);

export default CustomerEffects; 