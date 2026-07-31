<template>

  <DocsPageTemplate>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        Floating elements are UI elements that appear above the page content, such as tooltips and
        dropdown menus. KDS provides built-in components as well as low-level logic for managing the
        positioning of any floating element.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Terms"
      anchor="#terms"
    >
      <ul>
        <li>
          <i><strong>Floating element</strong></i> appears or disappears in response to user
          interaction with the activator element. Common examples include tooltips and dropdown
          menus.
        </li>
        <li>
          <i><strong>Activator element</strong></i> is an element that a user interacts with to
          activate a floating element. It could be a button that opens a dropdown menu, or an icon
          that shows a tooltip on hover.
        </li>

        <li>
          <i><strong>Anchor element</strong></i> is the element a floating element is positioned
          against. It is often the same as the activator element, but not always. For example, a
          tooltip might be anchored to the info icon next to the input, but activated by focusing
          the input itself.
        </li>
      </ul>
    </DocsPageSection>

    <DocsPageSection
      title="Components"
      anchor="#components"
    >
      <ul>
        <li><DocsLibraryLink component="KTooltip" /> displays a tooltip</li>
        <li><DocsLibraryLink component="KDropdownMenu" /> displays a dropdown or context menu</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection
      title="Composables"
      anchor="#composables"
    >
      <ul>
        <li>
          <DocsLibraryLink component="useKFloatingPosition" /> manages the positioning of floating
          elements relative to their anchor elements
        </li>
        <li>
          <DocsLibraryLink component="useKFloatingInteraction" /> observes interactions with
          activator elements, such as hover, click, and others, to determine when a floating element
          should become active
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>
