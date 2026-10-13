<template>

  <KTabsList
    v-model="activeTabId"
    tabsId="tabsProps"
    ariaLabel="Coach reports"
    :tabs="tabs"
    color="var(--tokens-primary)"
    colorActive="var(--tokens-primary)"
    backgroundColor="var(--tokens-secondary)"
    hoverBackgroundColor="var(--tokens-secondaryDark)"
  />

</template>


<script>

  export default {
    data() {
      return {
        activeTabId: 'tabLessons',
        tabs: [
          { id: 'tabLessons', label: 'Lessons' },
          { id: 'tabLearners', label: 'Learners' },
          { id: 'tabGroups', label: 'Groups' },
        ],
      };
    },
  };

</script>
