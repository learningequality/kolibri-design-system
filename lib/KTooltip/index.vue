<template>

  <Popper
    v-if="readyToInit"
    :reference="htmlElement"
    :disabled="disabled"
    :visibleArrow="false"
    :options="options"
    trigger="hover"
  >
    <div
      dir="auto"
      class="k-tooltip"
      :style="{ backgroundColor: $themeTokens.text, color: $themeTokens.textInverted, maxWidth: maxWidth ? maxWidth : 'calc(100vw - 10px)', }"
    >
      <!-- If text prop is provided, display the text -->
      <template v-if="text"> 
        {{ text }} 
      </template>
      <!-- @slot Slot alternative to `text` prop -->
      <slot v-else></slot>
    </div>
  </Popper>

</template>


<script>

  import isArray from 'lodash/isArray';
  import Popper from './Popper';

  /**
   * Used to create a tooltip.
   */
  export default {
    name: 'KTooltip',
    components: {
      Popper,
    },
    props: {
      /**
       * Name of `ref` element within the parent's `$refs` object. Tooltip will be
       * positioned relative to this element.
       */
      reference: {
        type: String,
        required: true,
      },
      /**
       * Parent's `$refs` object which should contain the named `reference`.
       */
      refs: {
        type: Object,
        required: true,
      },
      /**
       * Whether or not tooltip is disabled
       */
      disabled: {
        type: Boolean,
        default: false,
      },
      /**
       * Placement of tooltip relative to `reference`. Supports any _popper.js_ placement string
       */
      placement: {
        type: String,
        default: 'bottom',
      },
      /**
       * Text of the tooltip
       */
      text: {
        type: String,
        default: null,
      },
      /**
       * Maximum width of the tooltip.
       * Accepted values follow the standard
       * CSS max-width property format.
       * If it's not provided, the tooltip's
       * size fits its content.
       */
      maxWidth: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        mounted: false,
      };
    },
    computed: {
      readyToInit() {
        return this.mounted && this.htmlElement;
      },
      options() {
        return {
          placement: this.placement,
        };
      },
      htmlElement() {
        let element = this.refs[this.reference];
        if (!element) {
          return null;
        }
        if (isArray(element)) {
          element = element[0];
        }
        if (element._isVue) {
          element = element.$el;
        }
        return element;
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.mounted = true;
      });
    },
  };

</script>


<style lang="scss" scoped>

  @import '../styles/definitions';

  .k-tooltip {
    @extend %w-1dp;

    position: absolute;
    z-index: 24;
    width: max-content;
    min-width: 75px;
    padding: 8px;
    font-size: 12px;
    font-weight: normal;
    line-height: 1.4;
    text-align: center;
    border-radius: 8px;
  }

</style>
