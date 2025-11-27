<template>

  <div>
    <KCheckbox
      v-for="group in groups"
      :key="group.id"
      v-model="selectedGroupIds"
      :label="group.name"
      :value="group.id"
    />
  </div>

</template>


<script>

  export default {
    data() {
      return {
        groups: [
          { id: 'group-1', name: 'First group' },
          { id: 'group-2', name: 'Second group' },
          { id: 'group-3', name: 'Third group' },
        ],
        selectedGroupIds: ['group-1'],
      };
    },
  };

</script>
