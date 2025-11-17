/**
 * Header Your Van Component
 * Displays the selected van model from sessionStorage
 * Allows users to clear their selection
 */

class HeaderYourVan {
  constructor() {
    this.storageKey = 'selectedVanModel';
    this.container = document.getElementById('header-your-van');
    this.content = document.getElementById('your-van-content');
    this.button = document.getElementById('your-van-button');
    this.popover = document.getElementById('your-van-popover');
    this.clearButton = document.getElementById('clear-van-button');
    /** @type {HTMLImageElement | null} */
    this.vanImage = /** @type {HTMLImageElement | null} */ (document.getElementById('your-van-image'));
    this.vanName = document.getElementById('your-van-name');

    // Load van models data from existing DOM elements
    this.vanModels = this.loadVanModelsFromDOM();

    this.init();
  }

  /**
   * Load van models data from the van model links in the DOM
   */
  loadVanModelsFromDOM() {
    const vanLinks = document.querySelectorAll('.cvc-van-model-link--image[data-model-id]');
    /** @type {Array<{id: string, name: string, image: string | null}>} */
    const models = [];

    vanLinks.forEach((link) => {
      const modelId = link.getAttribute('data-model-id');
      const modelName = link.getAttribute('data-model-name');
      const img = link.querySelector('img');
      const imgSrc = img ? img.getAttribute('src') : null;

      if (modelId && modelName) {
        models.push({
          id: modelId,
          name: modelName,
          image: imgSrc
        });
      }
    });

    return { models };
  }

