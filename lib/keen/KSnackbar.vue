<template>

  <div class="k-snackbar-wrapper">
    <transition name="k-snackbar-fade">
      <div 
        v-if="isOpen && backdrop" 
        class="k-snackbar-backdrop"
        @click.stop="handleBackdropClick"
      ></div>
    </transition>

    <transition 
      :name="transitionName" 
      @after-enter="onEnter" 
      @after-leave="onLeave"
    >
      <div
        v-if="isOpen"
        ref="snackbarElement"
        class="k-snackbar"
        :class="$computedClass(focusStyles)"
        role="alert"
        :aria-live="backdrop ? 'assertive' : 'polite'"
        :style="snackbarStyles"
        tabindex="0"
        @click="onClick"
        @keydown.esc="handleClose"
      >
        <div class="k-snackbar-message">
          <slot>{{ text }}</slot>
        </div>

        <div 
          v-if="actionText" 
          class="k-snackbar-action"
        >
          <KButton
            ref="actionButton"
            appearance="basic-link"
            class="k-snackbar-action-button"
            :text="actionText"
            :appearanceOverrides="actionButtonStyles"
            @click.stop="onActionClick"
          />
        </div>
      </div>
    </transition>
  </div>

</template>


<script>

  import { ref, watch, nextTick, onBeforeUnmount } from 'vue';
  import useKLiveRegion from '../composables/useKLiveRegion';
  import useKResponsiveWindow from '../composables/useKResponsiveWindow';

  const { sendPoliteMessage } = useKLiveRegion();

  export default {
    name: 'KSnackbar',

    setup(props, { emit }) {
      const { windowBreakpoint } = useKResponsiveWindow();
      const snackbarElement = ref(null);
      const actionButton = ref(null);
      const previousActiveElement = ref(null);
      let hideTimeoutId = null;

      // --- Logic ---
      const clearAutoHide = () => {
        if (hideTimeoutId) {
          clearTimeout(hideTimeoutId);
          hideTimeoutId = null;
        }
      };

      const setupAutoHide = () => {
        clearAutoHide();
        if (props.duration > 0) {
          hideTimeoutId = setTimeout(() => {
            emit('close');
          }, props.duration);
        }
      };

      const restoreFocus = async () => {
        await nextTick();
        if (previousActiveElement.value && 
          document.body.contains(previousActiveElement.value) &&
          typeof previousActiveElement.value.focus === 'function') {
          previousActiveElement.value.focus();
        }
        previousActiveElement.value = null;
      };

      const manageFocusOnOpen = async () => {
        await nextTick();
        if (props.backdrop && snackbarElement.value) {
          snackbarElement.value.focus();
        } else if (props.actionText) {
          const btn = actionButton.value?.$el || actionButton.value;
          if (btn && typeof btn.focus === 'function') btn.focus();
        }
      };

      // --- Watchers ---
      watch(() => props.isOpen, (val, old) => {
        if (val && !old) {
          previousActiveElement.value = document.activeElement;
          setupAutoHide();
          if (props.text) sendPoliteMessage(props.text);
          manageFocusOnOpen();
        } else if (!val && old) {
          clearAutoHide();
          restoreFocus();
        }
      });

      watch(() => props.text, (val) => {
        if (props.isOpen && val) {
          sendPoliteMessage(val);
          setupAutoHide();
        }
      });

      onBeforeUnmount(() => clearAutoHide());

      return {
        windowBreakpoint,
        snackbarElement,
        actionButton,
        handleClose: () => emit('close'),
        setupAutoHide,
        clearAutoHide,
      };
    },

    props: {
      isOpen: { type: Boolean, default: false },
      text: { type: String, default: '' },
      actionText: { type: String, default: '' },
      actionCallback: { type: Function, default: null },
      duration: { type: Number, default: 4000 },
      bottomOffset: { type: Number, default: 0 },
      backdrop: { type: Boolean, default: false },
      transition: { 
        type: String, 
        default: 'slide',
        validator: val => ['slide', 'fade'].includes(val)
      },
    },

    computed: {
      transitionName() {
        return `k-snackbar--transition-${this.transition}`;
      },
      
      // Dynamic styles using Theme Palette/Tokens
      snackbarStyles() {
        const styles = {
          bottom: `${24 + this.bottomOffset}px`,
          left: '24px',
          // Use palette grey 900 as per spec
          backgroundColor: this.$themePalette.grey.v_800,
          // Use textInverted (white) for contrast on dark background
          color: this.$themeTokens.textInverted,
        };
        
        if (this.windowBreakpoint < 2) {
          styles.right = '24px';
        } else {
          styles.right = 'auto';
        }
        return styles;
      },

      // Handle pseudo-classes (:focus-visible) dynamically
      focusStyles() {
        return {
          ':focus': {
            outline: 'none',
          },
          ':focus-visible': {
            // Use brand secondary v_100 for focus ring
            outline: `3px solid ${this.$themeBrand.secondary.v_100}`,
            outlineOffset: '2px',
          },
          // Also apply to [aria-live="assertive"] (backdrop mode)
          '&[aria-live="assertive"]:focus': {
            outline: `3px solid ${this.$themeBrand.secondary.v_100}`,
            outlineOffset: '2px',
          }
        };
      },

      actionButtonStyles() {
        return {
          // Use textInverted token
          color: this.$themeTokens.textInverted, 
          textDecoration: 'none',
          fontWeight: 'bold',

          textTransform: 'uppercase',
          ':hover': {
            // Keep semi-transparent white for hover state on dark background
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
          ':focus': {
            outline: `2px solid ${this.$themeTokens.textInverted}`,
            outlineOffset: '2px',
          }
        };
      }
    },

    methods: {
      onClick() { this.$emit('click'); },
      onActionClick() {
        if (this.actionCallback) this.actionCallback();
        this.$emit('action-click');
      },
      onEnter() { this.$emit('show'); },
      onLeave() { this.$emit('hide'); },
      handleBackdropClick() {} 
    }
  };

</script>


<style lang="scss" scoped>

  @import '../styles/definitions';

  .k-snackbar-wrapper {
    position: relative;
    z-index: 24;
  }

  .k-snackbar-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 23;
  }

  .k-snackbar {
    position: fixed;
    z-index: 24;
    display: inline-flex;
    align-items: center;
    
    // Spec Dimensions
    min-width: 344px;
    max-width: 512px;
    min-height: 48px;
    padding: 14px 24px;
    border-radius: 4px;

    // Spec Colors managed in computed properties now
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
  }

  .k-snackbar-message {
    flex-grow: 1;
    cursor: default;
    font-size: 14px;
    line-height: 1.5;
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
  }

  /* Transitions */
  .k-snackbar--transition-slide-enter-active,
  .k-snackbar--transition-slide-leave-active {
    transition: transform 0.4s ease, opacity 0.4s ease;
  }

  .k-snackbar--transition-slide-enter,
  .k-snackbar--transition-slide-leave-to {
    transform: translateY(100px);
    opacity: 0;
  }

  .k-snackbar-fade-enter-active,
  .k-snackbar-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .k-snackbar-fade-enter,
  .k-snackbar-fade-leave-to {
    opacity: 0;
  }

</style>