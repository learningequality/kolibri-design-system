<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Buttons use the <code>&lt;button&gt;</code> HTML tag and trigger an action on the current
        page. Links use the <code>&lt;a&gt;</code> HTML tag and navigate to a new URL.
      </p>
      <p>
        Buttons and links are <em>not</em> visually distinguishable.
        Buttons can visually look like classic links,
        and links can visually look like classic buttons.
      </p>
      <p>
        When the user would expect to use navigation history, right-click to copy a URL,
        or control-click to open a page in a new tab, then a link should be used.
        Otherwise, a button should be used.
      </p>
      <p>As such, there are three components that all behave similarly, but are used for different purposes:</p>
      <ul>
        <li>
          <code>KButton</code> is used to create <code>&lt;button&gt;</code> tags with
          <code>@click</code> event handlers.
        </li>
        <li>
          <code>KRouterLink</code> is used to create Vue router <code>&lt;router-link&gt;</code>
          components with <code>:to</code> properties. These compile into <code>&lt;a&gt;</code>
          tags.
        </li>
        <li>
          <code>KExternalLink</code> is used to create standard <code>&lt;a&gt;</code> tags with an
          <code>href</code> attribute.
        </li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Visual styles" anchor="#visualstyles">
      <p>
        There are 3 main appearances of button and link components.
        (Remember that a button component can visually look like a link,
        and a link component can visually look like a button.)
        Each appearance maps to a different level of
        <DocsExternalLink href="https://en.wikipedia.org/wiki/Visual_hierarchy" text="visual hierarchy" />:
      </p>
      <ul>
        <li><strong>Raised buttons:</strong> button-like appearance for more prominent actions</li>
        <li><strong>Flat buttons:</strong> button-like appearance for less prominent actions</li>
        <li>
          <strong>Basic links:</strong>
          hyperlink-like appearance for deemphasized actions, or actions inline within text
        </li>
      </ul>
      <DocsShow>
        <KButtonGroup>
          <KButton text="Raised button" :primary="true" appearance="raised-button" />
          <KButton text="Flat button" :primary="true" appearance="flat-button" />
          <KIconButton tooltip="A tooltip" text="Flat button" :primary="false" icon="plus" appearance="flat-button" />
          <KButton text="Basic link" :primary="true" appearance="basic-link" />
        </KButtonGroup>
      </DocsShow>

      <p>
        Actions with a button-like appearance can also be <strong>primary</strong> or
        <strong>secondary</strong>. There should only be one primary button visible at a time,
        and it should be a common or default action.
      </p>

      <DocsShow>
        <KButtonGroup style="margin-bottom: 8px;">
          <KButton text="Primary" :primary="true" appearance="raised-button" />
          <KButton text="Secondary" :primary="false" appearance="raised-button" />
          <KIconButton tooltip="KIconButton" icon="plus" :primary="true" appearance="raised-button" />
        </KButtonGroup>
        <br>
        <KButtonGroup>
          <KButton text="Primary" :primary="true" appearance="flat-button" />
          <KButton text="Secondary" :primary="false" appearance="flat-button" />
          <KIconButton tooltip="KIconButton" icon="plus" :primary="false" appearance="flat-button" />
        </KButtonGroup>
      </DocsShow>

      <p>
        Note that we don't use a "secondary basic link" style.
      </p>
      <p>
        Buttons can also contain both text and an icon. Based on the need, the icon can come either before or after the text. This should be used sparingly - only when the icon significantly adds value to the meaning of the button.
      </p>

      <DocsShow>
        <KButtonGroup>
          <KButton text="Previous" :primary="true" icon="back" appearance="raised-button" />
          <KButton text="Next" :primary="true" iconAfter="forward" appearance="raised-button" />
        </KButtonGroup>
      </DocsShow>

    </DocsPageSection>
    <DocsPageSection title="Label text" anchor="#labels">
      <ul>
        <li>Labels should typically have a single word, or two at most, although there is an exception for links</li>
        <li>
          Avoid ambiguity; be specific about the action that will be performed. For example,
          use 'Save' instead of 'OK'
        </li>
        <li>Never use commas or other punctuation</li>
        <li>For raised and flat buttons, always use all-caps text</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Placement" anchor="#placement">
      <p>
        We have some conventions regarding placement of 'raised button' and
        'flat button' actions:
      </p>
      <ul>
        <li>Right-aligned in modal pop-ups</li>
        <li>Left-aligned in page forms</li>
        <li>Global actions related to tables should be put above the table and right-aligned</li>
      </ul>

    </DocsPageSection>

    <DocsPageSection title="Icon buttons" anchor="#icon_buttons">
      <p>
        Use icon buttons for editors, or in situations where using text buttons would hinder the user experience.
      </p>
      <p>
        Default to using flat secondary style for icon buttons.
      </p>
      <p>
        Be sure to consider internationalization, translation, and cultural meaning in the use of icon buttons.
      </p>
      <p>
        Always include a tooltip with the name of the action for icon buttons.
      </p>
      <DocsShow>
        <KButtonGroup>
          <KIconButton tooltip="Add" text="Flat button" :primary="true" icon="plus" appearance="flat-button" />
          <KIconButton tooltip="Subtract" text="Flat button" :primary="false" icon="minus" appearance="flat-button" />
        </KButtonGroup>
      </DocsShow>

    </DocsPageSection>

    <DocsPageSection title="Dropdowns" anchor="#dropdowns">
      <p>
        There are variations of buttons which can open a dropdown menu:
      </p>
      <!-- TODO: implement 3 examples: primary button, primary flat button, and secondary icon button that function as dropdowns. See Google doc for example -->
      <DocsShow>
        <KDropdownMenu style="margin-right: 8px;" text="Primary" :primary="true" :options="['Primary', 'Dropdown']" appearance="raised-button" />
        <KDropdownMenu style="margin-right: 8px;" text="Secondary" :primary="false" :options="['Secondary', 'Dropdown']" appearance="raised-button" />
        <KDropdownMenu text="Icon dropdown" :primary="false" :options="['Icon button', 'Flat button', 'Dropdown']" appearance="raised-button">
          <KIconButton slot="button" tooltip="Dropdown options" icon="optionsHorizontal" appearance="flat-button" :primary="false" />
        </KDropdownMenu>
      </DocsShow>

    </DocsPageSection>

    <DocsPageSection title="Visual specs" anchor="#specs" />
    <ul>
      <li>Border radius: 2px</li>
      <li>Elevation: 4dp</li>
      <li>Font size: 14px</li>
      <li>Icon size: 14px</li>
      <li>Text button padding: 8px 16px</li>
      <li>Icon button padding: 8px</li>
    </ul>
    <DocsDoNot>
      <template v-slot:not>
        <ul>
          <li>Use outlines for buttons</li>
          <li>Use full-width buttons</li>
          <li>Set arbitrary fixed widths</li>
          <li>Change the border radius</li>
          <li>Change the drop-shadow</li>
        </ul>
      </template>
    </DocsDoNot>

  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
