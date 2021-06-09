<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        The page header displays under the app bar and contains information about the current page, as well as any page-level actions or navigation.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Components" anchor="#components">
      <img src="./page-header.png">
      <p>
        The following components can show up in the page header. Only the page title is required.
      </p>
      <ol>
        <li>
          <strong>Navigation.</strong> This should lead the user to the parent page in the hierarchy. Do not use this on pages that have <DocsInternalLink href="/appbars" text="back arrow bars" />.
        </li>
        <li>
          <strong>Page title.</strong> Keep the title limited to a few words at maximum, and make it specific to the content within the current page. Icons can be also be placed inline of page titles.
        </li>
        <li>
          <strong>Buttons.</strong> Use up to two buttons in the page header. Primary buttons usually begin a flow to add new things to the page. Secondary buttons usually open menus and begin other flows that affect the whole page. Follow <DocsInternalLink href="/buttons" text="button guidelines" />.
        </li>
        <li>
          <strong>Description.</strong> This should be a one-line summary of what the user can accomplish on the current page.
        </li>
      </ol>

      <h3>More on page titles</h3>
      <p>
        Page titles should correspond to <DocsInternalLink href="/appbars/#titles" text="app bar titles" />. If there are tabs in the app bar, the page title should be consistent with the current tab, although a word or two can be added on to the page title for clarity.
      </p>
      <img src="./page-header2.png">
      <p>
        Write any verbs that appear in page titles in the imperative form. Do not use verbs that end in "-ing"; doing so may give users the impression that a task is in progress when it is not.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Page titles and the browser" anchor="#browser">
      <p>
        Page titles should be short and meaningful without context. They should follow a standard naming convention to help users scan multiple tabs, their browser history, bookmarks, and more.
      </p>
      <p>
        Use an en dash to separate each title section.
      </p>
      <p>
        If the page title is also an editable field on the current page, update the page title after the title field loses focus and changes have been saved.
      </p>
      <h3>Browser tab title format examples</h3>
      <ol>
        <li>
          <p>
            <strong>Simple</strong>
          </p>
          <p>
            [Current page title] &#8211; [Class/Channel/Plugin] &#8211; [Product name]
          </p>
          <p>
            <i>Biology &#8211; MIT Blossoms &#8211; Kolibri Studio</i>
          </p>
        </li>
        <li>
          <p>
            <strong>Subtabs, deep hierarchy</strong>
          </p>
          <p>
            [Subtab title] &#8211; [Current page title] &#8211; [Class/Channel/Plugin] &#8211; [Product name]
          </p>
          <p>
            <i>Difficult questions &#8211; Quiz 22 &#8211; Class 1A &#8211; Kolibri</i>
          </p>
        </li>
        <li>
          <p>
            <strong>Fullscreen modals in deep hierarchy (has URL)</strong>
          </p>
          <p>
            [Modal title] &#8211; [Parent page title] &#8211; [Class/Channel/Plugin] &#8211; [Product name]
          </p>
          <p>
            <i>How to steam vegetables &#8211; Level 1 Cooking Lesson &#8211; Class 1A &#8211; Kolibri</i>
          </p>
        </li>
      </ol>
      <h3>
        Truncation
      </h3>
      <p>
        Page titles should have a maximum of 70 characters before truncating. Always display the product name, and truncate other text that appears before it.
      </p>
      <p>
        <i>Worked example: Subtracting 3-digit numbers (regrouping t... &#8211; Kolibri</i>
      </p>
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<style lang="scss" scoped>

  img {
    max-width: 700px;
  }

</style>
