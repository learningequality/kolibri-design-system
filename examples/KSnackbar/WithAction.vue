<template>

  <div>
    <KButton
      text="Show snackbar with action"
      @click="showWithAction"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar } = useKSnackbar();

      const showWithAction = () => {
        createSnackbar({
          text: 'Item deleted',
          announce: true,
          actionText: 'Undo',
          actionCallback: () => window.alert('Action undone!'),
        });
      };

      return {
        showWithAction,
      };
    },
  };

</script>
