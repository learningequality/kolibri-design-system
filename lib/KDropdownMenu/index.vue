<template>

  <div>
    <UiPopover
      v-if="trigger"
      ref="popover"
      :zIndex="100"
      :trigger="trigger"
      :containFocus="true"
      :hideOnClick="hideOnClick"
      :dropdownPosition="position"
      :positionX="contextMenuPosition[0]"
      :positionY="contextMenuPosition[1]"
      :openOn="isContextMenu ? 'manual' : 'click'"
      :constrainToScrollParent="constrainToScrollParent"
      @close="handleClose"
      @open="handleOpen"
      @reveal="handleReveal"
    >
      <!-- Slot to set a header to the dropdown menu -->
      <slot name="header"></slot>
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
        const { clientX, clientY, isActive } = useKContextMenu();
        const contextMenuPosition = computed(() => [clientX.value, clientY.value]);

        return {
          contextMenuPosition,
          isContextMenuActive: isActive,
        };
      }
      return {
        contextMenuPosition: [],
        isContextMenuActive: null,
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
       * The position of the dropdown relative to the button
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
        // 'first' or 'last' from when the trigger opens the menu by keyboard until it reveals
        focusOnOpen: null,
      };
    },
    watch: {
      isContextMenuActive() {
        if (this.isContextMenuActive) {
          this.$nextTick(() => {
            this.$refs.popover.open();
          });
        } else {
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
    mounted() {
      this.trigger = this.$el.parentElement;
      this.trigger.setAttribute('aria-haspopup', 'menu');
      this.trigger.setAttribute('aria-expanded', false);
      if (!this.isContextMenu) {
        this.trigger.addEventListener('keydown', this.handleTriggerKeydown);
      }
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.handleOpenMenuNavigation, true);
      this.trigger.removeEventListener('keydown', this.handleTriggerKeydown);
    },
    methods: {
      async handleOpen() {
        this.lastFocusElement = document.activeElement;
        await this.$nextTick();
        await this.$nextTick();
        this.focusOnOpen ? this.focusEdge(this.focusOnOpen) : this.setFocus();
        window.addEventListener('keydown', this.handleOpenMenuNavigation, true);
        this.trigger.setAttribute('aria-expanded', true);
      },
      handleReveal() {
        // UiPopover focuses its container after the open transition;
        // give focus back to the option it took it from
        if (!this.focusOnOpen) {
          return;
        }
        const focused = this.$refs.popover.lastFocusedElement;
        if (this.$refs.menu.$el.contains(focused)) {
          focused.focus();
        } else {
          this.focusEdge(this.focusOnOpen);
        }
        this.focusOnOpen = null;
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
          !this.$refs.popover.isOpen()
        ) {
          event.preventDefault();
          this.focusOnOpen = isArrowUp ? 'last' : 'first';
          this.$refs.popover.open();
        }
      },
      setFocus() {
        this.$refs.menu.$el.querySelector('li').focus();
      },
      focusEdge(position) {
        const options = this.getFocusableOptions();
        options[position === 'first' ? 0 : options.length - 1]?.focus();
      },
      handleClose() {
        this.focusOnOpen = null;
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
        window.removeEventListener('keyup', this.handleKeyUp, true);
      },
      getNextFocusableSibling(focusedElement) {
        let sibling = focusedElement.nextElementSibling;
        while (sibling && !this.isFocusable(sibling)) {
          sibling = sibling.nextElementSibling;
        }
        return sibling;
      },
      getPreviousFocusableSibling(focusedElement) {
        let sibling = focusedElement.previousElementSibling;
        while (sibling && !this.isFocusable(sibling)) {
          sibling = sibling.previousElementSibling;
        }
        return sibling;
      },
      isFocusable(element) {
        return element && element.tabIndex >= 0;
      },
      getFocusableOptions() {
        // a disabled link option renders as <a> without href, which can't take focus
        return Array.from(this.$refs.menu.$el.querySelector('div').children).filter(
          option => this.isFocusable(option) && !option.matches('a:not([href])'),
        );
      },

      handleOpenMenuNavigation(event) {
        // identify the menu state and length
        if (!this.$refs.popover && !this.$refs.popover.$el) {
          return;
        }
        const popover = this.$refs.popover.$el;
        const menuElements = this.$refs.menu.$el.querySelector('div').children;
        const lastChild = menuElements[menuElements.length - 1];
        const popoverIsOpen = popover.clientWidth > 0 && popover.clientHeight > 0;
        // set current element and its siblings
        const focusedElement = document.activeElement;
        const isHome = event.key == 'Home' || event.keyCode == 36;
        const isEnd = event.key == 'End' || event.keyCode == 35;

        // manage rotating through the options using arrow keys
        // UP arrow: .keyCode is depricated and should used only as a fallback
        if ((event.key == 'ArrowUp' || event.keyCode == 38) && popoverIsOpen) {
          event.preventDefault();

          // Checking if previous sibling is divider and if yes then skip it
          const prevSibling = this.getPreviousFocusableSibling(focusedElement);
          prevSibling
            ? this.$nextTick(() => prevSibling.focus())
            : this.$nextTick(() => lastChild.focus());
          // DOWN arrow
        } else if ((event.key == 'ArrowDown' || event.keyCode == 40) && popoverIsOpen) {
          event.preventDefault();
          //Chekcing if next sibling is divider and skipping it
          const sibling = this.getNextFocusableSibling(focusedElement);
          sibling ? this.$nextTick(() => sibling.focus()) : this.$nextTick(() => this.setFocus());
        } else if (
          (isHome || isEnd) &&
          popoverIsOpen &&
          !focusedElement.isContentEditable &&
          !focusedElement.matches('input, textarea, select')
        ) {
          event.preventDefault();
          this.$nextTick(() => this.focusEdge(isHome ? 'first' : 'last'));
          // if a TAB key, not an arrow key,
          // close the popover and advance to next item in the tab index
        } else if ((event.key == 'Tab' || event.keyCode == 9) && popoverIsOpen) {
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
      closePopover() {
        this.$emit('close');
        this.$refs.popover.close();
      },
    },
  };

</script>
