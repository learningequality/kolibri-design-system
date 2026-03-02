<template>

  <div>
    <KButton
      text="Show snackbar with backdrop"
      @click="showWithBackdrop"
    />

    <KSnackbar
      :isOpen="snackbarState.isOpen"
      :text="snackbarState.text"
      :actionText="snackbarState.actionText"
      :actionCallback="snackbarState.actionCallback"
      :backdrop="snackbarState.backdrop"
      @close="hideSnackbar"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar, hideSnackbar, snackbarState } = useKSnackbar();

      const showWithBackdrop = () => {
        createSnackbar({
          text: 'Critical message with backdrop',
          actionText: 'Dismiss',
          backdrop: true,
          duration: 0,
          actionCallback: () => {},
        });
      };

      return {
        snackbarState,
        hideSnackbar,
        showWithBackdrop,
      };
    },
    mounted() {
      // Auto-trigger for visual tests
      this.$nextTick(() => {
        this.showWithBackdrop();
      });
    },
  };

</script>
