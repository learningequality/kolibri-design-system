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
      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="javascript">
        import useKSnackbar from 'kolibri-design-system/lib/composables/useKSnackbar';

        export default {
          setup() {
            const { createSnackbar, clearSnackbar, snackbarIsVisible, snackbarOptions } = useKSnackbar();

            // 1. Create a snackbar with action button
            function showSnackbar() {
              createSnackbar({
                text: 'Item was successfully created!',
                actionText: 'Undo',
                actionCallback: () => {
                  // Handle undo action
                },
              });
            }

            // 2. Handle action button clicks at app root level
            function handleActionClick() {
              if (snackbarOptions.value.actionCallback) {
                snackbarOptions.value.actionCallback();
              }
              clearSnackbar();
            }

            return {
              showSnackbar,
              handleActionClick,
              clearSnackbar,
              snackbarIsVisible,
              snackbarOptions,
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
        <code>snackbarIsVisible</code> and <code>snackbarOptions</code> refs. This component will
        automatically display snackbars when <code>createSnackbar</code> is called from anywhere in
        your app.
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="html">
        <KSnackbar
          :isOpen="snackbarIsVisible"
          :text="snackbarOptions.text"
          :actionText="snackbarOptions.actionText"
          :bottomOffset="snackbarOptions.bottomOffset"
          :backdrop="snackbarOptions.backdrop"
          :autofocus="snackbarOptions.autofocus"
          :onBlur="snackbarOptions.onBlur"
          :autoDismiss="snackbarOptions.autoDismiss"
          :duration="snackbarOptions.duration"
          @action-click="handleActionClick"
          @close="clearSnackbar"
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
            description:
              'Function stored in composable and called when the action button is clicked. Retrieved via @action-click event handler at the app root level.',
          },
          {
            name: 'duration',
            required: false,
            default: '4000',
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
              'If true, shows a darkening backdrop behind the snackbar. Also makes the snackbar announce assertively instead of politely for screen readers.',
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
              'Function called when the snackbar is hidden or replaced (Studio pattern). Useful for cleanup or promise resolution.',
          },
        ],
      };
    },
  };

</script>
