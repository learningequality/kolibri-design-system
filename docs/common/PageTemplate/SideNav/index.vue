<template>

  <div class="nav-wrapper">
    <nav class="sidenav">
      <h1 class="header">
        <file-svg src="./kolibri-logo.svg" class="logo" />
        <span class="header-text">Design System</span>
      </h1>

      <div class="filter-wrapper">
        <input
          v-model="filterText"
          class="filter"
          placeholder="filter"
          type="text"
          @keydown.esc="filterText = ''"
        >
        <button
          v-show="filterText"
          class="filter-clear-button"
          @click="filterText = ''"
        >
          ✕
        </button>
      </div>

      <div class="nav-links">
        <NavLink v-show="showHome" :text="homeText" :href="'/'" />
        <NavSectionList v-show="showPatterns" :title="patternsText">
          <li v-for="(page, i) in visiblePatternRoutes" :key="i">
            <NavLink :text="page.title" :href="page.path" />
          </li>
        </NavSectionList>
        <NavSectionList v-show="showComponents" :title="componentsText">
          <li v-for="(page, i) in visibleComponentRoutes" :key="i">
            <NavLink :text="page.componentAPI.name" :href="page.path" code />
          </li>
        </NavSectionList>
      </div>

    </nav>

    <!-- used to help indicate that there is more to see if one scrolls down -->
    <div class="bottom-gradient"></div>
  </div>

</template>


<script>

  import { patternPages } from '../pages.js';
  import NavSectionList from './NavSectionList';
  import NavLink from './NavLink';
  import { termList, matches } from './filter';

  export default {
    name: 'SideNav',
    components: {
      NavSectionList,
      NavLink,
    },
    data() {
      return {
        filterText: '',
        homeText: 'Home',
        patternsText: 'Patterns',
        componentsText: 'Kolibri components',
      };
    },
    computed: {
      terms() {
        return termList(this.filterText);
      },
      showHome() {
        return matches(this.terms, this.homeText);
      },
      showPatterns() {
        return this.visiblePatternRoutes.length || matches(this.terms, this.patternsText);
      },
      showComponents() {
        return this.visibleComponentRoutes.length || matches(this.terms, this.componentsText);
      },
      visiblePatternRoutes() {
        // show a page if either the page title or the section title matches
        return patternPages.filter(page => matches(this.terms, page.title + this.patternsText));
      },
      visibleComponentRoutes() {
        // show a component if either the component name or the section title matches
        return [];
        // return componentRoutes.filter(route =>
        //   matches(this.terms, route.componentAPI.name + this.componentsText)
        // );
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '~/assets/definitions';

  .header {
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
  }

  .filter-wrapper {
    position: relative;
  }

  .filter {
    width: 100%;
    padding-top: 4px;
    padding-right: 32px;
    padding-bottom: 4px;
    padding-left: 8px;
    font-size: 12px;
    border: 1px solid $border-color;
    border-radius: 4px;
    &::placeholder {
      color: $border-color;
    }
  }

  .filter-clear-button {
    position: absolute;
    top: 3px;
    right: 2px;
    width: 30px;
    height: 21px;
    font-size: 14px;
    background: none;
    border: 0;
    border-radius: 2px;
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
