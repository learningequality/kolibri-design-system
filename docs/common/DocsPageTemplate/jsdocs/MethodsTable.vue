<template>

  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th class="stretch">
          Description
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(method, i) in api" :key="i">
        <td class="first-col">
          <code>{{ method.name }}</code>
          <DocsAnchorTarget :anchor="`#method:${method.name}`" />
        </td>
        <td>
          <vue-simple-markdown v-if="method.description" :source="method.description" />
          <KEmptyPlaceholder v-else />
        </td>
      </tr>
    </tbody>
  </table>

</template>


<script>

  export default {
    name: 'MethodsTable',
    props: {
      api: {
        type: Array,
        required: true,
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import './styles';

</style>
