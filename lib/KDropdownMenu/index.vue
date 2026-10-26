<template>

  <div>
    <UiPopover
      v-if="trigger"
      ref="popover"
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
      <slot name="header"></slot>
      <UiMenu
        ref="menu"
        :options="options"
        :hasIcons="hasIcons"
        :maxWidth="maxWidth"
        @select="handleSelection"
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
       * The dropdown menu popover flips its position to avoid overflows within the parent.
       * Setting it to false disables the flipping behavior.
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
        // tippy 4 repositions a reopened popper in a requestAnimationFrame
        await new Promise(resolve => requestAnimationFrame(resolve));
        if (!this.isMenuOpen()) {
          return;
        }
        this.focusItemAt(0);
        this.trigger.setAttribute('aria-expanded', true);
      },
      isMenuOpen() {
        return Boolean(this.$refs.popover && this.$refs.popover.isOpen());
      },
      focusItemAt(index, items = this.getMenuItems()) {
        const item = items[(index + items.length) % items.length];
        if (item) {
          item.focus();
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
        if (item && !item.hasAttribute('aria-disabled') && this.isMenuOpen()) {
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
        } else if (event.key == 'Escape' || event.keyCode == 27) {
          event.stopPropagation();
          window.addEventListener('keyup', this.stopEscapeKeyUp, true);
          this.hidePopover();
        } else if (event.key == 'Tab' || event.keyCode == 9) {
          this.$emit('tab', event);
          this.closePopover();
          this.trigger.focus();
        }
      },
      stopEscapeKeyUp(event) {
        window.removeEventListener('keyup', this.stopEscapeKeyUp, true);
        if (event.key == 'Escape' || event.keyCode == 27) {
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
        if (this.closing || !this.isMenuOpen()) {
          return;
        }
        this.closing = true;
        /**
         * Emitted when the menu is closed by `closePopover`, an option selection, or Tab
         */
        this.$emit('close');
        this.closing = false;
        this.hidePopover();
      },
      hidePopover() {
        this.$refs.popover.close();
        // UiPopover returns focus to <body> if the opening click did not focus the trigger.
        if (!this.isContextMenu || this.$refs.popover.$el.contains(document.activeElement)) {
          this.trigger.focus();
        }
      },
    },
  };

</script>
