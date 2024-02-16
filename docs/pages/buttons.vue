<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Buttons use the <code>&lt;button&gt;</code> HTML tag and trigger an action on the current page. Links use the <code>&lt;a&gt;</code> HTML tag and navigate to a new URL.
      </p>
      <p>
        Buttons and links are <em>not</em> visually distinguishable. Buttons can visually look like classic links, and links can visually look like classic buttons.
      </p>
      <p>
        When the user would expect to use navigation history, right-click to copy a URL, or control-click to open a page in a new tab, then a link should be used. Otherwise, a button should be used.
      </p>
      <p>As such, there are three components that all behave similarly, but are used for different purposes:</p>
      <ul>
        <li>
          <DocsLibraryLink component="KButton" /> is used to create <code>&lt;button&gt;</code> tags with <code>@click</code> event handlers.
        </li>
        <li>
          <DocsLibraryLink component="KRouterLink" /> is used to create Vue router <code>&lt;router-link&gt;</code> components with <code>:to</code> properties. These compile into <code>&lt;a&gt;</code> tags.
        </li>
        <li>
          <DocsLibraryLink component="KExternalLink" /> is used to create standard <code>&lt;a&gt;</code> tags with an <code>href</code> attribute.
        </li>
      </ul>
      <p>We also provide:</p>
      <ul>
        <li>a <DocsLibraryLink component="KButtonGroup" /> wrapper component to set standardized spacing between groups of buttons.</li>
        <li>a <DocsLibraryLink component="KIconButton" /> for smaller icon-and-tooltip buttons</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Visual styles" anchor="#visualstyles">
      <p>
        There are 3 main appearances of button and link components. (Remember that a button component can visually look like a link, and a link component can visually look like a button.) Each appearance maps to a different level of <DocsExternalLink href="https://en.wikipedia.org/wiki/Visual_hierarchy" text="visual hierarchy" />:
      </p>
      <ul>
        <li>
          <strong>Raised buttons:</strong> button-like appearance for more prominent actions
        </li>
        <li>
          <strong>Flat buttons:</strong> button-like appearance for less prominent actions
        </li>
        <li>
          <strong>Basic links:</strong> hyperlink-like appearance for deemphasized actions, or actions inline within text
        </li>
      </ul>
      <DocsShow>
        <KButtonGroup>
          <KButton text="Raised button" :primary="true" appearance="raised-button" />
          <KButton text="Flat button" :primary="true" appearance="flat-button" />
          <KButton text="Basic link" :primary="true" appearance="basic-link" />
        </KButtonGroup>
      </DocsShow>

      <p>
        Actions with a button-like appearance can also be <strong>primary</strong> or <strong>secondary</strong>. There should only be one primary button visible at a time, and it should be a common or default action.
      </p>

      <DocsShow>
        <KButtonGroup style="margin-bottom: 8px;">
          <KButton text="Primary" :primary="true" appearance="raised-button" />
          <KButton text="Secondary" :primary="false" appearance="raised-button" />
        </KButtonGroup>
        <br>
        <KButtonGroup>
          <KButton text="Primary" :primary="true" appearance="flat-button" />
          <KButton text="Secondary" :primary="false" appearance="flat-button" />
        </KButtonGroup>
      </DocsShow>

      <p>
        Note that we don't have a "secondary basic link" style.
      </p>
      <p>
        Buttons can also contain an icon. Based on the need, the icon can come either before or after the text. Icons should be used sparingly when it adds significant value to the meaning of the button.
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
        <li>Avoid commas and other punctuation</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Placement" anchor="#placement">
      <p>
        We have some conventions regarding placement of 'raised' and 'flat' buttons:
      </p>
      <ul>
        <li>Right-aligned at the bottom of modal pop-ups</li>
        <li>Left-aligned at the bottom of page forms</li>
        <li>Global actions related to full pages should be right-aligned and to the right of the page title on large screens, and left-aligned below the title on small screens. Use of <code>KGrid</code> is recommended</li>
      </ul>
      <p>
        Use the <DocsLibraryLink component="KButtonGroup" /> component to add spacing between adjacent buttons.
      </p>

    </DocsPageSection>

    <DocsPageSection title="Icon buttons" anchor="#icon_buttons">
      <p>
        Use <DocsLibraryLink component="KIconButton" /> in situations where larger buttons with visible text would hinder the user experience. Use the flat secondary style unless the action should be highlighted.
      </p>
      <p>
        A tooltip with the name of the action is required for an icon button.
      </p>
      <DocsShow>
        <KButtonGroup>
          <KIconButton tooltip="Add" icon="plus" :primary="true" appearance="raised-button" />
          <KIconButton tooltip="Subtract" icon="minus" :primary="false" appearance="raised-button" />
          <KIconButton tooltip="Add" text="Flat button" :primary="true" icon="plus" appearance="flat-button" />
          <KIconButton tooltip="Subtract" text="Flat button" :primary="false" icon="minus" appearance="flat-button" />
        </KButtonGroup>
      </DocsShow>
      <p>
        Be sure to consider internationalization, translation, and cultural implications when choosing icons.
      </p>

    </DocsPageSection>

    <DocsPageSection title="Dropdowns" anchor="#dropdowns">
      <p>
        Buttons can also have drop-down menus. 
      </p>
      <p> 
        <code>KDropdownMenu</code> component can be added using <code>#menu</code> slot in either a <code>KButton</code> or a <code>KIconButton</code>. 
      </p>

      <DocsShow>
        <KButtonGroup>
          <KButton
            text="Options"
            :primary="false"
            iconAfter="chevronDown"
          >
            <KDropdownMenu
              style="margin-right: 16px;"
              text="Primary"
              :primary="false"
              :options="['Option 1', 'Option 2']"
              appearance="raised-button"
            />
          </KButton>
          <KIconButton
            tooltip="Dropdown options"
            icon="optionsHorizontal"
            appearance="flat-button"
            :primary="false"
          >
            <template #menu>
              <KDropdownMenu
                style="margin-right: 16px;"
                text="Primary"
                :primary="true"
                :options="['Option 1', 'Option 2']"
                appearance="raised-button"
              />
            </template>
          </KIconButton>
        </KButtonGroup>

      </DocsShow>
      <p>For more guidance, see the <DocsLibraryLink component="KDropdownMenu" /> component.</p>
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

  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>