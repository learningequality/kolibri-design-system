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
      <tr v-for="(event, i) in publicApi" :key="i">
        <td class="first-col">
          <code>{{ event.name }}</code>
          <DocsAnchorTarget :anchor="`#event:${event.name}`" />
        </td>
        <td>
          <vue-simple-markdown v-if="event.description" :source="event.description" />
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
    computed: {
      publicApi() {
        return this.api.filter(docItem => {
          if (!docItem['tags']) {
            return true;
          }
          return !docItem['tags'].some(tagObj => tagObj['title'] === 'ignore');
        });
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import './styles';

</style>
