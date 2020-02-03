<template>

  <div class="nav-wrapper">
    <nav class="sidenav">
      <h1 class="header">
        <file-svg src="./kolibri-logo.svg" class="logo" />
        <span class="header-text">Design System</span>
      </h1>

      <template v-if="false">

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
      </template>

      <div class="nav-links">

        <a v-show="showHome" :href="'/'" exact>
          {{ homeText }}
        </a>

        <NavSectionList v-show="showPatterns" :title="patternsText">
          <li v-for="(route, i) in visiblePatternRoutes" :key="i">
            <a :href="route">
              {{ route.meta.title }}
            </a>
          </li>
        </NavSectionList>

        <NavSectionList v-show="showComponents" :title="componentsText">
          <li v-for="(route, i) in visibleComponentRoutes" :key="i">
            <a :href="route">
              <code>{{ route.meta.componentAPI.name }}</code>
            </a>
          </li>
        </NavSectionList>

      </div>

    </nav>

    <!-- used to help indicate that there is more to see if one scrolls down -->
    <div class="bottom-gradient"></div>
  </div>

</template>


<script>

  import NavSectionList from './NavSectionList';
  import { termList, matches } from './filter';

  export default {
    name: 'SideNav',
    components: {
      NavSectionList,
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
        return [];
        // return patternRoutes.filter(route =>
        //   matches(this.terms, route.meta.title + this.patternsText)
        // );
      },
      visibleComponentRoutes() {
        // show a component if either the component name or the section title matches
        return [];
        // return componentRoutes.filter(route =>
        //   matches(this.terms, route.meta.componentAPI.name + this.componentsText)
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

  .filter {
    display: block;
    width: 100%;
    padding: 4px 8px;
    font-size: 12px;
    border: 1px solid $border-color;
    border-radius: 4px;
    outline-width: 1px;
    outline-offset: -1px;
    &::placeholder {
      color: $border-color;
    }
  }

  .filter-clear-button {
    position: absolute;
    top: 84px;
    right: 24px;
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

    a {
      display: block;
      padding: 8px;
      margin-right: -8px;
      margin-bottom: 2px;
      margin-left: -8px;
      color: $link-color;
      text-decoration: none;
      border-radius: 4px;
      outline-offset: 3px;

      &:hover {
        color: $link-hover-color;
        background-color: #efefef;

        code {
          color: $link-hover-color;
        }
      }

      &.router-link-active {
        color: black;
        background-color: $border-color;
      }
    }
  }

</style>
