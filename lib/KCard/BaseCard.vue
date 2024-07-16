<template>

  <li
    :class="['k-card', $computedClass(coreOutlineFocus)]"
    tabindex="0"
    data-focus="true"
    :style="{ backgroundColor: $themeTokens.surface }"
    @focus="cardFocus"
    @mouseenter="cardHover"
    @click="cardClickHandler"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @keyup.enter="cardClick"
  >
    <!-- Do not remove 'base-card-heading'. Referenced from KCard.  -->
    <component
      :is="headerLevel"
      v-if="title || $slots.title"
      class="base-card-heading"
    >
      <router-link
        tabindex="-1"
        :to="to"
      >
        <span
          class="k-card-title"
          :style="{ color: $themeTokens.text }"
        >
          <slot v-if="$slots.title" name="title"></slot>
          <KTextTruncator
            v-else
            :text="title"
            :maxLines="titleLines"
          />
        </span>
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

  .k-card {
    @extend %dropshadow-2dp;

    position: relative;
    display: block;
    text-align: left;
    text-decoration: none;
    list-style-type: none;
    cursor: pointer;
    border-radius: 0.5em;
    outline-offset: -1px;
    transition: box-shadow $core-time ease;

    &:hover,
    &:focus {
      @extend %dropshadow-6dp;
    }
  }

  .k-card-title {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
  }

</style>