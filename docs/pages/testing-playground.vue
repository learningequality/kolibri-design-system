<template>

  <!--
    Testing Playground: A dedicated page for component visual testing
    *****************************************************

    Please do not modify the contents of this file.
  -->
  <div id="testing-playground" style="padding: 24px">
    <component :is="component" v-bind="componentProps" />
  </div>

</template>


<script>

  export default {
    name: 'TestingPlayground',
    data() {
      return {
        component: null,
        componentProps: {},
      };
    },
    mounted() {
      window.addEventListener('message', this.handleMessage);
    },
    beforeDestroy() {
      window.removeEventListener('message', this.handleMessage);
    },
    methods: {
      handleMessage(event) {
        if (event.data.type === 'RENDER_COMPONENT') {
          this.component = event.data.component;
          this.componentProps = event.data.props;
        }
      },
    },
  };

</script>
