<template>

  <div>
    <KButton
      text="Show snackbar with autofocus"
      @click="showWithAutofocus"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar, clearSnackbar, snackbarIsVisible, snackbarOptions } = useKSnackbar();

      const showWithAutofocus = () => {
        createSnackbar({
          text: 'Critical action required',
          actionText: 'Dismiss',
          autofocus: true,
          actionCallback: () => {
            clearSnackbar();
          },
        });
      };

      return {
        snackbarIsVisible,
        snackbarOptions,
        clearSnackbar,
        showWithAutofocus,
      };
    },
  };

</script>
