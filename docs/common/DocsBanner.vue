<template>

  <div
    class="banner"
    :style="{
      backgroundColor: config.backgroundColor,
      color: $themeTokens.text,
    }"
  >
    <KIcon
      :icon="config.icon"
      class="icon"
      :color="config.iconColor"
    />
    <div class="content">
      <slot></slot>
    </div>
  </div>

</template>


<script>

  export default {
    name: 'DocsBanner',
    props: {
      a11y: {
        type: Boolean,
        default: false,
      },
      warning: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      config() {
        if (this.warning) {
          return {
            icon: 'warning',
            backgroundColor: this.$themePalette.yellow.v_100,
            iconColor: this.$themePalette.yellow.v_500,
          };
        }
        if (this.a11y) {
          return {
            icon: 'a11y',
            backgroundColor: this.$themePalette.orange.v_50,
            iconColor: undefined,
          };
        }
        return {
          icon: 'info',
          backgroundColor: this.$themePalette.lightblue.v_50,
          iconColor: this.$themePalette.lightblue.v_500,
        };
      },
    },
  };

</script>


<style lang="scss" scoped>

  .banner {
    display: flex;
    gap: 12px;
    padding: 12px 16px;
    margin: 16px 0;
    border-radius: 4px;
  }

  .icon {
    position: relative;
    top: 0;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }

  .content {
    flex: 1;
    font-size: 1em;
  }

</style>
