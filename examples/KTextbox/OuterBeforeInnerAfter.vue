<template>

  <KTextbox
    v-model="token"
    label="Token"
    readonly
  >
    <template #outerBefore>
      <div class="warning-icon-wrapper">
        <KIcon
          class="warning-icon"
          icon="warning"
          :color="$themePalette.yellow.v_500"
        />
      </div>
    </template>

    <template #innerAfter>
      <KIconButton
        class="copy-btn"
        icon="copy"
        tooltip="Copy token"
        @click="copyToClipboard"
      />
    </template>
  </KTextbox>

</template>


<script>

  export default {
    data() {
      return {
        token: '123456789',
      };
    },
    methods: {
      copyToClipboard() {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(this.token).then(() => {
            alert('Copied to clipboard');
          });
        }
      },
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

  .copy-btn {
    position: relative;
    right: 6px;
    bottom: 6px;
  }

</style>
