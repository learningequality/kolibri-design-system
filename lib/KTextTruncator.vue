<template>
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
  export default {
    name: 'KTextTruncator',
    inheritAttrs: false,
    props: {
      text: {
        type: String,
        required: true,
      },
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

        if (this.maxLines === 1) {
          return {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          };
        }

        if ('CSS' in window && CSS.supports && CSS.supports('-webkit-line-clamp: 54')) {
          return {
            overflow: 'hidden',
            display: '-webkit-box',
            '-webkit-line-clamp': `${this.maxLines}`,
            '-webkit-box-orient': 'vertical',
            overflowWrap: 'break-word',
          };
        }
      },
    },
  };
</script>