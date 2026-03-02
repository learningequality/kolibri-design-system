<template>

  <div>
    <KButton
      text="Show and replace snackbar"
      @click="showForceReuse"
    />

    <KSnackbar
      :isOpen="snackbarState.isOpen"
      :text="snackbarState.text"
      @close="hideSnackbar"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar, hideSnackbar, snackbarState } = useKSnackbar();

      const showForceReuse = () => {
        createSnackbar({
          text: 'Original snackbar',
          duration: 4000,
        });

        setTimeout(() => {
          createSnackbar({
            text: 'Replaced immediately using forceReuse',
            forceReuse: true,
          });
        }, 800);
      };

      return {
        snackbarState,
        hideSnackbar,
        showForceReuse,
      };
    },
  };

</script>
