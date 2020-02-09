<template>

  <div class="content-wrapper">
    <SideNav />
    <Header
      :sections="sections"
      :title="title"
      :codeStyle="isComponent"
      class="floating-header"
    />
    <div class="border">
      <!-- used as a spacer -->
      <Header
        :sections="sections"
        :title="title"
        :codeStyle="isComponent"
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
  import PageSection from '../PageSection';
  import { homePage, patternPages } from './pages.js';
  import Header from './Header';
  import SideNav from './SideNav';

  function currentPage(currentPath) {
    if (currentPath === '/') {
      return homePage;
    }
    const page = patternPages.find(p => p.path === currentPath);
    if (!page) {
      consola.warn(`'${currentPath}' not found in pages.js`);
    }
    return page;
  }

  export default {
    name: 'PageTemplate',
    components: {
      Header,
      SideNav,
    },
    props: {
      isComponent: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      sections() {
        // look at children for sections and extract links
        return this.$slots.default
          .filter(
            node =>
              node.componentOptions &&
              node.componentOptions.tag === PageSection.name &&
              node.componentOptions.propsData.anchor
          )
          .map(node => node.componentOptions.propsData);
      },
      title() {
        const page = currentPage(this.$route.path);
        const main = 'Kolibri Design System';
        return page ? `${page.title} - ${main}` : main;
      },
    },
    head() {
      return {
        title: this.title,
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
