<template>

  <div>
    <KButton
      text="Show basic snackbar"
      @click="showBasic"
    />
  </div>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    setup() {
      const { createSnackbar } = useKSnackbar();

      const showBasic = () => {
        createSnackbar({ text: 'Changes saved' });
      };

      return {
        showBasic,
      };
    },
  };

</script>
