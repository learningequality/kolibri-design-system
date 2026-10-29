<template>

  <KTabsList
    v-model="activeTabId"
    tabsId="tabsAppearanceOverrides"
    ariaLabel="Coach reports"
    :tabs="tabs"
    hoverColor="var(--tokens-primary)"
    :appearanceOverrides="{
      textTransform: 'none',
      margin: '0 32px',
    }"
    :appearanceOverridesActive="{
      borderBottomWidth: '6px',
    }"
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
