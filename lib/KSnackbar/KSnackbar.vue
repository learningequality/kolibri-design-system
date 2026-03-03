<template>

  <div class="k-snackbar-wrapper">
    <transition name="k-snackbar-fade">
      <div
        v-if="isOpen && backdrop"
        class="k-snackbar-backdrop"
      ></div>
    </transition>

    <div
      v-if="isOpen && backdrop"
      tabindex="0"
      class="k-focus-sentinel"
      @focus="trapFocus"
    ></div>

    <transition
      name="k-snackbar--transition-slide"
      @after-enter="onEnter"
      @after-leave="onLeave"
    >
      <div
        v-if="isOpen"
        ref="snackbarElement"
        class="k-snackbar"
        data-testid="snackbar"
        :class="$computedClass(focusStyles)"
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

  import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue';
  import { themeTokens, themeBrand, themePalette } from '../styles/theme';
  import useKLiveRegion from '../composables/useKLiveRegion';
  import useKResponsiveWindow from '../composables/useKResponsiveWindow';

  const { sendPoliteMessage } = useKLiveRegion();

  /**
   * A globally-managed notification component for displaying non-critical messages
   */
  export default {
    name: 'KSnackbar',

    setup(props, { emit }) {
      const { windowBreakpoint } = useKResponsiveWindow();
      const snackbarElement = ref(null);
      const actionButton = ref(null);
      const previousActiveElement = ref(null);

      // --- Logic ---
      const restoreFocus = async () => {
        await nextTick();
        if (
          previousActiveElement.value &&
          document.body.contains(previousActiveElement.value) &&
          typeof previousActiveElement.value.focus === 'function'
        ) {
          previousActiveElement.value.focus();
        }
        previousActiveElement.value = null;
      };

      const manageFocusOnOpen = async () => {
        await nextTick();

        if (props.backdrop && snackbarElement.value) {
          snackbarElement.value.focus();
        } else if (props.autofocus && props.actionText) {
          const btn = actionButton.value?.$el || actionButton.value;
          if (btn && typeof btn.focus === 'function') btn.focus();
        }
      };
      const onActionBlur = e => {
        if (props.onBlur) props.onBlur(e);
      };

      const onActionKeydown = e => {
        if (e.key === 'Tab' && props.onBlur) {
          e.preventDefault();
          props.onBlur(e);
        }
      };

      const addActionButtonListeners = async () => {
        if (!props.actionText || !props.onBlur) return;

        await nextTick();
        const btn = actionButton.value?.$el || actionButton.value;
        if (btn) {
          btn.addEventListener('blur', onActionBlur);
          btn.addEventListener('keydown', onActionKeydown);
        }
      };

      const removeActionButtonListeners = () => {
        if (!props.actionText || !props.onBlur) return;

        const btn = actionButton.value?.$el || actionButton.value;
        if (btn) {
          btn.removeEventListener('blur', onActionBlur);
          btn.removeEventListener('keydown', onActionKeydown);
        }
      };

      const trapFocus = e => {
        if (e) e.stopPropagation();

        if (snackbarElement.value) {
          snackbarElement.value.focus();
        }
      };

      // --- Auto-hide timer logic ---
      let hideTimeoutId = null;

      const clearAutoHide = () => {
        if (hideTimeoutId) {
          clearTimeout(hideTimeoutId);
          hideTimeoutId = null;
        }
      };

      const setupAutoHide = () => {
        clearAutoHide();
        if (props.autoDismiss && props.duration > 0) {
          hideTimeoutId = setTimeout(() => {
            emit('close');
          }, props.duration);
        }
      };

      // --- Watchers ---
      watch(
        () => props.isOpen,
        (val, old) => {
          if (val && !old) {
            previousActiveElement.value = document.activeElement;
            setupAutoHide();
            if (props.text) sendPoliteMessage(props.text);
            manageFocusOnOpen();
            addActionButtonListeners();
          } else if (!val && old) {
            clearAutoHide();
            removeActionButtonListeners();
            restoreFocus();
          }
        },
      );

      watch(
        () => props.text,
        val => {
          if (props.isOpen && val) {
            sendPoliteMessage(val);
            setupAutoHide();
          }
        },
      );

      const snackbarStyles = computed(() => {
        const isRtl = window.isRtl;

        const styles = {
          bottom: `${24 + props.bottomOffset}px`,
          backgroundColor: themePalette().grey.v_800,
          color: themeTokens().textInverted,
        };

        if (windowBreakpoint.value < 2) {
          styles.left = '24px';
          styles.right = '24px';
        } else {
          if (isRtl) {
            styles.right = '24px';
            styles.left = 'auto';
          } else {
            styles.left = '24px';
            styles.right = 'auto';
          }
        }
        return styles;
      });

      const focusStyles = computed(() => {
        return {
          ':focus': {
            outline: 'none',
          },
          ':focus-visible': {
            outline: `3px solid ${themeBrand().secondary.v_100}`,
            outlineOffset: '2px',
          },
        };
      });

      const actionButtonStyles = computed(() => {
        const whiteColor = themeTokens().textInverted;

        return {
          color: whiteColor,
          textDecoration: 'none',
          ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        };
      });

      const onClick = () => emit('click');

      const onActionClick = () => {
        emit('action-click');
      };

      const onEnter = () => emit('show');

      const onLeave = () => emit('hide');

      const handleClose = () => emit('close');

      onBeforeUnmount(() => {
        clearAutoHide();
        removeActionButtonListeners();
      });

      return {
        windowBreakpoint,
        snackbarElement,
        actionButton,
        handleClose,
        trapFocus,
        snackbarStyles,
        focusStyles,
        actionButtonStyles,
        onClick,
        onActionClick,
        onEnter,
        onLeave,
      };
    },

    props: {
      /**
       * Controls whether the snackbar is visible
       */
      isOpen: { type: Boolean, default: false },
      /**
       * The main message text displayed in the snackbar
       */
      text: { type: String, default: '' },
      /**
       * Optional text for an action button (e.g., "Undo")
       */
      actionText: { type: String, default: '' },
      /**
       * Additional bottom offset in pixels.
       * Useful when a bottom navigation bar is present
       */
      bottomOffset: { type: Number, default: 0 },
      /**
       * If true, shows a darkening backdrop behind the snackbar and sets
       * focus to the snackbar. Used for critical messages
       */
      backdrop: { type: Boolean, default: false },
      /**
       * If true, autofocuses the action button when snackbar appears
       */
      autofocus: { type: Boolean, default: false },
      /**
       * Blur event handler for when the action button loses focus
       */
      onBlur: { type: Function, default: null },
      /**
       * If true, the snackbar will auto-dismiss after the duration
       */
      autoDismiss: { type: Boolean, default: true },
      /**
       * Duration in milliseconds before auto-dismissing (if autoDismiss is true)
       */
      duration: { type: Number, default: 4000 },
    },
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
    z-index: 23;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .k-focus-sentinel {
    position: fixed;
    pointer-events: none;
    opacity: 0;
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
    font-size: 14px;
    line-height: 1.5;
    text-align: start;
    cursor: default;
  }

  .k-snackbar-action {
    display: flex;
    align-items: center;
    padding-left: 48px;
    margin-top: -9px;
    margin-right: -12px;
    margin-bottom: -9px;
    margin-left: auto;
  }

  .k-snackbar-action-button {
    margin: 0;
  }

  .k-snackbar--transition-slide-enter-active,
  .k-snackbar--transition-slide-leave-active {
    transition:
      transform 0.4s ease,
      opacity 0.4s ease;
  }

  .k-snackbar--transition-slide-enter,
  .k-snackbar--transition-slide-leave-to {
    opacity: 0;
    transform: translateY(100px);
  }

</style>
