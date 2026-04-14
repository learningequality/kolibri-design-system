<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        A composable that offers the <code>createSnackbar</code>, <code>clearSnackbar</code>, and
        <code>setSnackbarText</code> functions, as well as the reactive
        <code>snackbarIsVisible</code> and <code>snackbarOptions</code> refs. It is used to manage a
        global snackbar state, allowing any component to trigger a snackbar without having to pass
        props deeply.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <p>
        Before using this composable to show messages, ensure you have mounted the root component.
        For instructions, please see the
        <DocsInternalLink
          text="KSnackbar"
          href="/ksnackbar"
        />
        global setup.
      </p>

      <h3>Examples</h3>

      <h4>Basic snackbar</h4>
      <p>Use the default behavior for short confirmation messages.</p>
      <DocsExample
        loadExample="KSnackbar/Basic.vue"
        exampleId="basic"
        block
      />

      <h4>Snackbar with action</h4>
      <p>
        Provide <code>actionText</code> and <code>actionCallback</code> when calling
        <code>createSnackbar()</code>
        to enable an immediate action such as Undo. The callback is stored in the composable and
        executed when the user clicks the action button.
      </p>
      <DocsExample
        loadExample="KSnackbar/WithAction.vue"
        exampleId="with-action"
        block
      />

      <h4>Persistent snackbar</h4>
      <p>
        Set <code>autoDismiss: false</code> in <code>createSnackbar()</code> to disable auto-hide
        for important messages. Alternatively, set <code>duration: 0</code> to achieve the same
        effect.
      </p>
      <DocsExample
        loadExample="KSnackbar/Persistent.vue"
        exampleId="persistent"
        block
      />

      <h4>Snackbar with bottom offset</h4>
      <p>Use <code>bottomOffset</code> when a bottom navigation bar or fixed footer is present.</p>
      <DocsExample
        loadExample="KSnackbar/WithBottomOffset.vue"
        exampleId="with-bottom-offset"
        block
      />

      <h4>Update snackbar without transition</h4>
      <p>
        Use <code>forceReuse</code> to update the snackbar text in place without replaying the
        transition animation. Useful for status updates like connection state changes.
      </p>
      <DocsExample
        loadExample="KSnackbar/ForceReuse.vue"
        exampleId="force-reuse"
        block
      />

      <h4>Snackbar with autofocus</h4>
      <p>
        Set <code>autofocus: true</code> to immediately focus the action button when the snackbar
        appears. Useful for critical actions that need immediate attention.
      </p>
      <DocsExample
        loadExample="KSnackbar/WithAutofocus.vue"
        exampleId="with-autofocus"
        block
      />

      <h4>Snackbar with onBlur handling</h4>
      <p>
        Provide an <code>onBlur</code> callback to handle advanced focus management scenarios, such
        as auto-dismissing when the user tabs away or clicks elsewhere.
      </p>
      <DocsExample
        loadExample="KSnackbar/WithOnBlur.vue"
        exampleId="with-onblur"
        block
      />
    </DocsPageSection>

    <DocsPageSection
      title="Advanced: Local snackbars"
      anchor="#local"
    >
      <p>
        By default, <code>useKSnackbar</code> controls a global application-wide snackbar instance. However, if you need a localized snackbar (for instance, to pass a custom slot with a <code>&lt;KIcon&gt;</code> component inside), you can use the <code>useKLocalSnackbar</code> named export. 
      </p>
      <p>
        Note that this advanced usage requires placing a separate <code>&lt;KSnackbar&gt;</code> component within your template and binding the local composable's state manually, rather than relying on the globally installed snackbar.
      </p>
      <!-- eslint-disable vue/html-indent -->
      <DocsShowCode language="javascript">
        import { useKLocalSnackbar } from 'kolibri-design-system/lib/composables/useKSnackbar';

        export default {
          setup() {
            const { snackbarIsVisible, snackbarOptions, createSnackbar } = useKLocalSnackbar();

            // Usage is identical
            const notifyInfo = () => createSnackbar({ text: 'Task completed', announce: true });

            return {
              snackbarIsVisible,
              snackbarOptions,
              notifyInfo
            };
          }
        }
      </DocsShowCode>
      <!-- eslint-enable vue/html-indent -->
      <p>
        In the template where this is used, you manage the KSnackbar component yourself:
      </p>
      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="html">
        <KSnackbar
          :isOpen="snackbarIsVisible"
          :text="snackbarOptions.text"
          :announce="snackbarOptions.announce"
          @close="clearSnackbar"
        >
          <template #text="{ text }">
            <KIcon icon="warning" /> {{ text }}
          </template>
        </KSnackbar>
      </DocsShowCode>
      <!-- eslint-enable -->
    </DocsPageSection>

    <DocsPageSection
      title="Parameters"
      anchor="#parameters"
    >
      <p>
        <code>createSnackbar</code> accepts an <code>options</code> object with the following
        properties:
      </p>
      <PropsTable :api="options" />
    </DocsPageSection>

    <DocsPageSection
      title="Related"
      anchor="#related"
    >
      <ul>
        <li><DocsLibraryLink component="KSnackbar" /> for the snackbar component</li>
        <li>
          <DocsInternalLink
            text="Snackbars"
            href="/snackbars"
          />
          has design guidelines and usage guidance
        </li>
      </ul>
    </DocsPageSection>

    <!-- Global snackbar instance for all examples on this page -->
    <KSnackbar
      :isOpen="snackbarIsVisible"
      :text="snackbarOptions.text"
      :actionText="snackbarOptions.actionText"
      :bottomOffset="snackbarOptions.bottomOffset"
      :backdrop="snackbarOptions.backdrop"
      :announce="snackbarOptions.announce"
      :assertive="snackbarOptions.assertive"
      :autofocus="snackbarOptions.autofocus"
      :autoDismiss="snackbarOptions.autoDismiss"
      :duration="snackbarOptions.duration"
      @actionClick="handleActionClick"
      @blur="handleBlur"
      @close="clearSnackbar"
    />
  </DocsPageTemplate>

