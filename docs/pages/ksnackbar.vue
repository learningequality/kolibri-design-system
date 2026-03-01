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
      <p>
        Use the
        <DocsInternalLink
          text="useKSnackbar"
          href="/useksnackbar"
        />
        composable to create and manage snackbars. The component itself connects to the global state
        and automatically displays queued messages.
      </p>
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
          :actionCallback="snackbarState.actionCallback"
          :backdrop="snackbarState.backdrop"
          :duration="snackbarState.duration"
          :bottomOffset="snackbarState.bottomOffset"
          :transition="snackbarState.transition"
          @close="hideSnackbar"
        />
      </DocsShow>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  import useKSnackbar from '../../lib/composables/useKSnackbar';

  export default {
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
      };
    },
  };

</script>


<style lang="scss" scoped>

  // Override snackbar positioning to account for the left navigation menu in docs
  ::v-deep .k-snackbar {
    // Add offset for the documentation navigation menu (approximately 280px)
    left: 304px !important;

    // On smaller screens, keep the default behavior
    @media (max-width: 1024px) {
      left: 24px !important;
    }
  }

</style>
