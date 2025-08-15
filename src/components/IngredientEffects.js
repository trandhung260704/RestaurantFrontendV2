// Ingredient Effects Component
export class IngredientEffects {
  constructor() {
    this.init();
  }

  init() {
    this.addTableAnimations();
    this.addFormEffects();
    this.addSearchEffects();
    this.addButtonEffects();
    this.addMessageEffects();
    this.addLogoEffects();
    this.addUserInfoEffects();
  }

  addTableAnimations() {
    const rows = document.querySelectorAll('.ingredient-row');
    
    rows.forEach((row, index) => {
      row.style.opacity = '0';
      row.style.transform = 'translateX(-30px)';
      
      setTimeout(() => {
        row.style.transition = 'all 0.6s ease';
        row.style.opacity = '1';
        row.style.transform = 'translateX(0)';
      }, index * 100);

      row.addEventListener('mouseenter', () => {
        row.style.transform = 'translateX(8px) scale(1.01)';
        row.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
      });

      row.addEventListener('mouseleave', () => {
        row.style.transform = 'translateX(0) scale(1)';
        row.style.boxShadow = 'none';
      });
    });
  }

  addFormEffects() {
    const form = document.querySelector('.ingredient-form');
    const inputs = document.querySelectorAll('.form-input');
    
    if (!form) return;

    form.style.opacity = '0';
    form.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      form.style.transition = 'all 0.8s ease';
      form.style.opacity = '1';
      form.style.transform = 'translateY(0)';
    }, 300);

    inputs.forEach((input, index) => {
      input.style.opacity = '0';
      input.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        input.style.transition = 'all 0.6s ease';
        input.style.opacity = '1';
        input.style.transform = 'translateY(0)';
      }, 500 + index * 100);

      input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        input.parentElement.style.transition = 'transform 0.3s ease';
      });

      input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
      });

      input.addEventListener('input', () => {
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

  addSearchEffects() {
    const searchInput = document.querySelector('.search-input');
    const searchBox = document.querySelector('.search-box');
    
    if (!searchInput) return;

    searchInput.addEventListener('focus', () => {
      searchBox.style.transform = 'scale(1.02)';
      searchBox.style.transition = 'transform 0.3s ease';
    });

    searchInput.addEventListener('blur', () => {
      searchBox.style.transform = 'scale(1)';
    });

    searchInput.addEventListener('input', () => {
      if (searchInput.value.length > 0) {
        searchInput.style.borderColor = '#667eea';
        searchInput.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
      } else {
        searchInput.style.borderColor = '#e5e7eb';
        searchInput.style.boxShadow = 'none';
      }
    });
  }

  addButtonEffects() {
    const buttons = document.querySelectorAll('.edit-btn, .delete-btn, .back-btn, .search-btn, .reset-btn, .submit-btn, .cancel-btn, .pagination-btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.createRippleEffect(e, button);
      });

      if (button.classList.contains('edit-btn')) {
        button.addEventListener('mouseenter', () => {
          button.style.transform = 'scale(1.1)';
        });
        button.addEventListener('mouseleave', () => {
          button.style.transform = 'scale(1)';
        });
      }

      if (button.classList.contains('delete-btn')) {
        button.addEventListener('mouseenter', () => {
          button.style.transform = 'scale(1.1)';
        });
        button.addEventListener('mouseleave', () => {
          button.style.transform = 'scale(1)';
        });
      }

      if (button.classList.contains('submit-btn')) {
        button.addEventListener('mouseenter', () => {
          button.style.transform = 'translateY(-4px)';
        });
        button.addEventListener('mouseleave', () => {
          button.style.transform = 'translateY(0)';
        });
      }

      if (button.classList.contains('search-btn')) {
        button.addEventListener('mouseenter', () => {
          button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', () => {
          button.style.transform = 'scale(1)';
        });
      }
    });
  }

  createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  addMessageEffects() {
    const messages = document.querySelectorAll('.ingredient-message');
    
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
    const logo = document.querySelector('.ingredient-logo');
    if (!logo) return;

    logo.addEventListener('mouseenter', () => {
      logo.style.animation = 'logoBounce 0.6s ease-in-out';
    });

    logo.addEventListener('animationend', () => {
      logo.style.animation = '';
    });
  }

  addUserInfoEffects() {
    const userInfo = document.querySelector('.user-info');
    if (!userInfo) return;

    userInfo.addEventListener('mouseenter', () => {
      userInfo.style.transform = 'scale(1.05)';
      userInfo.style.transition = 'transform 0.3s ease';
    });

    userInfo.addEventListener('mouseleave', () => {
      userInfo.style.transform = 'scale(1)';
    });
  }

  addPaginationEffects() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    paginationBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tableContainer = document.querySelector('.ingredients-table-container');
        if (tableContainer) {
          tableContainer.style.opacity = '0.5';
          tableContainer.style.transition = 'opacity 0.3s ease';
          
          setTimeout(() => {
            tableContainer.style.opacity = '1';
          }, 500);
        }
      });
    });
  }

  addEmptyStateEffects() {
    const emptyState = document.querySelector('.empty-state');
    if (!emptyState) return;

    const emptyIcon = emptyState.querySelector('.empty-icon');
    if (emptyIcon) {
      emptyIcon.style.animation = 'float 3s ease-in-out infinite';
    }
  }

  addTableHeaderEffects() {
    const tableHeader = document.querySelector('.ingredients-table thead');
    if (!tableHeader) return;

    tableHeader.style.opacity = '0';
    tableHeader.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      tableHeader.style.transition = 'all 0.6s ease';
      tableHeader.style.opacity = '1';
      tableHeader.style.transform = 'translateY(0)';
    }, 200);
  }

  addIngredientIdEffects() {
    const ingredientIds = document.querySelectorAll('.ingredient-id');
    
    ingredientIds.forEach(id => {
      id.addEventListener('mouseenter', () => {
        id.style.color = '#4f46e5';
        id.style.transform = 'scale(1.1)';
        id.style.transition = 'all 0.3s ease';
      });

      id.addEventListener('mouseleave', () => {
        id.style.color = '#667eea';
        id.style.transform = 'scale(1)';
      });
    });
  }

  addIngredientPriceEffects() {
    const ingredientPrices = document.querySelectorAll('.ingredient-price');
    
    ingredientPrices.forEach(price => {
      price.addEventListener('mouseenter', () => {
        price.style.transform = 'scale(1.1)';
        price.style.transition = 'transform 0.3s ease';
      });

      price.addEventListener('mouseleave', () => {
        price.style.transform = 'scale(1)';
      });
    });
  }

  addFormActionsEffects() {
    const formActions = document.querySelector('.form-actions');
    if (!formActions) return;

    formActions.style.opacity = '0';
    formActions.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      formActions.style.transition = 'all 0.6s ease';
      formActions.style.opacity = '1';
      formActions.style.transform = 'translateY(0)';
    }, 800);
  }
}

const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes logoBounce {
    0% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.2) rotate(10deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .loading-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
    margin-right: 8px;
  }
`;
document.head.appendChild(style);

export default IngredientEffects; 