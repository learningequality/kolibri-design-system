<template>

  <div class="nav-wrapper">
    <nav class="sidenav">
      <h1 class="header">
        <file-svg src="./kolibri-logo.svg" class="logo" />
        <span class="header-text">Design System</span>
      </h1>

      <DocsFilter v-model="filterText" />

      <div class="nav-links">
        <NavSectionList
          v-for="section in visibleTableOfContents"
          :key="section.title"
          :section="section"
        />
      </div>

    </nav>

    <!-- used to help indicate that there is more to see if one scrolls down -->
    <div class="bottom-gradient"></div>
  </div>

</template>


<script>

  import DocsFilter from '../../DocsFilter';
  import { termList, matches } from '../../DocsFilter/utils';
  import NavSectionList from './NavSectionList';
  import tableOfContents from '~/tableOfContents.js';

  export default {
    name: 'SideNav',
    components: {
      NavSectionList,
      DocsFilter,
    },
    data() {
      return {
        filterText: '',
      };
    },
    computed: {
      terms() {
        return termList(this.filterText);
      },
      visibleTableOfContents() {
        let toc = [];
        for (const section of tableOfContents) {
          // if the section title matches, add the entire thing
          if (matches(this.terms, section.title)) {
            toc.push(section);
          }
          // otherwise, check for matching pages
          else {
            const matchingPages = section.pages.filter(page => matches(this.terms, page.title));
            if (matchingPages.length) {
              toc.push(section.clone({ pages: matchingPages }));
            }
          }
        }
        return toc;
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '~/assets/definitions';

  .header {
    margin-top: 24px;
    margin-bottom: 24px;
    font-size: 20px;
    font-weight: bold;
    color: $header-color;
  }

  .logo {
    width: 55px;
    height: 45px;
    vertical-align: middle;
  }

  .header-text {
    display: inline-block;
    margin-left: 8px;
    font-weight: 400;
  }

  .bottom-gradient {
    position: absolute;
    right: 16px;
    bottom: 0;
    left: 0;
    height: 100px;
    pointer-events: none;
    background-image: linear-gradient(to bottom, transparent, white);
  }

  .nav-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: $nav-width;
  }

  .sidenav {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding-right: 24px;
    padding-bottom: 150px;
    padding-left: 16px;
    overflow-y: auto;
    background: white;
  }

  .nav-links {
    margin-top: 16px;
  }

</style>
