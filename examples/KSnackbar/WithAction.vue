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
      const { createSnackbar, clearSnackbar, snackbarIsVisible, snackbarOptions } = useKSnackbar();

      const showWithAction = () => {
        createSnackbar({
          text: 'Item deleted',
          actionText: 'Undo',
          actionCallback: () => {},
        });
      };

      return {
        snackbarIsVisible,
        snackbarOptions,
        clearSnackbar,
        showWithAction,
      };
    },
  };

</script>
