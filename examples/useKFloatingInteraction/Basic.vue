<template>

  <div>
    <KButton :data-floating-id="TOOLTIP_ID"> Hover me </KButton>

    <div
      v-if="isActive"
      :id="TOOLTIP_ID"
      ref="floatingRef"
      class="tooltip"
      :style="{ color: $themeTokens.textInverted, background: $themeTokens.text }"
    >
      Kolibri Fly!
    </div>
  </div>

</template>


<script>

  import { ref, watch, onBeforeUnmount, nextTick } from 'vue';
  import useKFloatingInteraction from '../../lib/composables/useKFloatingInteraction';
  import useKFloatingPosition from '../../lib/composables/useKFloatingPosition';

  export default {
    setup() {
      const TOOLTIP_ID = 'tooltip-basic';
      const floatingRef = ref(null);

      const { isActive, activatorEl } = useKFloatingInteraction(TOOLTIP_ID);
      const { initPosition, destroyPosition, offset, flip } = useKFloatingPosition();

      watch(isActive, active => {
        if (active) {
          nextTick(() => {
            initPosition(TOOLTIP_ID, floatingRef.value, activatorEl.value, {
              placement: 'bottom',
              middleware: [offset(8), flip()],
            });
          });
        } else {
          destroyPosition(TOOLTIP_ID);
        }
      });

      onBeforeUnmount(() => {
        destroyPosition(TOOLTIP_ID);
      });

      return { TOOLTIP_ID, isActive, floatingRef };
    },
  };

</script>


<style lang="scss" scoped>

  @import '../../lib/styles/definitions';

  .tooltip {
    @extend %dropshadow-1dp;

    position: absolute;
    top: 0;
    left: 0;
    width: max-content;
    min-width: 75px;
    padding: 8px;
    font-size: 12px;
    font-weight: normal;
    line-height: 1.4;
    text-align: center;
    pointer-events: none;
    border-radius: 8px;
  }

</style>
