<template>

  <div class="kdropdown-test-container">
    <!-- KDropdownMenu with header slot -->
    <div class="test-case">
      <KButton text="Dropdown with Header">
        <template #menu>
          <KDropdownMenu :options="['Option 1', 'Option 2']">
            <template #header>
              <h3 style="padding: 8px 16px; margin: 0">Menu Header</h3>
            </template>
          </KDropdownMenu>
        </template>
      </KButton>
    </div>
  </div>

</template>


<script>

  export default {
    name: 'KDropdownMenuTest',
  };

</script>


<style scoped>

  .kdropdown-test-container {
    padding: 20px;
  }

</style>
