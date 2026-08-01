<template>

  <div>
    <KButton
      :data-floating-id="FLOATING_ID"
      :aria-describedby="FLOATING_ID"
    >
      Hover or focus me
    </KButton>

    <div
      :id="FLOATING_ID"
      ref="tooltipRef"
      role="tooltip"
      class="tooltip"
      :style="{ color: $themeTokens.textInverted, background: $themeTokens.text }"
    >
      {{ tooltipLabel }}
    </div>
  </div>

</template>


<script>

  import { ref, watch, onBeforeUnmount, nextTick } from 'vue';
  import useKFloatingInteraction from '../../lib/composables/useKFloatingInteraction';
  import useKFloatingPosition from '../../lib/composables/useKFloatingPosition';

  export default {
    setup() {
      const FLOATING_ID = 'basic-tooltip';

      const tooltipRef = ref(null);
      const tooltipLabel = 'Kolibri Fly!';

      const { isActive, activatorEl } = useKFloatingInteraction(FLOATING_ID, tooltipRef, {
        interactions: { hover: true, touch: true, focus: { keyboardOnly: true } },
      });

      const { initPosition, destroyPosition, offset, flip } = useKFloatingPosition();

      watch(isActive, active => {
        if (active) {
          // Performance: Position needs to be initialized
          // only when the tooltip becomes active (= visible),
          // not when it's mounted
          nextTick(() => {
            initPosition(FLOATING_ID, tooltipRef.value, activatorEl.value, {
              placement: 'bottom',
              middleware: [offset(8), flip()],
            });
            Object.assign(tooltipRef.value.style, { opacity: '1', pointerEvents: 'auto' });
          });
        } else {
          Object.assign(tooltipRef.value.style, { opacity: '0', pointerEvents: 'none' });
          // Performance: Always destroy position when
          // the tooltip becomes inactive
          destroyPosition(FLOATING_ID);
        }
      });

      onBeforeUnmount(() => {
        // Performance: Always destroy position when
        // the tooltip is being unmounted
        destroyPosition(FLOATING_ID);
      });

      return {
        FLOATING_ID,
        tooltipRef,
        tooltipLabel,
      };
    },
  };

</script>


<style lang="scss" scoped>

  @import '../../lib/styles/definitions';

  .tooltip {
    @extend %dropshadow-2dp;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 24;
    width: max-content;
    min-width: 75px;
    max-width: 240px;
    padding: 8px;
    font-size: 12px;
    font-weight: normal;
    line-height: 1.4;
    text-align: center;
    pointer-events: none;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

</style>
