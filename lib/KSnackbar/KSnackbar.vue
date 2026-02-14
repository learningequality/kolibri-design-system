<template>

  <div class="k-snackbar-wrapper">
    <transition name="k-snackbar-fade">
      <div 
        v-if="isOpen && backdrop" 
        class="k-snackbar-backdrop"
        @click.stop="handleBackdropClick"
      ></div>
    </transition>

    <div 
      v-if="isOpen && backdrop" 
      tabindex="0" 
      class="k-focus-sentinel"
      @focus="trapFocus"
    ></div>

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
            appearance="flat-button"
            class="k-snackbar-action-button"
            :text="actionText"
            :appearanceOverrides="actionButtonStyles"
            @click.stop="onActionClick"
          />
        </div>
      </div>
    </transition>

    <div 
      v-if="isOpen && backdrop" 
      tabindex="0" 
      class="k-focus-sentinel"
      @focus="trapFocus"
    ></div>

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
        } 
      
        else if (props.actionText) {
          const btn = actionButton.value?.$el || actionButton.value;
          if (btn && typeof btn.focus === 'function') btn.focus();
        }
      };

      const trapFocus = (e) => {
  
        if (e) e.stopPropagation();
        
        
        if (snackbarElement.value) {
          snackbarElement.value.focus();
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
        trapFocus
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
      
      snackbarStyles() {
        const styles = {
          bottom: `${24 + this.bottomOffset}px`,
          left: '24px',
          backgroundColor: this.$themePalette.grey.v_800,
          color: this.$themeTokens.textInverted,
        };
        
        if (this.windowBreakpoint < 2) {
          styles.right = '24px';
        } else {
          styles.right = 'auto';
        }
        return styles;
      },

      focusStyles() {
        return {
          ':focus': {
            outline: 'none',
          },
          ':focus-visible': {
            outline: `3px solid ${this.$themeBrand.secondary.v_100}`,
            outlineOffset: '2px',
          },
          '&[aria-live="assertive"]:focus': {
            outline: `3px solid ${this.$themeBrand.secondary.v_100}`,
            outlineOffset: '2px',
          }
        };
      },

      actionButtonStyles() {
        const whiteColor = this.$themeTokens.textInverted;

        return {
          color: whiteColor, 
          textDecoration: 'none',
          ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        };
      }
    },

    methods: {
      onClick() { this.$emit('click'); },
      onActionClick() {
        if (this.actionCallback) this.actionCallback();
        this.$emit('action-click');
        this.$emit('close');
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
  
  .k-focus-sentinel {
    position: fixed; 
    opacity: 0;
    pointer-events: none;
  }

  .k-snackbar {
    position: fixed;
    z-index: 24;
    display: inline-flex;
    align-items: center;
    
    min-width: 344px;
    max-width: 512px;
    min-height: 48px;
    padding: 14px 24px;
    border-radius: 4px;
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
    margin-right: -12px; 
    margin-top: -9px;
    margin-bottom: -9px;
    display: flex;
    align-items: center;
  }

  .k-snackbar-action-button {
    margin: 0;
  }

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