</template>


<script>

  import PropsTable from '../common/DocsPageTemplate/jsdocs/PropsTable';
  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    components: {
      PropsTable,
    },
    setup() {
      const { snackbarIsVisible, snackbarOptions, clearSnackbar } = useKSnackbar();

      const handleActionClick = () => {
        if (snackbarOptions.value.actionCallback) {
          snackbarOptions.value.actionCallback();
        }
        clearSnackbar();
      };

      const handleBlur = () => {
        if (typeof snackbarOptions.value.onBlur === 'function') {
          snackbarOptions.value.onBlur();
        }
      };

      return {
        snackbarIsVisible,
        snackbarOptions,
        clearSnackbar,
        handleActionClick,
        handleBlur,
      };
    },
    data() {
      return {
        text: '', // Dummy variable to satisfy vue-loader for the DocsShowCode template interpolation
        options: [
          {
            name: 'text',
            required: true,
            type: { name: 'string' },
            description: 'The text to display inside the snackbar.',
          },
          {
            name: 'actionText',
            required: false,
            default: "''",
            type: { name: 'string' },
            description: 'Optional text for an action button (e.g. "Undo").',
          },
          {
            name: 'actionCallback',
            required: false,
            default: 'null',
            type: { name: 'function' },
            description:
              'Function stored in composable and called when the action button is clicked. Retrieved via @action-click event handler at the app root level.',
          },
          {
            name: 'duration',
            required: false,
            default: '5000',
            type: { name: 'number' },
            description: 'Time in ms until the snackbar auto-hides. Set to 0 to disable auto-hide.',
          },
          {
            name: 'autoDismiss',
            required: false,
            default: 'true',
            type: { name: 'boolean' },
            description:
              'Whether the snackbar should auto-dismiss after the duration. More semantic than setting duration to 0.',
          },
          {
            name: 'bottomOffset',
            required: false,
            default: '0',
            type: { name: 'number' },
            description:
              'Additional bottom offset in pixels. Useful when a bottom navigation bar is present.',
          },
          {
            name: 'backdrop',
            required: false,
            default: 'false',
            type: { name: 'boolean' },
            description:
              'If true, shows a darkening backdrop behind the snackbar.',
          },
          {
            name: 'announce',
            required: true,
            default: 'undefined',
            type: { name: 'boolean' },
            description:
              'Whether to trigger a live-region announcement for screen readers. Explicitly required for each usage to ensure conscious accessibility decisions.',
          },
          {
            name: 'assertive',
            required: false,
            default: 'false',
            type: { name: 'boolean' },
            description:
              'When true, uses an assertive live region instead of polite. Only applies if `announce` is true. Use sparingly for critical errors.',
          },
          {
            name: 'autofocus',
            required: false,
            default: 'false',
            type: { name: 'boolean' },
            description:
              'If true, autofocuses the action button when the snackbar appears. Improves accessibility for critical actions.',
          },
          {
            name: 'onBlur',
            required: false,
            default: 'null',
            type: { name: 'function' },
            description:
              'Blur event handler for when the action button loses focus. Useful for advanced focus management.',
          },
          {
            name: 'forceReuse',
            required: false,
            default: 'false',
            type: { name: 'boolean' },
            description:
              'When true, updates the current snackbar text in place without replaying the transition animation. Useful for status updates like connection state changes.',
          },
          {
            name: 'hideCallback',
            required: false,
            default: 'null',
            type: { name: 'function' },
            description:
              'Function called when the snackbar is hidden or replaced. Useful for cleanup or promise resolution.',
          },
        ],
      };
    },
  };

</script>


<style lang="scss" scoped>

  ::v-deep .k-snackbar-wrapper {
    z-index: 100;
  }

</style>
