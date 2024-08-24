<template>

  <li
    :class="['base-card', $computedClass(coreOutlineFocus), borderClass]"
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
          <slot 
            v-if="$slots.title"
            name="title"
          ></slot>
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
      to: { type: Object, required: true },
      title: { type: String, default: null },
      titleLines: { type: Number, default: 2 },
      headingLevel: {
        type: Number,
        required: true,
        validator(value) {
          return value <= 6 && value >= 2;
        },
      },
      headingStyles: { type: Object, default: () => ({}) },
      thumbnailAlign: { type: String, default: 'center' },
      thumbnailDisplay: { type: String, default: 'small' },
    },
    computed: {
      coreOutlineFocus() {
        return { ':focus': { ...this.$coreOutline } };
      },
      headingElement() {
        return this.headingLevel ? 'h' + this.headingLevel : undefined;
      },
      borderClass() {
        return this.thumbnailAlign === 'left' && this.thumbnailDisplay === 'large'
          ? 'no-border-radius'
          : '';
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
      onMouseUp() {
        const mouseUpTime = new Date().getTime();
        if (mouseUpTime - this.mouseDownTime < 200) {
          this.navigate();
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
    border-radius: 0;
    outline-offset: -1px;
    transition: box-shadow $core-time ease;

    &:hover,
    &:focus {
      @extend %dropshadow-6dp;
    }
  }

  .no-border-radius {
    border-radius: 0;
  }

  .base-card-title {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
  }

</style>
