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
  <span :style="{ display: 'inline-block', maxWidth: '100%' }">
    <span
      v-bind="$attrs"
      :style="{ display: 'inline-block', maxWidth: '100%' }"
      :class="$computedClass(truncate)"
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
      truncate() {
        const nuxtServerSideRendering = process && process.server;
        if (nuxtServerSideRendering) {
          return;
        }

        /*
            (A)
            For one line, use standard ellipsis text overflow
            that works well for such scenario
          */
        if (this.maxLines === 1) {
          return {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          };
        }
        /*
              (B)
              For multiple lines, use line clamp in browsers that support it
              (https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp)
            */
        return {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-line-clamp': `${this.maxLines}`,
          '-webkit-box-orient': 'vertical',
          // needed to make line clamp work for very long word with no spaces
          overflowWrap: 'break-word',
        };
      },
    },
  };

</script>
