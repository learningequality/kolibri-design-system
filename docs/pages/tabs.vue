<template>

  <DocsPageTemplate>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>Tabs are a design pattern describing a set of tab elements and panels containing content associated with them. Only one panel, the one corresponding to the active tab, is displayed at a time.</p>

      <DocsShow>
        <KTabs
          tabsId="coachReportsTabs"
          ariaLabel="Coach reports"
          :tabs="tabs"
        >
          <template #tabLessons>
            Lessons tab content
          </template>
          <template #tabLearners>
            Learners tab content
          </template>
          <template #tabGroups>
            Groups tab content
          </template>
        </KTabs>
      </DocsShow>

      <p>They can be implemented by means of the following components:</p>
      <ul>
        <li>
          <DocsLibraryLink component="KTabs" /> is the simplest and recommended way to implement tabs
        </li>
        <li>
          Using <DocsLibraryLink component="KTabsList" /> together with <DocsLibraryLink component="KTabsPanel" /> is an alternative for more complex scenarios
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {
    data() {
      return {
        tabs: [
          { id: 'tabLessons', label: 'Lessons' },
          { id: 'tabLearners', label: 'Learners' },
          { id: 'tabGroups', label: 'Groups' },
        ],
      };
    },
  };

</script>