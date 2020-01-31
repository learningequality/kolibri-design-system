<template>

  <div>
    <SideNav />
    <div :style="{ marginLeft: `${navWidth}px` }" class="content">
      <nuxt />
    </div>
  </div>

</template>


<script>

  import state from '../state';
  import SideNav from '../common/SideNav';

  export default {
    name: 'Default', // eslint-disable-line kolibri/vue-filename-and-component-name-match
    components: {
      SideNav,
    },
    computed: {
      navWidth() {
        return state.navWidth;
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '../common/globals';

  .content {
    padding-left: 32px;
    border-left: 1px solid $border-color;
  }

</style>


<style lang="scss">

  @import '../common/globals';

  .visuallyhidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    border: 0;
  }

  // match Prism font family
  code {
    font-family: $code-font-stack;
    color: $code-color;
    white-space: nowrap;
  }

  a code {
    color: $link-color;
    &:hover {
      color: $link-hover-color;
    }
  }

  a {
    display: inline-block; // prevents trailing spaces
    color: $link-color;
    transition: $basic-transition;

    svg {
      fill: $link-color;
      transition: $basic-transition;
    }

    &:hover {
      color: $link-hover-color;
      svg {
        fill: $link-hover-color;
      }
    }
  }

  *:focus {
    outline-color: #757575;
  }

  *::selection {
    background: $selection-color;
  }

  body,
  html {
    font-family: 'Noto Sans', sans-serif;
    background-color: white;
  }

</style>
