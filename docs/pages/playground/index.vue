<template>

  <div style="padding: 40px; max-width: 900px; margin: 0 auto; padding-bottom: 200px;">
    
    <h1>KSnackbar Migration Playground</h1>
    <p style="margin-bottom: 30px; color: #666;">
      Compare the legacy <code>UiSnackbar</code> against the new <code>KSnackbar</code>.
    </p>

    <div style="margin-bottom: 40px; padding: 20px; border: 2px dashed #666; background: #eee;">
      <h3 style="margin-top: 0;">🛠 Testing Controls</h3>
      <div style="display: flex; gap: 10px; margin-bottom: 20px;">
        <KButton 
          :text="viewMode === 'interactive' ? 'Switch to Visual Suite' : 'Switch to Interactive'" 
          appearance="raised-button"
          primary
          @click="toggleView"
        />
      </div>
      
      <div v-if="viewMode === 'interactive'">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
          
          <div>
            <h4 style="margin-bottom: 10px;">Legacy (UiSnackbar)</h4>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <KButton 
                text="1. Basic Text" 
                @click="triggerLegacy('basic')" 
              />
              <KButton 
                text="2. With Action" 
                @click="triggerLegacy('action')" 
              />
              <KButton 
                text="3. Long Text" 
                @click="triggerLegacy('long')" 
              />
            </div>
          </div>

          <div>
            <h4 style="margin-bottom: 10px;">New (KSnackbar)</h4>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <KButton 
                text="1. Basic Text" 
                appearance="outline-button"
                @click="triggerNew('basic')" 
              />
              <KButton 
                text="2. With Action" 
                appearance="outline-button"
                @click="triggerNew('action')" 
              />
              <KButton 
                text="3. Long Text" 
                appearance="outline-button"
                @click="triggerNew('long')" 
              />
            </div>
          </div>

        </div>
      </div>
    </div>

    <div v-if="viewMode === 'interactive'">
      
      <div class="legacy-override">
        <transition name="ui-snackbar--transition-slide">
          <UiSnackbar
            v-if="legacyState.isOpen"
            :message="legacyState.text"
            :action="legacyState.actionText"
            @action-click="() => alert('Legacy Action Clicked')"
          />
        </transition>
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

    <div 
      v-if="viewMode === 'visual'" 
      class="visual-suite"
    >
      <div class="comparison-row">
        <div class="label">Basic Message</div>
        <div class="component-box">
          <small>Legacy</small>
          <UiSnackbar message="File saved successfully" />
        </div>
        <div class="component-box">
          <small>New (KSnackbar)</small>
          <div class="static-wrapper">
            <KSnackbar 
              :is-open="true" 
              text="File saved successfully" 
              :duration="0" 
              style="position: static;" 
            />
          </div>
        </div>
      </div>

      <div class="comparison-row">
        <div class="label">With Action</div>
        <div class="component-box">
          <small>Legacy</small>
          <UiSnackbar 
            message="Connection lost" 
            action="Retry" 
          />
        </div>
        <div class="component-box">
          <small>New (KSnackbar)</small>
          <div class="static-wrapper">
            <KSnackbar 
              :is-open="true" 
              text="Connection lost" 
              action-text="Retry" 
              :duration="0" 
              style="position: static;" 
            />
          </div>
        </div>
      </div>

      <div class="comparison-row">
        <div class="label">Text Wrapping</div>
        <div class="component-box">
          <small>Legacy</small>
          <UiSnackbar 
            message="This is a very long message that should wrap to a second line correctly without breaking." 
            action="Dismiss" 
          />
        </div>
        <div class="component-box">
          <small>New (KSnackbar)</small>
          <div class="static-wrapper">
            <KSnackbar 
              :is-open="true" 
              text="This is a very long message that should wrap to a second line correctly without breaking." 
              action-text="Dismiss" 
              :duration="0" 
              style="position: static;" 
            />
          </div>
        </div>
      </div>
    </div>

  </div>

</template>


<script>

  import { ref, reactive } from 'vue';
  
  // 1. Import Composable for New Component
  import useKSnackbar from '../../../lib/composables/useKSnackbar';
  
  // 2. Import Components
  import KSnackbar from '../../../lib/keen/KSnackbar.vue';
  import UiSnackbar from '../../../lib/keen/UiSnackbar.vue'; 

  export default {
    name: 'Playground',
    components: { KSnackbar, UiSnackbar },
    setup() {
      // New System State
      const { snackbarState, createSnackbar, hideSnackbar } = useKSnackbar();
      
      // Legacy System Manual State
      const legacyState = reactive({
        isOpen: false,
        text: '',
        actionText: ''
      });

      const viewMode = ref('visual'); // 'visual' or 'interactive'

      const toggleView = () => {
        viewMode.value = viewMode.value === 'visual' ? 'interactive' : 'visual';
      };

      // --- Trigger for Legacy (UiSnackbar) ---
      const triggerLegacy = (type) => {
        legacyState.isOpen = false;
        
        // Ensure New Snackbar is closed
        hideSnackbar();

        setTimeout(() => {
          if (type === 'basic') {
            legacyState.text = 'File saved successfully';
            legacyState.actionText = '';
          }
          if (type === 'action') {
            legacyState.text = 'Connection lost';
            legacyState.actionText = 'Retry';
          }
          if (type === 'long') {
            legacyState.text = 'This is a very long message that should wrap to a second line correctly.';
            legacyState.actionText = 'Dismiss';
          }

          legacyState.isOpen = true;

          // Auto hide legacy
          setTimeout(() => { legacyState.isOpen = false }, 4000);
        }, 100);
      };

      // --- Trigger for New (KSnackbar) ---
      const triggerNew = (type) => {
        // Ensure legacy is closed
        legacyState.isOpen = false; 

        if (type === 'basic') createSnackbar({ text: 'File saved successfully' });
        if (type === 'action') createSnackbar({ text: 'Connection lost', actionText: 'Retry' });
        if (type === 'long') createSnackbar({ text: 'This is a very long message that should wrap to a second line correctly.', actionText: 'Dismiss' });
      };

      return {
        viewMode,
        toggleView,
        triggerLegacy,
        triggerNew,
        snackbarState,
        hideSnackbar,
        legacyState
      };
    }
  };

</script>


<style scoped>

  /* Visual Suite Styling */
  .visual-suite {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .comparison-row {
    background: #fff;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
  }

  .label {
    font-weight: bold;
    margin-bottom: 15px;
    font-size: 18px;
    border-bottom: 2px solid #eee;
    padding-bottom: 5px;
  }

  .component-box {
    margin-bottom: 20px;
    padding: 10px;
    background: #f5f5f5; 
  }

  small {
    display: block;
    margin-bottom: 8px;
    font-family: monospace;
    color: #666;
    font-weight: bold;
  }

  /* * LEGACY OVERRIDE 
   * Forces UiSnackbar to appear in the bottom-left (New KSnackbar default)
   * instead of its default (usually top-right).
   */
  .legacy-override >>> .ui-snackbar {
    top: auto !important;
    right: auto !important;
    bottom: 24px !important;
    left: 24px !important;
    position: fixed !important;
  }

  /* Force KSnackbar to behave statically for the visual suite */
  .static-wrapper >>> .k-snackbar {
    position: static !important;
    display: inline-flex !important;
    transform: none !important;
  }
  
  .static-wrapper >>> .k-snackbar-wrapper {
    position: static !important;
  }

</style>