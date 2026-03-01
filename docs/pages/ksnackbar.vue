<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        The <code>KSnackbar</code> component provides a globally-managed notification system for
        displaying non-critical messages to users. It supports action buttons, custom timing, and
        full keyboard accessibility.
      </p>
      <p>
        This component should be used with the <code>useKSnackbar</code> composable for state
        management.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <p>Use the <code>useKSnackbar</code> composable to create and manage snackbars:</p>
      <DocsShowCode language="javascript">
        import { useKSnackbar } from 'kolibri-design-system/lib/composables/useKSnackbar'; import
        KSnackbar from 'kolibri-design-system/lib/KSnackbar/KSnackbar.vue'; export default {
        components: { KSnackbar }, setup() { const { createSnackbar, snackbarState } =
        useKSnackbar(); function showSuccess() { createSnackbar({ text: 'Changes saved', duration:
        4000, }); } return { snackbarState, showSuccess }; } };
      </DocsShowCode>
    </DocsPageSection>

    <DocsPageSection
      title="Examples"
      anchor="#examples"
    >
      <DocsShow>
        <KButtonGroup>
          <KButton
            text="Show simple snackbar"
            @click="showBasic"
          />
          <KButton
            text="Show snackbar with action"
            @click="showWithAction"
          />
        </KButtonGroup>

        <KSnackbar
          :isOpen="snackbarState.isOpen"
          :text="snackbarState.text"
          :actionText="snackbarState.actionText"
          :backdrop="snackbarState.backdrop"
          :duration="snackbarState.duration"
          :bottomOffset="snackbarState.bottomOffset"
          :transition="snackbarState.transition"
          @action-click="snackbarState.actionCallback"
          @close="hideSnackbar"
        />
      </DocsShow>
    </DocsPageSection>

    <DocsPageSection
      title="Props"
      anchor="#props"
    >
      <PropsTable :api="propDocs" />
    </DocsPageSection>

    <DocsPageSection
      title="Events"
      anchor="#events"
    >
      <DocsTable
        :headers="['Event', 'Payload', 'Description']"
        :rows="events"
      />
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  import PropsTable from '../common/DocsPageTemplate/jsdocs/PropsTable';
  import DocsTable from '../common/DocsTable';
  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    components: {
      PropsTable,
      DocsTable,
    },
    setup() {
      const { createSnackbar, hideSnackbar, snackbarState } = useKSnackbar();

      const showBasic = () => {
        createSnackbar({ text: 'Changes saved' });
      };

      const showWithAction = () => {
        createSnackbar({
          text: 'Item deleted',
          actionText: 'Undo',
          actionCallback: () => {},
        });
      };

      return {
        snackbarState,
        hideSnackbar,
        showBasic,
        showWithAction,
        propDocs: [
          {
            name: 'isOpen',
            type: { name: 'boolean' },
            default: 'false',
            description: 'Controls whether the snackbar is visible.',
          },
          {
            name: 'text',
            type: { name: 'string' },
            default: "''",
            description: 'The main message text displayed in the snackbar.',
          },
          {
            name: 'actionText',
            type: { name: 'string' },
            default: "''",
            description: 'Optional text for an action button (e.g., "Undo").',
          },
          {
            name: 'actionCallback',
            type: { name: 'function' },
            default: 'null',
            description: 'Function called when the action button is clicked.',
          },
          {
            name: 'duration',
            type: { name: 'number' },
            default: '4000',
            description:
              'Time in milliseconds until the snackbar auto-hides. Set to 0 to disable auto-hide.',
          },
          {
            name: 'bottomOffset',
            type: { name: 'number' },
            default: '0',
            description:
              'Additional bottom offset in pixels. Useful when a bottom navigation bar is present.',
          },
          {
            name: 'backdrop',
            type: { name: 'boolean' },
            default: 'false',
            description:
              'If true, shows a darkening backdrop behind the snackbar and sets focus to the snackbar. Used for critical messages.',
          },
          {
            name: 'transition',
            type: { name: 'string' },
            default: "'slide'",
            description: "Animation type: 'slide' or 'fade'.",
          },
        ],
        events: [
          {
            event: 'close',
            payload: 'none',
            description: 'Emitted when the snackbar is closed (via timeout, action, or ESC key).',
          },
          {
            event: 'action-click',
            payload: 'none',
            description: 'Emitted when the action button is clicked.',
          },
          {
            event: 'show',
            payload: 'none',
            description: 'Emitted after the snackbar has finished its entry animation.',
          },
          {
            event: 'hide',
            payload: 'none',
            description: 'Emitted after the snackbar has finished its exit animation.',
          },
          {
            event: 'click',
            payload: 'none',
            description: 'Emitted when the snackbar content area is clicked.',
          },
        ],
      };
    },
  };

</script>


<style lang="scss" scoped></style>
