<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">

      <p>
        Implements a dropdown set of options, based on <DocsExternalLink text="Keen's UI Menu" href="https://josephuspaye.github.io/Keen-UI/#/ui-menu" />. See these docs to understand the current implementation of the options object array.
      </p>
      <p>
        Notable possible for configuring the menu include: icons, text, secondary text, and dividers. Additionally, you can customize the appearance and render complex options using the "options" slot and its associated slot-props.
      </p>
      <p>
        The dropdown will typically contain the user's focus while they use the arrow keys to navigate the options. The <code>Tab</code> and <code>Esc</code> keys will close the menu and emit a <code>@close</code> event. The <code>Tab</code> key will pass along the browser event that triggered the close will be emitted by way of a <code>@tab</code> event on the <code>KDropdownMenu</code> which can be useful for managing focus after the menu is closed.
      </p>
      <p>
        Please see the <DocsInternalLink href="/buttons#dropdowns" text="Dropdown section of the Buttons and links page" /> on the buttons page for more details about how to use with a button, and a code example.
      </p>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
