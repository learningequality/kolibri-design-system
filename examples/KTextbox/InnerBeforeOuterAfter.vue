<template>

  <div>
    <KTextbox
      v-model="searchString"
      label="Search for resources..."
    >
      <template #innerBefore>
        <KIcon
          class="search-icon"
          icon="search"
          :color="$themeTokens.annotation"
        />
      </template>

      <template #outerAfter>
        <div class="help-btn-wrapper">
          <KIconButton
            class="help-btn"
            icon="helpOutline"
            tooltip="Show help"
            :color="$themePalette.blue.v_500"
            @click="showModal = true"
          />
        </div>
      </template>
    </KTextbox>

    <KModal
      v-if="showModal"
      title="Modal title"
      cancelText="Close"
      @cancel="showModal = false"
    >
      Help text
    </KModal>
  </div>

</template>


<script>

  export default {
    data() {
      return {
        searchString: '',
        showModal: false,
      };
    },
  };

</script>


<style scoped>

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
