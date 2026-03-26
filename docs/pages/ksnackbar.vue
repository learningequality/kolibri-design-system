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
      <p>
        The <code>KSnackbar</code> component serves only as the root-level mount point for
        snackbars. Developers should <strong>not</strong> interact with this component directly to
        show messages.
      </p>

      <h3>Global Setup</h3>
      <p>
        Place a single <code>KSnackbar</code> component in your application's root template (e.g.,
        <code>App.vue</code>) and bind it to the state provided by the
        <DocsInternalLink
          text="useKSnackbar"
          href="/useksnackbar"
        />
        composable.
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
          :autoDismiss="snackbarOptions.autoDismiss"
          :duration="snackbarOptions.duration"
          @action-click="handleActionClick"
          @blur="handleBlur"
          @close="clearSnackbar"
        />
      </DocsShowCode>
      <!-- eslint-enable -->

      <p>
        For interactive examples (Basic, With Action, Persistent, Force Reuse, etc.), please see the
        <DocsInternalLink
          text="useKSnackbar"
          href="/useksnackbar"
        />
        composable page.
      </p>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {
    name: 'DocsKSnackbar',
  };

</script>


<style lang="scss" scoped>

  ::v-deep .k-snackbar-wrapper {
    z-index: 100;
  }

</style>
