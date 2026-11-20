<template>

  <div>
    <UiPopover
      v-if="trigger"
      ref="popover"
      :class="{ 'viewport-bounded-popover': !constrainToScrollParent }"
      :zIndex="100"
      :role="null"
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
      @keydown.native="handleOpenMenuNavigation"
    >
      <!-- Slot to set a header to the dropdown menu -->
      <div
        v-if="$scopedSlots.header"
        ref="header"
      >
        <slot name="header"></slot>
      </div>
      <UiMenu
        ref="menu"
        :options="options"
        :hasIcons="hasIcons"
        :maxWidth="maxWidth"
        @select="handleSelection"
        @hook:updated="keepFocusInOpenMenu"
        @mousemove.native="handleMouseMove"
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

  const nextFrame = () => new Promise(resolve => requestAnimationFrame(resolve));

  // jsdom has no scrollIntoView. Chrome < 61 and Safari < 14 read its options object as
  // `alignToTop: true`, and neither supports `scroll-behavior`. Firefox < 58 throws a
  // TypeError on `block: 'nearest'`.
  function scrollIntoViewNearest(element) {
    if (!element.scrollIntoView || !('scrollBehavior' in document.documentElement.style)) {
      return false;
    }
    try {
      element.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      return true;
    } catch (e) {
      return false;
    }
  }

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
    },
    mounted() {
      this.trigger = this.$el.parentElement;
      this.trigger.setAttribute('aria-haspopup', 'menu');
      this.trigger.setAttribute('aria-expanded', false);
    },
    beforeDestroy() {
      window.removeEventListener('keyup', this.stopEscapeKeyUp, true);
    },
    methods: {
      async handleOpen() {
        await this.$nextTick();
        if (!this.isMenuOpen()) {
          return;
        }
        this.focusFirstItem();
        this.trigger.setAttribute('aria-expanded', true);
        // tippy 4 repositions a reopened popper in a requestAnimationFrame
        await nextFrame();
        this.revealFocusedItem();
      },
      revealFocusedItem() {
        const item = document.activeElement;
        if (this.isMenuOpen() && this.getMenuItems().includes(item)) {
          scrollIntoViewNearest(item);
        }
      },
      isMenuOpen() {
        return Boolean(this.$refs.popover && this.$refs.popover.isOpen());
      },
      isFocusInHeader() {
        return Boolean(this.$refs.header && this.$refs.header.contains(document.activeElement));
      },
      keepFocusInOpenMenu() {
        if (this.isMenuOpen() && [null, document.body].includes(document.activeElement)) {
          this.focusFirstItem();
        }
      },
      focusFirstItem() {
        const [item] = this.getMenuItems();
        if (item) {
          this.$refs.menu.$el.scrollTop = 0;
          item.focus({ preventScroll: true });
        } else {
          this.$refs.popover.focus();
        }
      },
      focusItemAt(index, items = this.getMenuItems()) {
        const item = items[(index + items.length) % items.length];
        if (item) {
          item.focus({ preventScroll: scrollIntoViewNearest(item) });
        }
      },
      handleClose() {
        this.trigger.setAttribute('aria-expanded', false);
        this.hideContextMenu();
      },
      getMenuItems() {
        return Array.from(this.$refs.menu.$el.querySelectorAll('[role="menuitem"]'));
      },
      moveFocusBy(delta) {
        const items = this.getMenuItems();
        const index = items.indexOf(document.activeElement);
        this.focusItemAt(index === -1 && delta < 0 ? -1 : index + delta, items);
      },
      // Not `mouseenter`: browsers fire it when the menu opens under a resting pointer
      handleMouseMove(event) {
        const item = event.target.closest('[role="menuitem"]');
        if (
          item &&
          !item.hasAttribute('aria-disabled') &&
          this.isMenuOpen() &&
          !this.isFocusInHeader()
        ) {
          item.focus({ preventScroll: true });
        }
      },
      handleOpenMenuNavigation(event) {
        if (!this.isMenuOpen()) {
          return;
        }
        if (event.key == 'ArrowUp' || event.keyCode == 38) {
          event.preventDefault();
          this.moveFocusBy(-1);
        } else if (event.key == 'ArrowDown' || event.keyCode == 40) {
          event.preventDefault();
          this.moveFocusBy(1);
        } else if (event.key == 'Escape' || event.keyCode == 27) {
          event.stopPropagation();
          window.addEventListener('keyup', this.stopEscapeKeyUp, true);
          this.$refs.popover.close();
        } else if (event.key == 'Tab' || event.keyCode == 9) {
          this.$emit('tab', event);
          if (!this.emitClose()) {
            return;
          }
          const wasFocusInMenu = this.$refs.popover.$el.contains(document.activeElement);
          this.$refs.popover.close();
          if (wasFocusInMenu && !this.trigger.contains(document.activeElement)) {
            this.trigger.focus();
          }
        } else if (this.isFocusInHeader()) {
          return;
        } else if (event.key == 'Home' || event.keyCode == 36) {
          event.preventDefault();
          this.focusItemAt(0);
        } else if (event.key == 'End' || event.keyCode == 35) {
          event.preventDefault();
          this.focusItemAt(-1);
        } else if (
          event.key == 'PageUp' ||
          event.key == 'PageDown' ||
          event.keyCode == 33 ||
          event.keyCode == 34
        ) {
          event.preventDefault();
        }
      },
      stopEscapeKeyUp(event) {
        if (event.key == 'Escape' || event.keyCode == 27) {
          window.removeEventListener('keyup', this.stopEscapeKeyUp, true);
          event.stopPropagation();
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
        if (this.emitClose()) {
          this.$refs.popover.close();
        }
      },
      emitClose() {
        if (this.closing || !this.isMenuOpen()) {
          return false;
        }
        this.closing = true;
        /**
         * Emitted when the menu is closed by `closePopover`, an option selection, or Tab
         */
        this.$emit('close');
        this.closing = false;
        return true;
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

  .ui-menu ::v-deep [role='menuitem'] {
    scroll-margin: 0.25rem 0;
  }

  .viewport-bounded-popover .ui-menu {
    flex: 1 1 auto;
    min-height: 0;
    max-height: none;
  }

</style>
