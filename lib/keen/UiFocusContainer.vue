<template>

  <component :is="tag" class="ui-focus-container">
    <span
      v-if="renderRedirector"
      class="ui-focus-container-focus-redirector"

      tabindex="0"

      @focus="redirectFocus($event, { isTabbingForward: false })"
    ></span>

    <div ref="content" class="ui-focus-container-content" tabindex="-1">
      <slot></slot>
    </div>

    <span
      v-if="!disabled && containFocus"
      ref="lastFocusable"
      class="ui-focus-container-last-focusable"

      tabindex="-1"
    ></span>

    <span
      v-if="renderRedirector"
      class="ui-focus-container-focus-redirector"

      tabindex="0"

      @focus="redirectFocus($event, { isTabbingForward: true })"
    ></span>
  </component>

</template>


<script>

  export default {
    name: 'UiFocusContainer',

    props: {
      containFocus: {
        type: Boolean,
        default: true,
      },
      focusRedirector: Function,
      disabled: {
        type: Boolean,
        default: false,
      },
      tag: {
        type: String,
        default: 'div',
      },
      lazy: {
        type: Boolean,
        default: false, // When true, the focus redirectors are not rendered until containFocus is true
      },
    },

    computed: {
      renderRedirector() {
        if (this.disabled) {
          return false;
        }

        return this.lazy ? this.containFocus : true;
      },
    },

    methods: {
      /**
       * @public
       */
      focus() {
        this.$refs.content.focus();
      },

      redirectFocus(e, options) {
        if (!this.containFocus) {
          this.$emit('focus-overflow', e, options);
          return;
        }

        e.stopPropagation();

        if (this.focusRedirector) {
          this.focusRedirector(e, options);
          return;
        }

        if (options.isTabbingForward) {
          this.$refs.content.focus();
        } else {
          this.$refs.lastFocusable.focus();
        }
      },
    },
  };

</script>


<style lang="scss">

  .ui-focus-container-focus-redirector,
  .ui-focus-container-last-focusable {
    position: absolute;
    opacity: 0;
  }

  .ui-focus-container-content {
    outline: none;
  }

</style>
