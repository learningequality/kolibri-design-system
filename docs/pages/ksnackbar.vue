<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        The <code>KSnackbar</code> component provides a notification system for displaying
        non-critical messages to users. While typically managed globally, it also supports isolated
        local instances. It features action buttons, custom timing, focus management, and full
        keyboard accessibility.
      </p>
      <p>
        When multiple snackbars are triggered, new messages automatically replace the current one
        with a smooth transition. For status updates that need to change text without animation, use
        <code>forceReuse</code>.
      </p>
      <ul>
        <li>Global or local notification state via provided composables</li>
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
        In most applications, the <code>KSnackbar</code> component serves as a root-level mount
        point for global notifications. Developers should <strong>not</strong> interact with this
        component directly to show messages, but rather use the provided composables.
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

      <DocsExample
        loadExample="KSnackbar/GlobalSetup.vue"
        exampleId="global-setup"
        block
      />

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
