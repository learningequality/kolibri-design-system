<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>Displays tabs:</p>

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

      <p>This component is only one of more ways to implement tabs. See the <DocsInternalLink text="Tabs page" href="/tabs" /> for guidance on all tab-related components, how they compare, as well as on how to use them together with the router.</p>

    </DocsPageSection>

    <DocsPageSection title="Appearance" anchor="#appearance">
      <p>There are several ways to adjust tabs styling. Please refer to <DocsInternalLink text="KTabsList: Appearance" href="/ktabslist#appearance" /> to see examples as <DocsLibraryLink component="KTabsList" /> accepts exactly the same styling props and slots.</p>
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <DocsInternalLink text="Tabs page" href="/tabs" /> has an overview and usage guidance for all tab-related components
        </li>
        <li>
          <DocsLibraryLink component="KTabsList" /> and <DocsLibraryLink component="KTabsPanel" /> are an alternative way to implement tabs
        </li>
        <li>
          <DocsInternalLink text="KTabsList: Appearance" href="/ktabslist#appearance" /> contains examples of tabs styling that apply to <code>KTabs</code>as well
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  import KTabs from '../../lib/tabs/KTabs.vue';

  export default {
    components: { KTabs },
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


<style lang="scss" scoped></style>
