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
        The component binds to the global <code>snackbarIsVisible</code> and
        <code>snackbarOptions</code> refs and automatically displays snackbars when
        <code>createSnackbar</code> is called. The <code>@action-click</code> event must be handled
        at the app root level to execute the callback stored in the composable:
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

      <h3>Basic snackbar</h3>
      <p>Use the default behavior for short confirmation messages.</p>
      <DocsExample
        loadExample="KSnackbar/Basic.vue"
        exampleId="basic"
        block
      />

      <h3>Snackbar with action</h3>
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

      <h3>Persistent snackbar</h3>
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

      <h3>Snackbar with autofocus</h3>
      <p>
        Set <code>autofocus: true</code> to immediately focus the action button when the snackbar
        appears. Useful for critical actions that need immediate attention.
      </p>
      <DocsExample
        loadExample="KSnackbar/WithAutofocus.vue"
        exampleId="with-autofocus"
        block
      />

      <h3>Snackbar with onBlur handling</h3>
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

    <!-- Global snackbar instance for all examples on this page -->
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
  </DocsPageTemplate>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
    name: 'DocsKSnackbar',
    setup() {
      const { snackbarIsVisible, snackbarOptions, clearSnackbar } = useKSnackbar();

      const handleActionClick = () => {
        if (snackbarOptions.value.actionCallback) {
          snackbarOptions.value.actionCallback();
        }
        clearSnackbar();
      };

      return {
        snackbarIsVisible,
        snackbarOptions,
        clearSnackbar,
        handleActionClick,
      };
    },
  };

</script>


<style lang="scss" scoped>

  ::v-deep .k-snackbar-wrapper {
    z-index: 100;
  }

</style>
