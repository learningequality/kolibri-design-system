<template>

  <div>
    <KButton
      text="Show basic snackbar"
      @click="showBasic"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar, clearSnackbar, snackbarIsVisible, snackbarOptions } = useKSnackbar();

      const showBasic = () => {
        createSnackbar({ text: 'Changes saved' });
      };

      return {
        snackbarIsVisible,
        snackbarOptions,
        clearSnackbar,
        showBasic,
      };
    },
  };

</script>
