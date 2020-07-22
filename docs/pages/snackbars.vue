<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Snackbars are short and affirmative messages that momentarily grab the user’s attention to convey non-critical information. They are transient and do not persist on the page.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <p>
        Snackbars typically appear following an action taken by the user, and the contents of the snackbar should inform the user something about the results of an operation starting or completing successfully.
      </p>
      <p>Snackbars should be located 24px from the bottom-left corner of the screen.</p>
      <p>Only one snackbar should be visible at a time. If multiple snackbars need to appear, have them appear sequentially, replacing the previous snackbar.</p>
      <p>
        Avoid using snackbars for critical information. It may be difficult for users with low dexterity or vision to access it. Consider using an alert banner or modal instead.
      </p>
      <p>
        Snackbars can occasionally be used for other purposes. Some atypical use-cases include alerts for being signed out due to inactivity, or prompting the user to move on after completing a resource.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Inline buttons" anchor="#inline-buttons">
      <p>
        Snackbars may occasionally include a button so the user can take a follow up, non-critical action. Common examples are 'undo' and 'retry'. Note that some users will never have the opportunity to click this button.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Text content" anchor="#text-content">
      <p>
        Snackbar messages should be concisely written sentence fragments. Examples include:
      </p>
      <ul>
        <li>Profile updated</li>
        <li>Changes saved</li>
        <li>Resource added</li>
      </ul>
      <p>Avoid including user-inputted text such as the name of a resource or lesson because we have less control over the length of this text.</p>
    </DocsPageSection>

    <DocsPageSection title="Specifications" anchor="#specifications">
      <ul>
        <li>Background color: $k-grey-900</li>
        <li>Text: 14px white and bolded</li>
        <li>Height: 48px</li>
        <li>Min width: 344px</li>
        <li>Max width: 512px</li>
        <li>Focused state: brand.secondary.v_100</li>
        <li>Box shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);</li>
        <li>Corner radius: 4px</li>
        <li>Timeout: 4 seconds</li>
      </ul>
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
