<template>

  <div>
    <KCheckbox
      v-for="group in groups"
      :key="group.id"
      :label="group.name"
      :checked="groupIsSelected(group)"
      @change="toggleGroup($event, group)"
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
    methods: {
      groupIsSelected({ id }) {
        return this.selectedGroupIds.includes(id);
      },
      toggleGroup(isChecked, { id }) {
        if (isChecked) {
          this.selectedGroupIds = [...this.selectedGroupIds, id];
        } else {
          this.selectedGroupIds = this.selectedGroupIds.filter(groupId => groupId !== id);
        }
      },
    },
  };

</script>
