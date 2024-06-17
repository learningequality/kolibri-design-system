<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">

      <p>
        Implements a dropdown set of options, based on <DocsExternalLink text="Keen's UI Menu" href="https://josephuspaye.github.io/Keen-UI/#/ui-menu" />. See these docs to understand the current implementation of the options object array.
      </p>
      <p>
        Notable possible for configuring the menu include: icons, text, secondary text, and dividers.
      </p>
      <p>
        Please see the <DocsInternalLink href="/buttons#dropdowns" text="Dropdown section of the Buttons and links page" /> on the buttons page for more details about how to use with a button, and a code example.
      </p>

      <h3>Context menu</h3>

      <p>
        This component can be also used to create a context menu, which is a dropdown menu that appears when a user right-clicks on an element.
      </p>

      <DocsShow block>
        <p>
          For example, you can right click on this paragraph to see a context menu.
        </p>
        <KDropdownMenu
          isContextMenu
          :options="[
            { label: 'Option 1' },
            { label: 'Option 2' },
            { label: 'Option 3' },
          ]"
        />
      </DocsShow>

      <DocsShow block>
        <p>
          Note that just one context menu can be open at a time. If you right-click on this paragraph, any other context menu will close.
        </p>
        <KDropdownMenu
          isContextMenu
          :options="[
            { label: 'Option 1' },
            { label: 'Option 2' },
          ]"
        />
      </DocsShow>

      <p>
        To achieve this, set the <code>isContextMenu</code> prop to true.
        The context menu will then be attached to the parent element.
      </p>
      <DocsShowCode language="html">
        <div>
          <p> ... </p>
          <KDropdownMenu
            isContextMenu
            :options="[
              { label: 'Option 1' },
              { label: 'Option 2' },
              { label: 'Option 3' },
            ]"
          />
        </div>
      </DocsShowCode>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
