<template>

  <!--
    Testing Playground: A dedicated page for component visual testing
    *****************************************************

    Please do not modify the contents of this file.
  -->
  <div id="testing-playground" style="padding: 24px">
    <component :is="component" v-bind="componentProps">
      <!-- Render default slot if provided -->
      <template v-if="slots.default">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="slots.default"></span>
      </template>
      <!-- Render named slots passed to the component -->
      <template v-for="(slot, name) in namedSlots" #[name]>
        <component :is="slot.content" v-bind="slot.props" :key="name" />
      </template>
    </component>
  </div>

</template>


<script>

  /**
   * Renders the components for visual testing
   * to ensure expected visual behavior under
   * various conditions.
   */
  export default {
    name: 'VisualTestingPlayground',
    data() {
      return {
        /**
         * @type {string|null} The name of the component to be dynamically rendered.
         */
        component: null,
        /**
         * @type {Object} The props to be passed to the dynamically rendered component.
         */
        componentProps: {},
        /**
         * @type {Object} The slots to be passed to the dynamically rendered component.
         */
        slots: {},
      };
    },

    /**
     * Computed property that filters out the default slot from the slots object,
     * returning only the named slots.
     */
    computed: {
      namedSlots() {
        // eslint-disable-next-line no-unused-vars
        const { default: defaultSlot, ...rest } = this.slots;
        return rest;
      },
    },

    /**
     * Adds an event listener for messages from the test runner.
     * This listener will trigger the `handleMessage` method.
     */
    mounted() {
      window.addEventListener('message', this.handleMessage);
    },

    /**
     * Removes the event listener for messages from the test runner.
     */
    beforeDestroy() {
      window.removeEventListener('message', this.handleMessage);
    },

    methods: {
      /**
       * Handles messages received from the test runner to render a specified component.
       * @param {MessageEvent} event -  The message event containing the component and its props.
       */
      handleMessage(event) {
        if (event.data.type === 'RENDER_COMPONENT') {
          this.component = event.data.component;
          this.componentProps = event.data.props;
          this.slots = event.data.slots || {};
        }
      },
    },
  };

</script>
