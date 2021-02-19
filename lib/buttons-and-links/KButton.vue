<template>

  <component
    :is="htmlTag"
    ref="button"
    dir="auto"
    :class="buttonClasses"
    :type="type"
    :disabled="disabled"
    tabindex="0"
    @click="handleClick"
    @keyup.enter.stop.prevent="handlePressEnter"
  >
    <!-- icon may come by slot or by prop -->
    <slot name="icon"></slot>
    <KIcon
      v-if="icon"
      :icon="icon"
      :color="iconColor"
      class="prop-icon"
    />

    <slot v-if="$slots.default"></slot>

    <template v-else>
      <span class="link-text" :style="textStyle">{{ text }}</span>
    </template>

    <!-- iconAfter may come by slot or by prop -->
    <slot name="iconAfter"></slot>
    <KIcon
      v-if="iconAfter"
      :icon="iconAfter"
      :color="iconColor"
      class="prop-icon"
    />

    <!-- Dropdown arrow icon -->
    <KIcon
      v-if="hasDropdown"
      icon="dropdown"
      class="dropdown-arrow"
      :style="arrowStyles"
      style="width: 24px; height: 24px;"
    />
  </component>

</template>


<script>

  import { validator } from './appearances.js';
  import buttonMixin from './buttonMixin.js';

  /**
   * The KButton component is used to trigger actions
   */
  export default {
    name: 'KButton',
    mixins: [buttonMixin],
    props: {
      /**
       * Button appearance: 'raised-button', 'flat-button', or 'basic-link'
       */
      appearance: {
        type: String,
        default: 'raised-button', // changes default of 'appearance' prop provided by mixin
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
       * HTML button 'type' attribute (e.g. 'submit', 'reset')
       */
      type: {
        type: String,
        default: 'button',
      },
      /**
       * @private
       * Adds a dropdown arrow
       */
      hasDropdown: {
        type: Boolean,
        default: false,
      },
      /**
       * If provided, prepends a KIcon to the text in the button
       */
      icon: {
        type: String,
        default: null,
      },
      /**
       * If provided, appends an KIcon to the text in the button.
       */
      iconAfter: {
        type: String,
        default: null,
      },
    },
    computed: {
      iconColor() {
        if (this.appearance === 'basic-link') {
          return this.$themeTokens.primary;
        }

        if (this.primary) {
          return this.appearance === 'raised-button'
            ? this.$themeTokens.textInverted
            : this.$themeTokens.primary;
        } else {
          return this.$themeTokens.text;
        }
      },
      htmlTag() {
        // Necessary to allow basic links to be rendered as 'inline' instead of
        // 'inline-block': https://stackoverflow.com/a/27770128
        if (this.appearance === 'basic-link') {
          return 'a';
        }
        return 'button';
      },
      arrowStyles() {
        if (this.primary) {
          return {
            fill: this.$themeTokens.textInverted,
          };
        }
        return {};
      },
      textStyle() {
        let styles = {};
        if (this.icon) {
          this.isRtl ? (styles['marginRight'] = '8px') : (styles['marginLeft'] = '8px');
        }
        if (this.iconAfter) {
          styles['marginRight'] = '8px';
        }
        return { ...styles };
      },
    },
    methods: {
      handleClick(event) {
        /**
         * Emitted when the button is triggered
         */
        this.blurWhenClicked();
        this.$emit('click', event);
      },
      handlePressEnter(event) {
        this.blurWhenClicked();
        // HACK: for 'a' tags, the 'click' event is not getting fired
        if (this.htmlTag === 'a') {
          this.$emit('click', event);
        }
      },
      // To prevent the <a> from maintaining focus when link does not
      // destroy parent component (e.g. opens a modal), we need to blur it,
      // because it will be "clicked" again when the user hits the Enter key.
      blurWhenClicked() {
        if (this.htmlTag === 'a') {
          this.$el.blur();
        }
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import './buttons';

  .dropdown-arrow {
    position: relative;
    top: 6px;
  }

  .prop-icon {
    top: 3px;
  }

</style>
