<template>

  <div class="nav-wrapper">
    <nav
      ref="links"
      class="sidenav"
      @scroll="throttleHandleScroll"
    >
      <template if="loaded">
        <h1 class="header">
          <KLogo
            altText="Design System"
            size="60"
            :showBackground="true"
          />
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
      </template>
    </nav>

    <!-- used to help indicate that there is more to see if one scrolls down -->
    <div class="bottom-gradient"></div>
  </div>

</template>


<script>

  import throttle from 'lodash/throttle';
  import NavSectionList from './NavSectionList';
  import { termList, matches } from '~/common/DocsFilter/utils';
  import tableOfContents from '~/tableOfContents.js';

  export default {
    name: 'SideNav',
    components: {
      NavSectionList,
    },
    data() {
      return {
        filterText: '',
        loaded: false,
      };
    },
    computed: {
      terms() {
        return termList(this.filterText);
      },
      visibleTableOfContents() {
        const toc = [];
        for (const section of tableOfContents) {
          // if the section title matches, add the entire thing
          if (matches(this.terms, section.title)) {
            toc.push(section);
          }
          // otherwise, check for matching pages by title and keywords
          else {
            const matchingPages = section.pages.filter(page =>
              matches(this.terms, page.title + page.keywords.join(' ')),
            );
            if (matchingPages.length) {
              toc.push(section.clone({ pages: matchingPages }));
            }
          }
        }
        return toc;
      },
    },

    watch: {
      filterText(newValue) {
        if (window) {
          //Clear the filter query when filtertext is empty
          if (!newValue) {
            this.$router.push({ path: this.$route.path, query: {} });
          } else {
            //else ,update the filter query param
            this.$router.push({
              path: this.$route.path,
              query: { ...this.$route.query, filter: newValue },
            });
          }
        }
      },
    },
    mounted() {
      if (window) {
        const { filter } = this.$route.query;
        // Set filterText from the query parameter if it exists
        if (filter) {
          this.filterText = filter;
        }
        this.$refs.links.scrollTop = window.sessionStorage.getItem('nav-scroll');
        // Restoring filter state when a user navigates back
        window.addEventListener('popstate', event => {
          if (event.state && 'filterText' in event.state) {
            this.filterText = event.state.filterText;
          } else {
            this.filterText = ''; // Reset if no filterText is in state
          }
        });
      }

      //  Don't show the nav until the state is set
      this.loaded = true;
    },
    methods: {
      throttleHandleScroll: throttle(function handleScroll() {
        window.sessionStorage.setItem('nav-scroll', this.$refs.links.scrollTop);
      }, 100),
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
    height: 64px;
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
