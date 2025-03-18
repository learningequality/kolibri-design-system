<template>

  <DocsShow
    :block="block"
    :padding="false"
  >
    <!-- Note that slot contents are HTML-escaped using webpack-loader.js -->
    <PrismComponent :language="language">
      <slot></slot>
    </PrismComponent>
  </DocsShow>

</template>


<script>

  import Prism from 'prismjs';
  import 'prismjs/themes/prism.css';
  import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
  import PrismComponent from 'vue-prism-component';

  import 'prismjs/components/prism-scss'; // Add SCSS support

  export default {
    name: 'DocsShowCode',
    components: {
      PrismComponent,
    },
    props: {
      // `display: block` takes up full width
      block: {
        type: Boolean,
        default: true,
      },
      language: {
        type: String,
        required: true,
      },
    },
    mounted() {
      // Ensure prism-normalize-whitespace plugin is run
      // ref: https://github.com/egoist/vue-prism-component/issues/10#issuecomment-988938865
      Prism.highlightAll();
    },
  };

</script>


<style lang="scss" scoped>

  /* Prism theme overrides */

  code[class*='language-'],
  pre[class*='language-'] {
    font-family: 'Source Code Pro', monospace;
    font-size: 14px;
  }

  pre[class*='language-'] {
    padding: 24px;
    margin: 0;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: none;
  }

</style>
