<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Errors occur when the software fails to do what the user expected it to or when the system fails. The system should display clear messages to help users identify when these errors happen and ways to quickly understand and resolve them.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Error types" anchor="#error-types">
      <h3>
        User errors
      </h3>
      <p>
        User errors occur when a user input or interaction isn’t understood by the system. Examples include invalid field inputs and accessing blocked pages.
      </p>
      <h3>
        System errors
      </h3>
      <p>
        System errors are usually caused by factors that are not the fault of the user. Examples include connectivity or network issues, missing data or page not found, and other unexpected issues.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Language" anchor="#language">
      <p>
        Follow the <DocsInternalLink text="writing guidelines" href="/writing" /> with a special focus on clear, concise, and natural language. Explain causes of errors if it will help the user resolve their issue, but do not use complex technical terms and run-on explanations.
      </p>
      <p>
        Error messages should also be actionable. Offer the solution as an action when possible and make sure the action label is specific to the outcome. If including an action isn’t possible, then briefly explain how the user can fix their problem.
      </p>
      <DocsDoNot>
        <template #do>
          <p class="do-dont">
            “Sorry, something went wrong. <u>Refresh page</u>"
          </p>
        </template>
        <template #not>
          <p class="do-dont">
            “500 internal server error. It looks like the server failed to fulfill an apparently valid GET or POST request. We are aware of this issue and you can try solving it by reloading the page. We apologize for the inconvenience and hope this doesn’t occur again.”
          </p>
        </template>
      </DocsDoNot>
      <h3>
        Tone
      </h3>
      <p>
        Let the user know what went wrong without blaming them. Do not use all caps, exclamation points, or other alarmist language.
      </p>
      <DocsDoNot>
        <template #do>
          <p class="do-dont">
            “Please enter a valid email”
          </p>
        </template>
        <template #not>
          <p class="do-dont">
            “WARNING!! You didn’t fill this out”
          </p>
        </template>
      </DocsDoNot>
      <p>
        Even though errors can induce negative emotions, avoid being too whimsical and lighthearted. This can have the opposite effect and cause more frustration.
      </p>
      <DocsDoNot>
        <template #do>
          <p class="do-dont">
            “Storage limit reached”
          </p>
        </template>
        <template #not>
          <p class="do-dont">
            “Whoops! Looks like the tank is too full &#x1f60e;"
          </p>
        </template>
      </DocsDoNot>
    </DocsPageSection>

    <DocsPageSection title="Components and patterns" anchor="#components">
      <h3>
        Color
      </h3>
      <DocsColorBlock name="tokens.error" />
      <h3>
        Icon
      </h3>
      <KIcon icon="error" />
      <p>
        Sizes: <code>14px</code>, <code>24px</code>
      </p>
      <h3>
        Banner
      </h3>
      <p>
        Banners are appended to the app bar and notify the user about global system errors and/or notifications that affect the whole app experience.
      </p>
      <img src="./banner.png">
      <h3>
        Error summary
      </h3>
      <p>
        Error summaries should appear at the top of the page and use an alert component. Use them in forms or for page-level errors that are not associated with a specific component or location on the page.
      </p>
      <img src="./alert.png">
      <h3>
        Inline error messages
      </h3>
      <p>
        Place inline error messages in close proximity to where the error occurred. This can be an icon only, or icon and text. When paired with text, use <code>KLabeledIcon</code>
      </p>
      <img src="./inline-error.png">
      <h3>
        Page error
      </h3>
      <p>
        Sometimes pages do not load because of 404 or 500 errors, unsupported browsers, and restricted permissions. Users should see a brief explanation of what went wrong and an action that might help address the problem.
      </p>
      <img src="./page.png">
    </DocsPageSection>

    <DocsPageSection title="Preventing errors" anchor="#preventing-errors">
      <p>
        One of the best ways to handle errors is to prevent them from happening in the first place. Following is a non-exhaustive list of common patterns that our products use to minimize the chance of users experiencing frustration from errors.
      </p>
      <h3>
        Disable, don't hide
      </h3>
      <p>
        If an operation can cause unintentional and irreversible data loss, or will create errors under the current condition, disable the action rather than hiding it. Disabling it provides the user with context as to what is possible. It should be clear to the user what they need to do for the action to become possible.
      </p>
      <img src="./disable.png">
      <p>
        However, forms that create or update data generally should not have a disabled submit button and follow our form validation patterns instead.
      </p>
      <h3>
        Warnings
      </h3>
      <p>
        For operations that imply risky permanent data loss, use modals for the user to confirm they really intend to remove that data. Be sure to clearly explain the consequences.
      </p>
      <p>
        For conditions which partially block or interrupt the user experience, use a warning icon with <code>palette.orange.v_200</code> and informative language of the consequences under the current condition.
      </p>
      <img src="./warning.png">
      <h3>
        Undo
      </h3>
      <p>
        Modals are helpful for preventing errors but should not be overused since they can disrupt user flow. For operations with relatively significant but not critical consequences, provide the option to undo an action.
      </p>
      <img src="./undo.png">
      <h3>
        Good defaults
      </h3>
      <p>
        Especially for repetitive, common actions, setting configurations to <strong>known</strong> commonly used defaults can help people save time and avoid overlooking unintentional errors.
      </p>
      <h3>
        Progressive disclosure
      </h3>
      <p>
        Error messages are important, but should not overwhelm the user. Apply the concept of <DocsExternalLink href="https://www.interaction-design.org/literature/topics/progressive-disclosure" text="progressive disclosure" /> to prevent surprises and frustration.
      </p>
      <p>
        For error messages, this means not showing all error messages at once. Show enough information for the user to discover where the problem is, and present the detail they need at the moment of resolving the error.
      </p>
      <DocsDoNot>
        <template #do>
          <img class="do-dont" src="./disclosure-do.png">
        </template>
        <template #not>
          <img class="do-dont" src="./disclosure-dont.png">
        </template>
      </DocsDoNot>
    </DocsPageSection>

    <DocsPageSection title="Accessibility" anchor="#accessibility">
      <p>
        Do not use red color as the only indicator for errors. Color alone is not sufficient to indicate an error state. Errors must be accompanied by an additional visual indicator such as an icon as mentioned in <DocsInternalLink text="inline error messages" href="/errors#components" />.
      </p>
      <p>
        Important information to resolve errors should also be keyboard accessible. Avoid using snackbars and tooltips as the primary way to access this critical information.
      </p>
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<script>

  import KIcon from '~~/lib/KIcon/';
  import DocsColorBlock from '~/common/DocsColorBlock';

  export default {
    components: {
      DocsColorBlock,
      KIcon,
    },
  };

</script>


<style lang="scss" scoped>

  .img,
  .do-dont {
    max-width: 250px;
  }

</style>
