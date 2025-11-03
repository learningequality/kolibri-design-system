<template>

  <KToolbar
    title="Page Title"
    textColor="white"
    :style="{ backgroundColor: $themeTokens.appBarDark }"
  >
    <template #icon>
      <router-link
        to="/ktoolbar"
        style="display: inline-block; border-radius: 50%"
      >
        <KIconButton
          icon="back"
          :color="$themeTokens.textInverted"
          :ariaLabel="'Go back'"
        />
      </router-link>
    </template>
  </KToolbar>

</template>
