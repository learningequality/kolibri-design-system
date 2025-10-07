<template>

  <KTextbox
    v-model="value"
    label="Inner Slots Example"
    style="margin-bottom: 32px"
  >
    <template #innerBefore>
      <select
        v-model="currency"
        style="padding: 2px 6px; margin-right: 4px; border-radius: 4px"
      >
        <option value="$">$</option>
        <option value="€">€</option>
        <option value="₹">₹</option>
      </select>
    </template>
    <template #innerAfter>
      <button
        style="
  padding: 2px 8px;
  margin-left: 4px;
  cursor: pointer;
  background: #fce4ec;
  border-radius: 4px;
        "
      >
        Max
      </button>
    </template>
  </KTextbox>

</template>


<script>

  export default {
    data() {
      return {
        value: '',
        currency: '$',
      };
    },
  };

</script>
