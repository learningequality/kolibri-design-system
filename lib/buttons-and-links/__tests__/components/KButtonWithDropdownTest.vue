<template>

  <KButton
    primary
    text="KButton test"
  >
    <template #menu>
      <KDropdownMenu
        :options="[{ label: 'Option 1' }, { label: 'Option 2' }, { label: 'Option 3' }]"
      >
        <template #header>
          <span style="margin: 1rem">Menu header</span>
        </template>
      </KDropdownMenu>
    </template>
  </KButton>

</template>


<script>

  export default {
    name: 'KButtonWithDropdownTest',
  };

</script>
