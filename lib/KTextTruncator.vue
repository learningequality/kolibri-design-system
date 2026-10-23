<template>

  <!--
    Text is wrapped in two `spans`s to allow parent components adding
    padding style directly on `<TextTruncatorCss>` component no matter
    of what truncating technique is used. Otherwise adding padding directly
    would break when using technique (B) since text that should be truncated
    would show in padding area.

    Attributes are inherited by the inner `span` to emulate the same behavior
    like if only one element would wrap the text to allow attributes be applied
    as close as possible to the text element.

    Some width information need to be provided to `<span>s` to allow `text-overflow`
    calculate properly when ellipsis should be added.
  -->
  <span class="k-text-truncator-outer">
    <span
      v-bind="$attrs"
      class="k-text-truncator"
      :class="truncateClass"
      :style="truncateStyle"
    >
      {{ text }}
    </span>
  </span>

</template>


<script>

  /**
   * Truncates text to a certain number of lines
   * and adds an ellipsis character "…"
   */
  export default {
    name: 'KTextTruncator',
    inheritAttrs: false,
    props: {
      /**
       * Text to be truncated
       */
      text: {
        type: String,
        required: true,
      },
      /**
       * Maximum number of lines to be shown
       */
      maxLines: {
        type: Number,
        required: false,
        default: 1,
      },
    },
    computed: {
      truncateClass() {
        return this.maxLines === 1 ? 'k-text-truncator-single-line' : 'k-text-truncator-multi-line';
      },
      // the line clamp is bound inline because the formatter rewrites
      // `display: -webkit-box` in a style block to the invalid `display: box`
      truncateStyle() {
        if (this.maxLines === 1) {
          return null;
        }
        return {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': `${this.maxLines}`,
        };
      },
    },
  };

</script>


<style lang="scss" scoped>

  .k-text-truncator-outer,
  .k-text-truncator {
    display: inline-block;
    max-width: 100%;
  }

  .k-text-truncator {
    overflow: hidden;
  }

  .k-text-truncator-single-line {
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .k-text-truncator-multi-line {
    // makes the clamp work for a very long word with no spaces
    overflow-wrap: break-word;
  }

</style>
