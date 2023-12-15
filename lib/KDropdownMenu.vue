<template>

  <UiPopover
    ref="popover"
    :z-index="99"
    :containFocus="true"
    :dropdownPosition="position"
    @close="handleClose"
    @open="handleOpen"
  >
    <UiMenu 
      ref="menu" 
      :options="options" 
      :hasIcons="hasIcons" 
      @select="handleSelection" 
    />
  </UiPopover>

</template>


<script>

  import UiPopover from './keen/UiPopover';
  import UiMenu from './keen/UiMenu';

  /**
   * The KDropdownMenu component is used to contain multiple actions
   */
  export default {
    name: 'KDropdownMenu',
    components: {
      UiPopover,
      UiMenu,
    },
    props: {
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
      handleSelection(selection) {
        /**
         * Emitted when an option is selected
         */
        this.$emit('select', selection);
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
