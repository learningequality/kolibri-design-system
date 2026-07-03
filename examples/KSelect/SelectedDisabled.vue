<template>

  <KSelect
    label="Select an option"
    :options="options"
    :value="options[0]"
    :disabled="true"
  />

</template>


<script>

  export default {
    data() {
      return {
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ],
      };
    },
  };

</script>
