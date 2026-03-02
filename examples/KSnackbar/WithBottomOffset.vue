<template>

  <div>
    <KButton
      text="Show snackbar with bottom offset"
      @click="showWithOffset"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar, clearSnackbar, snackbarIsVisible, snackbarOptions } = useKSnackbar();

      const showWithOffset = () => {
        createSnackbar({
          text: 'This snackbar has bottom offset',
          bottomOffset: 72,
        });
      };

      return {
        snackbarIsVisible,
        snackbarOptions,
        clearSnackbar,
        showWithOffset,
      };
    },
  };

</script>
