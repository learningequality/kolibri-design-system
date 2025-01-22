<template>

  <div>
    <div
      class="show"
      :style="style"
    >
      <!-- Code blocks display -->
      <div v-if="loadExample && codeBlocks.length">
        <DocsShowCode
          v-for="(codeBlock, index) in codeBlocks"
          :key="index"
          :language="codeBlock.language"
        >
          {{ codeBlock.content }}
        </DocsShowCode>
      </div>

      <!-- Rendered example output when showOutput is true -->
      <component
        :is="componentToRender"
        v-if="showOutput && componentToRender"
      />

      <!-- Usual slots -->
      <slot></slot>
    </div>
  </div>

</template>


<script>

  export default {
    name: 'DocsShow',
    props: {
      /**
       * Path to the Vue component file to load and display.
       * The path should be relative to the project root.
       * @example 'examples/KComponent/FileName.vue'
       */
      loadExample: {
        type: String,
        required: false,
        default: null,
      },
      /**
       * Controls whether to render the actual component example.
       * When true, displays both the code and the rendered output.
       * When false, only displays the code.
       */
      showOutput: {
        type: Boolean,
        required: false,
        default: true,
      },
      block: {
        type: Boolean,
        default: false,
      },
      padding: {
        type: Boolean,
        default: true,
      },
      dark: {
        type: Boolean,
        required: false,
      },
    },
    data() {
      return {
        codeBlocks: [],
        componentToRender: null,
      };
    },
    computed: {
      style() {
        return {
          display: this.block ? 'block' : 'inline-block',
          padding: this.padding ? '8px 24px' : null,
          backgroundColor: this.dark ? this.$themePalette.grey.v_700 : undefined,
        };
      },
    },
    async created() {
      if (this.loadExample) {
        await this.loadComponentContent();
        await this.importComponent();
      }
    },
    methods: {
      /**
       * Loads the content of the component file using raw-loader.
       * Parses the content into separate code blocks for template, script, and style.
       * @throws {Error} If the component content cannot be loaded
       */
      async loadComponentContent() {
        try {
          const content = await import(`!!raw-loader!@/${this.loadExample}?raw`);
          this.codeBlocks = this.parseTemplate(content.default);
        } catch (error) {
          throw new Error(`Failed to load component content: ${error}`);
        }
      },
      /**
       * Dynamically imports the component for rendering
       */
      async importComponent() {
        try {
          const component = await import(`../${this.loadExample}`);
          this.componentToRender = component.default;
        } catch (error) {
          throw new Error(`Failed to import component: ${error}`);
        }
      },
      parseTemplate(content) {
        const codeBlocks = [];
        const template = content.match(/<template>([\s\S]*?)<\/template>/);
        if (template) {
          codeBlocks.push({
            language: 'html',
            content: template[1].trim(),
          });
        }
        const script = content.match(/<script>([\s\S]*?)<\/script>/);
        if (script) {
          codeBlocks.push({
            language: 'javascript',
            content: script[1].trim(),
          });
        }
        const style = content.match(/<style[\s\S]*?>([\s\S]*?)<\/style>/);
        if (style) {
          codeBlocks.push({
            language: 'scss',
            content: style[1].trim(),
          });
        }
        return codeBlocks;
      },
    },
  };

</script>


<style lang="scss" scoped>

  .show {
    margin: 16px 0;
    border: 1px solid #dedede;
    border-radius: 4px;
  }

</style>
