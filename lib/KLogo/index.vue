<template>

  <svg
    :class="{ animate }"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :width="validateAndFormatUnits(size)"
    :height="validateAndFormatUnits(size)"
    :max-width="validateAndFormatUnits(maxSize)"
    :min-width="validateAndFormatUnits(minSize)"
    :max-height="validateAndFormatUnits(maxSize)"
    :min-height="validateAndFormatUnits(minSize)"
    viewBox="0 0 200 200"
    fill="none"
    :aria-label="altText"
  >
    <title>{{ altText }}</title>
    <use v-if="showBackground" :href="backgroundHref" :fill="blobColor" :mask="applyMask ? 'url(#cutout-mask)' : null" />
    <use v-if="!applyMask" href="#body" :stroke="strokeColor" />
    <use v-if="!applyMask" href="#right-wing-inner" class="wing-inner" :stroke="strokeColor" />
    <use v-if="!applyMask" href="#right-wing-middle" class="wing-middle" :stroke="strokeColor" />
    <use v-if="!applyMask" href="#right-wing-outer" class="wing-outer" :stroke="strokeColor" />
    <use v-if="!applyMask" href="#left-wing-inner" class="wing-inner" :stroke="strokeColor" />
    <use v-if="!applyMask" href="#left-wing-middle" class="wing-middle" :stroke="strokeColor" />
    <use v-if="!applyMask" href="#left-wing-outer" class="wing-outer" :stroke="strokeColor" />
    <defs>
      <g id="blob-background">
        <path
          d="M0.320842 109.741C-1.24406 129.508 2.71248 151.014 16.6884 165.088C22.7511
          171.176 30.3394 175.515 38.1148 179.132C86.5579 201.626 153.445 202.012 187.716
          156.301C206.721 130.98 198.68 92.0596 185.846 65.0188C174.783 41.704 155.65 22.0559
          132.039 11.797C99.2149 -2.50425 69.157 3.26763 43.0949 25.8313C18.8241 46.8631
          2.86012 77.5805 0.320842 109.741Z"
        />
      </g>
      <g id="rect-background">
        <rect width="200" height="200" rx="20" ry="20" />
      </g>
      <g id="body">
        <path
          d="M105 133.5C106.125 135.248 111.046 140.575 113.5 145.5C115.084 148.678 116.043
          151.879 115.5 154.5C114.566 159.01 110.376 162.409 106.255 159.3C104.108 157.681
          102.698 154.847 102.209 152.3C101.265 147.375 102.751 141.099 105 133.5ZM105 133.5C92
          121.5 80.5894 106.993 86.0001 88C87.8773 81.4102 91.5066 76.5374 92.5907 67.8576C92.9229
          65.1979 92.0525 63.0863 92.5907 60.3303C93.1958 57.2315 95.7567 53.5948 99.6458 52.8029C101.94
          52.3358 104.538 52.8993 106.701 54.6847C108.251 55.9644 109.53 57.5443 109.801 59.5775C110.137
          62.0918 109.848 65.8372 109.969 68.8091C110.064 71.1567 111.01 74.3275 111.846 76.5C123.727
          101.615 117 110.5 105 133.5ZM102.455 52.7427C104.844 53.1793 107.316 54.5807 111.846
          51.9511C117.52 46.8315 124.682 39.4836 129.898 34.0323C123.952 40.1759 122.341 41.8109
          114.35 49.692C112.985 51.7283 111.085 54.0494 110.647 55.8138C110.089 58.0588 109.812
          61.4633 109.967 63.8191"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <g id="right-wing-inner">
        <path
          d="M128.866 81.1332C128.866 81.1332 136.087 86.4496
          136.087 97.0824C136.087 107.715 128.866 112.875 128.866 112.875"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <g id="right-wing-middle">
        <path
          d="M140.213 70.8939C140.213 70.8939 151.559 79.6402
          151.559 97.1328C151.559 114.625 140.213 123.114 140.213 123.114"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <g id="right-wing-outer">
        <path
          d="M150.528 60.6545C150.528 60.6545 166 72.8308 166 97.1832C166
          121.536 150.528 133.354 150.528 133.354"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <g id="left-wing-inner">
        <path
          d="M72.1338 81.1332C72.1338 81.1332 64.9133 86.4496
          64.9133 97.0824C64.9133 107.715 72.1338 112.875 72.1338 112.875"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <g id="left-wing-middle">
        <path
          d="M60.7874 70.8939C60.7874 70.8939 49.4409 79.6402
          49.4409 97.1328C49.4409 114.625 60.7874 123.114 60.7874 123.114"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <g id="left-wing-outer">
        <path
          d="M50.4724 60.6545C50.4724 60.6545 35 72.8308 35 97.1832C35
          121.536 50.4724 133.354 50.4724 133.354"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <mask id="cutout-mask">
        <!-- Start with a white rectangle as the base of the mask -->
        <rect x="0" y="0" width="200" height="200" fill="white" />
        <!-- Cut out the shapes that make up the logo from the mask -->
        <use href="#body" stroke="black" />
        <use href="#right-wing-inner" class="wing-inner" stroke="black" />
        <use href="#right-wing-middle" class="wing-middle" stroke="black" />
        <use href="#right-wing-outer" class="wing-outer" stroke="black" />
        <use href="#left-wing-inner" class="wing-inner" stroke="black" />
        <use href="#left-wing-middle" class="wing-middle" stroke="black" />
        <use href="#left-wing-outer" class="wing-outer" stroke="black" />
      </mask>
    </defs>
  </svg>

