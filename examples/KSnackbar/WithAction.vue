<template>

  <div>
    <KButton
      text="Show snackbar with action"
      @click="showWithAction"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar, hideSnackbar, snackbarState } = useKSnackbar();

      const showWithAction = () => {
        createSnackbar({
          text: 'Item deleted',
          actionText: 'Undo',
          actionCallback: () => {},
        });
      };

      return {
        snackbarState,
        hideSnackbar,
        showWithAction,
      };
    },
  };

</script>
