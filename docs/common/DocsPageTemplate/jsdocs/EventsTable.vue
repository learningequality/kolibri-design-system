<template>

  <table>
    <thead>
      <tr>
        <th>Events</th>
        <th class="stretch">
          Description
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(event, i) in api" :key="i">
        <td><code>{{ event.name }}</code></td>
        <td>{{ event.description || '—' }}</td>
      </tr>
    </tbody>
  </table>

</template>


<script>

  export default {
    name: 'EventsTable',
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
