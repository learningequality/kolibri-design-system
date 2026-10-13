<template>

  <KTextbox
    v-model="searchString"
    label="Search for resources..."
    clearable
    invalid
    invalidText="Error message"
    :maxlength="20"
    :showInvalidText="true"
  >
    <template #innerBefore>
      <KIcon
        class="search-icon"
        icon="search"
        color="var(--tokens-annotation)"
      />
    </template>

    <template #innerAfter>
      <KIconButton
        class="copy-btn"
        icon="copy"
      />
    </template>

    <template #outerBefore>
      <div class="warning-icon-wrapper">
        <KIcon
          class="warning-icon"
          icon="warning"
          color="var(--palette-yellow-v500)"
        />
      </div>
    </template>

    <template #outerAfter>
      <div class="help-btn-wrapper">
        <KIconButton
          class="help-btn"
          icon="helpOutline"
          color="var(--palette-blue-v500)"
        />
      </div>
    </template>
  </KTextbox>

</template>


<script>

  export default {
    data() {
      return {
        searchString: 'video',
      };
    },
  };

</script>


<style scoped>

  .warning-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 6px 8px;
  }

  .warning-icon {
    font-size: 24px;
  }

  .search-icon {
    position: relative;
    left: 4px;
    margin: 4px;
    font-size: 24px;
  }

  .help-btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 6px 18px;
  }

</style>
