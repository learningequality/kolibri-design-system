<template>

  <div>
    <KButton
      text="Show snackbar with autofocus"
      @click="showWithAutofocus"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar } = useKSnackbar();

      const showWithAutofocus = () => {
        createSnackbar({
          text: 'Critical action required',
          announce: true,
          actionText: 'Dismiss',
          autofocus: true,
          actionCallback: () => {},
        });
      };

      return {
        showWithAutofocus,
      };
    },
  };

</script>
