<template>

  <!--
   This component was forked from the  library in order to handle
   dynamic styling of the indeterminate loading state stroke.

   Logic and styling has been consolidated with the KCircularLoader to simplify
   and remove unused logic.
  -->


  <transition name="ui-progress-circular--transition-fade">
    <div
      class="ui-progress-circular"
      :class="[classes, { delay }]"
      :style="{ 'width': size + 'px', 'height': size + 'px' }"
    >
      <!-- Alternative circle rendering to explore: http://jsfiddle.net/6e3QJ/29/ -->
      <svg
        v-if="type === 'determinate'"
        class="ui-progress-circular-determinate"

        role="progressbar"
        :aria-valuemax="100"
        :aria-valuemin="0"
        :aria-valuenow="progress"
        :height="size"

        :width="size"
      >
        <circle
          class="ui-progress-circular-determinate-path"
          fill="transparent"
          stroke-dashoffset="0"

          :cx="size / 2"
          :cy="size / 2"
          :r="radius"
          :stroke-dasharray="strokeDashArray"
          :style="{
            'stroke-dashoffset': strokeDashOffset,
            'stroke-width': calculatedStroke,
            stroke: $themeTokens.loading,
          }"
        />
      </svg>

      <svg
        v-else
        class="ui-progress-circular-indeterminate"
        role="progressbar"

        viewBox="25 25 50 50"
        :aria-valuemax="100"

        :aria-valuemin="0"
        :style="{ stroke: $themeTokens.loading }"
      >
        <circle
          class="ui-progress-circular-indeterminate-path"
          cx="50"
          cy="50"
          fill="none"
          r="20"
          stroke-miterlimit="10"

          :stroke-width="calculatedStroke"
          :style="{
            stroke: $themeTokens.loading,
          }"
        />
      </svg>
    </div>
  </transition>

</template>


<script>

  /**
   * Used to show indeterminate loading
   */
  export default {
    name: 'KCircularLoader',
    props: {
      /**
       * One of `'determinate'` or `'indeterminate'`. Determinate loaders represent a known completion percentage, while indeterminate loaders simply show that activity is currently happening.
       */
      type: {
        type: String,
        default: 'indeterminate', // 'indeterminate' or 'determinate'
      },
      /**
       * For determinate loaders, value between 0 and 100 representing percentage completion
       */
      progress: {
        type: Number,
        default: 0,
      },
      /**
       * Whether there should be a delay before the loader displays. Useful if the action often takes less than a second or two.
       */
      delay: {
        type: Boolean,
        default: false,
      },
      /**
       * Overall size of the loader in pixels
       */
      size: {
        type: Number,
        default: 32,
      },
      /**
       * Stroke width of the loader in pixels
       */
      stroke: {
        type: Number,
        default: 4,
      },
    },

    computed: {
      classes() {
        return [`ui-progress-circular--type-${this.type}`];
      },

      strokeDashArray() {
        const circumference = 2 * Math.PI * this.radius;

        // Use first 3 decimal places, rounded as appropriate
        return Math.round(circumference * 1000) / 1000;
      },

      strokeDashOffset() {
        const progress = this.moderateProgress(this.progress);
        const circumference = 2 * Math.PI * this.radius;

        return ((100 - progress) / 100) * circumference;
      },

      radius() {
        const stroke = this.stroke ? this.stroke : 4;
        return (this.size - stroke) / 2;
      },

      calculatedStroke() {
        if (this.stroke) {
          return this.stroke;
        }

        if (this.autoStroke) {
          return parseInt(this.size / 8, 10);
        }

        return 4;
      },
    },

    methods: {
      moderateProgress(progress) {
        if (isNaN(progress) || progress < 0) {
          return 0;
        }

        if (progress > 100) {
          return 100;
        }

        return progress;
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '../keen/styles/imports';

  .delay {
    animation-delay: 1s;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  $ui-progress-indeterminate-rotation-duration: 0.7s !default;
  $ui-progress-indeterminate-color-duration: 6s !default;
  $ui-progress-determinate-transition-duration: 0.3s !default;

  .ui-progress-circular {
    position: relative;
    margin: 0 auto;
    animation: fadeIn;
    animation-fill-mode: backwards;
    animation-duration: 0s;
  }

  .ui-progress-circular-determinate {
    transform: rotate(270deg);
  }

  .ui-progress-circular-determinate-path {
    stroke-dashoffset: 0;
    transition: stroke-dashoffset $ui-progress-determinate-transition-duration;
  }

  .ui-progress-circular-indeterminate {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    transform-origin: center center;
    animation: ui-progress-circular-rotate $ui-progress-indeterminate-rotation-duration linear
      infinite;
  }

  .ui-progress-circular-indeterminate-path {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
    stroke-linecap: round;
  }

  // ================================================
  // Toggle transition
  // ================================================

  .ui-progress-circular--transition-fade-enter-active,
  .ui-progress-circular--transition-fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .ui-progress-circular--transition-fade-enter,
  .ui-progress-circular--transition-fade-leave-active {
    opacity: 0;
    transform: scale(0);
  }

  // ================================================
  // Animations
  // ================================================

  @keyframes ui-progress-circular-rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes ui-progress-circular-color {
    0%,
    100% {
      stroke: $md-red;
    }

    40% {
      stroke: $md-blue;
    }

    66% {
      stroke: $md-green;
    }

    80%,
    90% {
      stroke: $md-orange;
    }
  }

</style>
