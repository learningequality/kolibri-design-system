<template>

  <div>
    <SideNav />
    <div :style="{ marginLeft: `${navWidth}px` }" class="content">
      <nuxt />
    </div>
  </div>

</template>


<script>

  import state from '~content/state';
  import SideNav from '~content/common/SideNav';

  export default {
    name: 'App',
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

  @import '~content/common/globals';

  .content {
    padding-left: 32px;
    border-left: 1px solid $border-color;
  }

</style>


<style lang="scss">

  @import '~content/common/globals';

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

  body {
    background-color: white;
  }

</style>
