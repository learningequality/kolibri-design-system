<template>

  <KToolbar title="Toolbar title">
    <template #navigation>
      <KRouterLink
        text="Home"
        :to="{ path: '/ktoolbar' }"
        class="link"
      />
      <KRouterLink
        text="About"
        :to="{ path: '/ktoolbar' }"
        class="link"
      />
    </template>
    <template #actions>
      <KIconButton
        icon="optionsVertical"
        :ariaLabel="'More options'"
      />
    </template>
  </KToolbar>

</template>


<style lang="scss" scoped>

  .link {
    margin-right: 16px;
  }

</style>
