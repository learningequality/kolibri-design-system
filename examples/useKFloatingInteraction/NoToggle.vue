<template>

  <div>
    <KButton :data-floating-id="FLOATING_ID">Click or focus me</KButton>

    <div
      v-show="isActive"
      :id="FLOATING_ID"
      ref="popupRef"
      class="popup"
      :style="{
        color: $themeTokens.text,
        background: $themeTokens.surface,
        border: `1px solid ${$themeTokens.fineLine}`,
      }"
    >
      <p>Clicking the button again won't close this popup.</p>
    </div>
  </div>

</template>


<script>

  import { ref, watch, onBeforeUnmount, nextTick } from 'vue';
  import useKFloatingInteraction from '../../lib/composables/useKFloatingInteraction';
  import useKFloatingPosition from '../../lib/composables/useKFloatingPosition';

  export default {
    setup() {
      const FLOATING_ID = 'no-toggle-popup';

      const popupRef = ref(null);

      const { isActive, activatorEl } = useKFloatingInteraction(FLOATING_ID, popupRef, {
        interactions: { click: { toggle: false } },
      });

      const { initPosition, destroyPosition, offset, flip, shift } = useKFloatingPosition();

      watch(isActive, active => {
        if (active) {
          // Performance: Position needs to be initialized
          // only when the popup becomes active (= visible),
          // not when it's mounted
          nextTick(() => {
            initPosition(FLOATING_ID, popupRef.value, activatorEl.value, {
              placement: 'bottom-start',
              middleware: [offset(4), flip(), shift({ padding: 8 })],
            });
          });
        } else {
          // Performance: Always destroy position when
          // the popup becomes inactive
          destroyPosition(FLOATING_ID);
        }
      });

      onBeforeUnmount(() => {
        // Performance: Always destroy position when
        // the popup is being unmounted
        destroyPosition(FLOATING_ID);
      });

      return {
        FLOATING_ID,
        popupRef,
        isActive,
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
    min-width: 260px;
    max-width: 320px;
    min-height: 80px;
    padding: 16px;
    border-radius: 4px;
  }

</style>
