<template>

  <Teleport :to="overlayElSelector">
    <!-- @slot Content to be moved to the overlay container element #k-overlay -->
    <slot></slot>
  </Teleport>

</template>


<script>

  import Teleport from 'vue2-teleport';
  import _useOverlay from '../composables/_useOverlay';

  /**
   * Moves an element from its original place in the DOM
   * to the overlay container element #k-overlay that is inserted
   * to an application's document body automatically during
   * the KDS installation process (see KThemePlugin.js).
   * This is often useful for modals, tooltips, dropdowns, or other
   * elements that should appear on top of other content.
   */
  export default {
    name: 'KOverlay',
    components: {
      Teleport,
    },
    setup() {
      const { overlayElSelector } = _useOverlay();
      return { overlayElSelector };
    },
  };

</script>

