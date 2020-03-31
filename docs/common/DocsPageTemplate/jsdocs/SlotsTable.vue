<template>

  <table>
    <thead>
      <tr>
        <th>Slots</th>
        <th class="stretch">
          Description
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(slot, i) in api" :key="i">
        <td><code>{{ slot.name }}</code></td>
        <td>{{ slot.description || '—' }}</td>
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

  @import './styles.scss';

</style>
