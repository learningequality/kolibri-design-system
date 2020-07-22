<template>

  <div class="block-wrapper">
    <div class="inner-icon-block">
      <KIcon
        v-if="aliasList && aliasList.length"
        :icon="aliasList[0]"
        class="icon"
      />
    </div>
    <div class="code alias">
      <div v-for="(aliasItem, index) in aliasList" :key="index">
        <code>{{ aliasItem }}</code>
        <DocsAnchorTarget
          :verticalOffset="2"
          :anchor="anchor(aliasItem)"
        />
      </div>
    </div>
  </div>

</template>


<script>

  export default {
    name: 'IconBlock',
    props: {
      aliasList: {
        type: Array,
        required: true,
      },
    },
    methods: {
      anchor(alias) {
        return `#token-${alias}`;
      },
    },
  };

</script>


<style lang="scss" scoped>

  .block-wrapper {
    position: relative;
    min-height: 40px;
  }

  .inner-icon-block {
    position: absolute;
    width: 40px;
    height: 40px;
    color: black;
  }

  .icon {
    width: 32px;
    height: 32px;
  }

  .code {
    margin-left: 50px;

    code {
      background-color: white;
    }
  }

  .alias {
    margin-top: 8px;
    font-size: 12px;
    font-weight: bold;
    white-space: nowrap;
  }

</style>
