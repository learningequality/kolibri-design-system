<template>

  <div
    class="header"
    :class="{ scrolled }"
  >
    <div>
      <h1 class="header-text">
        <span :class="{ code: codeStyle }">{{ title }}</span>
        <a
          href="#"
          @click="scrollToTop"
        >
          <file-svg
            src="../../assets/link.svg"
            class="icon-link"
            :class="{ highlighed }"
          />
          <span class="visuallyhidden">link to current page</span>
        </a>
      </h1>
      <BranchLink style="float: right" />
    </div>
    <div style="clear: both"></div>
    <ul
      v-if="sections.length"
      class="nav"
    >
      <li
        v-for="(section, i) in sections"
        :key="i"
        class="nav-item"
      >
        <DocsInternalLink
          :href="section.anchor"
          :text="section.title"
        />
      </li>
    </ul>
  </div>

</template>


<script>

  import BranchLink from './BranchLink.vue';

  export default {
    name: 'Header',
    components: {
      BranchLink,
    },
    props: {
      sections: {
        type: Array,
        required: true,
      },
      codeStyle: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        scrolled: false,
        highlighed: false,
      };
    },
    mounted() {
      this.updateHighlight();
      window.addEventListener('scroll', this.handleScroll, false);
      window.addEventListener('hashchange', this.updateHighlight, false);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll, false);
      window.removeEventListener('hashchange', this.updateHighlight, false);
    },
    methods: {
      handleScroll() {
        this.scrolled = window.scrollY > 15;
      },
      scrollToTop() {
        window.scrollTo(0, 0);
      },
      updateHighlight() {
        this.highlighed = ['', '#'].includes(window.location.hash);
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '~/assets/definitions';

  .header {
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 32px;
    background-color: white;
    border-bottom: 1px solid white;
    border-left: 1px solid #dedede;
    transition: border 0.25s ease;
  }

  .scrolled {
    border-bottom: 1px solid #dedede;
  }

  @media print {
    .header {
      position: absolute !important;
      border-bottom-width: 0;
    }
  }

  .nav {
    padding: 0;
    margin: 0;
    margin-top: 20px;
    list-style: none;
  }

  .nav-item {
    display: inline-block;
  }

  .nav-item:not(:last-child) {
    padding-right: 8px;
    margin-right: 8px;
    border-right: 1px solid #dedede;
  }

  .header-text {
    display: inline-block;
    margin: 0;
    font-weight: 400;
  }

  .icon-link {
    width: 14px;
    height: 14px;
    margin-right: 8px;
    margin-left: 8px;
    transition: all 0.15s ease;
  }

  .highlighed {
    fill: $header-color;
    transform: scale(1.25);
  }

</style>
