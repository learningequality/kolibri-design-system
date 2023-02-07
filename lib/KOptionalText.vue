<template>

  <span v-if="!textEmpty" :style="appearanceOverrides">
    <template v-if="text">
      {{ text }}
    </template>
    <template v-else>
      <!-- @slot Pass sub-components to render, if none of the nodes in the entire node hierarchy contain text, then the `KEmptyPlaceholder` component will be rendered -->
      <slot></slot>
    </template>
  </span>

  <KEmptyPlaceholder v-else />

</template>


<script>

  import KEmptyPlaceholder from './KEmptyPlaceholder.vue';

  export default {
    name: 'KOptionalText',
    components: {
      KEmptyPlaceholder,
    },
    props: {
      /**
       * Text to display. If the text is missing or empty, then `KEmptyPlaceholder` will be rendered
       */
      text: {
        type: String,
        default: null,
      },
      /**
       * If provided, sets the styles of the text
       */
      appearanceOverrides: {
        type: [Object, String],
        default: null,
      },
    },
    computed: {
      textEmpty() {
        if (this.text && this.text.trim()) {
          return false;
        }

        const slotsText = this.getSlotsText();
        return !slotsText.trim();
      },
    },
    methods: {
      getSlotsText() {
        if (!this.$slots.default || !this.$slots.default.length) {
          return '';
        }

        return this.getNodesText(this.$slots.default);
      },
      getNodesText(nodes) {
        return nodes
          .map(node => {
            if (node.text) {
              return node.text;
            }
            if (node.children) {
              return this.getNodesText(node.children);
            }
            return '';
          })
          .join('');
      },
    },
  };

</script>


<style lang="scss" scoped></style>
