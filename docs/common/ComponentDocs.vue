<template>

  <div>
    <PageSection
      v-if="api.description"
      title="Description"
      anchor="#description"
    >
      <p v-if="api.description">
        {{ api.description }}
      </p>
    </PageSection>

    <PageSection
      v-if="api.props.length"
      title="Props"
      anchor="#props"
    >
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Default</th>
            <th class="stretch">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(prop, i) in api.props" :key="i">
            <td><code>{{ prop.name }}</code></td>
            <td><code>{{ prop.type.name }}</code></td>
            <td>
              <code v-if="prop.required === true">true</code>
              <code v-else-if="prop.required === false">true</code>
              <template v-else>
                —
              </template>
            </td>
            <td>
              <code v-if="prop.defaultValue">
                {{ prop.defaultValue.value }}
              </code>
              <template v-else>
                —
              </template>
            </td>
            <td>{{ prop.description || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </PageSection>

    <PageSection
      v-if="api.events.length"
      title="Events"
      anchor="#events"
    >
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
          <tr v-for="(event, i) in api.events" :key="i">
            <td><code>{{ event.name }}</code></td>
            <td>{{ event.description || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </PageSection>

    <PageSection
      v-if="api.slots.length"
      title="Slots"
      anchor="#slots"
    >
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
          <tr v-for="(slot, i) in api.slots" :key="i">
            <td><code>{{ slot.name }}</code></td>
            <td>{{ slot.description || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </PageSection>

    <PageSection
      v-if="api.methods.length"
      title="Methods"
      anchor="#methods"
    >
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
          <tr v-for="(method, i) in api.methods" :key="i">
            <td><code>{{ method.name }}</code></td>
            <td>{{ method.description || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </PageSection>

  </div>

</template>


<script>

  import jsdocs from '~/jsdocs';

  export default {
    name: 'ComponentDocs',
    computed: {
      api() {
        return jsdocs[this.$route.name];
      },
    },
  };

</script>


<style lang="scss" scoped>

  td,
  th {
    padding: 8px;
    text-align: left;
  }

  th {
    min-width: 50px;
  }

  .stretch {
    width: 100%;
    min-width: 150px;
  }

</style>
