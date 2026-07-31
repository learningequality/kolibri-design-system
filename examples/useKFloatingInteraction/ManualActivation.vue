<template>

  <div class="buttons">
    <KButton :data-floating-id="FLOATING_ID">The popup is positioned against me</KButton>

    <KButton
      primary
      :text="isActive ? 'set Active (false)' : 'set Active (true)'"
      @click="setActive(!isActive)"
    />

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
      <p>
        Only the button on the right activates and deactivates this popup. Escape still deactivates
        too.
      </p>
    </div>
  </div>

</template>


<script>

  import { ref, watch, onBeforeUnmount, nextTick } from 'vue';
  import useKFloatingInteraction from '../../lib/composables/useKFloatingInteraction';
  import useKFloatingPosition from '../../lib/composables/useKFloatingPosition';

  export default {
    setup() {
      const FLOATING_ID = 'manual-activation-popup';

      const popupRef = ref(null);

      // No interactions configured, so nothing a user does to the
      // activator element opens this popup - 'setActive' is the only way
      const { isActive, activatorEl, setActive } = useKFloatingInteraction(FLOATING_ID, popupRef);

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
        setActive,
      };
    },
  };

</script>


<style lang="scss" scoped>

  @import '../../lib/styles/definitions';

  .buttons {
    display: flex;
    gap: 48px;
    align-items: center;
  }

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
