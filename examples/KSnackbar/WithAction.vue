<template>

  <div>
    <KButton
      text="Show snackbar with action"
      @click="showWithAction"
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

      const showWithAction = () => {
        createSnackbar({
          text: 'Item deleted',
          actionText: 'Undo',
          actionCallback: () => {},
        });
      };

      return {
        snackbarState,
        hideSnackbar,
        showWithAction,
      };
    },
  };

</script>
