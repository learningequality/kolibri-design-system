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
      <tr v-for="(event, i) in api" :key="i">
        <td><code>{{ event.name }}</code></td>
        <td>
          <template v-if="event.description">
            {{ event.description }}
          </template>
          <KEmptyPlaceholder v-else />
        </td>
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
