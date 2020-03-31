<template>

  <table>
    <thead>
      <tr>
        <th>Methods</th>
        <th class="stretch">
          Description
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(method, i) in api" :key="i">
        <td><code>{{ method.name }}</code></td>
        <td>{{ method.description || '—' }}</td>
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
