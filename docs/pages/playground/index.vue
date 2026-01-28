<template>

  <div style="padding: 40px; max-width: 800px; margin: 0 auto; padding-bottom: 200px;">
    
    <h1>KSnackbar Playground</h1>
    <p style="margin-bottom: 30px; color: #666;">
      Manual verification board for KSnackbar.
    </p>

    <div style="margin-bottom: 40px; padding: 20px; border: 2px dashed #666; background: #eee;">
      <h3 style="margin-top: 0;">📸 Visual Regression Suite</h3>
      <p>Show all variants simultaneously to check for layout regressions (wrapping, padding, alignment).</p>
      <KButton 
        :text="showVisualSuite ? 'Hide Visual Suite' : 'Show All Variants (Stack)'" 
        appearance="raised-button"
        primary
        @click="showVisualSuite = !showVisualSuite"
      />
    </div>

    <div 
      v-if="!showVisualSuite" 
      class="playground-grid"
    >
      
      <div class="control-card">
        <h3>1. Basic Notification</h3>
        <p>Standard text message. Auto-closes in 4s.</p>
        <KButton 
          text="Trigger Basic" 
          @click="triggerBasic" 
        />
      </div>

      <div class="control-card">
        <h3>2. Action Button</h3>
        <p>Includes a clickable 'RETRY' action.</p>
        <KButton 
          text="Trigger Action" 
          @click="triggerAction" 
        />
      </div>

      <div class="control-card">
        <h3>3. Force Reuse (Updates)</h3>
        <p>Click repeatedly. Text should update instantly.</p>
        <KButton 
          :text="`Update: ${progress}%`" 
          @click="triggerUpdate" 
        />
      </div>

      <div class="control-card">
        <h3>4. Backdrop (Modal)</h3>
        <p>Dims background. Blocks clicks.</p>
        <KButton 
          text="Trigger Backdrop"
          @click="triggerBackdrop" 
        />
      </div>

      <div class="control-card">
        <h3>5. Focus Return (A11y)</h3>
        <p>Focus must return to this button after close.</p>
        <KButton 
          ref="focusBtn" 
          text="Test Focus" 
          @click="triggerBasic" 
        />
      </div>

    </div>

    <KSnackbar
      v-if="!showVisualSuite"
      :is-open="snackbarState.isOpen"
      :text="snackbarState.text"
      :action-text="snackbarState.actionText"
      :action-callback="snackbarState.actionCallback"
      :duration="snackbarState.duration"
      :bottom-offset="snackbarState.bottomOffset"
      :backdrop="snackbarState.backdrop"
      @close="hideSnackbar"
    />

    <div v-if="showVisualSuite">
      <KSnackbar
        :is-open="true"
        text="1. Basic message (Short)"
        :duration="0"
        :bottom-offset="0"
      />
      
      <KSnackbar
        :is-open="true"
        text="2. Message with Action"
        action-text="Retry"
        :duration="0"
        :bottom-offset="70"
      />

      <KSnackbar
        :is-open="true"
        text="3. Regression Check: This is a very long message that should wrap to a second line correctly without breaking the layout or overlapping the action button."
        action-text="Dismiss"
        :duration="0"
        :bottom-offset="140"
      />
    </div>

  </div>

</template>


<script>

  import { ref } from 'vue';
  import useKSnackbar from '../../../lib/composables/useKSnackbar';
  
  // CORRECTED IMPORT PATH: Pointing to your new component location
  import KSnackbar from '../../../lib/keen/KSnackbar.vue';

  export default {
    name: 'Playground',
    components: { KSnackbar },
    setup() {
      const { snackbarState, createSnackbar, hideSnackbar } = useKSnackbar();
      const showVisualSuite = ref(false);
      let progress = 0;

      const triggerBasic = () => {
        createSnackbar({ text: 'File saved successfully.' });
      };

      const triggerAction = () => {
        createSnackbar({
          text: 'Connection lost.',
          actionText: 'Retry',
          actionCallback: () => alert('Clicked!')
        });
      };

      const triggerUpdate = () => {
        progress += 10;
        if (progress > 100) progress = 0;
        createSnackbar({
          text: `Uploading... ${progress}%`,
          forceReuse: true,
          duration: 0
        });
      };

      const triggerBackdrop = () => {
        createSnackbar({
          text: 'Session expired.',
          actionText: 'Log In',
          backdrop: true,
          duration: 0,
          actionCallback: hideSnackbar
        });
      };

      return {
        snackbarState,
        hideSnackbar,
        showVisualSuite,
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
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  .control-card {
    padding: 20px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  h3 { margin-top: 0; font-size: 16px; }
  p { font-size: 14px; color: #666; min-height: 40px; }
  
</style>