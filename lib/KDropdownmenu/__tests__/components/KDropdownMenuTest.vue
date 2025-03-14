<template>

  <div class="kdropdown-test-container">
    <!-- KDropdownMenu with a single item -->
    <div class="test-case">
      <h3>Single Item</h3>
      <KButton text="Single Item Dropdown">
        <template #menu>
          <KDropdownMenu :options="['Single Option']" />
        </template>
      </KButton>
    </div>

    <!-- KDropdownMenu with multiple items -->
    <div class="test-case">
      <h3>Multiple Items</h3>
      <KButton text="Multiple Items Dropdown">
        <template #menu>
          <KDropdownMenu :options="['Option 1', 'Option 2', 'Option 3']" />
        </template>
      </KButton>
    </div>

    <!-- KDropdownMenu with items with icons -->
    <div class="test-case">
      <h3>With Icons</h3>
      <KButton text="Icons Dropdown">
        <template #menu>
          <KDropdownMenu
            :options="[
              { label: 'Add', icon: 'add' },
              { label: 'Delete', icon: 'delete' },
            ]"
            :hasIcons="true"
          />
        </template>
      </KButton>
    </div>

    <!-- KDropdownMenu with header slot -->
    <div class="test-case">
      <h3>With Header</h3>
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

  .test-case {
    margin-bottom: 30px;
  }

</style>
