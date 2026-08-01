<template>

  <div>
    <div class="row">
      <KIconButton
        icon="infoOutline"
        ariaLabel="About learners"
        :data-floating-id="FIRST_FLOATING_ID"
      />

      <KIconButton
        icon="infoOutline"
        ariaLabel="About quizzes"
        :data-floating-id="SECOND_FLOATING_ID"
      />

      <KButton
        primary
        class="tour-button"
        text="Begin the tour"
        @click="beginTour"
      />
    </div>

    <p>Begin the tour. After finishing it, click icons directly to access help.</p>

    <div
      v-show="isFirstActive"
      :id="FIRST_FLOATING_ID"
      ref="firstRef"
      class="popup"
      :style="{
        color: $themeTokens.text,
        background: $themeTokens.surface,
        border: `1px solid ${$themeTokens.fineLine}`,
      }"
    >
      <p>Learners are the people taking part in your class.</p>

      <KButton
        v-if="tourStep === 1"
        primary
        text="Continue"
        @click="continueTour"
      />
    </div>

    <div
      v-show="isSecondActive"
      :id="SECOND_FLOATING_ID"
      ref="secondRef"
      class="popup"
      :style="{
        color: $themeTokens.text,
        background: $themeTokens.surface,
        border: `1px solid ${$themeTokens.fineLine}`,
      }"
    >
      <p>Quizzes are how you check what your learners have understood.</p>

      <KButton
        v-if="tourStep === 2"
        primary
        text="End the tour"
        @click="endTour"
      />
    </div>
  </div>

</template>


<script>

  import { ref, watch, onBeforeUnmount, nextTick } from 'vue';
  import useKFloatingInteraction from '../../lib/composables/useKFloatingInteraction';
  import useKFloatingPosition from '../../lib/composables/useKFloatingPosition';

  export default {
    setup() {
      const FIRST_FLOATING_ID = 'tour-first-popup';
      const SECOND_FLOATING_ID = 'tour-second-popup';

      const firstRef = ref(null);
      const secondRef = ref(null);
      const tourStep = ref(0);

      const {
        isActive: isFirstActive,
        activatorEl: firstActivatorEl,
        setActive: setFirstActive,
      } = useKFloatingInteraction(FIRST_FLOATING_ID, firstRef, { interactions: ['click'] });

      const {
        isActive: isSecondActive,
        activatorEl: secondActivatorEl,
        setActive: setSecondActive,
      } = useKFloatingInteraction(SECOND_FLOATING_ID, secondRef, { interactions: ['click'] });

      const { initPosition, destroyPosition, offset, flip, shift } = useKFloatingPosition();

      function beginTour() {
        tourStep.value = 1;
        setFirstActive(true);
      }

      function continueTour() {
        tourStep.value = 2;
        setFirstActive(false);
        setSecondActive(true);
      }

      function endTour() {
        tourStep.value = 0;
        setSecondActive(false);
      }

      function positionOn(active, floatingId, floatingRef, activatorEl) {
        if (active) {
          // Performance: Position needs to be initialized
          // only when the popup becomes active (= visible),
          // not when it's mounted
          nextTick(() => {
            initPosition(floatingId, floatingRef.value, activatorEl.value, {
              placement: 'bottom-start',
              middleware: [offset(4), flip(), shift({ padding: 8 })],
            });
          });
        } else {
          // Performance: Always destroy position when
          // the popup becomes inactive
          destroyPosition(floatingId);
        }
      }

      watch(isFirstActive, active =>
        positionOn(active, FIRST_FLOATING_ID, firstRef, firstActivatorEl),
      );
      watch(isSecondActive, active =>
        positionOn(active, SECOND_FLOATING_ID, secondRef, secondActivatorEl),
      );

      onBeforeUnmount(() => {
        // Performance: Always destroy position when
        // the popups are being unmounted
        destroyPosition(FIRST_FLOATING_ID);
        destroyPosition(SECOND_FLOATING_ID);
      });

      return {
        FIRST_FLOATING_ID,
        SECOND_FLOATING_ID,
        firstRef,
        secondRef,
        isFirstActive,
        isSecondActive,
        tourStep,
        beginTour,
        continueTour,
        endTour,
      };
    },
  };

</script>


<style lang="scss" scoped>

  @import '../../lib/styles/definitions';

  .row {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .tour-button {
    margin-left: 32px;
  }

  .popup {
    @extend %dropshadow-2dp;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
    width: max-content;
    min-width: 260px;
    max-width: 320px;
    min-height: 80px;
    padding: 16px;
    border-radius: 4px;
  }

</style>
