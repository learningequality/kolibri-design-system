<template>

  <div>
    <KButton
      text="Show snackbar with long text"
      @click="showWithLongText"
    />

    <KSnackbar
      :isOpen="snackbarState.isOpen"
      :text="snackbarState.text"
      :actionText="snackbarState.actionText"
      :actionCallback="snackbarState.actionCallback"
      @close="hideSnackbar"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar, hideSnackbar, snackbarState } = useKSnackbar();

      const showWithLongText = () => {
        createSnackbar({
          text: 'This is a longer message demonstrating how the snackbar handles extended text',
          actionText: 'Got it',
          actionCallback: () => {},
        });
      };

      return {
        snackbarState,
        hideSnackbar,
        showWithLongText,
      };
    },
    mounted() {
      // Auto-trigger for visual tests
      this.$nextTick(() => {
        this.showWithLongText();
      });
    },
  };

</script>
