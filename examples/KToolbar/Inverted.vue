<template>

  <KToolbar
    title="Toolbar title"
    :style="{
      backgroundColor: $themeTokens.appBarDark,
      color: $themeTokens.textInverted,
    }"
  >
    <template #icon>
      <KIconButton
        icon="back"
        :color="$themeTokens.textInverted"
        :ariaLabel="'Go back'"
      />
    </template>
  </KToolbar>

</template>
