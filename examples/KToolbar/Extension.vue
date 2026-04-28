<template>

  <KToolbar
    title="Toolbar title"
    :style="{ backgroundColor: $themeTokens.appBar }"
  >
    <template #leading-actions>
      <KIconButton
        icon="menu"
        :color="$themeTokens.text"
        :ariaLabel="'Menu'"
      />
    </template>
    <template #extension>
      <KRouterLink
        text="Overview"
        :to="{ path: '/ktoolbar' }"
        class="link"
        appearance="flat-button"
      />
      <KRouterLink
        text="Lessons"
        :to="{ path: '/ktoolbar' }"
        class="link"
        appearance="flat-button"
      />
      <KRouterLink
        text="Learners"
        :to="{ path: '/ktoolbar' }"
        class="link"
        appearance="flat-button"
      />
    </template>
  </KToolbar>

</template>


<style lang="scss" scoped>

  .link {
    margin-right: 16px;
  }

</style>
