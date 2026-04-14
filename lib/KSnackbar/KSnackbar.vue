<template>

  <div class="k-snackbar-wrapper">
    <transition name="k-snackbar-fade">
      <div
        v-if="isOpen && backdrop"
        class="k-snackbar-backdrop"
      ></div>
    </transition>

    <KFocusTrap
      :disabled="!isOpen || !backdrop"
      @shouldFocusFirstEl="focusSnackbar"
      @shouldFocusLastEl="focusLastEl"
    >
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
          :class="[
            $computedClass({ ':focus-visible': $coreOutline }),
            { 'k-snackbar-small': isSmall },
          ]"
          :style="snackbarStyles"
          tabindex="0"
          @keydown.esc="handleClose"
        >
          <div class="k-snackbar-message">
            <!-- @slot Optional slot as an alternative to the `text` prop for the message -->
            <slot
              name="text"
              :text="text"
            >
              <KTextTruncator
                :text="text"
                :maxLines="2"
              />
            </slot>
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
              @blur="$emit('blur', $event)"
            />
          </div>
        </div>
      </transition>
    </KFocusTrap>
  </div>

</template>


<script>

  import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue';
  import { themeTokens, themePalette } from '../styles/theme';
  import useKLiveRegion from '../composables/useKLiveRegion';
  import useKResponsiveWindow from '../composables/useKResponsiveWindow';
  import KFocusTrap from '../KFocusTrap.vue';
  import KTextTruncator from '../KTextTruncator.vue';

  /**
   * A globally-managed notification component for displaying non-critical messages
   */
  export default {
    name: 'KSnackbar',

    components: { KFocusTrap, KTextTruncator },

    emits: [
      /** Emitted when the action button is clicked. */
      'actionClick',
      /** Emitted when the snackbar enters the screen. */
      'show',
      /** Emitted when the snackbar leaves the screen. */
      'hide',
      /** Emitted when the snackbar is closed (e.g., via auto-dismiss or Esc key). */
      'close',
      /** Emitted when the action button loses focus. */
      'blur',
    ],

    setup(props, { emit }) {
      const { sendPoliteMessage, sendAssertiveMessage } = useKLiveRegion();

      const announce = message => {
        if (props.announce === false || props.announce === undefined) return;
        if (props.assertive) {
          sendAssertiveMessage(message);
        } else {
          sendPoliteMessage(message);
        }
      };
      const { windowBreakpoint } = useKResponsiveWindow();
      const snackbarElement = ref(null);
      const actionButton = ref(null);
      const previousActiveElement = ref(null);

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

      const focusSnackbar = async () => {
        await nextTick();
        if (snackbarElement.value) {
          snackbarElement.value.focus();
        }
      };

      const focusLastEl = async () => {
        await nextTick();
        if (actionButton.value) {
          actionButton.value.focus();
        } else if (snackbarElement.value) {
          snackbarElement.value.focus();
        }
      };

      const manageFocusOnOpen = async () => {
        await nextTick();

        if (props.backdrop && snackbarElement.value) {
          snackbarElement.value.focus();
        } else if (props.autofocus && props.actionText && actionButton.value) {
          actionButton.value.focus();
        }
      };

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

      const onOpen = () => {
        previousActiveElement.value = document.activeElement;
        setupAutoHide();
        if (props.text) announce(props.text);
        manageFocusOnOpen();
      };

      const onClose = () => {
        clearAutoHide();
        restoreFocus();
      };

      watch(
        [() => props.isOpen, () => props.text],
        ([isOpen, text], [wasOpen] = []) => {
          if (isOpen && !wasOpen) {
            onOpen();
          } else if (!isOpen && wasOpen) {
            onClose();
          } else if (isOpen && text) {
            announce(text);
            setupAutoHide();
          }
        },
        { immediate: true },
      );

      const isSmall = computed(() => windowBreakpoint.value < 2);

      const snackbarStyles = computed(() => ({
        bottom: `${24 + props.bottomOffset}px`,
        backgroundColor: themePalette().grey.v_800,
        color: themeTokens().textInverted,
      }));

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

      const onActionClick = () => {
        emit('actionClick');
      };
      const onEnter = () => {
        emit('show');
      };

      const onLeave = () => {
        emit('hide');
      };

      const handleClose = () => {
        emit('close');
      };

      onBeforeUnmount(() => {
        clearAutoHide();
      });

      return {
        isSmall,
        snackbarElement,
        actionButton,
        handleClose,
        focusSnackbar,
        focusLastEl,
        snackbarStyles,
        actionButtonStyles,
        onActionClick,
        onEnter,
        onLeave,
      };
    },

    props: {
      /**
       * Controls whether the snackbar is visible
       */
      isOpen: { type: Boolean, required: true },
      /**
       * The main message text displayed in the snackbar.
       * Also used for live-region announcements even when the `#text` slot is used.
       */
      text: { type: String, required: true },
      /**
       * Optional text for an action button (e.g. "Undo")
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
       * Whether to trigger a live-region announcement for screen readers.
       * Explicitly required for each usage via the composable.
       */
      announce: { type: Boolean, default: undefined },
      /**
       * When true and announce is true, uses an assertive live region.
       * Use sparingly, only for critical errors.
       */
      assertive: { type: Boolean, default: false },
      /**
       * If true, autofocuses the action button when snackbar appears
       */
      autofocus: { type: Boolean, default: false },
      /**
       * If true, the snackbar will auto-dismiss after the duration
       */
      autoDismiss: { type: Boolean, default: true },
      /**
       * Duration in milliseconds before auto-dismissing (if autoDismiss is true)
       */
      duration: { type: Number, default: 5000 },
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
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 23;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .k-snackbar {
    position: fixed;
    bottom: 24px;
    left: 24px;
    z-index: 24;
    display: inline-flex;
    gap: 48px;
    align-items: center;
    min-width: 344px;
    max-width: 512px;
    min-height: 48px;
    padding: 14px 12px 14px 24px;
    border-radius: 4px;
    @extend %dropshadow-2dp;
  }

  .k-snackbar.k-snackbar-small {
    right: 24px;
  }

  [dir='rtl'] .k-snackbar {
    padding: 14px 24px 14px 12px;
  }

  [dir='rtl'] .k-snackbar:not(.k-snackbar-small) {
    right: 24px;
    left: auto;
  }

  .k-snackbar-message {
    display: flex;
    flex-grow: 1;
    align-items: center;
    overflow: hidden;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.5;
    text-align: start;
    cursor: default;
  }

  .k-snackbar-action {
    display: flex;
    align-items: center;
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
