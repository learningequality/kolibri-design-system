<template>

  <div class="header" :class="{ scrolled }">
    <h1 class="header-text">
      <component :is="codeStyle ? 'code' : 'span'">
        {{ title }}
      </component>
      <a href="#" @click="scrollToTop">
        <file-svg class="icon-link" src="../../assets/link.svg" />
        <span class="visuallyhidden">link to current page</span>
      </a>
    </h1>
    <ul v-if="sections.length" class="nav">
      <li v-for="(section, i) in sections" :key="i" class="nav-item">
        <InternalLink :href="section.anchor" :text="section.title" />
      </li>
    </ul>
  </div>

</template>


<script>

  export default {
    name: 'Header',
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
        required: false,
      },
    },
    data() {
      return {
        scrolled: false,
      };
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        this.scrolled = window.scrollY > 15;
      },
      scrollToTop() {
        window.scrollTo(0, 0);
      },
    },
  };

</script>


<style lang="scss" scoped>

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
    margin-top: 8px;
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
    margin: 0;
  }

  .icon-link {
    width: 14px;
    height: 14px;
    margin-right: 8px;
    margin-left: 8px;
  }

</style>
