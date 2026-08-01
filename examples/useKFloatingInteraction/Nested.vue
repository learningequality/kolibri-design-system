<template>

  <div>
    <KButton :data-floating-id="POPUP_FLOATING_ID">Click me</KButton>

    <div
      v-show="isPopupActive"
      :id="POPUP_FLOATING_ID"
      ref="popupRef"
      class="popup"
      :style="{
        color: $themeTokens.text,
        background: $themeTokens.surface,
        border: `1px solid ${$themeTokens.fineLine}`,
      }"
    >
      <span>Hover or focus the icon</span>
      <KIconButton
        icon="infoOutline"
        :data-floating-id="TOOLTIP_FLOATING_ID"
        :aria-labelledby="TOOLTIP_FLOATING_ID"
      />
    </div>

    <div
      :id="TOOLTIP_FLOATING_ID"
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
      const POPUP_FLOATING_ID = 'nested-popup';
      const TOOLTIP_FLOATING_ID = 'nested-tooltip';

      const popupRef = ref(null);
      const tooltipRef = ref(null);
      const tooltipLabel = 'Kolibri Fly!';

      const { isActive: isPopupActive, activatorEl: popupActivatorEl } = useKFloatingInteraction(
        POPUP_FLOATING_ID,
        popupRef,
        { interactions: ['click'] },
      );
      const { isActive: isTooltipActive, activatorEl: tooltipActivatorEl } =
        useKFloatingInteraction(TOOLTIP_FLOATING_ID, tooltipRef, {
          interactions: { hover: true, touch: true, focus: { keyboardOnly: true } },
        });

      const { initPosition, destroyPosition, offset, flip, shift } = useKFloatingPosition();

      watch(isPopupActive, active => {
        if (active) {
          // Performance: Position needs to be initialized
          // only when the popup becomes active (= visible),
          // not when it's mounted
          nextTick(() => {
            initPosition(POPUP_FLOATING_ID, popupRef.value, popupActivatorEl.value, {
              placement: 'bottom-start',
              middleware: [offset(4), flip(), shift({ padding: 8 })],
            });
          });
        } else {
          // Performance: Always destroy position when
          // the popup becomes inactive
          destroyPosition(POPUP_FLOATING_ID);
        }
      });

      watch(isTooltipActive, active => {
        if (active) {
          // Performance: Position needs to be initialized
          // only when the tooltip becomes active (= visible),
          // not when it's mounted
          nextTick(() => {
            initPosition(TOOLTIP_FLOATING_ID, tooltipRef.value, tooltipActivatorEl.value, {
              placement: 'bottom',
              middleware: [offset(8), flip()],
            });
            Object.assign(tooltipRef.value.style, { opacity: '1', pointerEvents: 'auto' });
          });
        } else {
          Object.assign(tooltipRef.value.style, { opacity: '0', pointerEvents: 'none' });
          // Performance: Always destroy position when
          // the tooltip becomes inactive
          destroyPosition(TOOLTIP_FLOATING_ID);
        }
      });

      onBeforeUnmount(() => {
        // Performance: Always destroy position when
        // the floating elements are being unmounted
        destroyPosition(POPUP_FLOATING_ID);
        destroyPosition(TOOLTIP_FLOATING_ID);
      });

      return {
        POPUP_FLOATING_ID,
        TOOLTIP_FLOATING_ID,
        popupRef,
        tooltipRef,
        isPopupActive,
        tooltipLabel,
      };
    },
  };

</script>


<style lang="scss" scoped>

  @import '../../lib/styles/definitions';

  .popup {
    @extend %dropshadow-2dp;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
    display: flex;
    gap: 8px;
    align-items: center;
    min-width: 260px;
    max-width: 320px;
    min-height: 80px;
    padding: 16px;
    border-radius: 4px;
  }

  .tooltip {
    @extend %dropshadow-2dp;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 24;
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
