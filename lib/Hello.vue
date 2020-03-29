<template>

  <div>
    <p>Hello world.</p>
    <ul>
      <li>
        number: {{ number }}
      </li>
    </ul>
  </div>

</template>


<script>

  /**
   * What do we have here...
   */
  export default {
    name: 'Hello',
    props: {
      /**
       * The color for the button.
       */
      number: {
        type: Number,
        required: true,
      },
    },
  };

</script>


<style lang="scss" scoped></style>
