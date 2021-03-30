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
      <tr v-for="(slot, i) in api" :key="i">
        <td class="first-col">
          <code>{{ slot.name }}</code>
          <DocsAnchorTarget :anchor="`#slot:${slot.name}`" />
        </td>
        <td>
          <vue-simple-markdown v-if="slot.description" :source="slot.description" />
          <KEmptyPlaceholder v-else />
        </td>
      </tr>
    </tbody>
  </table>

</template>


<script>

  export default {
    name: 'SlotsTable',
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
