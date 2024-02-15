<template>

  <li class="remove-list-style">
    <h2
      v-if="title !== null"
      :headerLevelTag="headerLevelTag"
    >
      <a :href="to">
        <KTextTruncator :text="title" :maxLines="1" />
      </a>
    </h2>
  </li>

</template>


<script>

  import KTextTruncator from '../KTextTruncator';

  export default {
    name: 'BaseCard',
    components: {
      KTextTruncator,
    },
    props: {
      title: {
        type: String,
        required: false,
        default: null,
      },
      headingLevel: {
        type: Number,
        required: true,
      },
      to: {
        type: Object,
        required: true,
      },
    },
    computed: {
      headerLevelTag() {
        return `h${this.headingLevel}`;
      },
    },
  };

</script>

<style lang="scss">

  @import '../styles/definitions';

  .card {
    @extend %dropshadow-2dp;

    position: relative;
    display: block;
    padding: 16px;
    margin-bottom: 24px;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    border-radius: 0.5em;
    transition: box-shadow $core-time ease;

    &:hover,
    &:focus {
      @extend %dropshadow-8dp;
    }
  }

  .remove-list-style {
    list-style-type: none;
  }

</style>