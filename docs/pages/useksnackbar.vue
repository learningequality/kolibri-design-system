<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        A composable that offers the <code>createSnackbar</code>, <code>hideSnackbar</code>, and
        <code>clearSnackbarQueue</code> functions, as well as the reactive
        <code>snackbarState</code>. It is used to manage a global snackbar state, allowing any
        component to trigger a snackbar without having to pass props deeply.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        import useKSnackbar from 'kolibri-design-system/lib/composables/useKSnackbar';

        export default {
          setup() {
            const { createSnackbar, hideSnackbar, clearSnackbarQueue, snackbarState } = useKSnackbar();

            function showSuccess() {
              createSnackbar({
                text: 'Item was successfully created!',
                duration: 4000,
                actionText: 'Undo',
                actionCallback: () => {
                  // Handle undo action
                },
              });
            }

            return {
              showSuccess,
              hideSnackbar,
              snackbarState,
            };
          },
        };
      </DocsShowCode>
      <!-- eslint-enable -->

      <h3>Component setup</h3>
      <p>
        You must also place a
        <DocsLibraryLink component="KSnackbar" />
        component in your template (typically at the root/app level) and bind it to the
        <code>snackbarState</code>. This component will automatically display snackbars when
        <code>createSnackbar</code> is called from anywhere in your app.
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="html">
        <KSnackbar
          :isOpen="snackbarState.isOpen"
          :text="snackbarState.text"
          :actionText="snackbarState.actionText"
          :actionCallback="snackbarState.actionCallback"
          :duration="snackbarState.duration"
          :bottomOffset="snackbarState.bottomOffset"
          :backdrop="snackbarState.backdrop"
          :transition="snackbarState.transition"
          @close="hideSnackbar"
        />
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
  </DocsPageTemplate>

</template>


<script>

  import PropsTable from '../common/DocsPageTemplate/jsdocs/PropsTable';

  export default {
    components: {
      PropsTable,
    },
    data() {
      return {
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
            description: 'Function called when the action button is clicked.',
          },
          {
            name: 'duration',
            required: false,
            default: '4000',
            type: { name: 'number' },
            description: 'Time in ms until the snackbar auto-hides. Set to 0 to disable auto-hide.',
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
              'If true, shows a darkening backdrop behind the snackbar. Also makes the snackbar announce assertively instead of politely for screen readers.',
          },
          {
            name: 'forceReuse',
            required: false,
            default: 'false',
            type: { name: 'boolean' },
            description:
              'When true, replaces the current snackbar immediately instead of queueing.',
          },
          {
            name: 'onClose',
            required: false,
            default: 'null',
            type: { name: 'function' },
            description:
              'Function called when the snackbar closes (either via timeout, action, or manual close).',
          },
        ],
      };
    },
  };

</script>
