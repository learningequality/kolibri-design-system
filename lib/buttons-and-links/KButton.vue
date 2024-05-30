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
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <!-- @slot Slot alternative to the `icon` prop -->
    <slot name="icon"></slot>
    <KIcon
      v-if="icon"
      :icon="icon"
      :color="iconColor"
      data-test="iconBefore"
      class="prop-icon"
    />
    <!-- @slot Pass sub-components into the button, typically `KDropdownMenu` -->
    <slot name="menu"></slot>

    <slot v-if="$slots.default"></slot>

    <template>
      <span class="link-text" :style="textStyle">{{ text }}</span>
    </template>

    <!-- @slot Slot alternative to the `iconAfter` prop -->
    <slot name="iconAfter"></slot>
    <KIcon
      v-if="iconAfter"
      :icon="iconAfter"
      :color="iconColor"
      data-test="iconAfter"
      class="prop-icon"
    />

    <!-- Dropdown arrow icon -->
    <KIcon
      v-if="hasDropdown"
      icon="dropdown"
      class="dropdown-arrow"
      :style="arrowStyles"
      data-test="dropdownIcon"
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
       * Button appearance: `'raised-button'`, `'flat-button'`, or `'basic-link'`
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
       * HTML button `type` attribute (e.g. `'submit'`, `'reset'`)
       */
      type: {
        type: String,
        default: 'button',
      },
      /**
       * Adds a dropdown arrow
       */
      hasDropdown: {
        type: Boolean,
        default: false,
      },
      /**
       * If provided, prepends a `KIcon` to the text in the button
       */
      icon: {
        type: String,
        default: null,
      },
      /**
       * If provided, appends an `KIcon` to the text in the button
       */
      iconAfter: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        hovering: false,
      };
    },
    computed: {
      htmlTag() {
        // Necessary to allow basic links to be rendered as 'inline' instead of
        // 'inline-block': https://stackoverflow.com/a/27770128
        if (this.appearance === 'basic-link') {
          return 'a';
        }
        return 'button';
      },
      arrowStyles() {
        return {
          fill: this.iconColor,
        };
      },
      textStyle() {
        const styles = {};
        if (this.icon) {
          if (this.isRtl) {
            // If RTL-language, but English link, displays correct margins
            styles['marginRight'] = '8px';
            // Checks to see if link for new tab is in same dir as page lang
            if (this.text !== this.href) {
              styles['marginRight'] = '0px';
              styles['marginLeft'] = '8px';
            }
          } else {
            if (this.text === this.href) {
              styles['marginRight'] = '8px';
            } else {
              styles['marginLeft'] = '8px';
            }
          }
        }

        if (this.iconAfter) {
          styles['marginRight'] = '8px';
        }
        return { ...styles };
      },
    },
    methods: {
      handleClick(event) {
        this.blurWhenClicked();
        /**
         * Emitted when the button is triggered
         */
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
    top: 4px;
  }

</style>
