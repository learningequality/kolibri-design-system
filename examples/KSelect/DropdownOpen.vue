<template>

  <KSelect
    label="Select an option"
    :options="options"
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
    mounted() {
      this.$nextTick(() => {
        // A bubbling click would reach the document-level listener that
        // every open KSelect dropdown uses to detect outside clicks and
        // close itself, closing every other self-opened example on this
        // page in the process.
        this.$el
          .querySelector('.ui-select-label')
          .dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: true }));
      });
    },
  };

</script>
