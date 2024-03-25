<template>

  <div>
    <UiPopover
      v-if="trigger"
      ref="popover"
      :z-index="100"
      :trigger="trigger"
      :containFocus="true"
      :dropdownPosition="position"
      :positionX="contextMenuPosition[0]"
      :positionY="contextMenuPosition[1]"
      :openOn="isContextMenu ? 'manual' : 'click'"
      :constrainToScrollParent="constrainToScrollParent"
      @close="handleClose"
      @open="handleOpen"
    >
      <!-- Slot to set a header to the dropdown menu -->
      <slot name="header"></slot>
      <UiMenu 
        ref="menu" 
        :options="options" 
        :hasIcons="hasIcons" 
        @select="handleSelection" 
      />
    </UiPopover>
  </div>

</template>


<script>

  import { computed } from '@vue/composition-api';
  import UiMenu from './keen/UiMenu';
  import UiPopover from './keen/UiPopover';
  import useKContextMenu from './composables/_useKContextMenu';

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
       * The dropdown menu popover flips its position to avoid overflows within the parent. Setting it to false disables the flipping behavior.
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
    },
    data() {
      return {
        trigger: null,
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
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.handleOpenMenuNavigation, true);
    },
    methods: {
      handleOpen() {
        this.$nextTick(() => this.$nextTick(() => this.setFocus()));
        window.addEventListener('keydown', this.handleOpenMenuNavigation, true);
      },
      setFocus() {
        this.$refs.menu.$el.querySelector('li').focus();
      },
      handleClose() {
        const focusedElement = document.activeElement;
        const popover = this.$refs.popover.$el;
        if (
          popover.contains(focusedElement) &&
          (focusedElement.classList.contains('ui-popover') ||
            focusedElement.classList.contains('ui-popover-focus-redirector') ||
            focusedElement.classList.contains('ui-menu-option'))
        ) {
          this.focusOnButton();
        }
        window.removeEventListener('keyup', this.handleKeyUp, true);
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
        let focusedElement = document.activeElement;
        let sibling = focusedElement.nextElementSibling;
        let prevSibling = focusedElement.previousElementSibling;

        // manage rotating through the options using arrow keys
        // UP arrow: .keyCode is depricated and should used only as a fallback
        if ((event.key == 'ArrowUp' || event.keyCode == 38) && popoverIsOpen) {
          event.preventDefault();
          prevSibling
            ? this.$nextTick(() => prevSibling.focus())
            : this.$nextTick(() => lastChild.focus());
          // DOWN arrow
        } else if ((event.key == 'ArrowDown' || event.keyCode == 40) && popoverIsOpen) {
          event.preventDefault();
          sibling ? this.$nextTick(() => sibling.focus()) : this.$nextTick(() => this.setFocus());
          // if a TAB key, not an arrow key, close the popover and advance to next item in the tab index
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
      focusOnButton() {
        if (this.$refs.button) {
          this.$refs.button.$el.focus();
        }
      },
    },
  };

</script>
