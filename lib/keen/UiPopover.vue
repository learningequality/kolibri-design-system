<template>

  <UiFocusContainer
    ref="focusContainer"
    class="ui-popover"
    :role="role"

    :class="{ 'is-raised': raised }"
    :contain-focus="containFocus"
    :focus-redirector="focusRedirector"

    @focus-overflow="close()"
    @focusin.native="startFocusScroll"
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

  let visibleViewport = null;

  // Popper 1.16's 'viewport' boundary is max(clientWidth, innerWidth), which includes
  // classic scrollbars; a fixed inset-0 element's rect excludes them.
  function getVisibleViewport() {
    if (!visibleViewport || !document.body.contains(visibleViewport)) {
      visibleViewport = document.createElement('div');
      visibleViewport.setAttribute('aria-hidden', 'true');
      visibleViewport.style.cssText =
        'position: fixed; top: 0; right: 0; bottom: 0; left: 0; visibility: hidden; pointer-events: none;';
      document.body.appendChild(visibleViewport);
    }
    return visibleViewport;
  }

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
      role: {
        type: String,
        default: 'dialog',
      },
      hideOnClick: {
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
      position(value) {
        if (this.tip) {
          this.tip.set({ placement: value });
          this.useCursorReference();
        }
      },
      constrainToScrollParent() {
        if (this.tip) {
          this.tip.set(this.getBoundaryOptions());
          this.useCursorReference();
          if (this.isOpen()) {
            this.syncViewportBoundary();
          }
        }
      },
    },

    created() {
      this.tip = null;
      this.cursorReference = null;
      this.focusScrollFrame = null;
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
          hideOnClick: this.hideOnClick ? 'toggle' : false,
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
          role: this.role,
          theme: 'ui-popover',
          trigger: this.openOn.replace('hover', 'mouseenter'),
          zIndex: this.zIndex,
          ...this.getBoundaryOptions(),
        };

        this.tip = tippy(this.triggerEl, options);

        if (this.disabled) {
          this.tip.disable();
        }
      },

      getBoundaryOptions() {
        return {
          boundary: this.constrainToScrollParent ? 'scrollParent' : getVisibleViewport(),
          popperOptions: {
            modifiers: {
              computeStyle: {
                // Disable GPU acceleration to fix blurry text in popover on Windows (Chrome)
                // https://github.com/twbs/bootstrap/issues/23590
                gpuAcceleration: !(window.devicePixelRatio < 1.5 && /Win/.test(navigator.platform)),
              },
              hide: { enabled: this.constrainToScrollParent },
            },
          },
        };
      },

      syncViewportBoundary() {
        if (this.constrainToScrollParent) {
          window.removeEventListener('resize', this.onResize);
        } else {
          this.setBoundaryHeight();
          window.addEventListener('resize', this.onResize);
        }
      },

      destroyPopover() {
        if (this.tip) {
          this.removeCloseEventListeners();
          this.endFocusScroll();
          window.removeEventListener('resize', this.onResize);
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
          this.cursorReference = null;
          this.tip.show();
        }
      },
      openInPosition(x, y) {
        this.cursorReference = {
          referenceNode: this.triggerEl,
          parentNode: this.triggerEl.parentNode,
          // Mirrors tippy 4.3.5 positionVirtualReferenceNearCursor; popper 1.16 skips its
          // scrollbar correction when clientWidth/clientHeight are 0
          clientWidth: 0,
          clientHeight: 0,
          getBoundingClientRect: () => ({
            width: 0,
            height: 0,
            top: y,
            bottom: y,
            left: x,
            right: x
          }),
        };
        this.tip.show();
        this.useCursorReference();
      },
      useCursorReference() {
        if (this.cursorReference && this.tip.popperInstance) {
          this.tip.popperInstance.reference = this.cursorReference;
        }
      },

      close() {
        if (this.tip) {
          this.tip.hide();
        }
      },
      /**
       * @public
       */
      toggle() {
        if (this.tip) {
          this.tip[this.isOpen() ? 'hide' : 'show']();
        }
      },
      /**
       * @public
       */
      focus() {
        this.$refs.focusContainer.focus();
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
        this.syncViewportBoundary();
        this.lastFocusedElement = document.activeElement;

        if (this.hideOnClick) {
          this.addCloseEventListeners();
        }

        classlist.add(this.triggerEl, 'has-dropdown-open');

        this.$emit('open');
      },

      onClose() {
        const returnTargets =
          this.openOn === 'click'
            ? [this.triggerEl, this.lastFocusedElement]
            : [this.lastFocusedElement, this.triggerEl];
        for (const el of returnTargets) {
          if (el && this.$el.contains(document.activeElement)) {
            el.focus();
          }
        }

        this.removeCloseEventListeners();
        window.removeEventListener('resize', this.onResize);

        classlist.remove(this.triggerEl, 'has-dropdown-open');

        this.$emit('close');
      },

      setBoundaryHeight() {
        // Read by KDropdownMenu's scoped styles.
        this.$el.style.setProperty(
          '--popover-boundary-height',
          `${this.tip.props.boundary.clientHeight}px`
        );
      },

      onResize() {
        this.setBoundaryHeight();
        this.scheduleUpdate();
      },

      onShown() {
        if (!this.$el.contains(document.activeElement)) {
          this.focus();
        }
        this.$emit('reveal');
      },

      onHidden() {
        this.$emit('hide');
      },

      startFocusScroll() {
        this.endFocusScroll();
        this.focusScrollFrame = requestAnimationFrame(() => {
          this.focusScrollFrame = requestAnimationFrame(this.endFocusScroll);
        });
      },

      endFocusScroll() {
        cancelAnimationFrame(this.focusScrollFrame);
        this.focusScrollFrame = null;
      },

      closeOnExternal(event) {
        if (!this.$el.contains(event.target)) {
          this.close();
        }
      },

      addCloseEventListeners() {
        this.removeCloseEventListeners();

        // Add event listeners in the next tick, otherwise they're triggered immediately
        this.addListenersTimeout = setTimeout(() => {
          /* eslint-disable-next-line import/no-named-as-default-member */
          this.removeExternalClickListener = events.on(
            'click',
            document,
            e => {
              if (!(this.openOn === 'click' && this.triggerEl.contains(e.target))) {
                this.closeOnExternal(e);
              }
            },
            { capture: true },
          );

          /* eslint-disable-next-line import/no-named-as-default-member */
          this.removeEscListener = events.onKeydown(27, document, () => {
            this.close();
          });

          if (this.closeOnScroll) {
            const onScroll = e => {
              if (this.focusScrollFrame) {
                this.startFocusScroll();
              } else {
                this.closeOnExternal(e);
              }
            };
            const removeListeners = [
              ['scroll', onScroll],
              ['wheel', this.endFocusScroll],
              ['touchmove', this.endFocusScroll],
              /* eslint-disable-next-line import/no-named-as-default-member */
            ].map(([name, handler]) => events.on(name, document, handler));
            this.removeScrollListener = () => removeListeners.forEach(remove => remove());
          }
        }, 0);
      },

      removeCloseEventListeners() {
        clearTimeout(this.addListenersTimeout);

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

  @import '../styles/definitions';
  @import './styles/imports';
  //@import './styles/tippy/tippy';

  .ui-popover {
    &.is-raised {
      @extend %dropshadow-2dp;
    }

    .ui-menu {
      border: none;
    }
  }

  .ui-popover-theme {
    background-color: white;
  }

</style>
