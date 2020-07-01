<template>

  <div class="section-link-with-target">
    <DocsInternalLink :href="anchor">
      <file-svg class="icon-link" src="../assets/link.svg" />
      <span class="visuallyhidden">link to section</span>
    </DocsInternalLink>
    <!-- hidden target to account for variable height of header -->
    <a :id="anchorId" :href="anchor" class="offset-target">#</a>
  </div>

</template>


<script>

  import log from 'loglevel';

  export default {
    name: 'DocsAnchorTarget',
    props: {
      anchor: {
        type: String,
        validator(value) {
          if (!value.startsWith('#')) {
            log.warn(`'anchor' prop value '${value}' must start with a '#'`);
            return false;
          }
          if (!value.match(/^#[a-zA-Z0-9_-]*$/)) {
            log.warn(`'anchor' prop value '${value}' must match /^#[a-zA-Z0-9_-]*$/`);
            return false;
          }
          return true;
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
