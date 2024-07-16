<template>

  <!-- see trackInputModality  for [data-focus=true] -->
  <li
    :class="['k-card', $computedClass(coreOutlineFocus)]"
    tabindex="0"
    data-focus="true"
    :style="{ backgroundColor: $themeTokens.surface }"
    @focus="onCardFocus"
    @mouseenter="onCardHover"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @keyup.enter="onEnter"
  >
    <!-- Do not remove 'base-card-heading'. Referenced from KCard.  -->
    <component
      :is="headerLevel"
      v-if="title || $slots.title"
      class="base-card-heading"
    >
      <!--
        Prevent router-link click event by setting empty event=""
        (technique used by Vue community because
        the usual ways don't work for router-link).
        This is because <li> is supposed to take care of it.
        Furthemore, together with 'draggable' disabled, it ensures
        that text selection works on the title text.
        See the custom click implementation in 'onMouseUp'. 
      -->
      <router-link
        tabindex="-1"
        :to="to"
        draggable="false"
        event=""
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

  /* 
    BaseCard is a base building block for KCard. Its main purpose
    is to ensure that no matter of how we change KCard styles, slots,
    layouts, etc. we never break basic a11y-related markup criteria.

    Long story short, all cards need to have the following HTML output 
    (even though the title may not be the first element visually).

    <li>
      <h[2-6]>
        <a href="/resource">Resource title</a>
      </h[2-6]>

      all other content
    </li> 

    BaseCard protect this structure by the way it places its default slot.
    It also takes care of properly showing the focus ring and related.

    See the specification and https://inclusive-components.design/cards/
    for more details.
  */
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
      navigate() {
        this.$router.push(this.to);
      },
      onCardFocus(e) {
        this.$emit('focus', e);
      },
      onCardHover(e) {
        this.$emit('hover', e);
      },
      onEnter() {
        this.navigate();
      },
      onMouseDown() {
        this.mouseDownTime = new Date().getTime();
      },
      // Make textual content selectable within the whole
      // clickable card area
      onMouseUp() {
        const mouseUpTime = new Date().getTime();
        // Calculate the time difference between the mouse button press and release.
        // If the time difference is greater than or equal to 200 milliseconds,
        // it means that the mouse button was pressed and held for a longer time,
        // which is not typically interpreted as a click event. Do not navigate
        // in such case.
        if (mouseUpTime - this.mouseDownTime < 200) {
          this.navigate();
        } else {
          return;
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