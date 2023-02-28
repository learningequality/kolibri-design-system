<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">

      <p>Displays the tab list of a tabbed interface:</p>

      <DocsShow language="html">
        <KTabsList
          v-model="ex1activeTabId"
          tabsId="tabsIntro"
          ariaLabel="Coach reports"
          :tabs="tabs"
        />
        <KTabsPanel
          tabsId="tabsIntro"
          :activeTabId="ex1activeTabId"
        />
      </DocsShow>

      <p><code>KTabsList</code> is meant to be used together with <DocsLibraryLink component="KTabsPanel" />, which displays tabs' content. Using these two components is recommended in situations when <DocsLibraryLink component="KTabs" /> is not sufficient, for example, when a tab list is rendered within a different component than tab panels.</p>
    </DocsPageSection>

    <DocsPageSection title="Basic usage" anchor="#basic-usage">
      <p>Tab list items are rendered as buttons. Tab panels' content is passed via <DocsLibraryLink component="KTabsPanel" /> slots named by corresponding tabs' IDs from objects of the <code>tabs</code> array. The component takes care of displaying only content corresponding to the active tab.</p>

      <p>Each tabbed interface needs to have <code>ariaLabel</code> or <code>ariaLabelledBy</code> and also an identifier, <code>tabsID</code>, that is unique in regard to a page where tabs are rendered. Another purpose of <code>tabsId</code> is to link <code>KTabsList</code> and <DocsLibraryLink component="KTabsPanel" /> representing a single tabbed interface. These two components also need to share information about the currently active tab stored in <code>activeTabId</code>.</p>

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
    </DocsPageSection>

    <DocsPageSection title="With router" anchor="#with-router">
      <p>When implementing tabs with the router, it's the router view rather than <DocsLibraryLink component="KTabsPanel" /> that is responsible for displaying the active tab content.</p>

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

      <p>Note that here, tabs content is not passed to <DocsLibraryLink component="KTabsPanel" /> via named slots, for it's the router view that's responsible for rendering it.</p> 

      <p>However, it is still required to wrap the active tab content in <DocsLibraryLink component="KTabsPanel" />. Otherwise, even though tabs may seem to function correctly at first glance, accessibility would be broken.</p>

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

    <DocsPageSection title="More tabs on a page" anchor="#more-tabs-on-a-page">
      <p>When there are two or more tabbed interfaces on one page, it is important to identify each one of them with an ID unique in regard to the page. Otherwise, some a11y features may break.</p>

      <p>This is achieved by providing a unique value to <code>tabsId</code> property:</p>

      <DocsShowCode language="html">
        <KTabsList tabsId="firstTabs" />
        <KTabsPanel tabsId="firstTabs" />

        <KTabsList tabsId="secondTabs" />
        <KTabsPanel tabsId="secondTabs" />
      </DocsShowCode>
    </DocsPageSection>

    <DocsPageSection title="Appearance" anchor="#appearance">
      <p>There are several ways to adjust tabs styling.</p>

      <p>Using props is the most straightforward:</p>

      <DocsShow language="html" dark>
        <KTabsList
          v-model="ex2activeTabId"
          tabsId="tabsProps"
          ariaLabel="Coach reports"
          :tabs="tabs"
          :color="$themeTokens.textInverted"
          :colorActive="$themeTokens.textInverted"
          :backgroundColor="$themeTokens.primary"
          :hoverBackgroundColor="$themeTokens.primaryDark"
        />
        <KTabsPanel
          tabsId="tabsProps"
          :activeTabId="ex2activeTabId"
        />
      </DocsShow>

      <DocsShowCode language="html">
        <KTabsList
          v-model="activeTabId"
          tabsId="tabsProps"
          ariaLabel="Coach reports"
          :tabs="tabs"
          :color="$themeTokens.textInverted"
          :colorActive="$themeTokens.textInverted"
          :backgroundColor="$themeTokens.primary"
          :hoverBackgroundColor="$themeTokens.primaryDark"
        />
      </DocsShowCode>

      <p>When that's not sufficient, <code>appearanceOverrides</code> and <code>appearanceOverridesActive</code> can be used, where the former complements or overrides styles common to all tabs and the latter contains styles specific to an active tab:</p>

      <DocsShow language="html">
        <KTabsList
          v-model="ex3activeTabId"
          tabsId="tabsAppearanceOverrides"
          ariaLabel="Coach reports"
          :tabs="tabs"
          :appearanceOverrides="{
            ':hover': {
              color: $themeTokens.primary
            },
            textTransform: 'none',
            margin: '0 32px'
          }"
          :appearanceOverridesActive="{
            borderBottomWidth: '6px'
          }"
        />
        <KTabsPanel
          tabsId="tabsAppearanceOverrides"
          :activeTabId="ex3activeTabId"
        />
      </DocsShow>

      <DocsShowCode language="html">
        <KTabsList
          v-model="activeTabId"
          tabsId="tabsAppearanceOverrides"
          ariaLabel="Coach reports"
          :tabs="tabs"
          :appearanceOverrides="{
            ':hover': {
              color: $themeTokens.primary
            },
            textTransform: 'none',
            margin: '0 32px'
          }"
          :appearanceOverridesActive="{
            borderBottomWidth: '6px'
          }"
        />
      </DocsShowCode>

      <p>Lastly, the <code>tab</code> slot can be used to adjust labels, for example to add icons. It's a scoped slot that exposes <code>tab</code> object and <code>isActive</code> boolean value:</p> 

      <DocsShow language="html">
        <KTabsList
          v-model="ex4activeTabId"
          tabsId="tabsSlot"
          ariaLabel="Coach reports"
          :tabs="tabs"
        >
          <template #tab="{ tab, isActive }">
            <KLabeledIcon
              :icon="icons[tab.id]"
              :label="tab.label"
              :color="isActive ? $themeTokens.primary : $themeTokens.annotation"
            />
          </template>
        </KTabsList>
        <KTabsPanel
          tabsId="tabsSlot"
          :activeTabId="ex4activeTabId"
        />
      </DocsShow>

      <DocsShowCode language="html">
        <KTabsList
          v-model="activeTabId"
          tabsId="tabsSlot"
          ariaLabel="Coach reports"
          :tabs="tabs"
        >
          <template #tab="{ tab, isActive }">
            <KLabeledIcon
              :icon="icons[tab.id]"
              :label="tab.label"
              :color="isActive ? $themeTokens.primary : $themeTokens.annotation"
            />
          </template>
        </KTabsList>
      </DocsShowCode>

      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
      <DocsShowCode language="javascript">
        icons: {
          tabLessons: 'lesson',
          tabLearners: 'person',
          tabGroups: 'people',
        },
      </DocsShowCode>
      <!-- eslint-enable -->
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <DocsInternalLink text="Tabs page" href="/tabs" /> has an overview and usage guidance for all tab-related components
        </li>
        <li><DocsLibraryLink component="KTabsPanel" /> is a component to be used together with <code>KTabsList</code></li>
        <li>
          <DocsLibraryLink component="KTabs" /> is an alternative way to implement tabs
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
        ex1activeTabId: 'tabLessons',
        ex2activeTabId: 'tabLessons',
        ex3activeTabId: 'tabLessons',
        ex4activeTabId: 'tabLessons',
        icons: {
          tabLessons: 'lesson',
          tabLearners: 'person',
          tabGroups: 'people',
        },
      };
    },
  };

</script>


<style lang="scss" scoped></style>
