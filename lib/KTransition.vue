<template>

  <transition v-bind="transitionAttrs">
    <slot></slot>
  </transition>

</template>


<script>

  const TransitionKinds = {
    COMPONENT_FADE_OUT_IN: 'component-fade-out-in',
    COMPONENT_VERTICAL_SLIDE_OUT_IN: 'component-vertical-slide-out-in',
  };

  const TransitionAttrs = {
    [TransitionKinds.COMPONENT_FADE_OUT_IN]: {
      name: 'component-fade',
      mode: 'out-in',
    },
    [TransitionKinds.COMPONENT_VERTICAL_SLIDE_OUT_IN]: {
      name: 'component-vertical-slide',
      mode: 'out-in',
    },
  };

  /**
   * Exposes predefined set of transitions
   * built on top of Vue's <transition>
   */
  export default {
    name: 'KTransition',
    props: {
      /**
       * Transition kind. Can be one of:
       * `'component-fade-out-in'`.
       */
      kind: {
        type: String,
        required: true,
        validator: value => {
          return Object.values(TransitionKinds).includes(value);
        },
      },
    },
    computed: {
      transitionAttrs() {
        return TransitionAttrs[this.kind];
      },
    },
  };

</script>


<style lang="scss" scoped>

  /********* component-fade **********/
  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity 0.25s ease;
  }

  .component-fade-enter,
  .component-fade-leave-to {
    opacity: 0;
  }

  /********* component-vertical-slide **********/
  .component-vertical-slide-enter-active,
  .component-vertical-slide-leave-active {
    transition: all 0.3s ease;
  }

  .component-vertical-slide-enter,
  .component-vertical-slide-leave-to {
    opacity: 0;
    transform: translateY(-50%);
  }

</style>
