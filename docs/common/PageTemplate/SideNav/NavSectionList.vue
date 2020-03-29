<template>

  <div>
    <template v-if="section.title">
      <div class="hr-line"></div>
      <div class="section-heading">
        {{ section.title }}
      </div>
    </template>
    <ul>
      <li
        v-for="page in section.pages"
        :key="page.title"
      >
        <NavLink :page="page" />
      </li>
    </ul>
  </div>

</template>


<script>

  import NavLink from './NavLink';

  export default {
    name: 'NavSectionList',
    components: {
      NavLink,
    },
    props: {
      section: {
        type: Object,
        required: true,
      },
    },
  };

</script>


<style lang="scss" scoped>

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  .hr-line {
    margin-top: 16px;
    // margin-right: -8px;
    margin-bottom: 16px;
    // margin-left: -8px;
    border-top: 1px solid #dedede;
  }

  .section-heading {
    margin-bottom: 8px;
    font-size: smaller;
    color: #777777;
  }

</style>
