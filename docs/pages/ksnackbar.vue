<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        The <code>KSnackbar</code> component provides a globally-managed notification system for
        displaying non-critical messages to users. It supports action buttons, custom timing, focus
        management, and full keyboard accessibility.
      </p>
      <ul>
        <li>Global notification state via the <code>useKSnackbar</code> composable</li>
        <li>Optional action button for quick follow-up actions</li>
        <li>Auto-hide with configurable duration (or persistent mode)</li>
        <li>Backdrop mode for higher-priority messages</li>
        <li>Bottom offset support for layouts with bottom navigation</li>
      </ul>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <h3>Composable usage</h3>
      <p>
        Use the <code>useKSnackbar</code>composable to create and manage snackbars globally. See the
        full setup guide in the
        <DocsInternalLink
          text="useKSnackbar"
          href="/useksnackbar"
        />
        documentation.
      </p>
      <p>
        The component binds to the global <code>snackbarState</code> and automatically displays
        snackbars when <code>createSnackbar</code> is called:
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

      <h3>Basic snackbar</h3>
      <p>Use the default behavior for short confirmation messages.</p>
      <DocsExample
        loadExample="KSnackbar/Basic.vue"
        exampleId="basic"
        block
      />

      <h3>Snackbar with action</h3>
      <p>
        Use <code>actionText</code> and <code>actionCallback</code> to provide an immediate action
        such as Undo.
      </p>
      <DocsExample
        loadExample="KSnackbar/WithAction.vue"
        exampleId="with-action"
        block
      />

      <h3>Persistent snackbar</h3>
      <p>
        Set <code>duration</code> to <code>0</code> to disable auto-hide for important messages.
      </p>
      <DocsExample
        loadExample="KSnackbar/Persistent.vue"
        exampleId="persistent"
        block
      />

      <h3>Snackbar with bottom offset</h3>
      <p>Use <code>bottomOffset</code> when a bottom navigation bar or fixed footer is present.</p>
      <DocsExample
        loadExample="KSnackbar/WithBottomOffset.vue"
        exampleId="with-bottom-offset"
        block
      />

      <h3>Force-reuse current snackbar</h3>
      <p>
        Use <code>forceReuse</code> to replace the currently visible snackbar immediately instead of
        waiting for it to close.
      </p>
      <DocsExample
        loadExample="KSnackbar/ForceReuse.vue"
        exampleId="force-reuse"
        block
      />
    </DocsPageSection>

    <!-- Global snackbar instance for all examples on this page -->
    <KSnackbar
      :isOpen="snackbarState.isOpen"
      :text="snackbarState.text"
      :actionText="snackbarState.actionText"
      :actionCallback="snackbarState.actionCallback"
      :duration="snackbarState.duration"
      :bottomOffset="snackbarState.bottomOffset"
      @close="hideSnackbar"
    />
  </DocsPageTemplate>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    name: 'DocsKSnackbar',
    setup() {
      const { snackbarState, hideSnackbar } = useKSnackbar();

      return {
        snackbarState,
        hideSnackbar,
      };
    },
  };

</script>


<style lang="scss" scoped>

  ::v-deep .k-snackbar-wrapper {
    z-index: 100;
  }

</style>
