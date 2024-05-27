<template>

  <li
    :class="['remove-list-style card',$computedClass(coreOutlineFocus)]"
    tabindex="0"
    data-focus="true"
    @focus="cardFocus"
    @hover="cardHover"
    @click="cardClick()"
    @keydown.enter="cardClick()"
  >
    <slot name="default"></slot>
    <!-- @slot Title slot-->
    <slot name="title"></slot>
  </li>

</template>


<script>

  export default {
    name: 'BaseCard',
    props: {
      to: {
        type: Object,
        required: true,
      },
      // title: {
      //   type: String,
      //   required: false,
      //   default: null,
      // },
    },
    computed: {
      coreOutlineFocus() {
        return {
          ':focus': {
            ...this.$coreOutline,
          },
        };
      },
    },

    methods: {
      cardFocus(e) {
        this.$emit('focus', e);
      },
      cardHover(e) {
        this.$emit('hover', e);
      },
      cardClick() {
        this.$router.push(this.to);
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '../styles/definitions';

  .card {
    @extend %dropshadow-2dp;

    position: relative;
    display: block;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    border-radius: 0.5em;
    outline-offset: -1px;
    transition: border-color $core-time ease;

    &:hover,
    &:focus {
      @extend %dropshadow-8dp;
    }
  }

  .remove-list-style {
    margin: 1em;
    list-style-type: none;
  }

</style>