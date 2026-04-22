<template>

  <div>
    <KButton
      ref="anchorRef"
      @click="toggle"
    >
      {{ isVisible ? 'Hide tooltip' : 'Show tooltip' }}
    </KButton>

    <div
      v-if="isVisible"
      ref="floatingRef"
      class="tooltip"
      :style="{ color: $themeTokens.textInverted, background: $themeTokens.text }"
    >
      Kolibri Fly!
    </div>
  </div>

</template>


<script>

  import { ref, onBeforeUnmount, nextTick } from 'vue';
  import useKFloatingPosition from '../../lib/composables/useKFloatingPosition';

  export default {
    setup() {
      const TOOLTIP_ID = 'tooltip-unique-id';

      const { initPosition, destroyPosition, offset, flip } = useKFloatingPosition();

      const isVisible = ref(false);
      const anchorRef = ref(null);
      const floatingRef = ref(null);

      function show() {
        isVisible.value = true;

        nextTick(() => {
          initPosition(TOOLTIP_ID, floatingRef.value, anchorRef.value.$el, {
            placement: 'bottom',
            middleware: [offset(8), flip()],
          });
        });
      }

      function hide() {
        isVisible.value = false;
        destroyPosition(TOOLTIP_ID);
      }

      function toggle() {
        isVisible.value ? hide() : show();
      }

      onBeforeUnmount(() => {
        destroyPosition(TOOLTIP_ID);
      });

      return { isVisible, anchorRef, floatingRef, toggle };
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
