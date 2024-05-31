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
    <component
      :is="headerLevel"
      v-if="title !== null"
    >
      <router-link
        tabindex="-1"
        :to="to"
      >
        <KTextTruncator
          v-if="title !== null"
          :text="title"
          :maxLines="titleLines"
          :style="titleStyle"
        />
      </router-link>
    </component>

    <slot name="default"></slot>
    <!-- @slot Title slot-->
    <div data-testid="title">
      <slot name="title"></slot>
    </div>
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
          margin: '12px 16px',
        };
      },
    },
    // created() {
    //   if (!this.$slots.title.length || !this.title) {
    //     throw new Error('provide a title slots or prop for the  card');
    //   } else {
    //     return true;
    //   }
    // },

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