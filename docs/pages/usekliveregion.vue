<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>A composable that offers <code>sendPoliteMessage</code> and <code>sendAssertiveMessage</code> functions that send polite and assertive messages to their corresponding <DocsExternalLink href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions" text="ARIA live regions" />.</p>
    </DocsPageSection>

    <DocsPageSection title="When to use live regions" anchor="#usage">
      <p>Before sending messages to live regions, always research carefully if you really need it for the task ahead. Live regions can be <DocsExternalLink href="https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-2/#avoid-live-regions-if-you-can" text="buggy and inconsistent" />. There are often better alternatives, such as utilizing <DocsExternalLink href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes" text="WAI-ARIA attributes" />. A good rule of thumb is to use live regions only when there's no other way.</p>
    </DocsPageSection>

    <DocsPageSection title="Usage" anchor="#usage">
      <p>Since polite and assertive regions are inserted to an application's document body automatically <DocsInternalLink href="/installation#install-plugin" text="during the KDS installation process" />, the only thing you need to do to deliver messages is to import and call <code>sendPoliteMessage</code> or <code>sendAssertiveMessage</code> from any place in your application.</p>

      <p>These two methods are also used internally from some KDS components to provide a11y out of the box. Always check that you don't send messages to announce updates that are already being announced from KDS to prevent from duplicate announcements.</p>

      <h3>Polite message</h3>

      <p>Sending a polite message updates the text content of <code>aria-live="polite"</code> region. <em>Use it to send messages that can wait to be announced until the user is idle. This message should typically be the most commonly used.</em></p>

      <p>Send polite messages with <code>sendPoliteMessage(message)</code>:</p>

      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
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

      <p>Sending an assertive message updates the text content of <code>aria-live="assertive"</code> region. <em>It should be used with caution because it disrupts the user's flow. Use it only to send messages that require immediate attention, such as errors.</em></p>

      <p>Send assertive messages with <code>sendAssertiveMessage(message)</code>:</p>

      <!-- eslint-disable -->
      <!-- prevent prettier from changing indentation -->
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

    <DocsPageSection title="Demo" anchor="#demo">
      <p>Send messages below and turn on your screen reader. You could also observe the content of <code>&lt;div id="k-live-region"&gt;</code> in the browser console, but note that an announcement will be visible for just a very brief moment.</p>

      <DocsShow language="html">
        <KTextbox label="Polite message" :value="politeMessageInput" @input="updatePoliteMessage" />
        <KButton @click="sendPoliteMessage(politeMessageInput)">
          Send
        </KButton>
      </DocsShow>

      <DocsShow language="html">
        <KTextbox label="Assertive message" :value="assertiveMessageInput" @input="updateAssertiveMessage" />
        <KButton @click="sendAssertiveMessage(assertiveMessageInput)">
          Send
        </KButton>
      </DocsShow>
    </DocsPageSection>

    <DocsPageSection title="Related" anchor="#related">
      <ul>
        <li>
          <DocsInternalLink href="/installation#install-plugin" text="KDS installation step" /> that attaches live regions to an application's DOM
        </li>
      </ul>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  import { ref } from '@vue/composition-api';
  import useKLiveRegion from '../../lib/composables/useKLiveRegion';

  export default {
    setup() {
      const { _mountLiveRegion, sendPoliteMessage, sendAssertiveMessage } = useKLiveRegion();

      const politeMessageInput = ref('Polite hello');
      const updatePoliteMessage = message => {
        politeMessageInput.value = message;
      };

      const assertiveMessageInput = ref('I cannot wait');
      const updateAssertiveMessage = message => {
        assertiveMessageInput.value = message;
      };

      return {
        _mountLiveRegion,
        updatePoliteMessage,
        politeMessageInput,
        updateAssertiveMessage,
        assertiveMessageInput,
        sendPoliteMessage,
        sendAssertiveMessage,
      };
    },
    mounted() {
      this._mountLiveRegion(this.$root.$el);
    },
  };

</script>
