<template>

  <div>
    <div v-if="$slots.do" class="show">
      <div class="header">
        <span class="mark do">✔</span> Do
      </div>
      <div class="content">
        <slot name="do"></slot>
      </div>
    </div>
    <div v-if="$slots.not" class="show">
      <div class="header">
        <span class="mark not">✘</span> Don't
      </div>
      <div class="content">
        <slot name="not"></slot>
      </div>
    </div>
  </div>

</template>


<script>

  export default {
    name: 'DocsDoNot',
  };

</script>


<style lang="scss" scoped>

  .show {
    display: inline-block;
    margin: 8px;
    vertical-align: top;
    border: 1px solid #dedede;
    border-radius: 4px;
  }

  .header {
    padding: 8px 24px;
    border-bottom: 1px solid #dedede;
  }

  .content {
    margin: 24px;
  }

  .mark {
    margin-right: 8px;
  }

  .do {
    color: green;
  }

  .not {
    color: red;
  }

</style>
