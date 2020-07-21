<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Snackbars are short and affirmative messages that momentarily grab the user’s attention to convey non-critical information. Compared to other alert mechanisms, they are transient and generally do not persist on the page.
      </p>
      <p>
        In Kolibri, snackbars typically appear following an action taken by the user, and the contents of the snackbar should inform the user something about the success of the action.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <p>
        Snackbars confirm the following:
      </p>
      <ul>
        <li>An operation was successful</li>
        <li>An operation has started or ended</li>
        <li>A user-made selection or removal was made</li>
      </ul>

      <p>
        Special usage cases:
      </p>
      <ul>
        <li><strong>User inactivity</strong>: the user automatically signs out from Kolibri due to inactivity</li>
        <li><strong>Guiding learner progression</strong>: after completing a resource a snackbar appears prompting the user to move to the next resource</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Actions" anchor="#actions">
      <p>
        Snackbars can house button text so the user can take a follow up action
      </p>
      <ul>
        <li>Button text should be 1 verb</li>
        <li>A “Undo” action can be provided for users to reverse an operation</li>
        <li>A “Retry” action can be provided for users to restart an operation</li>
        <li>Have a timeout of 6 seconds so users can read and decide whether to take action</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Language" anchor="#language">
      <ul>
        <li>Snackbars should contain short messages</li>
        <li>Avoid user-created references (e.g. name of a resource)</li>
        <li>Snackbar text should be written in a consistent Noun + verb format (e.g. “profile updated, changes saved, connection timed out)</li>
        <li>Snackbar messages may span two lines to accomodate cases such as long translation or disconnection messages </li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Layout and quantity" anchor="#layout">
      <ul>
        <li>When confirming an action inside of a modal, the snackbar appears above the scrim </li>
        <li>Situate snackbars on the bottom left corner of the screen, with 24px left and bottom margin</li>
        <li>Only one snackbar can be visible at any given time. If multiple snackbars need to appear, have them appear one at a time and immediately replace the previous snackbar</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection title="Accessibility" anchor="#accessibility">
      <ul>
        <li>Avoid using snackbars for critical information that users need to act on immediately. It may be difficult for users with low dexterity or vision to access it. Consider using an alert banner or dialog instead.</li>
      </ul>
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
