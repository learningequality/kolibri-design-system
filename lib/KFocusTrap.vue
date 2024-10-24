<template>

  <div>
    <!-- Focus trap starting point. If not disabled, focuses this first when tabbing. -->
    <div
      v-if="!disabled"
      class="focus-trap-first"
      tabindex="0"
      @focus="handleFirstTrapFocus"
    ></div>

    <!--@slot Default slot where the focusable content will be rendered -->
    <slot>

    </slot>

    <!-- Focus trap ending point. If not disabled, focuses this last when tabbing. -->
    <div
      v-if="!disabled"
      class="focus-trap-last"
      tabindex="0"
      @focus="handleLastTrapFocus"
    ></div>
  </div>

</template>


<script>

  /**
   * This component ensures that focus moves between the first element
   * and the last element of content provided by the default slot.
   * In disabled state, it only renders whatever has been passed
   * to the default slot, and doesn't add any focus trap behavior,
   * allowing for flexible use from parent components.
   */
  export default {
    name: 'KFocusTrap',
    props: {
      /**
       * Disables the focus trap when set to `true`. Focus will behave normally.
       * @type {Boolean}
       * @default false
       */
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data() {
      return {
        isTrapActive: false, // Tracks whether the focus trap is currently active
      };
    },
    methods: {
      /**
       * Called when the first focus trap element receives focus.
       * If the trap is not yet active, redirects focus to the first element.
       * Otherwise, redirects focus to the last element to enforce the loop.
       * @param {Event} e - Focus event
       */
      handleFirstTrapFocus(e) {
        e.stopPropagation();
        if (!this.isTrapActive) {
          this.focusFirstEl();
          this.isTrapActive = true;
        } else {
          this.focusLastEl();
        }
      },
      /**
       * Called when the last focus trap element receives focus.
       * Redirects focus to the first element, ensuring focus remains within the trap.
       * @param {Event} e - Focus event
       */
      handleLastTrapFocus(e) {
        e.stopPropagation();
        this.focusFirstEl();
      },

      focusFirstEl() {
        /**
         * Emits an event to notify the parent component to focus the first element.
         */
        this.$emit('shouldFocusFirstEl');
      },

      focusLastEl() {
        /**
         * Emits an event to notify the parent component to focus the last element.
         */
        this.$emit('shouldFocusLastEl');
      },
      /**
       * @public
       * Reset the next focus to the first focus element
       */
      reset() {
        this.isTrapActive = false;
      },
    },
  };

</script>


<style scoped>
  .focus-trap-first,
  .focus-trap-last {
    outline: none; /* Prevents focus outline */
  }
</style>
