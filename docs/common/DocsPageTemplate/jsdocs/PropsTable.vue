<template>

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
      <tr v-for="(prop, i) in api" :key="i">
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

</template>


<script>

  export default {
    name: 'PropsTable',
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
