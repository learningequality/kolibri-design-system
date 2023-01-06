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

      <p>There are several ways to implement tabs.</p>
    </DocsPageSection>

    <DocsPageSection title="Simple tabs" anchor="#simple-tabs">
      <p>Whenever possible, it is recommended to use <DocsLibraryLink component="KTabs" /> which is the most straightforward:</p>

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

    <DocsPageSection title="Complex tabs" anchor="#complex-tabs">
      <p>Using <DocsLibraryLink component="KTabs" /> may not be possible in more complex situations, for example when tabs are rendered within a different component than their content. In such cases, <DocsLibraryLink component="KTabsList" /> and <DocsLibraryLink component="KTabsPanel" /> can be used, where the former displays tabs and the latter their content:</p>

      <DocsShowCode language="html">
        <AppBar>
          <KTabsList
            v-model="activeTabId"
            tabsId="coachReportsTabs"
            ariaLabel="Coach reports"
            :tabs="tabs"
          />
        </AppBar>

        <KTabsPanel
          tabsId="coachReportsTabs"
          :activeTabId="activeTabId"
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
        </KTabsPanel>
      </DocsShowCode>

      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
      <DocsShowCode language="javascript">
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
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>These two components need to be linked via <code>tabsId</code> and <code>activeTabId</code>.</p>

      <p>In the example above, tabs are rendered as buttons and their content is passed to <DocsLibraryLink component="KTabsPanel" /> via slots named by tabs' IDs. <DocsLibraryLink component="KTabsPanel" /> takes care of displaying only content corresponding to the active tab.</p>
    </DocsPageSection>

    <DocsPageSection title="Router tabs" anchor="#router-tabs">
      <p>When implementing tabs with the router, it's the router view rather than <DocsLibraryLink component="KTabs" /> or <DocsLibraryLink component="KTabsPanel" /> that is responsible for displaying the active tab content.</p>

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

      <p>Then, tabs will be rendered as router links and you can use the router view to display the active tab content, for example:</p>

      <DocsShowCode language="html">
        <KTabs
          tabsId="coachReportsTabs"
          ariaLabel="Coach reports"
          :tabs="tabs"
        >
          <router-view />
        </KTabs>
      </DocsShowCode>

      or in the more complex case:

      <DocsShowCode language="html">
        <AppBar>
          <KTabsList
            v-model="activeTabId"
            tabsId="coachReportsTabs"  
            ariaLabel="Coach reports"
            :tabs="tabs"
          />
        </AppBar>

        <KTabsPanel
          tabsId="coachReportsTabs"
          :activeTabId="activeTabId"
        >
          <router-view />
        </KTabsPanel>
      </DocsShowCode>

      <p>Note that when using the router, tabs content is not passed to <DocsLibraryLink component="KTabs" /> or <DocsLibraryLink component="KTabsPanel" /> via named slots as it's the router view that's responsible for rendering it.</p> 

      <p>However, it is still required to wrap the active tab content in <DocsLibraryLink component="KTabs" /> or <DocsLibraryLink component="KTabsPanel" />. Otherwise, even though tabs may seem to function correctly at first glance, accessibility would be broken.</p>

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

          <p>Place the router view outside of <DocsLibraryLink component="KTabs" /></p>
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

          <p>Place the router view to <DocsLibraryLink component="KTabs" /> default slot</p>
        </template>
      </DocsDoNot>

      <DocsDoNot>
        <template #not>
          <DocsShowCode language="html">
            <AppBar>
              <KTabsList
                v-model="activeTabId"
                tabsId="coachReportsTabs"
                ariaLabel="Coach reports"
                :tabs="tabs"
              />
            </AppBar>

            <KTabsPanel
              tabsId="coachReportsTabs"
              :activeTabId="activeTabId"
            />
            <!-- the active tab content is displayed in this router view -->
            <router-view />
          </DocsShowCode>
          <p>Place the router view outside of <DocsLibraryLink component="KTabsPanel" /> or forget to use <DocsLibraryLink component="KTabsPanel" /> altogether</p>
        </template>

        <template #do>
          <DocsShowCode language="html">
            <AppBar>
              <KTabsList
                v-model="activeTabId"
                tabsId="coachReportsTabs"
                ariaLabel="Coach reports"
                :tabs="tabs"
              />
            </AppBar>

            <KTabsPanel
              tabsId="coachReportsTabs"
              :activeTabId="activeTabId"
            >
              <!-- the active tab content is displayed in this router view -->
              <router-view />
            </KTabsPanel>
          </DocsShowCode>
          <p>Place the router view to <DocsLibraryLink component="KTabsPanel" /> default slot</p>
        </template>
      </DocsDoNot>
    </DocsPageSection>

    <DocsPageSection title="More tabs on a page" anchor="#more-tabs-on-one-page">
      <p>When there are two or more tabbed interfaces on one page, it is important to identify each one of them with an ID unique in regards to the page. Otherwise, some a11y features may break.</p>

      <p>This is achieved by providing a unique value to <code>tabsId</code> property:</p>

      <DocsShowCode language="html">
        <KTabs tabsId="firstTabs" />

        <KTabs tabsId="secondTabs" />
      </DocsShowCode>

      <p>When using <DocsLibraryLink component="KTabsList" /> with <DocsLibraryLink component="KTabsPanel" />, pass the same <code>tabsId</code> to components that are meant to represent one tabbed interface:</p>

      <DocsShowCode language="html">
        <KTabsList tabsId="firstTabs" />
        <KTabsPanel tabsId="firstTabs" />

        <KTabsList tabsId="secondTabs" />
        <KTabsPanel tabsId="secondTabs" />
      </DocsShowCode>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {
    data() {
      return {
        activeTabId: 'tabLearners',
        tabs: [
          { id: 'tabLessons', label: 'Lessons' },
          { id: 'tabLearners', label: 'Learners' },
          { id: 'tabGroups', label: 'Groups' },
        ],
      };
    },
  };

</script>