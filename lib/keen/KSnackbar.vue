<template>

  <transition 
    :name="transitionName" 
    @after-enter="onEnter" 
    @after-leave="onLeave"
  >
    <div
      v-if="isOpen"
      class="k-snackbar"
      role="status"
      aria-live="polite"
      :style="snackbarStyles"
      @click="onClick"
    >
      <div class="k-snackbar-message">
        <slot>{{ text }}</slot>
      </div>

      <div 
        v-if="actionText" 
        class="k-snackbar-action"
      >
        <KButton
          appearance="basic-link"
          class="k-snackbar-action-button"
          :text="actionText"
          :appearanceOverrides="actionButtonStyles"
          @click.stop="onActionClick"
        />
      </div>
    </div>
  </transition>

</template>


<script>

  import useKLiveRegion from '../composables/useKLiveRegion';
  import useKResponsiveWindow from '../composables/useKResponsiveWindow';

  const { sendPoliteMessage } = useKLiveRegion();

  /**
   * KSnackbar displays brief messages at the bottom of the screen
   */
  export default {
    name: 'KSnackbar',
    setup() {
      const { windowBreakpoint } = useKResponsiveWindow();
      return {
        windowBreakpoint,
      };
    },
    props: {
      /**
       * Controls whether the snackbar is visible
       */
      isOpen: {
        type: Boolean,
        default: false,
      },
      /**
       * Message text to display
       */
      text: {
        type: String,
        default: '',
      },
      /**
       * Text for the action button (if any)
       */
      actionText: {
        type: String,
        default: '',
      },
      /**
       * Callback function when action button is clicked
       */
      actionCallback: {
        type: Function,
        default: null,
      },
      /**
       * Auto-hide duration in milliseconds (0 = no auto-hide)
       */
      duration: {
        type: Number,
        default: 4000,
      },
      /**
       * Transition type: 'slide' or 'fade'
       */
      transition: {
        type: String,
        default: 'slide',
        validator: value => ['slide', 'fade'].includes(value),
      },
      /**
       * Offset from bottom of screen in pixels
       */
      bottomOffset: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        hideTimeoutId: null,
      };
    },
    computed: {
      transitionName() {
        return `k-snackbar--transition-${this.transition}`;
      },
      snackbarStyles() {
        const styles = {
          bottom: `${24 + this.bottomOffset}px`,
        };

        // Breakpoint 2 corresponds to 600px+ (medium and above)
        // Below breakpoint 2 (0, 1) is small screens
        if (this.windowBreakpoint < 2) {
          // On small screens, snackbar spans full width with margins
          styles.right = '24px';
          styles.left = '24px';
        } else {
          // On larger screens, snackbar is positioned on the right
          styles.right = '24px';
          styles.left = 'auto';
        }

        return styles;
      },
      actionButtonStyles() {
        return {
          color: this.$themeTokens.textInverted,
          ':hover': {
            color: this.$themeTokens.textInverted,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
          ':focus': {
            color: this.$themeTokens.textInverted,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            outline: `2px solid ${this.$themeTokens.textInverted}`,
            outlineOffset: '2px',
          },
        };
      },
    },
    watch: {
      isOpen(newValue, oldValue) {
        if (newValue && !oldValue) {
          // Snackbar opened
          this.setupAutoHide();
          // Announce to screen readers using live region
          if (this.text) {
            sendPoliteMessage(this.text);
          }
        } else if (!newValue && oldValue) {
          // Snackbar closed
          this.clearAutoHide();
        }
      },
      text(newValue) {
        // Announce text changes to screen readers
        if (this.isOpen && newValue) {
          sendPoliteMessage(newValue);
        }
      },
    },
    beforeDestroy() {
      this.clearAutoHide();
    },
    methods: {
      setupAutoHide() {
        this.clearAutoHide();
        if (this.duration > 0) {
          this.hideTimeoutId = setTimeout(() => {
            this.handleClose();
          }, this.duration);
        }
      },
      clearAutoHide() {
        if (this.hideTimeoutId) {
          clearTimeout(this.hideTimeoutId);
          this.hideTimeoutId = null;
        }
      },
      onClick() {
        /**
         * Emitted when the snackbar background is clicked
         */
        this.$emit('click');
      },
      onActionClick() {
        if (this.actionCallback) {
          this.actionCallback();
        }
        /**
         * Emitted when the action button is clicked
         */
        this.$emit('action-click');
      },
      handleClose() {
        /**
         * Emitted when the snackbar should close
         */
        this.$emit('close');
      },
      onEnter() {
        /**
         * Emitted when the snackbar has finished entering
         */
        this.$emit('show');
      },
      onLeave() {
        /**
         * Emitted when the snackbar has finished leaving
         */
        this.$emit('hide');
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '../styles/definitions';

  .k-snackbar {
    position: fixed;
    z-index: 24;
    display: inline-flex;
    align-items: center;
    min-width: 288px;
    max-width: 568px;
    min-height: 48px;
    padding: 14px 24px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 1.5;
    color: white;
    background-color: #323232;
    border-radius: 4px;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14),
      0 1px 18px 0 rgba(0, 0, 0, 0.12);
  }

  .k-snackbar-message {
    flex-grow: 1;
    cursor: default;
  }

  .k-snackbar-action {
    margin-left: auto;
    padding-left: 48px;
  }

  .k-snackbar-action-button {
    min-width: initial;
    min-height: initial;
    padding: 8px 16px;
    margin: -8px -12px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  /* Slide transition */
  .k-snackbar--transition-slide-enter-active,
  .k-snackbar--transition-slide-leave-active {
    transition: transform 0.4s ease;
  }

  .k-snackbar--transition-slide-enter,
  .k-snackbar--transition-slide-leave-to {
    transform: translateY(100px);
  }

  /* Fade transition */
  .k-snackbar--transition-fade-enter-active,
  .k-snackbar--transition-fade-leave-active {
    transition: opacity 0.4s ease;
  }

  .k-snackbar--transition-fade-enter,
  .k-snackbar--transition-fade-leave-to {
    opacity: 0;
  }

</style>