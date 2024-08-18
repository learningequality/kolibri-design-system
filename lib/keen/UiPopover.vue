<template>

  <UiFocusContainer
    ref="focusContainer"
    class="ui-popover"
    role="dialog"

    :class="{ 'is-raised': raised }"
    :contain-focus="containFocus"
    :focus-redirector="focusRedirector"

    @focus-overflow="close()"
  >
    <slot></slot>
  </UiFocusContainer>

</template>


<script>

  import tippy from 'tippy.js/umd';

  import classlist from './helpers/classlist';
  import elementRef from './helpers/element-ref';
  import events from './helpers/events';
  import UiFocusContainer from './UiFocusContainer.vue';

  export default {
    name: 'UiPopover',

    components: {
      UiFocusContainer,
    },

    props: {
      animation: {
        type: String,
        default: 'fade', // 'fade', 'shift-away', 'scale', or 'none'
      },
      appendToBody: {
        type: Boolean,
        default: true,
      },
      closeOnScroll: {
        type: Boolean,
        default: true,
      },
      constrainToScrollParent: {
        type: Boolean,
        default: true,
      },
      containFocus: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      focusRedirector: Function,
      openOn: {
        type: String,
        default: 'click', // 'click', 'mouseenter', 'focus', or 'manual', plus 'hover' (compat)
      },
      position: {
        type: String,
        default: 'bottom-start',
      },
      raised: {
        type: Boolean,
        default: true,
      },
      trigger: {
        validator(value) {
          /* eslint-disable-next-line import/no-named-as-default-member */
          return elementRef.validate(
            value,
            '[UiPopover]: Invalid prop: "trigger". Expected Element, VueComponent or CSS selector string which matches an existing element.'
          );
        },
      },
      zIndex: Number,
      positionX: Number,
      positionY: Number,
    },

    data() {
      return {
        returnFocus: true,
      };
    },

    watch: {
      disabled(value) {
        if (this.tip) {
          if (value === true) {
            this.tip.disable();
          } else {
            this.tip.enable();
          }
        }
      },
    },

    created() {
      this.tip = null;
    },

    mounted() {
      this.setupPopover();
    },

    beforeDestroy() {
      this.destroyPopover();
    },

    methods: {
      setupPopover() {
        /* eslint-disable-next-line import/no-named-as-default-member */
        this.triggerEl = elementRef.resolve(this.trigger, this.$el.parentElement);

        if (!this.triggerEl) {
          /* eslint-disable-next-line no-console */
          console.error('[UiPopover]: Trigger element not found.');
          return;
        }

        const options = {
          animateFill: false,
          // Use 'fade' when animation is 'none', as 'none' it's not a valid Tippy.js option.
          // The effect of no transition is achieved by `duration: 0` below.
          animation: this.animation === 'none' ? 'fade' : this.animation,
          appendTo: this.appendToBody ? document.body : this.triggerEl.parentElement,
          arrow: false,
          content: this.$el,
          delay: [0, 0],
          distance: 0,
          duration: this.animation === 'none' ? 0 : [250, 200],
          hideOnClick: true,
          ignoreAttributes: true,
          interactive: true,
          lazy: true,
          maxWidth: '100%',
          multiple: true,
          onHidden: this.onHidden,
          onHide: this.onClose,
          onShow: this.onOpen,
          onShown: this.onShown,
          placement: this.position,
          role: 'dialog',
          theme: 'ui-popover',
          trigger: this.openOn.replace('hover', 'mouseenter'),
          zIndex: this.zIndex,
          popperOptions: {
            modifiers: {
              computeStyle: {
                // Disable GPU acceleration to fix blurry text in popover on Windows (Chrome)
                // https://github.com/twbs/bootstrap/issues/23590
                gpuAcceleration: !(window.devicePixelRatio < 1.5 && /Win/.test(navigator.platform)),
              },
            },
          },
        };

        if (!this.constrainToScrollParent) {
          options.popperOptions.modifiers.preventOverflow = { enabled: false };
          options.popperOptions.modifiers.hide = { enabled: false };
        }

        this.tip = tippy(this.triggerEl, options);

        if (this.disabled) {
          this.tip.disable();
        }
      },

      destroyPopover() {
        if (this.tip) {
          this.removeCloseEventListeners();
          this.tip.destroy();
          this.tip = null;
        }
      },

      isOpen() {
        return this.tip && this.tip.state.isVisible;
      },
      /**
       * @public
       */
      open() {
        if (!this.tip) {
          return;
        }
        if (this.positionX || this.positionY) {
          this.openInPosition(this.positionX, this.positionY);
        } else {
          this.tip.show();
        }
      },
      openInPosition(x, y) {
        if (!this.tip.popperInstance) {
          this.tip.show(); // Ensure popperInstance is created
        }

        // This logic is similar to what tippy.js uses to position the popup near the cursor.
        // see https://github.com/atomiks/tippyjs/blob/v4.3.5/src/createTippy.ts#L395
        const isVerticalPlacement = ['top', 'bottom'].includes(this.position.split('-')[0]);
        const variation = this.position.split('-')[1];
        const size = isVerticalPlacement ? this.$el.clientWidth : this.$el.clientHeight;
        const middle = size / 2;

        const positionVariationMap = {
          start: 0,
          end: size,
        };
        let verticalIncrease;
        let horizontalIncrease;
        if (isVerticalPlacement) {
          verticalIncrease = 0;
          horizontalIncrease = variation ? positionVariationMap[variation] : middle;
        } else {
          verticalIncrease = variation ? positionVariationMap[variation] : middle;
          horizontalIncrease = 0;
        }

        this.tip.popperInstance.reference.getBoundingClientRect = () => {
          return {
            width: isVerticalPlacement ? size : 0,
            height: isVerticalPlacement ? 0 : size,
            top: y - verticalIncrease,
            bottom: y + verticalIncrease,
            left: x - horizontalIncrease,
            right: x + horizontalIncrease
          };
        };
        this.tip.show();
      },

      close(options = { returnFocus: true }) {
        if (this.tip) {
          this.returnFocus = options.returnFocus;
          this.tip.hide();
        }
      },
      /**
       * @public
       */
      toggle(options = { returnFocus: true }) {
        if (this.tip) {
          this.returnFocus = options.returnFocus;
          this.tip[this.isOpen() ? 'hide' : 'show']();
        }
      },
      /**
       * @public
       */
      scheduleUpdate() {
        if (this.tip) {
          this.tip.popperInstance.scheduleUpdate();
        }
      },

      onOpen() {
        this.addCloseEventListeners();

        classlist.add(this.triggerEl, 'has-dropdown-open');

        this.$emit('open');
      },

      onClose() {
        if (this.returnFocus && this.lastFocusedElement) {
          this.lastFocusedElement.focus();
        }

        this.removeCloseEventListeners();

        classlist.remove(this.triggerEl, 'has-dropdown-open');

        this.$emit('close');

        // Reset return focus
        this.returnFocus = true;
      },

      onShown() {
        this.lastFocusedElement = document.activeElement;
        this.$refs.focusContainer.focus();
        this.$emit('reveal');
      },

      onHidden() {
        this.$emit('hide');
      },

      closeOnExternal(event, closeOptions) {
        if (!this.$el.contains(event.target)) {
          this.close(closeOptions);
        }
      },

      addCloseEventListeners() {
        this.removeCloseEventListeners();

        // Add event listeners in the next tick, otherwise they're triggered immediately
        setTimeout(() => {
          /* eslint-disable-next-line import/no-named-as-default-member */
          this.removeExternalClickListener = events.on('click', document, e => {
            this.closeOnExternal(e, { returnFocus: false });
          });

          /* eslint-disable-next-line import/no-named-as-default-member */
          this.removeEscListener = events.onKeydown(27, document, () => {
            this.close({ returnFocus: true });
          });

          if (this.closeOnScroll) {
            /* eslint-disable-next-line import/no-named-as-default-member */
            this.removeScrollListener = events.on('scroll', document, e => {
              this.closeOnExternal(e, { returnFocus: true });
            });
          }
        }, 0);
      },

      removeCloseEventListeners() {
        if (this.removeExternalClickListener) {
          this.removeExternalClickListener();
          this.removeExternalClickListener = null;
        }

        if (this.removeEscListener) {
          this.removeEscListener();
          this.removeEscListener = null;
        }

        if (this.removeScrollListener) {
          this.removeScrollListener();
          this.removeScrollListener = null;
        }
      },
    },
  };

</script>


<style lang="scss">

  /* stylelint-disable */

  @import './styles/imports';
  //@import './styles/tippy/tippy';

  .ui-popover {
    &.is-raised {
      @extend %dropshadow-6dp;
    }

    .ui-menu {
      border: none;
    }
  }

  .ui-popover-theme {
    background-color: white;
  }

</style>
