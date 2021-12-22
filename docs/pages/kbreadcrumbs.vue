<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <div>
        Breadcrumbs help understand the hierarchy among levels and a user's location in it. We often use breadcrumbs to aid navigation across channels, topic trees, and resources.

        <DocsShow block>
          <KBreadcrumbs
            :items="[
              { text: 'Global Digital Library', link: { path: '#' } },
              { text: 'English', link: { path: '#' } },
              { text: 'Level 2 ', link: { path: '#' } },
            ]"
          />
        </DocsShow>
      </div>

      <div>
        Breadcrumbs take the full width of their container. When there is not enough space available, items that can't be displayed will automatically collapse into the drop-down and visible items might also get truncated:

        <DocsShow
          block
          :style="{ maxWidth: '500px' }"
        >
          <KBreadcrumbs
            :items="[
              { text: 'Global Digital Library', link: { path: '#' } },
              { text: 'English', link: { path: '#' } },
              { text: 'Level 2 ', link: { path: '#' } },
              { text: 'Kaka and Munni: A Folktale from Punjab', link: { path: '#' } }
            ]"
          />
        </DocsShow>
      </div>

      <div>
        When there is only one item, it won't be displayed by default. If needed, you can set <code>showSingleItem</code> to <code>true</code> to show it:

        <DocsShow block>
          <KBreadcrumbs
            :items="[
              { text: 'Global Digital Library', link: { path: '#' } },
            ]"
            showSingleItem 
          />
        </DocsShow>
      </div>
    </DocsPageSection>

    <DocsPageSection title="Placement" anchor="#placement">
      <ul>
        <li>Directly above the content to be navigated through</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Guidelines" anchor="#guidelines">
      <ul>
        <li>It should include the current item</li>
        <li>The current item can be repeated in a page header</li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>
