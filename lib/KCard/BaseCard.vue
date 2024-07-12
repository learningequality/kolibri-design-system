<template>

  <li
    :class="['remove-list-style card',$computedClass(coreOutlineFocus)]"
    tabindex="0"
    data-focus="true"
    :style="cardStyle"
    @focus="cardFocus"
    @mouseenter="cardHover"
    @click="cardClickHandler"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @keyup.enter="cardClick"
  >
    <component
      :is="headerLevel"
      v-if="title || $slots.title"
      class="base-card-heading"
    >
      <router-link
        tabindex="-1"
        :to="to"
      >
        <slot v-if="$slots.title" name="title"></slot>
        <KTextTruncator
          v-else
          :text="title"
          :maxLines="titleLines"
          :style="titleStyle"
        />
      </router-link>
    </component>

    <slot name="default"></slot>
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
      title: {
        type: String,
        required: false,
        default: null,
      },
      titleLines: {
        type: Number,
        required: false,
        default: 2,
      },
      headingLevel: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        mouseDownTime: 0,
        allowClick: false,
      };
    },
    computed: {
      coreOutlineFocus() {
        return {
          ':focus': {
            ...this.$coreOutline,
          },
        };
      },
      headerLevel() {
        return 'h' + this.headingLevel;
      },
      titleStyle() {
        return {
          color: this.$themeTokens.text,
          fontSize: '16px',
          margin: '0px 16px',
        };
      },
      cardStyle() {
        return {
          backgroundColor: this.$themeTokens.surface,
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
      onMouseDown() {
        this.mouseDownTime = new Date().getTime();
      },
      // handle the mouse up event and determine whether it should be treated as a click event or not.
      onMouseUp() {
        const mouseUpTime = new Date().getTime();
        // Calculate the time difference between the mouse button press and release.
        // If the time difference is greater than or equal to 200 milliseconds,
        // it means that the mouse button was pressed and held for a longer time,
        // which is not typically interpreted as a click event.
        if (mouseUpTime - this.mouseDownTime < 200) {
          this.allowClick = true;
          this.cardClick();
        } else {
          this.allowClick = false;
        }
      },
      cardClickHandler() {
        if (this.allowClick) {
          this.cardClick();
        }
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
    transition: box-shadow $core-time ease;

    &:hover,
    &:focus {
      @extend %dropshadow-6dp;
    }
  }

  .remove-list-style {
    list-style-type: none;
  }

</style>