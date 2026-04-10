<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        <code>#k-live-region</code> element with global polite and assertive live regions is
        inserted to an application's document body during the
        <DocsInternalLink
          href="/installation#install-plugin"
          text="KDS installation process"
        />. <code>useKLiveRegion</code> provides an easy and reliable way to send messages to them
        from any place in the application. It is built with best practices in mind to prevent
        messages from getting lost, conflicting with each other, and other common pitfalls.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Guidelines"
      anchor="#guidelines"
    >
      <ul>
        <li>
          <strong>Consider carefully if you really need to use a live region.</strong> Despite all
          best practices, live regions can still be
          <DocsExternalLink
            href="https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-2/#avoid-live-regions-if-you-can"
            text="buggy and inconsistent"
          />. There are often better alternatives, such as utilizing
          <DocsExternalLink
            href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes"
            text="WAI-ARIA attributes"
          />.
        </li>
        <li>
          <strong>Do not manually insert any live regions</strong> (e.g. via <code>aria-live</code>,
          <code>role="alert"</code>, ...). Multiple live regions or live regions nested deep in the
          DOM structure are problematic. Always use <code>useKLiveRegion</code>.
        </li>
        <li>
          <strong>Use assertive messages sparingly and only for time-sensitive/critical notifications
            that absolutely require the user's immediate attention</strong>
          (<DocsExternalLink
            href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions#live_regions"
            text="see more at MDN"
          />).
        </li>
        <li>
          <strong>For errors or updates that need immediate user action, make sure that related elements
            (e.g. buttons) are in focus right after the message has been read</strong>
          by the screen reader, so users can act on them.
        </li>
        <li>
          Ensure that messages are
          <strong>translated, concise and provide useful information.</strong>
        </li>
        <li>
          Some KDS components already send announcements. Always
          <strong>check that you don't send messages that are already being announced from KDS</strong>
          to prevent from duplicate announcements.
        </li>
      </ul>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <p>
        To deliver messages to the global live regions, call
        <code>sendPoliteMessage</code> or <code>sendAssertiveMessage</code> from any place in your
        application.
      </p>

      <h3>Polite message</h3>

      <p>
        Sending a polite message updates the text content of the global
        <code>aria-live="polite"</code> region. Use it to send messages that can wait to be
        announced until the user is idle. This message should typically be the most commonly used.
      </p>

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
        Sending an assertive message updates the text content of
        <code>aria-live="assertive"</code> region.
        <em>It should only be used sparingly and for time-sensitive/critical notifications that
          absolutely require the user's immediate attention</em>
        (<DocsExternalLink
          href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions#live_regions"
          text="see more at MDN"
        />).
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        import useKLiveRegion from 'kolibri-design-system/lib/composables/useKLiveRegion';

        export default {
          setup() {
            const { sendAssertiveMessage } = useKLiveRegion();
            sendPoliteMessage('Assertive message');
          }
        };
      </DocsShowCode>
      <!-- eslint-enable -->
    </DocsPageSection>

    <DocsPageSection
      title="Example"
      anchor="#example"
    >
      <p>
        Send messages below and turn on your screen reader. You could also observe the content of
        <code>&lt;div id="k-live-region"&gt;</code> in the browser console, but note that an
        announcement will be visible for just a very brief moment.
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

    <DocsPageSection
      title="Related"
      anchor="#related"
    >
      <ul>
        <li>
          <DocsInternalLink
            href="/installation#install-plugin"
            text="KDS installation step"
          />
          that attaches live regions to an application's document body
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
