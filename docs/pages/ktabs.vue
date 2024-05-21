<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>Displays tabs:</p>

      <DocsShow block style="max-width: 400px;">
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

      <p>This component is the most straightforward way to implement tabs. Its usage is recommended whenever possible.</p>
    </DocsPageSection>

    <DocsPageSection title="Basic usage" anchor="#basic-usage">
      <p>Tab panels' content is passed via slots named by corresponding tabs' IDs from objects of the <code>tabs</code> array.</p>

      <p>Each tabbed interface needs to have <code>ariaLabel</code> or <code>ariaLabelledBy</code> and also an identifier, <code>tabsID</code>, that is unique in regard to a page where tabs are rendered.</p>

      <DocsShowCode language="html">
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
      </DocsShowCode>

      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
      <DocsShowCode language="javascript">
        data() {
          return {
            tabs: [
              { id: 'tabLessons', label: 'Lessons' },
              { id: 'tabLearners', label: 'Learners' },
              { id: 'tabGroups', label: 'Groups' },
            ],
          };
        },
      </DocsShowCode>
      <!-- eslint-enable -->
    </DocsPageSection>

    <DocsPageSection title="With router" anchor="#with-router">
      <p>When implementing tabs with the router, it's the router view rather than <code>KTabs</code> that is responsible for displaying the active tab content.</p>

      <p>In such a case, define <code>to</code> property with a router link object as its value in objects of the <code>tabs</code> array:</p>

      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
      <DocsShowCode language="javascript">
        data() {
          return {
            tabs: [
              { id: 'tabLessons', label: 'Lessons', to: { path: '/lessons' } },
              { id: 'tabLearners', label: 'Learners', to: { path: '/learners' } },
              { id: 'tabGroups', label: 'Groups', to: { path: '/groups' } },
            ],
          };
        },
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>Then, tabs will be rendered as router links and you can use the router view to display the active tab content:</p>

      <DocsShowCode language="html">
        <KTabs
          tabsId="coachReportsTabs"
          ariaLabel="Coach reports"
          :tabs="tabs"
        >
          <router-view />
        </KTabs>
      </DocsShowCode>

      <p>Note that here, tabs content is not passed to <code>KTabs</code> via named slots, for it's the router view that's responsible for rendering it.</p> 

      <p>However, it is still required to wrap the active tab content in <code>KTabs</code>. Otherwise, even though tabs may seem to function correctly at first glance, accessibility would be broken.</p>

      <DocsDoNot>
        <template #not>
          <DocsShowCode language="html">
            <KTabs
              tabsId="coachReportsTabs"
              ariaLabel="Coach reports"  
              :tabs="tabs"
            />
            <!-- the active tab content is displayed in this router view -->
            <router-view />
          </DocsShowCode>

          <p>Place the router view outside of <code>KTabs</code></p>
        </template>

        <template #do>
          <DocsShowCode language="html">
            <KTabs
              tabsId="coachReportsTabs"
              ariaLabel="Coach reports"
              :tabs="tabs"
            >
              <!-- the active tab content is displayed in this router view -->
              <router-view />
            </KTabs>
          </DocsShowCode>

          <p>Place the router view to <code>KTabs</code> default slot</p>
        </template>
      </DocsDoNot>
    </DocsPageSection>

    <DocsPageSection title="More tabs on a page" anchor="#more-tabs-on-a-page">
      <p>When there are two or more tabbed interfaces on one page, it is important to identify each one of them with an ID unique in regard to the page. Otherwise, some a11y features may break.</p>

      <p>This is achieved by providing a unique value to <code>tabsId</code> property:</p>

      <DocsShowCode language="html">
        <KTabs tabsId="firstTabs" />
        <KTabs tabsId="secondTabs" />
      </DocsShowCode>
    </DocsPageSection>

    <DocsPageSection title="Appearance" anchor="#appearance">
      <p>There are several ways to adjust tabs styling. You can refer to the props and slots overview below and also to <DocsInternalLink text="KTabsList: Appearance" href="/ktabslist#appearance" /> to see examples as <DocsLibraryLink component="KTabsList" /> accepts exactly the same styling props and slots.</p>
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <DocsInternalLink text="Tabs page" href="/tabs" /> has an overview and usage guidance for all tab-related components
        </li>
        <li>
          <DocsLibraryLink component="KTabsList" /> and <DocsLibraryLink component="KTabsPanel" /> present an alternative way to implement tabs
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
