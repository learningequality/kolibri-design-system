<template>

  <div>
    <KButton
      text="Show snackbar with onBlur auto-dismiss"
      @click="showWithOnBlur"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar, clearSnackbar, snackbarIsVisible, snackbarOptions } = useKSnackbar();

      const showWithOnBlur = () => {
        createSnackbar({
          text: 'Message with blur handling',
          actionText: 'Confirm',
          autofocus: true, 
          autoDismiss: false, 
          onBlur: () => {
            clearSnackbar();
          },
          actionCallback: () => {
            alert('Confirmed!');
          },
        });
      };

      return {
        snackbarIsVisible,
        snackbarOptions,
        clearSnackbar,
        showWithOnBlur,
      };
    },
  };

</script>