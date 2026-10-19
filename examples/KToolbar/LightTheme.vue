<template>

  <KToolbar
    title="Page Title"
    textColor="black"
    :style="{ backgroundColor: 'var(--tokens-appBar)' }"
  >
    <template #icon>
      <KIconButton
        icon="close"
        color="var(--tokens-text)"
        :ariaLabel="'Close'"
      />
    </template>
  </KToolbar>

</template>
