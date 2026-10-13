<template>

  <KToolbar
    title="Page Title"
    textColor="white"
    :style="{ backgroundColor: 'var(--tokens-appBarDark)' }"
  >
    <template #icon>
      <router-link
        to="/ktoolbar"
        style="display: inline-block; border-radius: 50%"
      >
        <KIconButton
          icon="back"
          color="var(--tokens-textInverted)"
          :ariaLabel="'Go back'"
        />
      </router-link>
    </template>
  </KToolbar>

</template>
