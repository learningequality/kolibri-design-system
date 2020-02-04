<template>

  <div class="section-link-with-target">
    <InternalLink :href="anchor">
      <file-svg class="icon-link" src="../../assets/link.svg" />
      <span class="visuallyhidden">link to section</span>
    </InternalLink>
    <!-- hidden target to account for variable height of header -->
    <a :id="anchorId" :href="anchor" class="offset-target">#</a>
  </div>

</template>


<script>

  export default {
    name: 'AnchorTarget',
    props: {
      anchor: {
        type: String,
        validator(value) {
          return value.match(/^#[a-zA-Z0-9_-]*$/);
        },
      },
    },
    computed: {
      anchorId() {
        return this.anchor.replace('#', '');
      },
    },
  };

</script>


<style lang="scss" scoped>

  .section-link-with-target {
    position: relative;
    display: inline-block;
    white-space: nowrap;
  }

  .icon-link {
    width: 14px;
    height: 14px;
    margin-right: 8px;
    margin-left: 8px;
  }

  .offset-target {
    position: relative;
    top: -130px; // TODO: set dynamically based on actual height of header
    visibility: hidden;
  }

</style>