  /**
   * Initialize the component
   */
  init() {
    if (!this.container || !this.content) {
      return;
    }

    // If no models found on first load, try again after a delay
    if (this.vanModels.models.length === 0) {
      setTimeout(() => {
        this.vanModels = this.loadVanModelsFromDOM();
        this.updateDisplay();
      }, 500);
    }

    // Check if a van is selected
    this.updateDisplay();

    // Set up event listeners
    this.setupEventListeners();

    // Listen for storage changes (in case another tab updates it)
    window.addEventListener('storage', (e) => {
      if (e.key === this.storageKey) {
        this.updateDisplay();
      }
    });

    // Listen for custom event when van is selected
    document.addEventListener('vanModelSelected', (event) => {
      console.log('vanModelSelected event received in header-your-van.js');
      
      // Reload models in case they weren't available before
      this.vanModels = this.loadVanModelsFromDOM();
      
      // Small delay to ensure sessionStorage is updated
      setTimeout(() => {
        this.updateDisplay();
        this.showNotification();
      }, 50);
    });
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Toggle popover when clicking the button
    if (this.button) {
      this.button.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePopover();
      });
    }

    // Clear van selection
    if (this.clearButton) {
      this.clearButton.addEventListener('click', () => {
        this.clearVanSelection();
      });
    }

    // Close popover when clicking outside
    document.addEventListener('click', (e) => {
      if (this.popover && 
          this.popover.style.display === 'block' && 
          this.container &&
          e.target instanceof Node &&
          !this.container.contains(e.target)) {
        this.hidePopover();
      }
    });
  }

  /**
   * Update the display based on selected van
   */
  updateDisplay() {
    const selectedModelId = sessionStorage.getItem(this.storageKey);

    if (!selectedModelId) {
      this.hideComponent();
      return;
    }

    // Find the matching van model
    const vanModel = this.vanModels.models.find(
      /** @param {any} model */
      (model) => model.id === selectedModelId
    );

    if (!vanModel) {
      this.hideComponent();
      return;
    }

    // Update the UI
    this.showComponent(vanModel);
  }

  /**
   * Show the component with van data
   * @param {any} vanModel
   */
  showComponent(vanModel) {
    if (!this.content || !this.vanImage || !this.vanName) {
      return;
    }

    // Set van name
    this.vanName.textContent = vanModel.name;

    // Set van image
    if (vanModel.image) {
      this.vanImage.src = vanModel.image;
      this.vanImage.alt = vanModel.name;
    } else {
      // Use a placeholder if no image
      this.vanImage.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999" font-size="14"%3EVan%3C/text%3E%3C/svg%3E';
      this.vanImage.alt = 'Van placeholder';
    }

    // Show the content
    this.content.style.display = 'block';
  }

  /**
   * Hide the component
   */
  hideComponent() {
    if (this.content) {
      this.content.style.display = 'none';
    }
    this.hidePopover();
  }

  /**
   * Toggle popover visibility
   */
  togglePopover() {
    if (!this.popover) return;

    if (this.popover.style.display === 'block') {
      this.hidePopover();
    } else {
      this.showPopover();
    }
  }

  /**
   * Show the popover
   */
  showPopover() {
    if (this.popover) {
      this.popover.style.display = 'block';
    }
  }

  /**
   * Hide the popover
   */
  hidePopover() {
    if (this.popover) {
      this.popover.style.display = 'none';
    }
  }

  /**
   * Clear the van selection
   */
  clearVanSelection() {
    // Clear from sessionStorage
    sessionStorage.removeItem(this.storageKey);

    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('vanModelCleared'));

    // Remove active states from van model links
    document.querySelectorAll('.cvc-van-model-link--image').forEach((link) => {
      link.classList.remove('active');
    });

    // If on collection or product page, reload to clear filter
    if (this.isCollectionOrProductPage()) {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      
      // Remove all filter.p.tag parameters
      for (const key of Array.from(params.keys())) {
        if (key.startsWith('filter.p.tag')) {
          params.delete(key);
        }
      }
      
      url.search = params.toString();
      window.location.href = url.toString();
    } else {
      // On other pages, just hide the component
      this.hideComponent();
    }
  }

  /**
   * Check if we're on a collection or product page
   */
  isCollectionOrProductPage() {
    const pathname = window.location.pathname;
    return pathname.includes('/collections/') || pathname.includes('/products/');
  }

  /**
   * Show the notification when a van is selected
   */
  showNotification() {
    try {
      console.log('=== showNotification START ===');
      
      console.log('Step 1: Getting notification element');
      const notification = document.getElementById('van-selector-notification');
      console.log('notification element:', notification);
      
      if (!notification) {
        console.error('CRITICAL: van-selector-notification element not found in DOM!');
        console.log('Container exists?', document.getElementById('header-your-van'));
        return;
      }
      
      console.log('Step 2: Getting or creating notificationText element');
      let notificationText = document.getElementById('van-notification-message');
      console.log('notificationText element:', notificationText);
      
      // If the text element doesn't exist, create it
      if (!notificationText) {
        console.warn('van-notification-message not found, creating it');
        notificationText = document.createElement('p');
        notificationText.id = 'van-notification-message';
        notificationText.className = 'header-your-van__notification-text';
        notification.appendChild(notificationText);
        console.log('Created notificationText element:', notificationText);
      }

      console.log('Step 3: Elements ready! Current data-showing:', notification.getAttribute('data-showing'));

      // Clear ALL existing timeouts - both class instance and global element properties
      if (this.notificationTimeout) {
        console.log('Step 4a: Clearing class hide timeout:', this.notificationTimeout);
        clearTimeout(this.notificationTimeout);
        this.notificationTimeout = null;
      }
      if (this.notificationShowTimeout) {
        console.log('Step 4b: Clearing class show timeout:', this.notificationShowTimeout);
        clearTimeout(this.notificationShowTimeout);
        this.notificationShowTimeout = null;
      }
      if (notification._hideTimeout) {
        console.log('Step 4c: Clearing global hide timeout:', notification._hideTimeout);
        clearTimeout(notification._hideTimeout);
        notification._hideTimeout = null;
      }
      if (notification._showTimeout) {
        console.log('Step 4d: Clearing global show timeout:', notification._showTimeout);
        clearTimeout(notification._showTimeout);
        notification._showTimeout = null;
      }

      // Get custom message from megamenu settings
      const megamenu = document.querySelector('.cvc-megamenu--van-models');
      const customMessage = megamenu ? megamenu.getAttribute('data-notification-message') : null;
      
      // Use custom message if available, otherwise use default
      notificationText.textContent = customMessage || 'We will only show you products that are for your van';
      console.log('Step 5: Set notification text to:', notificationText.textContent);
      
      // Reset to hidden state
      console.log('Step 6: Setting data-showing to FALSE');
      notification.setAttribute('data-showing', 'false');
      console.log('After setting false, data-showing is:', notification.getAttribute('data-showing'));
      
      console.log('Step 7: Setting timeout for 50ms');
      // Use a small timeout to ensure the reset is processed
      notification._showTimeout = setTimeout(() => {
        console.log('Step 8: Timeout callback - NOW setting to TRUE');
        
        // Show notification with bounce animation
        notification.setAttribute('data-showing', 'true');
        
        console.log('Step 9: After setting true, data-showing is:', notification.getAttribute('data-showing'));
        console.log('=== showNotification should now be VISIBLE ===');

        // Hide after 6 seconds (2x the original 3 seconds)
        notification._hideTimeout = setTimeout(() => {
          console.log('Timeout fired - hiding notification after 6 seconds');
          notification.setAttribute('data-showing', 'false');
        }, 6000);
        
        console.log('Step 10: Set new hide timeout ID:', notification._hideTimeout);
      }, 50);
      
      console.log('Step 11: Set new show timeout ID:', notification._showTimeout);
      console.log('Step 12: Main function end - waiting for timeout');
    } catch (error) {
      console.error('ERROR in showNotification:', error);
      console.error('Error stack:', error.stack);
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new HeaderYourVan();
  });
} else {
  new HeaderYourVan();
}

export default HeaderYourVan;
