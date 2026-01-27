<template>

  <div style="padding: 40px; max-width: 800px; margin: 0 auto;">
    
    <h1>KSnackbar Playground</h1>
    <p style="margin-bottom: 30px; color: #666;">
      Use the controls below to verify behavior. The component is rendered at the bottom of the screen.
    </p>

    <div class="playground-grid">
      
      <div class="control-card">
        <h3>1. Basic Notification</h3>
        <p>Standard text message. Auto-closes in 4s.</p>
        <KButton 
          appearance="raised-button" 
          primary 
          text="Show Basic" 
          @click="triggerBasic" 
        />
      </div>

      <div class="control-card">
        <h3>2. Action Button</h3>
        <p>Includes a clickable 'RETRY' action.</p>
        <KButton 
          appearance="raised-button" 
          text="Show Action" 
          @click="triggerAction" 
        />
      </div>

      <div class="control-card">
        <h3>3. Force Reuse</h3>
        <p>Click repeatedly. Text should update instantly without animation.</p>
        <KButton 
          appearance="raised-button" 
          :text="`Update Progress: ${progress}%`" 
          @click="triggerUpdate" 
        />
      </div>

      <div class="control-card">
        <h3>4. Backdrop (Modal)</h3>
        <p>Dims background. Blocks clicks outside.</p>
        <KButton 
          appearance="raised-button" 
          text="Show Backdrop" 
          @click="triggerBackdrop" 
        />
      </div>

      <div class="control-card">
        <h3>5. Focus Return (A11y)</h3>
        <p>
          1. Tab to this button.<br>
          2. Press ENTER.<br>
          3. Wait for close.<br>
          <strong>Focus must return here.</strong>
        </p>
        <KButton 
          ref="focusBtn"
          appearance="flat-button" 
          text="Test Focus Return" 
          @click="triggerBasic" 
        />
      </div>

    </div>

    <KSnackbar
      :is-open="snackbarState.isOpen"
      :text="snackbarState.text"
      :action-text="snackbarState.actionText"
      :action-callback="snackbarState.actionCallback"
      :duration="snackbarState.duration"
      :bottom-offset="snackbarState.bottomOffset"
      :backdrop="snackbarState.backdrop"
      @close="hideSnackbar"
    />

  </div>

</template>


<script>

  // Import the composable from the library
  // We use ../../../ because this file is in docs/pages/playground/
  import useKSnackbar from '../../../lib/composables/useKSnackbar';
  import KSnackbar from '../../../lib/keen/KSnackbar.vue';

  export default {
    name: 'Playground',
    components: {
      KSnackbar
    },
    setup() {
      // Deconstruct the composable
      const { snackbarState, createSnackbar, hideSnackbar } = useKSnackbar();
      
      // Local state for the "Progress" test
      let progress = 0;

      // --- Trigger Methods ---

      const triggerBasic = () => {
        createSnackbar({ 
          text: 'File saved successfully.',
          duration: 4000
        });
      };

      const triggerAction = () => {
        createSnackbar({
          text: 'Connection lost. Please check your internet.',
          actionText: 'Retry',
          actionCallback: () => {
            window.alert('Action Callback Fired!');
          }
        });
      };

      const triggerUpdate = () => {
        progress += 10;
        if (progress > 100) progress = 0;

        createSnackbar({
          text: `Uploading file... ${progress}% complete`,
          forceReuse: true, // Updates text without re-triggering animation
          duration: 0 // Keep open while updating
        });
      };

      const triggerBackdrop = () => {
        createSnackbar({
          text: 'Session expired. Please log in again.',
          actionText: 'Log In',
          backdrop: true, // Enables the dim overlay
          duration: 0, // Forces user to click action
          actionCallback: () => {
            hideSnackbar();
          }
        });
      };

      return {
        snackbarState,
        hideSnackbar,
        triggerBasic,
        triggerAction,
        triggerUpdate,
        triggerBackdrop,
        progress
      };
    }
  };

</script>


<style scoped>

  .playground-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }

  .control-card {
    padding: 24px;
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  }

  .control-card h3 {
    margin-top: 0;
    font-size: 16px;
    font-weight: bold;
  }

  .control-card p {
    min-height: 48px;
    margin-bottom: 16px;
    font-size: 14px;
    color: #555;
  }

</style>