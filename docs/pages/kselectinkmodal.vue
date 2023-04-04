<template>

  <DocsPageTemplate>
    <DocsPageSection title="Overview" anchor="#overview">
      <DocsShow>
        <KModal
          :title="'KSelect inside KModal'"
        >
          <KSelect
            v-model="exampleData"
            :options="options"
            label="Who are you?"
            placeholder="Nobody"
            :insideModal="true"
          />
          <p>Value: {{ exampleData }}</p>
        </KModal>
      </DocsShow>
    </DocsPageSection>
  </DocsPageTemplate>

</template>

<script>

  export default {
    data() {
      return {
        exampleData: null,
        options: [
          {
            label: 'Somebody',
            value: 'somebody',
          },
          {
            label: 'You used to know me',
            value: 'usedto',
          },
          {
            label: 'friend',
            value: 'friend',
          },
          {
            label: 'roman',
            value: 'roman',
          },
          {
            label: 'countryman',
            value: 'countryman',
          },
          {
            label: 'abraham lincoln',
            value: 'lincoln',
          },
          {
            label: 'albert einstein',
            value: 'einstein',
          },
          {
            label: 'bob barker',
            value: 'barker',
          },
          {
            label: 'billie jean',
            value: 'billiejean',
          },
        ],
      };
    },
  };

</script>

<style scoped>

</style>
