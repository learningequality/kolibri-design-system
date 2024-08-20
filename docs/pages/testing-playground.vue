<template>

  <!--
    Testing Playground: A dedicated page for component visual testing
    *****************************************************

    Please do not modify the contents of this file.
  -->
  <div id="testing-playground" style="padding: 24px">
    <component :is="component" v-bind="componentProps">
      <!-- Render slots if provided -->
      <template v-for="(slot, name) in slots">
        <!-- eslint-disable vue/no-v-html -->
        <component
          :is="slot.element"
          v-if="slot.element"
          v-bind="slot.elementProps"
          :key="name"
          v-html="slot.innerHTML"
        />
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
