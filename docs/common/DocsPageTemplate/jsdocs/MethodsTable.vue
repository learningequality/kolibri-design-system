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
        <td><code>{{ method.name }}</code></td>
        <td>
          <template v-if="method.description">
            {{ method.description }}
          </template>
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

  @import './styles.scss';

</style>
