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

      <p>It is meant to be used together with <DocsLibraryLink component="KTabsPanel" />. See the <DocsInternalLink text="Tabs page" href="/tabs" /> for guidance on all tab-related components, how they compare, as well as on how to use them together with the router.</p>

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
