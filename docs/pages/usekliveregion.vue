<template>
  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        A composable that offers <code>sendPoliteMessage</code> and <code>sendAssertiveMessage</code>
        functions that send polite and assertive messages to their corresponding
        <DocsExternalLink
          href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions"
          text="ARIA live regions"
        />.
      </p>
    </DocsPageSection>

    <DocsPageSection title="When to use live regions" anchor="#usage">
      <p>
        Before sending messages to live regions, always research carefully if you really need it for
        the task ahead. Live regions can be
        <DocsExternalLink
          href="https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-2/#avoid-live-regions-if-you-can"
          text="buggy and inconsistent"
        />. There are often better alternatives, such as utilizing
        <DocsExternalLink
          href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes"
          text="WAI-ARIA attributes"
        />. A good rule of thumb is to use live regions only when there's no other way.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <p>
        Since polite and assertive regions are inserted to an application's document body
        automatically
        <DocsInternalLink
          href="/installation#install-plugin"
          text="during the KDS installation process"
        />, the only thing you need to do to deliver messages is to import and call
        <code>sendPoliteMessage</code> or <code>sendAssertiveMessage</code> from any place in your
        application.
      </p>
      <p>
        These two methods are also used internally from some KDS components to provide a11y out of
        the box. Always check that you don't send messages to announce updates that are already
        being announced from KDS to prevent duplicate announcements.
      </p>

      <h3>Polite message</h3>
      <p>
        Sending a polite message updates the text content of <code>aria-live="polite"</code> region.
        <em>Use it to send messages that can wait to be announced until the user is idle. This should
        typically be the most commonly used method.</em>
      </p>
      <p>Send polite messages with <code>sendPoliteMessage(message)</code>:</p>
      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        import useKLiveRegion from 'kolibri-design-system/lib/composables/useKLiveRegion';

        export default {
          setup() {
            const { sendPoliteMessage } = useKLiveRegion();
            sendPoliteMessage('Polite message');
          }
        };
      </DocsShowCode>
      <!-- eslint-enable -->

      <h3>Assertive message</h3>
      <p>
        Sending an assertive message updates the text content of <code>aria-live="assertive"</code>
        region. <em>Use it only for messages that require immediate attention, such as critical
        errors or warnings, because it interrupts the user's current activity.</em>
      </p>
      <p>Send assertive messages with <code>sendAssertiveMessage(message)</code>:</p>
      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        import useKLiveRegion from 'kolibri-design-system/lib/composables/useKLiveRegion';

        export default {
          setup() {
            const { sendAssertiveMessage } = useKLiveRegion();
            sendAssertiveMessage('Assertive message');
          }
        };
      </DocsShowCode>
      <!-- eslint-enable -->
    </DocsPageSection>

    <!-- New Section: Enhanced Guidance on Polite vs. Assertive -->
    <DocsPageSection title="Polite vs. Assertive Guidelines" anchor="#polite-assertive">
      <p>
        It is essential to choose the appropriate live region type based on the urgency of the message:
      </p>
      <ul>
        <li>
          <strong>Polite (<code>aria-live="polite"</code>):</strong> Suitable for routine notifications,
          status updates, confirmations, or other non-urgent information. The screen reader will announce
          the message once it is idle.
        </li>
        <li>
          <strong>Assertive (<code>aria-live="assertive"</code>):</strong> Use only for urgent messages such
          as errors or critical warnings. These messages interrupt current screen reader activity immediately.
        </li>
      </ul>
      <p>
        <em>Note:</em> Overusing assertive messages can create a disruptive experience. Always consider if a
        polite update may suffice.
      </p>
    </DocsPageSection>

    <!-- New Section: Focus Management Guidance -->
    <DocsPageSection title="Focus Management for Assertive Notifications" anchor="#focus-management">
      <p>
        When an assertive message is used to announce an error or a critical update that requires user
        interaction, ensure that any related actionable elements (such as buttons or form fields) are placed
        immediately after the notification in the DOM.
      </p>
      <p>
        This practice allows screen reader users to quickly navigate to the element that enables them to
        address the issue.
      </p>
      <p><strong>Example:</strong></p>
      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="html">
        <!-- Assertive alert followed immediately by an actionable button -->
        <div aria-live="assertive" role="alert" style="margin-bottom: 1rem;">
          Error: Unable to save changes.
        </div>
        <button type="button">
          Retry
        </button>
      </DocsShowCode>
      <!-- eslint-enable -->
      <p>
        In this example, once the screen reader announces the error, the user can immediately focus on the "Retry"
        button to take corrective action.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Demo" anchor="#demo">
      <p>
        Send messages below and turn on your screen reader. You can also inspect the content of
        <code>&lt;div id="k-live-region"&gt;</code> in the browser console, though the announcement is visible
        only briefly.
      </p>
      <DocsShow language="html">
        <KTextbox
          label="Polite message"
          :value="politeMessageInput"
          @input="updatePoliteMessage"
        />
        <KButton @click="sendPoliteMessage(politeMessageInput)"> Send </KButton>
      </DocsShow>
      <DocsShow language="html">
        <KTextbox
          label="Assertive message"
          :value="assertiveMessageInput"
          @input="updateAssertiveMessage"
        />
        <KButton @click="sendAssertiveMessage(assertiveMessageInput)"> Send </KButton>
      </DocsShow>
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <DocsInternalLink href="/installation#install-plugin" text="KDS installation step" />
          that attaches live regions to an application's document body.
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>
</template>

<script>
  import { ref } from 'vue';
  import useKLiveRegion from '../../lib/composables/useKLiveRegion';

  export default {
    setup() {
      const { sendPoliteMessage, sendAssertiveMessage } = useKLiveRegion();

      const politeMessageInput = ref('Polite hello');
      const updatePoliteMessage = message => {
        politeMessageInput.value = message;
      };

      const assertiveMessageInput = ref('I cannot wait');
      const updateAssertiveMessage = message => {
        assertiveMessageInput.value = message;
      };

      return {
        updatePoliteMessage,
        politeMessageInput,
        updateAssertiveMessage,
        assertiveMessageInput,
        sendPoliteMessage,
        sendAssertiveMessage,
      };
    },
  };
</script>

