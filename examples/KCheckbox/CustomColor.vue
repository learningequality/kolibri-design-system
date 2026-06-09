<template>

  <div>
    <KCheckbox
      v-model="inputValue"
      label="Selected with custom color"
      color="#4caf50"
    />
    <KCheckbox
      v-model="indeterminate"
      label="Indeterminate with custom color"
      :indeterminate="true"
      color="#4caf50"
    />
  </div>

</template>


<script>

  export default {
    data() {
      return {
        inputValue: true,
        indeterminate: false,
      };
    },
  };

</script>
