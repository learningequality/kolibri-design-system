<template>

  <div class="block-wrapper">
    <div
      class="color-block"
      :style="{ backgroundColor: value }"
    ></div>
    <div class="code name">
      <code>{{ name }}</code><DocsAnchorTarget
        v-if="definition"
        :anchor="anchor"
      />
    </div>
    <div class="code value">
      <DocsInternalLink
        v-if="isToken && showTokenCrossLink"
        code
        :text="tokenSource"
        :href="tokenAnchor"
      />
      <code v-else-if="isToken">{{ tokenSource }}</code>
      <code v-else>{{ value }}</code>
    </div>
    <p
      v-if="$slots.default"
      class="description"
    >
      <slot></slot>
    </p>
  </div>

</template>


<script>

  import globalThemeState from '~~/lib/styles/globalThemeState';

  const TOKENS = 'tokens.';
  const BRAND = 'brand.';
  const PALETTE = 'palette.';

  function dotsToDashes(value) {
    return value.replace(/\./g, '-');
  }

  export default {
    name: 'DocsColorBlock',
    props: {
      name: {
        type: String,
        required: true,
      },
      definition: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      value() {
        const code = this.name
          .replace(TOKENS, '$themeTokens.')
          .replace(BRAND, '$themeBrand.')
          .replace(PALETTE, '$themePalette.');
        return eval(`this.${code}`);
      },
      anchor() {
        return this.definition ? '#' + dotsToDashes(this.name) : null;
      },
      tokenSource() {
        const token = this.name.replace(TOKENS, '');
        return globalThemeState.tokenMapping[token];
      },
      tokenAnchor() {
        return '#' + dotsToDashes(this.tokenSource);
      },
      isToken() {
        return this.name.startsWith(TOKENS);
      },
      showTokenCrossLink() {
        const sourceDef =
          this.tokenSource.startsWith(BRAND) || this.tokenSource.startsWith(PALETTE);
        return sourceDef && this.$route.name === 'Colors'; // brittle
      },
    },
  };

</script>


<style lang="scss" scoped>

  .block-wrapper {
    position: relative;
    padding: 4px;
    margin-bottom: 8px;
  }

  .color-block {
    position: absolute;
    width: 40px;
    height: 40px;
    color: black;
    border: 1px solid #212121;
    border-radius: 4px;
  }

  .code {
    margin-left: 50px;

    code {
      background-color: white;
    }
  }

  .code.value {
    margin-left: 58px;
  }

  .name {
    margin-top: 2px;
    font-size: 12px;
    font-weight: bold;
  }

  .value {
    font-size: 10px;
  }

  .description {
    margin-top: 8px;
    margin-bottom: 0;
    margin-left: 50px;
    font-size: smaller;
  }

</style>
