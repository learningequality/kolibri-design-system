<template>

  <DocsShow :block="block">
    <Prism :language="language">
      <slot></slot>
    </Prism>
  </DocsShow>

</template>


<script>

  import 'prismjs';
  import 'prismjs/themes/prism.css';
  import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
  import Prism from 'vue-prism-component';

  export default {
    name: 'DocsShowCode',
    components: {
      Prism,
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
    padding: 0;
    margin: 0;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: none;
  }

</style>
