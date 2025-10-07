<template>

  <KTextbox
    v-model="value"
    label="All Slots Example"
    icon="search"
    style="margin-bottom: 32px"
    :appearanceOverrides="{ maxWidth: 'none !important', width: 'auto !important' }"
  >
    <!-- Outer slots -->
    <template #outerBefore>
      <span style="padding: 4px 8px; margin-right: 8px; background: #e3f2fd; border-radius: 4px">
        Outer Before
      </span>
    </template>
    <template #outerAfter>
      <span style="padding: 4px 8px; margin-left: 8px; background: #e8f5e9; border-radius: 4px">
        Outer After
      </span>
    </template>

    <!-- Icon slot (overrides icon prop) -->
    <template #icon>
      <span style="margin-right: 4px; font-weight: bold; color: #1976d2">🔍</span>
    </template>

    <!-- Inner slots -->
    <template #innerBefore>
      <span style="padding-left: 1rem; font-weight: bold; color: #388e3c">$</span>
    </template>
    <template #innerAfter>
      <span style="padding-right: 1rem; font-weight: bold; color: #d32f2f">.00</span>
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
