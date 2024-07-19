<template>

  <!-- see trackInputModality  for [data-focus=true] -->
  <li
    :class="['base-card', $computedClass(coreOutlineFocus)]"
    tabindex="0"
    data-focus="true"
    :style="{ backgroundColor: $themeTokens.surface }"
    @focus="onCardFocus"
    @mouseenter="onCardHover"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @keyup.enter="onEnter"
  >
    <component
      :is="headingElement"
      v-if="title || $slots.title"
      :style="headingStyles"
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
          class="base-card-title"
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

    BaseCard protect this structure by the way it places its default slot
    as well as some validation logic. It also takes care of properly showing
    the focus ring and related.

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
        validator(value) {
          if (value <= 6 && value >= 2) {
            return true;
          } else {
            console.error(`[KCard] 'headingLevel' must be between 2 and 6.`);
            return false;
          }
        },
      },
      headingStyles: {
        required: false,
        type: Object,
        default: () => {},
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
      headingElement() {
        return this.headingLevel ? 'h' + this.headingLevel : undefined;
      },
    },
    mounted() {
      if (!this.$slots.title && !this.title) {
        console.error(`[KCard] provide title via 'title' slot or prop`);
      }
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
      onMouseUp() {
        const mouseUpTime = new Date().getTime();
        // Make textual content selectable within the whole clickable card area.
        //
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

  .base-card {
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

  .base-card-title {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
  }

</style>