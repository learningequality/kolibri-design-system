<template>

  <div>
    <KButton
      text="Show snackbar with bottom offset"
      @click="showWithBottomOffset"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar, hideSnackbar, snackbarState } = useKSnackbar();

      const showWithBottomOffset = () => {
        createSnackbar({
          text: 'Snackbar shown above bottom navigation.',
          bottomOffset: 64,
        });
      };

      return {
        snackbarState,
        hideSnackbar,
        showWithBottomOffset,
      };
    },
  };

</script>
