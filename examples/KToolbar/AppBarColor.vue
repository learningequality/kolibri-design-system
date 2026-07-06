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
  </KToolbar>

</template>
