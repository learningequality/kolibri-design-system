<template>

  <div>
    <KButton
      text="Show snackbar with bottom offset"
      @click="showWithBottomOffset"
    />

    <KSnackbar
      :isOpen="snackbarState.isOpen"
      :text="snackbarState.text"
      :actionText="snackbarState.actionText"
      :actionCallback="snackbarState.actionCallback"
      :backdrop="snackbarState.backdrop"
      :duration="snackbarState.duration"
      :bottomOffset="snackbarState.bottomOffset"
      @close="hideSnackbar"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar, hideSnackbar, snackbarState } = useKSnackbar();

      const showWithBottomOffset = () => {
        createSnackbar({
          text: 'Snackbar shown above bottom navigation.',
          bottomOffset: 64,
        });
      };

      return {
        snackbarState,
        hideSnackbar,
        showWithBottomOffset,
      };
    },
  };

</script>
