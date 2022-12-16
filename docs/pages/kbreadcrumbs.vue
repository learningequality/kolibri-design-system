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
        When there is only one item, it won't be displayed by default. You can set <code>showSingleItem</code> to <code>true</code> to show it:

        <DocsShow block>
          <KBreadcrumbs
            :items="[
              { text: 'Global Digital Library', link: { path: '#' } },
            ]"
            showSingleItem 
          />
        </DocsShow>
      </div>

      <div>
        Links to intermediary items can be disabled by omitting the <code>link</code> attribute, or making it falsey.

        <DocsShow block>
          <KBreadcrumbs
            :items="[
              { text: 'Global Digital Library', link: { path: '#' } },
              { text: 'English' },
              { text: 'Reading ', link: { path: '#' } },
              { text: 'Level 2 ', link: { path: '#' } },
            ]"
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
        <li>Allow the single breadcrumb (<code>showSingleItem=true</code>) only when there isn't any other page header or label that shows what the current level is</li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>
