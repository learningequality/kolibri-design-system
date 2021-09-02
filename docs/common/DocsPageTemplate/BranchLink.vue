<template>

  <div class="link-wrapper">
    <DocsGithubLink
      v-if="showLink"
      :href="linkUrl"
      :text="linkText"
    />
    <span v-else>
      Local environment
    </span>
    <span>|</span>
    <DocsGithubLink text="Changelog" href="https://github.com/learningequality/kolibri-design-system/blob/main/CHANGELOG.md" />
  </div>

</template>


<script>

  import environment from '~/environment';

  export default {
    name: 'BranchLink',
    computed: {
      showLink() {
        return environment && !environment.local;
      },
      linkUrl() {
        return environment.url;
      },
      linkText() {
        return environment.branch;
      },
    },
  };

</script>


<style lang="scss" scoped>

  .link-wrapper {
    margin: 18px;
    font-size: 14px;
    font-weight: normal;
  }

</style>
