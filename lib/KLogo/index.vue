<template>

  <svg
    :class="{ 'no-background': !showBackground }"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :width="validateAndFormatUnits(width)"
    :height="validateAndFormatUnits(height)"
    :max-width="validateAndFormatUnits(maxWidth)"
    :min-width="validateAndFormatUnits(minWidth)"
    :max-height="validateAndFormatUnits(maxHeight)"
    :min-height="validateAndFormatUnits(minHeight)"
    viewBox="0 0 402 382"
    fill="none"
    :aria-label="altText"
  >
    <title>{{ altText }}</title>
    <use href="#background" class="background" />
    <use href="#body" />
    <use href="#right-wing-inner" class="wing-inner" />
    <use href="#right-wing-middle" class="wing-middle" />
    <use href="#right-wing-outer" class="wing-outer" />
    <use href="#left-wing-inner" class="wing-inner" />
    <use href="#left-wing-middle" class="wing-middle" />
    <use href="#left-wing-outer" class="wing-outer" />
    <defs>
      <g id="background">
        <path
          d="M0.648134 212.595C-2.51313 252.336 5.47948 295.575 33.7122 323.871C45.9596 336.111
          61.2887 344.835 76.9956 352.107C174.856 397.333 309.975 398.108 379.205 306.206C417.597
          255.297 401.353 177.046 375.427 122.68C353.079 75.8048 314.429 36.3018 266.731 15.676C200.424
          -13.077 139.704 -1.47245 87.056 43.8924C38.0266 86.1774 5.77773 147.936 0.648134 212.595Z"
          fill="#FFCB00"
        />
      </g>
      <g id="body">
        <path
          d="M261.5 61.5L218 105.5M218 105.5C211.5 101 197.6 98.9 190 106.5C185.206 111.294
          184.181 120.692 184.5 127C184.856 134.046 184.797 140.116 181.5 146.5C165.746 177
          156 207 200.566 254.5C203.473 257.325 206.613 260.16 210 263M218 105.5C221.5 116
          218.711 134.8 222.5 143C233.5 169.5 250 196.67 216 251C214.022 254.16 212.36 259.788
          210 263M210 263C199.5 291.5 203.222 309.173 211.5 316C220.505 323.427 229 315 231
          306.5C233 298 225.5 280.5 210 263Z"
          stroke="#4368F5"
          stroke-width="13"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <g id="right-wing-inner">
        <path
          d="M261 158C271.333 168.667 285.8 196.4 261 222"
          stroke="#4368F5"
          stroke-width="13"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <g id="right-wing-middle">
        <path
          d="M282.5 138C299.102 155.333 322.344 200.4 282.5 242"
          stroke="#4368F5"
          stroke-width="13"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <g id="right-wing-outer">
        <path
          d="M303.5 116C326.893 140.667 359.644 204.8 303.5 264"
          stroke="#4368F5"
          stroke-width="13"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <g id="left-wing-inner">
        <path
          d="M141.5 158C131.167 168.667 116.7 196.4 141.5 222"
          stroke="#4368F5"
          stroke-width="13"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <g id="left-wing-middle">
        <path
          d="M120 138C103.398 155.333 80.1559 200.4 120 242"
          stroke="#4368F5"
          stroke-width="13"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <g id="left-wing-outer">
        <path
          d="M99 116C75.6067 140.667 42.856 204.8 99 264"
          stroke="#4368F5"
          stroke-width="13"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </defs>
  </svg>

</template>


<script>

  import { validateAndFormatUnits } from '../KImg/utils';

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
       * Sets the height for the logo
       */
      height: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the width for the logo
       */
      width: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the maximum height for the logo
       */
      maxHeight: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the minimum height for the logo
       */
      minHeight: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * Sets the maximum width for the logo
       */
      maxWidth: {
        type: [Number, String],
        default: undefined,
      },
      /**
       * 	Sets the minimum width for the logo
       */
      minWidth: {
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
    },
    methods: {
      validateAndFormatUnits,
    },
  };

</script>

<style>

  .no-background .background {
    display: none;
  }

</style>