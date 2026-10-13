<template>

  <KSelect
    label="Select an option"
    :options="longOptions"
    :value="longOptions[0]"
  />

</template>


<script>

  export default {
    data() {
      return {
        longOptions: [
          { value: 'option1', label: 'This is a very long option label that should be truncated' },
          { value: 'option2', label: 'Another long option label that needs to be tested' },
        ],
      };
    },
  };

</script>
