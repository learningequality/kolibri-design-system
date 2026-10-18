<template>

  <div>
    <UiPopover
      v-if="trigger"
      ref="popover"
      :class="{ 'viewport-bounded-popover': !constrainToScrollParent }"
      :zIndex="100"
      :trigger="trigger"
      :containFocus="true"
      :hideOnClick="hideOnClick"
      :position="popoverPlacement"
      :positionX="contextMenuPosition[0]"
      :positionY="contextMenuPosition[1]"
      :openOn="isContextMenu ? 'manual' : 'click'"
      :constrainToScrollParent="constrainToScrollParent"
      @close="handleClose"
      @open="handleOpen"
    >
      <!-- Slot to set a header to the dropdown menu -->
      <div v-if="$scopedSlots.header">
        <slot name="header"></slot>
      </div>
      <UiMenu
        ref="menu"
        :options="options"
        :hasIcons="hasIcons"
        :maxWidth="maxWidth"
        @select="handleSelection"
      >
        <template #option="{ option }">
          <!-- @slot Optional slot to customize the rendering of each menu option -->
          <slot
            name="option"
            :option="option"
          ></slot>
        </template>
      </UiMenu>
    </UiPopover>
  </div>

</template>


<script>

  import { computed } from 'vue';
  import UiMenu from '../keen/UiMenu';
  import UiPopover from '../keen/UiPopover';
  import useKContextMenu from '../composables/_useKContextMenu';

  const RTL_MIRROR = { left: 'right', right: 'left' };

  const EXTENT_SUFFIX = { right: 'start', bottom: 'start', left: 'end', top: 'end' };

  /**
   * The KDropdownMenu component is used to contain multiple actions
   */
  export default {
    name: 'KDropdownMenu',
    components: {
      UiPopover,
      UiMenu,
    },
    setup(props) {
      if (props.isContextMenu) {
        const { clientX, clientY, isActive, hideMenu } = useKContextMenu();
        const contextMenuPosition = computed(() => [clientX.value, clientY.value]);

        return {
          contextMenuPosition,
          isContextMenuActive: isActive,
          hideContextMenu: hideMenu,
        };
      }
      return {
        contextMenuPosition: [],
        isContextMenuActive: null,
        hideContextMenu: () => {},
      };
    },
    props: {
      /**
       * When true, the menu is kept inside its scroll parent where it fits.
       * When false, the menu can extend outside its scroll parent but stays inside the viewport.
       */
      constrainToScrollParent: {
        type: Boolean,
        default: true,
      },
      /**
       * An array of options objects, with one object per dropdown item
       */
      options: {
        type: Array,
        required: true,
      },
      /**
       * Whether or not the options display an icon
       */
      hasIcons: {
        type: Boolean,
        default: false,
      },
      /** Maximum width for the dropdown menu*/
      maxWidth: {
        type: [Number, String],
        default: null,
      },
      /**
       * The position of the dropdown relative to the button, or to the cursor for
       * context menus. The first word is the side it opens on; the second is the
       * direction it extends, so `'bottom right'` aligns its left edge with the
       * button's. `left` and `right` mirror in RTL.
       */
      position: {
        type: String,
        default: 'bottom right',
        validator(val) {
          return [
            'bottom left',
            'bottom center',
            'bottom right',
            'top left',
            'top center',
            'top right',
            'left top',
            'left middle',
            'left bottom',
            'right top',
            'right middle',
            'right bottom',
          ].includes(val);
        },
      },
      /**
       * Whether or not the dropdown is a context menu, if true, the dropdown will open when
       * the user right-clicks the parent element
       */
      isContextMenu: {
        type: Boolean,
        default: false,
      },
      /**
       * Private. Do not use.
       */
      // Disables hide on click behavior
      // This is useful to capture multiple open dropdowns
      // in visual regression tests
      hideOnClick: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        trigger: null,
        lastFocusElement: null,
      };
    },
    computed: {
      popoverPlacement() {
        const [side, extent] = (this.position || 'bottom right')
          .split(' ')
          .map(word => (this.isRtl ? RTL_MIRROR[word] || word : word));
        return EXTENT_SUFFIX[extent] ? `${side}-${EXTENT_SUFFIX[extent]}` : side;
      },
    },
    watch: {
      isContextMenuActive() {
        if (this.isContextMenuActive) {
          this.$nextTick(() => {
            this.$refs.popover.open();
          });
        } else if (this.isMenuOpen()) {
          this.$refs.popover.close();
        }
      },
      contextMenuPosition() {
        if (this.isContextMenuActive) {
          this.$nextTick(() => {
            this.$refs.popover.open();
          });
        }
      },
    },
    created() {
      this.closing = false;
      this.opened = false;
      this.destroying = false;
      this.focusOnOpen = null;
      this.pendingFocus = null;
    },
    mounted() {
      this.trigger = this.$el.parentElement;
      this.trigger.setAttribute('aria-haspopup', 'menu');
      this.trigger.setAttribute('aria-expanded', false);
      if (!this.isContextMenu) {
        this.trigger.addEventListener('keydown', this.handleTriggerKeydown);
      }
    },
    beforeDestroy() {
      this.destroying = true;
      window.removeEventListener('keydown', this.handleOpenMenuNavigation, true);
      this.trigger.removeEventListener('keydown', this.handleTriggerKeydown);
    },
    methods: {
      async handleOpen() {
        if (!this.opened) {
          this.opened = true;
          /**
           * Emitted when the menu opens, by click or from the keyboard
           */
          this.$emit('open');
          this.lastFocusElement = document.activeElement;
        }
        await this.$nextTick();
        await this.$nextTick();
        if (!this.isMenuOpen()) {
          return;
        }
        if (this.focusOnOpen) {
          this.getEdgeOption(this.focusOnOpen)?.focus();
        } else {
          this.setFocus();
        }
        window.addEventListener('keydown', this.handleOpenMenuNavigation, true);
        this.trigger.setAttribute('aria-expanded', true);
      },
      isMenuOpen() {
        return Boolean(this.$refs.popover && this.$refs.popover.isOpen());
      },
      handleTriggerKeydown(event) {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
          return;
        }
        const isArrowUp = event.key == 'ArrowUp' || event.keyCode == 38;
        const isArrowDown = event.key == 'ArrowDown' || event.keyCode == 40;
        if (
          (isArrowUp || isArrowDown) &&
          event.target === this.trigger &&
          this.$refs.popover &&
          !this.$refs.popover.isOpen() &&
          !this.trigger.closest('[role="grid"]')
        ) {
          event.preventDefault();
          this.focusOnOpen = isArrowUp ? 'last' : 'first';
          this.$refs.popover.open();
        }
      },
      setFocus() {
        this.$refs.menu.$el.querySelector('li').focus();
      },
      getEdgeOption(position) {
        if (!this.$refs.menu) {
          return null;
        }
        const options = this.getFocusableOptions();
        return options[position === 'first' ? 0 : options.length - 1] || null;
      },
      focusAfterKeydown(option) {
        this.pendingFocus = option;
        setTimeout(() => {
          if (this.pendingFocus !== option) {
            return;
          }
          this.pendingFocus = null;
          if (option && this.isMenuOpen()) {
            option.focus();
          }
        });
      },
      handleClose() {
        this.opened = false;
        if (!this.destroying) {
          this.closing = true;
          /**
           * Emitted when the menu closes, except on unmount
           */
          this.$emit('close');
          this.closing = false;
        }
        this.focusOnOpen = null;
        this.pendingFocus = null;
        const focusedElement = document.activeElement;
        const popover = this.$refs.popover.$el;
        if (
          popover.contains(focusedElement) &&
          (focusedElement.classList.contains('ui-popover') ||
            focusedElement.classList.contains('ui-popover-focus-redirector') ||
            focusedElement.classList.contains('ui-menu-option'))
        ) {
          if (this.lastFocusElement) {
            this.lastFocusElement.focus();
          }
        }
        this.trigger.setAttribute('aria-expanded', false);
        this.hideContextMenu();
        window.removeEventListener('keydown', this.handleOpenMenuNavigation, true);
        window.removeEventListener('keyup', this.handleKeyUp, true);
      },
      isFocusable(element) {
        return element && element.tabIndex >= 0 && !element.matches('a:not([href])');
      },
      getFocusableOptions() {
        return Array.from(this.$refs.menu.$el.querySelector('div').children).filter(
          this.isFocusable,
        );
      },

      handleOpenMenuNavigation(event) {
        // identify the menu state and length
        if (!this.$refs.popover && !this.$refs.popover.$el) {
          return;
        }
        const popover = this.$refs.popover.$el;
        if (popover.clientWidth === 0 || popover.clientHeight === 0) {
          return;
        }
        const current = this.pendingFocus || document.activeElement;
        const isHome = event.key == 'Home' || event.keyCode == 36;
        const isEnd = event.key == 'End' || event.keyCode == 35;
        const isArrowUp = event.key == 'ArrowUp' || event.keyCode == 38;
        const isArrowDown = event.key == 'ArrowDown' || event.keyCode == 40;

        // Focus moves use setTimeout: Chromium runs microtasks between a trusted event's
        // listeners, so a $nextTick focus lands before trackInputModality's body listener
        // and loses the focus ring
        if (isArrowUp || isArrowDown) {
          event.preventDefault();
          const options = this.getFocusableOptions();
          const next = options[options.indexOf(current) + (isArrowUp ? -1 : 1)];
          this.focusAfterKeydown(next || options[isArrowUp ? options.length - 1 : 0]);
        } else if (
          (isHome || isEnd) &&
          !current.isContentEditable &&
          !current.matches('input, textarea, select')
        ) {
          event.preventDefault();
          this.focusAfterKeydown(this.getEdgeOption(isHome ? 'first' : 'last'));
        } else if ((event.key == 'Enter' || event.keyCode == 13) && this.pendingFocus) {
          event.preventDefault();
          event.stopPropagation();
          const option = this.pendingFocus;
          this.pendingFocus = null;
          option.focus();
          const enter = new KeyboardEvent('keydown', {
            key: 'Enter',
            bubbles: true,
            cancelable: true,
          });
          // Browsers ignore keyCode/which in KeyboardEvent's init; Chrome 49-50 and
          // iOS Safari <= 10.2 also lack `key`, so Vue's `.enter` matches on keyCode
          Object.defineProperties(enter, { keyCode: { get: () => 13 }, which: { get: () => 13 } });
          option.dispatchEvent(enter);
        } else if (event.key == 'Tab' || event.keyCode == 9) {
          this.$emit('tab', event);
          this.closePopover();
        }
      },
      handleSelection(selection, $event) {
        /**
         * Emitted when an option is selected
         */
        this.$emit('select', selection, $event);
        this.closePopover();
      },
      /**
       * Closes the menu, emits `close` and resets the trigger's `aria-expanded`.
       * Does nothing if the menu is already closed.
       * @public
       */
      closePopover() {
        if (this.closing || !this.isMenuOpen()) {
          return;
        }
        this.$refs.popover.close();
      },
    },
  };

</script>


<style scoped>

  /* tippy.js 4 keeps poppers 4px (its PADDING) inside the boundary on each side */
  .viewport-bounded-popover {
    display: flex;
    flex-direction: column;
    max-height: calc(var(--popover-boundary-height) - 8px);
  }

  .viewport-bounded-popover ::v-deep .ui-focus-container-content {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .viewport-bounded-popover .ui-menu {
    flex: 1 1 auto;
    min-height: 0;
    max-height: none;
  }

</style>
