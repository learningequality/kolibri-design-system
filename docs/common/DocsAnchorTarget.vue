<template>

  <div class="section-link-with-target">
    <DocsInternalLink
      class="link"
      :href="anchor"
      :style="{ top: `${verticalOffset}px` }"
    >
      <file-svg
        src="../assets/link.svg"
        class="icon-link"
        :class="{ highlighed }"
        aria-label="Link to section"
      />
    </DocsInternalLink>
    <!-- hidden target to account for variable height of header -->
    <a :id="anchorId" :href="anchor" class="offset-target">#</a>
  </div>

</template>


<script>

  export default {
    name: 'DocsAnchorTarget',
    props: {
      anchor: {
        type: String,
        required: true,
        validator(value) {
          if (!value.startsWith('#')) {
            // eslint-disable-next-line no-console
            console.error(`'anchor' prop value '${value}' must start with a '#'`);
            return false;
          }
          if (!value.match(/^#[\w\-.:]*$/)) {
            // eslint-disable-next-line no-console
            console.error(`'anchor' prop value '${value}' invalid`);
            return false;
          }
          return true;
        },
      },
      verticalOffset: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return { highlighed: false };
    },
    computed: {
      anchorId() {
        return this.anchor.replace('#', '');
      },
    },
    mounted() {
      this.updateHighlight();
      window.addEventListener('hashchange', this.updateHighlight, false);
    },
    destroyed() {
      window.removeEventListener('hashchange', this.updateHighlight, false);
    },
    methods: {
      updateHighlight() {
        this.highlighed = window.location.hash === this.anchor;
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '~/assets/definitions';

  .section-link-with-target {
    position: relative;
    display: inline-block;
    white-space: nowrap;
  }

  .link {
    position: relative;
  }

  .icon-link {
    width: 14px;
    height: 14px;
    margin-right: 8px;
    margin-left: 8px;
    transition: all 0.15s ease;
  }

  .highlighed {
    fill: $header-color;
    transform: scale(1.25);
  }

  .offset-target {
    position: relative;
    top: -160px; // TODO: set dynamically based on actual height of header
    visibility: hidden;
  }

</style>
