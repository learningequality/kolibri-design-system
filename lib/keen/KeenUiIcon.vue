<template>

  <span class="ui-icon" :class="[iconSet, icon, { 'is-mirrored': mirror }]" :aria-label="ariaLabel">
    <svg v-if="useSvg">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#' + icon" />
    </svg>

    <slot v-else>{{ removeText ? null : icon }}</slot>
  </span>

</template>


<script>

  export default {
    name: 'KeenUiIcon',

    props: {
      icon: String,
      iconSet: {
        type: String,
        default: 'material-icons',
      },
      ariaLabel: String,
      removeText: {
        type: Boolean,
        default: false,
      },
      useSvg: {
        type: Boolean,
        default: false,
      },
      mirror: {
        type: Boolean,
        default: false,
      },
    },
  };

</script>


<style lang="scss">

  @import './styles/imports';

  /* stylelint-disable */

  $ui-icon-font-size: rem-calc(24px) !default;
  $ui-icon-size: 1em !default;

  .ui-icon {
    display: inline-block;
    width: $ui-icon-size;
    height: $ui-icon-size;
    font-size: $ui-icon-font-size;
    vertical-align: middle;
    cursor: inherit;
    user-select: none;

    svg {
      display: block;
      width: $ui-icon-size;
      height: $ui-icon-size;
      padding: 0;
      margin: 0;
      fill: currentColor;
    }

    &.is-mirrored {
      transform: scaleX(-1);
    }
  }

</style>
