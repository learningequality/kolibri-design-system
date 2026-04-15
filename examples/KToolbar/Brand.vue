<template>

  <KToolbar title="Toolbar title">
    <template #brand>
      <div class="logo-wrapper">
        <KLogo
          altText="Kolibri Logo"
          showBackground
          :size="36"
        />
      </div>
    </template>
  </KToolbar>

</template>


<style lang="scss" scoped>

  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-right: 8px;
  }

</style>
