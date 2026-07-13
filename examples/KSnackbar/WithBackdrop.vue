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
      const { createSnackbar } = useKSnackbar();

      const showWithBackdrop = () => {
        createSnackbar({
          text: 'Higher-priority message requiring attention',
          announce: true,
          backdrop: true,
          actionText: 'Acknowledge',
          actionCallback: () => {},
        });
      };

      return {
        showWithBackdrop,
      };
    },
  };

</script>
