<template>

  <div class="block-wrapper">
    <div class="innner-icon-block">
      <KIcon :icon="name" class="icon" />
    </div>
    <div class="code name">
      <code>{{ name }}</code><AnchorTarget v-if="definition" :anchor="anchor" />
    </div>
  </div>

</template>


<script>

  export default {
    name: 'IconBlock',
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
      anchor() {
        return this.definition ? '#icon-' + this.name : null;
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

  .innner-icon-block {
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

  .name {
    margin-top: 8px;
    font-size: 12px;
    font-weight: bold;
  }

</style>
