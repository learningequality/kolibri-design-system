<template>

  <div class="content-wrapper">
    <SideNav />
    <Header
      :sections="sections"
      :title="page.title"
      :codeStyle="page.isCode"
      class="floating-header"
    />
    <div class="border">
      <!-- used as a spacer -->
      <Header
        :sections="sections"
        :title="page.title"
        :codeStyle="page.isCode"
        style="visibility: hidden;"
      />
      <!-- end of spacer -->
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>

</template>


<script>

  import consola from 'consola';
  import DocsPageSection from '../DocsPageSection';
  import Header from './Header';
  import SideNav from './SideNav';
  import tableOfContents from '~/tableOfContents.js';

  export default {
    name: 'DocsPageTemplate',
    components: {
      Header,
      SideNav,
    },
    computed: {
      page() {
        const path = this.$route.path;
        // Search for page
        for (const section of tableOfContents) {
          for (const page of section.pages) {
            if (path === page.path) {
              return page;
            }
          }
        }
        // Page not found
        consola.error(`'${path}' not found in pages.js`);
        return undefined;
      },
      sections() {
        // look at children for sections and extract links
        return this.$slots.default
          .filter(
            node =>
              node.componentOptions &&
              node.componentOptions.tag === DocsPageSection.name &&
              node.componentOptions.propsData.anchor
          )
          .map(node => node.componentOptions.propsData);
      },
      fullTitle() {
        const main = 'Kolibri Design System';
        return this.page.title ? `${this.page.title} - ${main}` : main;
      },
    },
    head() {
      return {
        title: this.fullTitle,
      };
    },
  };

</script>


<style lang="scss" scoped>

  @import '~/assets/definitions';

  .floating-header {
    position: fixed;
    top: 0;
    right: 0;
    left: $nav-width;
    z-index: 100;
  }

  .content-wrapper {
    margin-left: $nav-width;
  }

  .border {
    border-left: 1px solid $border-color;
  }

  .content {
    padding-right: 32px;
    padding-bottom: 400px;
    padding-left: 32px;
  }

</style>