</template>


<script>

  // We do not retheme the Kolibri logo, so we always reference default colors here
  // rather than using the dynamic branding or themeing.
  import { defaultBrandColors } from '../styles/colorsDefault';
  import materialColors from '../styles/colorsMaterial';
  import { validateAndFormatUnits } from './utils';

  const colorScheme = {
    default: {
      blobColor: defaultBrandColors.secondary.v_500,
      strokeColor: defaultBrandColors.primary.v_500,
    },
    monoBlack: {
      blobColor: materialColors.black,
    },
    monoWhite: {
      blobColor: materialColors.white,
    },
    monoPrimary: {
      blobColor: defaultBrandColors.primary.v_500,
    },
    monoSecondary: {
      blobColor: defaultBrandColors.secondary.v_500,
    },
    whiteGrey: {
      blobColor: materialColors.grey.v_300,
      strokeColor: materialColors.white,
    },
    blackGrey: {
      blobColor: materialColors.grey.v_300,
      strokeColor: materialColors.black,
    },
  };

  const backgroundStyles = ['blob', 'rect'];

  export default {
    name: 'KLogo',
    props: {
      /**
       * Alternative text for the logo
       */
      altText: {
        type: String,
        required: true,
        default: '',
      },
      /**
       * Sets the size for the logo
       */
      size: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the maximum size for the logo
       */
      maxSize: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the minimum size for the logo
       */
      minSize: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Whether to show the blob background for the logo
       */
      showBackground: {
        type: Boolean,
        default: false,
      },
      /**
       * The background style for the logo: blob, rect
       */
      backgroundStyle: {
        type: String,
        default: 'blob',
        validator: value => backgroundStyles.includes(value),
      },
      /**
       * The color scheme for the logo: default, monoBlack, monoWhite, monoPrimary, monoSecondary, whiteGrey, blackGrey
       */
      colorScheme: {
        type: String,
        default: 'default',
        validator: value => colorScheme[value] !== undefined,
      },
      /**
       * Whether to show the loading animation for the logo - only works for non-mono colorSchemes
       */
      animate: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      scheme() {
        if (!this.showBackground) {
          return colorScheme.default;
        }
        return colorScheme[this.colorScheme] || colorScheme.default;
      },
      applyMask() {
        return this.colorScheme.startsWith('mono');
      },
      blobColor() {
        return this.scheme.blobColor;
      },
      strokeColor() {
        return this.scheme.strokeColor;
      },
      backgroundHref() {
        return `#${this.backgroundStyle || 'blob'}-background`;
      },
    },
    methods: {
      validateAndFormatUnits,
    },
  };

</script>


<style>

  .animate .wing-inner {
    animation: flapInner 2s 1.2s both infinite;
  }

  .animate .wing-middle {
    animation: flapMiddle 2s 1.2s both infinite;
  }

  .animate .wing-outer {
    animation: flapOuter 2s 1.2s both infinite;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes flapInner {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    30% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes flapMiddle {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes flapOuter {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

</style>