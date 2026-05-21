<template>

  <div
    v-if="page.disabled"
    class="block disabled-link"
    :class="{ code: page.isCode }"
  >
    {{ page.title }}
    <BadgeCandidate
      v-if="page.candidate"
      small
    />
  </div>
  <router-link
    v-else
    :to="computedLink"
    class="block enabled-link"
    :href="page.path"
    :class="{ 'current-page': currentPage, code: page.isCode }"
  >
    {{ page.title }}
    <BadgeCandidate
      v-if="page.candidate"
      small
    />
  </router-link>

</template>


<script>

  import BadgeCandidate from '../BadgeCandidate.vue';

  export default {
    name: 'NavLink',
    components: {
      BadgeCandidate,
    },
    props: {
      page: {
        type: Object,
        required: true,
        validator(page) {
          if (!page.path || !page.title) {
            return false;
          }
          return true;
        },
      },
    },
    computed: {
      currentPage() {
        return this.page.path === this.$route.path;
      },
      computedLink() {
        // Preserve query parameters in the link
        return {
          path: this.page.path,
          query: { ...this.$route.query },
        };
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '~/assets/definitions';

  .block {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    margin-right: -8px;
    margin-bottom: 2px;
    margin-left: -8px;
  }

  .disabled-link {
    color: #777777;
  }

  .enabled-link {
    color: $link-color;
    text-decoration: none;
    border-radius: 4px;
    outline-offset: 3px;
    transition: all 0.2s ease;

    &:hover {
      color: $link-hover-color;
      background-color: #efefef;
    }
  }

  .current-page {
    color: black;
    background-color: $border-color;

    &:hover {
      color: black;
      background-color: $border-color;
    }
  }

</style>
