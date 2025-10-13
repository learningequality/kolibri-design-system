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
        :color="$themeTokens.annotation"
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
          :color="$themePalette.yellow.v_500"
        />
      </div>
    </template>

    <template #outerAfter>
      <div class="help-btn-wrapper">
        <KIconButton
          class="help-btn"
          icon="helpOutline"
          :color="$themePalette.blue.v_500"
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
