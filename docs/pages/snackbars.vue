<template>

  <DocsPageTemplate>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        Snackbars are short and affirmative messages that momentarily grab the user’s attention to
        convey non-critical information. They are transient and do not persist on the page.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <p>
        Snackbars typically appear following an action taken by the user, and the contents of the
        snackbar should inform the user something about the results of an operation starting or
        completing successfully.
      </p>
      <p>Snackbars should be located 24px from the bottom-left corner of the screen.</p>
      <p>
        Only one snackbar should be visible at a time. If multiple snackbars need to appear, have
        them appear sequentially, replacing the previous snackbar.
      </p>
      <p>
        Avoid using snackbars for critical information. It may be difficult for users with low
        dexterity or vision to access it. Consider using an alert banner or modal instead.
      </p>
      <p>
        Snackbars can occasionally be used for other purposes. Some atypical use-cases include
        alerts for being signed out due to inactivity, or prompting the user to move on after
        completing a resource.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Inline buttons"
      anchor="#inline-buttons"
    >
      <p>
        Snackbars may occasionally include a button so the user can take a follow up, non-critical
        action. Common examples are 'undo' and 'retry'. Note that some users will never have the
        opportunity to click this button.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Text content"
      anchor="#text-content"
    >
      <p>Snackbar messages should be concisely written sentence fragments. Examples include:</p>
      <ul>
        <li>Profile updated</li>
        <li>Changes saved</li>
        <li>Resource added</li>
      </ul>

      <p>For longer messages, consider a different pattern.</p>

      <p>
        Avoid including user-inputted text such as the name of a resource or lesson because we have
        less control over the length of this text.
      </p>

      <p>Snackbar text should have a maximum of 2 lines (truncate with ellipsis).</p>
    </DocsPageSection>

    <DocsPageSection
      title="Specifications"
      anchor="#specifications"
    >
      <ul>
        <li>Timeout: 5 seconds</li>
        <li>
          Background color:
          <DocsInternalLink
            text="palette.grey.v_800"
            code
            href="/colors#palette-grey-v_800"
          />
        </li>
        <li>
          Text color:
          <DocsInternalLink
            text="tokens.textInverted"
            code
            href="/colors#tokens-textInverted"
          />
        </li>
        <li>
          Box shadow:
          <DocsInternalLink
            text="%dropshadow-2dp"
            code
            href="/styling#drop-shadows"
          />
        </li>
        <li>Text: 14px, bold</li>
        <li>Height: Maximum 2 lines of text (truncate with ellipsis)</li>
        <li>Min width: 344px</li>
        <li>Max width: 512px</li>
        <li>Corner radius: 4px</li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
