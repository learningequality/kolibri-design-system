<template>

  <div>
    <!-- Triggering a snackbar (anywhere in your app) -->
    <KButton
      text="Show Snackbar"
      @click="show"
    />

    <!-- In your root App.vue -->
    <KSnackbar
      :isOpen="snackbarIsVisible"
      :text="snackbarOptions.text"
      :actionText="snackbarOptions.actionText"
      :bottomOffset="snackbarOptions.bottomOffset"
      :backdrop="snackbarOptions.backdrop"
      :announce="snackbarOptions.announce"
      :assertive="snackbarOptions.assertive"
      :autofocus="snackbarOptions.autofocus"
      :autoDismiss="snackbarOptions.autoDismiss"
      :duration="snackbarOptions.duration"
      @actionClick="snackbarOptions.actionCallback"
      @blur="snackbarOptions.onBlur"
      @close="clearSnackbar"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { snackbarIsVisible, snackbarOptions, clearSnackbar, createSnackbar } = useKSnackbar();

      const show = () => {
        createSnackbar({ text: 'This is the global snackbar', announce: true });
      };

      return {
        snackbarIsVisible,
        snackbarOptions,
        clearSnackbar,
        show,
      };
    },
  };

</script>
