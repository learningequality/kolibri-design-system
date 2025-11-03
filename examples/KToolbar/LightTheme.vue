<template>

  <KToolbar
    title="Page Title"
    textColor="black"
    :style="{ backgroundColor: $themeTokens.appBar }"
  >
    <template #icon>
      <KIconButton
        icon="close"
        :color="$themeTokens.text"
        :ariaLabel="'Close'"
      />
    </template>
  </KToolbar>

</template>
