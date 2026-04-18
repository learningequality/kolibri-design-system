<template>

  <div>
    <KButton
      text="Show snackbar with backdrop"
      @click="showWithBackdrop"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar, clearSnackbar } = useKSnackbar();

      const showWithBackdrop = () => {
        createSnackbar({
          text: 'Higher-priority message requiring attention',
          announce: true,
          backdrop: true,
          actionText: 'Acknowledge',
          actionCallback: () => {
            clearSnackbar();
          },
        });
      };

      return {
        showWithBackdrop,
      };
    },
  };

</script>
