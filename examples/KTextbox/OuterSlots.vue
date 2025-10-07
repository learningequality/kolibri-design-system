<template>

  <KTextbox
    v-model="value"
    label="Outer Slots Example"
    style="margin-bottom: 32px"
  >
    <template #outerBefore>
      <button
        style="
  padding: 4px 8px;
  margin-right: 8px;
  cursor: pointer;
  background: #e3f2fd;
  border-radius: 4px;
        "
      >
        Before
      </button>
    </template>
    <template #outerAfter>
      <button
        style="
  padding: 4px 8px;
  margin-left: 8px;
  cursor: pointer;
  background: #e8f5e9;
  border-radius: 4px;
        "
      >
        After
      </button>
    </template>
  </KTextbox>

</template>


<script>

  export default {
    data() {
      return {
        value: '',
      };
    },
  };

</script>
