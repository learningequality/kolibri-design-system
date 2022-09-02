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
        Prior to 09/2022, this component also managed the button associated with the dropdown menu, but the API has changed for a clearer division of responsibilities. 
        Please see the <DocsInternalLink href="/buttons#dropdowns" text="Dropdown section of the Buttons and links page" /> on the buttons page for more details about how to use with a button, and a code example.
      </p>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
