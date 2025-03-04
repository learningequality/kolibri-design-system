<template>

  <div class="docs-example">
    <div
      class="code-button"
      :style="codeButtonStyle"
    >
      <KIconButton
        v-if="loadExample"
        appearance="raised-button"
        icon="github"
        :tooltip="githubTooltip"
        :ariaLabel="githubTooltip"
        @click="redirectToGitHub"
      />
      <KIconButton
        appearance="raised-button"
        :icon="isCodeVisible ? 'chevronUp' : 'codeToggle'"
        tooltip="Toggle code visibility"
        aria-label="Toggle code visibility"
        @click="toggleCodeVisibility"
      />
    </div>

    <!-- Code examples -->
    <KTransition kind="component-vertical-slide-out-in">
      <div
        v-if="presentTabs.length && isCodeVisible"
        key="code-blocks"
      >
        <KTabs
          :tabs="presentTabs.map(t => ({ id: t.id, label: t.label }))"
          :tabsId="exampleId"
          ariaLabel="Language blocks for the Vue component"
          :appearanceOverrides="{
            textTransform: 'none',
          }"
          :colorActive="DOCS_LINK_COLOR"
          :hoverBackgroundColor="$themePalette.green.v_100"
        >
          <template
            v-for="tab in presentTabs"
            #[tab.id]
          >
            <div :key="tab.id">
              <slot :name="tab.language">
                <DocsShowCode :language="tab.language">
                  {{ tab.content }}
                </DocsShowCode>
              </slot>
            </div>
          </template>
        </KTabs>
      </div>
    </KTransition>

    <!-- Rendering the component itself -->
    <KTransition kind="component-fade-out-in">
      <KCircularLoader
        v-if="show(exampleId, !isLoaded, MINIMUM_LOADER_TIME)"
        key="loader"
      />
      <div
        v-else
        key="loaded-component"
      >
        <slot>
          <component :is="loadedComponent" />
        </slot>
      </div>
    </KTransition>
  </div>

</template>


<script>

  import useKShow from '../../lib/composables/useKShow';
  import environment from '~/environment';

  export default {
    name: 'DocsExample',
    setup() {
      const { show } = useKShow();
      return {
        show,
        MINIMUM_LOADER_TIME: 300,
        DOCS_LINK_COLOR: '#368d74',
      };
    },
    props: {
      /**
       * Path to the Vue component file to be displayed as example
       * The path should be relative to the 'docs/examples/' directory.
       * @type {String}
       * @example 'KComponent/Variant.vue'
       */
      loadExample: {
        type: String,
        required: false,
        default: null,
      },
      /**
       * Unique identifier for the example. Needs to be be unique in regards
       * to all DocsExample components rendered on one page (used as
       * `tabId` for the `KTabs` rendering the code blocks).
       * @type {String}
       * @example 'variantName'
       */
      exampleId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        isCodeVisible: false,
        // Flag to check if the component has been loaded dynamically
        isLoaded: false,
        // Stores the loaded component
        loadedComponent: null,
        // Stores the raw content of the component file
        content: null,
      };
    },
    computed: {
      presentTabs() {
        const tabList = [];

        const templateContent = this.applyRegex(this.content, 'template');
        if (this.$slots.html || templateContent) {
          tabList.push({
            id: 'html-codeblock',
            label: 'Template',
            content: templateContent,
            language: 'html',
          });
        }

        const scriptContent = this.applyRegex(this.content, 'script');
        if (this.$slots.javascript || scriptContent) {
          tabList.push({
            id: 'js-codeblock',
            label: 'Script',
            content: scriptContent,
            language: 'javascript',
          });
        }

        const styleContent = this.applyRegex(this.content, 'style');
        if (this.$slots.scss || styleContent) {
          tabList.push({
            id: 'scss-codeblock',
            label: 'Style',
            content: styleContent,
            language: 'scss',
          });
        }

        return tabList;
      },
      /*
       * Returns the style for the code button
       */
      codeButtonStyle() {
        return {
          marginBottom: this.isCodeVisible ? '0' : '12px',
        };
      },
      /*
       * Returns the tooltip message for the GitHub icon
       */
      githubTooltip() {
        const baseTooltipMessage = 'View the complete code example on GitHub';
        if (environment.local) {
          return `${baseTooltipMessage} (Not available in local environment)`;
        }
        if (environment.pull_request) {
          return `${baseTooltipMessage} (Not available for PRs)`;
        }
        return baseTooltipMessage;
      },
    },
    created() {
      if (this.loadExample) {
        Promise.all([this.loadComponentCode(), this.loadComponent()]).then(() => {
          this.isLoaded = true;
        });
      } else {
        this.isLoaded = true;
      }
    },
    methods: {
      toggleCodeVisibility() {
        this.isCodeVisible = !this.isCodeVisible;
      },
      /*
       * Redirects the user to the GitHub page for the example
       */
      redirectToGitHub() {
        if (environment.local || environment.pull_request) {
          return;
        }
        const exampleFileURL = `${environment.url}/docs/examples/${this.loadExample}`;
        window.open(exampleFileURL, '_blank');
      },
      /*
       * Loads the component file as raw source code and then parses
       * the same for template, script and style tag content
       */
      async loadComponentCode() {
        try {
          const content = await import(`!!raw-loader!@/examples/${this.loadExample}?raw`);
          this.content = content.default;
        } catch (error) {
          throw new Error(`Failed to load component code: ${error}`);
        }
      },
      /*
       * Loads the component file as a Vue component
       * and sets the loaded component to the data properties
       */
      async loadComponent() {
        try {
          const component = await import(`../examples/${this.loadExample}`);
          this.loadedComponent = component.default;
        } catch (error) {
          throw new Error(`Failed to load component: ${error}`);
        }
      },
      /*
       * Extracts the content between the opening and closing tags of the specified target
       * @param {string} content - The content to extract from
       * @param {string} target - The target tag to extract content from
       * @returns {string | null} - The content between the opening and closing tags
       */
      applyRegex(content, target) {
        if (!content) {
          return null;
        }

        const pattern = new RegExp(`(<${target}(\\s[^>]*)?>)([\\w\\W]*)(<\\/${target}>)`, 'g');
        const parsed = pattern.exec(content);
        if (!parsed) {
          return null;
        }
        // Extract the content between the first opening and the last closing tags
        return parsed[3].trim();
      },
    },
  };

</script>


<style scoped>

  .docs-example {
    padding: 20px;
    padding-top: 0;
    margin-bottom: 24px;
  }

  .code-button {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }

</style>
