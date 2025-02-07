<template>

  <UiFocusContainer
    ref="focusContainer"
    class="ui-menu"
    role="menu"
    tag="ul"
    lazy

    :class="classes"
    :style="getWidth"
  >
    <UiMenuOption
      v-for="(option, index) in options"
      :key="index"
      :disable-ripple="disableRipple"
      :disabled="option[keys.disabled]"
      :href="option[keys.href]"
      :icon-props="iconProps || option[keys.iconProps]"
      :icon="hasIcons ? option[keys.icon] : null"
      :label="option[keys.type] === 'divider' ? null : option[keys.label] || option"
      :secondary-text="hasSecondaryText ? option[keys.secondaryText] : null"
      :target="option[keys.target]"

      :type="option[keys.type]"
      @click.native="($event) => selectOption(option, $event)"
      @keydown.enter.native="($event) => selectOption(option, $event)"

      @keydown.esc.native.esc="closeMenu"
      :style="[ activeOutline ]"
    >
      <slot name="option" :option="option"></slot>
    </UiMenuOption>
  </UiFocusContainer>

</template>


<script>

  import UiFocusContainer from './UiFocusContainer.vue';
  import UiMenuOption from './UiMenuOption.vue';

  export default {
    name: 'UiMenu',

    components: {
      UiFocusContainer,
      UiMenuOption,
    },

    props: {
      options: {
        type: Array,
        default() {
          return [];
        },
      },
      hasIcons: {
        type: Boolean,
        default: false,
      },
      maxWidth: {
        type: [Number,String],
        default: null,
      },
      iconProps: Object,
      hasSecondaryText: {
        type: Boolean,
        default: false,
      },
      containFocus: {
        type: Boolean,
        default: false,
      },
      keys: {
        type: Object,
        default() {
          return {
            icon: 'icon',
            type: 'type',
            label: 'label',
            secondaryText: 'secondaryText',
            iconProps: 'iconProps',
            disabled: 'disabled',
            href: 'href',
            target: 'target',
          };
        },
      },
      disableRipple: {
        type: Boolean,
        default: false,
      },
      raised: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      classes() {
        return {
          'is-raised': this.raised,
          'has-icons': this.hasIcons,
          'has-secondary-text': this.hasSecondaryText,
        };
      },
      getWidth() {
        if (this.maxWidth){
          return {
            maxWidth: this.maxWidth && 
              (typeof this.maxWidth === 'number' ? `${this.maxWidth}px` : this.maxWidth)
          };
        }
        return {};
      },
      activeOutline() {
        return this.isActive ? this.$coreOutline : {};
      },
    },

    methods: {
      selectOption(option, $event) {
        if (option.disabled || option.type === 'divider') {
          return;
        }

        this.$emit('select', option, $event);
        this.closeMenu();
      },
      closeMenu() {
        this.$emit('close');
      },
    },
  };

</script>


<style lang="scss">

  /* stylelint-disable */

  @import '../styles/definitions';
  @import './styles/imports';

  .ui-menu {
    min-width: rem(168px);
    max-width: rem(272px);
    max-height: 100vh;
    padding: rem(4px 0);
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    font-family: $font-stack;
    list-style: none;
    background-color: white;
    border: rem(1px) solid rgba(black, 0.08);
    outline: none;

    &.is-raised {
      @extend %dropshadow-2dp;
      border: none;
  }

    &.has-secondary-text {
      min-width: rem(240px);
      max-width: rem(304px);
    }
  }

</style>
