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

  import { ref, watch, computed, nextTick } from 'vue';
  import useKLiveRegion from '../composables/useKLiveRegion';
  import useKResponsiveWindow from '../composables/useKResponsiveWindow';

  const { sendPoliteMessage } = useKLiveRegion();

  /**
   * KSnackbar displays brief messages at the bottom of the screen.
   * Replaces UiSnackbar, CoreSnackbar, and GlobalSnackbar.
   */
  export default {
    name: 'KSnackbar',
    setup(props, { emit }) {
      const { windowBreakpoint } = useKResponsiveWindow();
      const snackbarElement = ref(null);
      const actionButton = ref(null);

      // Store the element that had focus before snackbar opened
      const previousActiveElement = ref(null);

      let hideTimeoutId = null;

      // --- Computed Styles ---
      const transitionName = computed(() => `k-snackbar--transition-${props.transition}`);

      const snackbarStyles = computed(() => {
        const styles = {
          bottom: `${24 + props.bottomOffset}px`,
          left: '24px',
        };
        // Breakpoint 2 corresponds to medium screens (600px+)
        if (windowBreakpoint.value < 2) {
          styles.right = '24px';
        } else {
          styles.right = 'auto';
        }
        return styles;
      });

      const actionButtonStyles = computed(() => ({
        color: '#FFFFFF', // Hardcoded KDS token for white text
        textDecoration: 'none',
        textTransform: 'uppercase',
        ':hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
        ':focus': {
          outline: '2px solid white',
          outlineOffset: '2px',
        },
      }));

      // --- Methods ---
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

      /**
       * Accessibility: Restore focus to the element that triggered the snackbar
       */
      const restoreFocus = async () => {
        await nextTick();
        if (previousActiveElement.value &&
          typeof previousActiveElement.value.focus === 'function' &&
          document.body.contains(previousActiveElement.value)) {
          previousActiveElement.value.focus();
        }
        previousActiveElement.value = null;
      };

      /**
       * Accessibility: Trap focus or Auto-focus action
       */
      const manageFocusOnOpen = async () => {
        await nextTick();

        // If backdrop is active, we treat this like a modal: focus the container
        if (props.backdrop && snackbarElement.value) {
          snackbarElement.value.focus();
          return;
        }

        // If no backdrop but we have an action, focus the action button
        // This mimics GlobalSnackbar 'v-autofocus' behavior
        if (props.actionText) {
          // Check if KButton exposes $el (Options API) or we need to find it
          const btnEl = actionButton.value?.$el || actionButton.value;
          if (btnEl && typeof btnEl.focus === 'function') {
            btnEl.focus();
          }
        }
      };

      // --- Watcher for Open/Close Logic ---
      watch(() => props.isOpen, (newValue, oldValue) => {
        if (newValue && !oldValue) {
          // OPENING
          previousActiveElement.value = document.activeElement;
          setupAutoHide();

          if (props.text) {
            sendPoliteMessage(props.text);
          }

          manageFocusOnOpen();

        } else if (!newValue && oldValue) {
          // CLOSING
          clearAutoHide();
          restoreFocus();
        }
      });

      // Watch for text updates while open (forceReuse scenario)
      watch(() => props.text, (newText) => {
        if (props.isOpen && newText) {
          sendPoliteMessage(newText);
          setupAutoHide(); // Reset timer on update
        }
      });

      return {
        windowBreakpoint,
        snackbarElement,
        actionButton,
        transitionName,
        snackbarStyles,
        actionButtonStyles,
        handleClose: () => emit('close'),
        setupAutoHide,
        clearAutoHide,
      };
    },
    props: {
      isOpen: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
        default: '',
      },
      actionText: {
        type: String,
        default: '',
      },
      actionCallback: {
        type: Function,
        default: null,
      },
      duration: {
        type: Number,
        default: 4000,
      },
      bottomOffset: {
        type: Number,
        default: 0,
      },
      backdrop: {
        type: Boolean,
        default: false,
      },
      transition: {
        type: String,
        default: 'slide',
        validator: val => ['slide', 'fade'].includes(val),
      },
    },
    beforeDestroy() {
      // Cleanup timeout if component is destroyed while open
      this.clearAutoHide();
    },
    methods: {
      onClick() {
        this.$emit('click');
      },
      onActionClick() {
        if (this.actionCallback) {
          this.actionCallback();
        }
        this.$emit('action-click');
      },
      handleBackdropClick() {
        // CoreSnackbar usually does NOT dismiss on backdrop click,
        // it just blocks interaction. We do nothing here.
      },
      onEnter() {
        this.$emit('show');
      },
      onLeave() {
        this.$emit('hide');
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '../styles/definitions';

  // Fallback if $k-grey-900 isn't globally available in your import
  $k-grey-900: #212121 !default;
  // Focus color fallback
  $brand-secondary-v-100: #E6D2F3 !default; // Replace with actual token if imports work

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

    // SPEC: Dimensions
    min-width: 344px; // Spec: Min width 344px
    min-height: 48px; // Spec: Height 48px (using min-height for safety with long text)
    max-width: 512px; // Spec: Max width 512px
    padding: 14px 24px;

    // SPEC: Spacing and Radius
    color: white;
    background-color: $k-grey-900; // Spec: Background color

    // SPEC: Colors
    border-radius: 4px; // Spec: Corner radius 4px

    // SPEC: Box Shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25)
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);

    &:focus {
      outline: none; // Using custom focus styles
    }

    // SPEC: Focused State
    &:focus-visible {
      // KDS often uses outline or box-shadow for focus.
      // Spec says: brand.secondary.v_100
      outline: 3px solid $brand-secondary-v-100;
      outline-offset: 2px;
    }

    // Support for Backdrop focus ring
    &[aria-live="assertive"]:focus {
      outline: 3px solid $brand-secondary-v-100;
      outline-offset: 2px;
    }
  }

  .k-snackbar-message {
    flex-grow: 1;
    cursor: default;

    // SPEC: Text 14px white and BOLDED
    font-size: 14px;
    font-weight: bold; // Spec requirement
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
    // Slide up from bottom
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