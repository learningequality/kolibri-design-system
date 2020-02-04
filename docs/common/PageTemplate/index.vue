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

  import PageSection from '../PageSection';
  import Header from './Header';
  import SideNav from './SideNav';

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
      title: {
        type: String,
        required: true,
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
    },
    head: {
      title: 'Home',
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
    padding-left: 32px;
    margin-bottom: 400px;
  }

</style>
