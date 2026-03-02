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
      <p>
        When multiple snackbars are triggered, new messages automatically replace the current one
        with a smooth transition. For status updates that need to change text without animation, use
        <code>forceReuse</code>.
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
        The component binds to the global <code>snackbarIsVisible</code> and <code>snackbarOptions</code> refs and automatically displays
        snackbars when <code>createSnackbar</code> is called:
      </p>

      <!-- eslint-disable -->
      <!-- prettier-ignore -->
      <DocsShowCode language="html">
        <KSnackbar
          :isOpen="snackbarIsVisible"
          :text="snackbarOptions.text"
          :actionText="snackbarOptions.actionText"
          :actionCallback="snackbarOptions.actionCallback"
          :duration="snackbarOptions.duration"
          :autoDismiss="snackbarOptions.autoDismiss"
          :bottomOffset="snackbarOptions.bottomOffset"
          :backdrop="snackbarOptions.backdrop"
          :transition="snackbarOptions.transition"
          :autofocus="snackbarOptions.autofocus"
          :onBlur="snackbarOptions.onBlur"
          @close="clearSnackbar"
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

      <h3>Update snackbar without transition</h3>
      <p>
        Use <code>forceReuse</code> to update the snackbar text in place without replaying the
        transition animation. Useful for status updates like connection state changes.
      </p>
      <DocsExample
        loadExample="KSnackbar/ForceReuse.vue"
        exampleId="force-reuse"
        block
      />
    </DocsPageSection>

    <!-- Global snackbar instance for all examples on this page -->
    <KSnackbar
      :isOpen="snackbarIsVisible"
      :text="snackbarOptions.text"
      :actionText="snackbarOptions.actionText"
      :actionCallback="snackbarOptions.actionCallback"
      :duration="snackbarOptions.duration"
      :autoDismiss="snackbarOptions.autoDismiss"
      :bottomOffset="snackbarOptions.bottomOffset"
      :autofocus="snackbarOptions.autofocus"
      :onBlur="snackbarOptions.onBlur"
      @close="clearSnackbar"
    />
  </DocsPageTemplate>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    name: 'DocsKSnackbar',
    setup() {
      const { snackbarIsVisible, snackbarOptions, clearSnackbar } = useKSnackbar();

      return {
        snackbarIsVisible,
        snackbarOptions,
        clearSnackbar,
      };
    },
  };

</script>


<style lang="scss" scoped>

  ::v-deep .k-snackbar-wrapper {
    z-index: 100;
  }

</style>
