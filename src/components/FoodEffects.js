class FoodEffects {
  constructor() {
    this.isInitialized = false;
  }

  addFormEffects() {
    const form = document.querySelector('.food-form');
    if (!form) return;

    const inputs = form.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.style.transform = 'translateY(-2px)';
        input.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
      });

      input.addEventListener('blur', () => {
        input.style.transform = 'translateY(0)';
        input.style.boxShadow = 'none';
      });

      input.addEventListener('input', () => {
        if (input.value.length > 0) {
          input.style.borderColor = 'rgba(74, 222, 128, 0.5)';
        } else {
          input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }
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

  addButtonEffects() {
    const buttons = document.querySelectorAll('.add-ingredient-btn, .remove-ingredient-btn, .back-btn, .submit-btn, .pagination-btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.createRippleEffect(e, button);
      });

      if (button.classList.contains('add-ingredient-btn')) {
        button.addEventListener('mouseenter', () => {
          button.style.transform = 'scale(1.05)';
          button.style.boxShadow = '0 8px 25px rgba(74, 222, 128, 0.4)';
        });

        button.addEventListener('mouseleave', () => {
          button.style.transform = 'scale(1)';
          button.style.boxShadow = 'none';
        });
      }

      if (button.classList.contains('remove-ingredient-btn')) {
        button.addEventListener('mouseenter', () => {
          button.style.transform = 'scale(1.1)';
          button.style.background = 'rgba(239, 68, 68, 0.3)';
        });

        button.addEventListener('mouseleave', () => {
          button.style.transform = 'scale(1)';
          button.style.background = 'rgba(239, 68, 68, 0.2)';
        });
      }

      if (button.classList.contains('submit-btn')) {
        button.addEventListener('mouseenter', () => {
          if (!button.disabled) {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
          }
        });

        button.addEventListener('mouseleave', () => {
          if (!button.disabled) {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
          }
        });
      }
    });
  }

  // Tạo hiệu ứng ripple
  createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Thêm hiệu ứng cho message
  addMessageEffects() {
    const messages = document.querySelectorAll('.food-message');
    
    messages.forEach(message => {
      // Auto hide message after 5 seconds
      setTimeout(() => {
        message.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
          message.remove();
        }, 300);
      }, 5000);

      // Click to dismiss
      message.addEventListener('click', () => {
        message.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
          message.remove();
        }, 300);
      });
    });
  }

  // Thêm hiệu ứng cho logo
  addLogoEffects() {
    const logo = document.querySelector('.food-logo');
    if (!logo) return;

    logo.addEventListener('mouseenter', () => {
      logo.style.transform = 'scale(1.1) rotate(5deg)';
    });

    logo.addEventListener('mouseleave', () => {
      logo.style.transform = 'scale(1) rotate(0deg)';
    });
  }

  // Thêm hiệu ứng cho user info
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

  // Thêm hiệu ứng cho ingredient cards
  addIngredientEffects() {
    const ingredientCards = document.querySelectorAll('.ingredient-card');
    
    ingredientCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.background = 'rgba(255, 255, 255, 0.15)';
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.background = 'rgba(255, 255, 255, 0.1)';
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
      });
    });
  }

  // Thêm hiệu ứng animation cho ingredient khi thêm
  addIngredientAnimation(ingredientId) {
    const card = document.querySelector(`[data-ingredient-id="${ingredientId}"]`);
    if (card) {
      card.style.animation = 'pulse 0.6s ease';
      setTimeout(() => {
        card.style.animation = '';
      }, 600);
    }
  }

  // Thêm hiệu ứng cho selected ingredients
  addSelectedIngredientEffects() {
    const selectedItems = document.querySelectorAll('.selected-ingredient-item');
    
    selectedItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.background = 'rgba(255, 255, 255, 0.15)';
        item.style.transform = 'translateX(5px)';
      });

      item.addEventListener('mouseleave', () => {
        item.style.background = 'rgba(255, 255, 255, 0.1)';
        item.style.transform = 'translateX(0)';
      });
    });
  }

  // Thêm hiệu ứng cho quantity input
  addQuantityInputEffects() {
    const quantityInputs = document.querySelectorAll('.quantity-input');
    
    quantityInputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.style.borderColor = 'rgba(74, 222, 128, 0.5)';
        input.style.background = 'rgba(255, 255, 255, 0.15)';
      });

      input.addEventListener('blur', () => {
        input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        input.style.background = 'rgba(255, 255, 255, 0.1)';
      });

      input.addEventListener('input', () => {
        if (input.value > 0) {
          input.style.borderColor = 'rgba(74, 222, 128, 0.5)';
        } else {
          input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }
      });
    });
  }

  // Thêm hiệu ứng cho pagination
  addPaginationEffects() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    paginationBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Hiệu ứng loading cho ingredient grid
        const ingredientGrid = document.querySelector('.ingredient-grid');
        if (ingredientGrid) {
          ingredientGrid.style.opacity = '0.5';
          ingredientGrid.style.pointerEvents = 'none';
          
          setTimeout(() => {
            ingredientGrid.style.opacity = '1';
            ingredientGrid.style.pointerEvents = 'auto';
          }, 1000);
        }
      });
    });
  }

  // Thêm hiệu ứng cho form validation
  addFormValidationEffects() {
    const form = document.querySelector('.food-form');
    if (!form) return;

    const requiredInputs = form.querySelectorAll('input[required], textarea[required]');
    
    requiredInputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (!input.value.trim()) {
          input.style.borderColor = 'rgba(239, 68, 68, 0.5)';
          input.style.animation = 'shake 0.5s ease';
        } else {
          input.style.borderColor = 'rgba(74, 222, 128, 0.5)';
          input.style.animation = '';
        }
      });
    });
  }

  // Thêm hiệu ứng cho loading state
  addLoadingEffects() {
    const submitBtn = document.querySelector('.submit-btn');
    if (!submitBtn) return;

    submitBtn.addEventListener('click', () => {
      if (submitBtn.classList.contains('loading')) {
        // Hiệu ứng loading
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
          <div class="loading-spinner"></div>
          <p>Đang xử lý...</p>
        `;
        document.body.appendChild(overlay);
      }
    });
  }

  // Thêm hiệu ứng cho empty state
  addEmptyStateEffects() {
    const ingredientGrid = document.querySelector('.ingredient-grid');
    if (ingredientGrid && ingredientGrid.children.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'empty-state';
      emptyState.innerHTML = `
        <div class="empty-icon">🔍</div>
        <h3>Không tìm thấy nguyên liệu</h3>
        <p>Thử tìm kiếm với từ khóa khác</p>
      `;
      ingredientGrid.appendChild(emptyState);
    }
  }

  // Thêm hiệu ứng cho section titles
  addSectionTitleEffects() {
    const sectionTitles = document.querySelectorAll('.section-title, .subsection-title');
    
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

  // Thêm hiệu ứng cho form actions
  addFormActionsEffects() {
    const formActions = document.querySelector('.form-actions');
    if (!formActions) return;

    formActions.addEventListener('mouseenter', () => {
      formActions.style.transform = 'translateY(-2px)';
    });

    formActions.addEventListener('mouseleave', () => {
      formActions.style.transform = 'translateY(0)';
    });
  }
}

// CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

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

  .empty-state {
    text-align: center;
    padding: 3rem;
    color: rgba(255, 255, 255, 0.7);
  }

  .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .empty-state h3 {
    color: white;
    margin-bottom: 0.5rem;
  }

  .empty-state p {
    margin: 0;
    font-size: 0.9rem;
  }
`;

document.head.appendChild(style);

export default FoodEffects; 