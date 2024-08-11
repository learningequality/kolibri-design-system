<template>

  <Teleport :to="teleportRootElSelector">
    <!-- @slot Content to be teleported -->
    <slot></slot>
  </Teleport>

</template>


<script>

  import Teleport from 'vue2-teleport';
  import _useTeleportRootEl from '../composables/_useTeleportRootEl';

  /**
   * Wrapping a component in KTeleport will teleport it to
   * the teleport root element #k-teleport that is inserted
   * to an application's document body automatically during
   * the KDS installation process (see KThemePlugin.js).
   */
  export default {
    name: 'KTeleport',
    components: {
      Teleport,
    },
    setup() {
      const { teleportRootElSelector } = _useTeleportRootEl();
      return { teleportRootElSelector };
    },
  };

</script>

