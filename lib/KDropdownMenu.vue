<template>

  <KButton
    ref="button"
    :appearance="appearance"
    :disabled="disabled"
    :hasDropdown="true"
    :primary="$attrs.primary"
  >
    <span>{{ text }}</span>
    <UiPopover
      v-if="!disabled"
      ref="popover"
      :z-index="12"
      :containFocus="true"
      :dropdownPosition="position"
      @close="handleClose"
      @open="handleOpen"
    >
      <UiMenu
        :options="options"
        @select="handleSelection"
      />
    </UiPopover> 
  </KButton>

</template>


<script>

  import UiPopover from './keen/UiPopover';
  import UiMenu from './keen/UiMenu';
  import { validator } from './buttons-and-links/appearances';

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
       * Button label text
       */
      text: {
        type: String,
        required: true,
      },
      /**
       * Button appearance: 'raised-button' or 'flat-button'
       */
      appearance: {
        type: String,
        default: 'raised-button',
        validator,
      },
      /**
       * Whether or not button is disabled
       */
      disabled: {
        type: Boolean,
        default: false,
      },
      /**
       * An array of option objects
       */
      options: {
        type: Array,
        required: true,
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
      window.removeEventListener('keyup', this.handleKeyUp, true);
    },
    methods: {
      handleOpen() {
        window.addEventListener('keyup', this.handleKeyUp, true);
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
      handleKeyUp(event) {
        if (event.shiftKey && event.keyCode == 9) {
          const popover = this.$refs.popover.$el;
          const popoverIsOpen = popover.clientWidth > 0 && popover.clientHeight > 0;
          if (popoverIsOpen && !popover.contains(document.activeElement)) {
            this.closePopover();
            this.focusOnButton();
          }
        }
      },
      handleSelection(selection) {
        /**
         * Emitted when the an option is selected.
         */
        this.$emit('select', selection);
        this.closePopover();
      },
      closePopover() {
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