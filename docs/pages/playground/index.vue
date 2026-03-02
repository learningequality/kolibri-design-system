<template>

  <div style="padding: 24px; max-width: 1200px;">
    <h1 style="margin-bottom: 8px;">KSnackbar Playground - All Features Demo</h1>
    <p style="margin-bottom: 32px; color: #666;">
      Interactive demonstrations of all KSnackbar features and configurations.
    </p>

    <!-- ============================================ -->
    <!-- SECTION 1: BASIC AUTO-DISMISS BEHAVIOR -->
    <!-- ============================================ -->
    <div style="margin-top: 40px; border: 1px solid #ddd; padding: 20px; border-radius: 4px;">
      <h2 style="margin-top: 0;">1. Basic Snackbar (Auto-dismiss - Default)</h2>
      <p style="color: #666; margin-bottom: 16px;">
        <strong>What happens:</strong> Message appears and automatically disappears after 4 seconds (default duration).
      </p>
      <KButton
        text="Show Basic Message"
        @click="showBasic"
      />
      <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; font-family: monospace; font-size: 13px;">
        <code>createSnackbar({ text: 'Changes saved successfully' });</code>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- SECTION 2: PERSISTENT BEHAVIOR -->
    <!-- ============================================ -->
    <div style="margin-top: 40px; border: 1px solid #ddd; padding: 20px; border-radius: 4px;">
      <h2 style="margin-top: 0;">2. Persistent Snackbar (No Auto-dismiss)</h2>
      <p style="color: #666; margin-bottom: 16px;">
        <strong>What happens:</strong> Message stays visible until user clicks "Dismiss" button.
        Set <code>autoDismiss: false</code> to disable auto-hide for important messages.
      </p>
      <KButton
        text="Show Persistent Message"
        @click="showPersistent"
      />
      <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; font-family: monospace; font-size: 13px;">
        <code>createSnackbar({ text: '...', autoDismiss: false, actionText: 'Dismiss' });</code>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- SECTION 3: ACTION BUTTON BEHAVIOR -->
    <!-- ============================================ -->
    <div style="margin-top: 40px; border: 1px solid #ddd; padding: 20px; border-radius: 4px;">
      <h2 style="margin-top: 0;">3. Snackbar with Action Button</h2>
      <p style="color: #666; margin-bottom: 16px;">
        <strong>What happens:</strong> Shows an action button that triggers a callback when clicked.
        Common use cases: "Undo" actions, "Retry" commands.
      </p>
      <KButton
        text="Show with Undo Action"
        @click="showWithAction"
      />
      <p
        v-if="actionTriggered"
        style="margin-top: 12px; color: green; font-weight: bold;"
      >
        ✓ Action was triggered!
      </p>
      <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; font-family: monospace; font-size: 13px;">
        <code>createSnackbar({ text: 'Item deleted', actionText: 'Undo', actionCallback: () => {...} });</code>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- SECTION 4: AUTOFOCUS TRUE -->
    <!-- ============================================ -->
    <div style="margin-top: 40px; border: 1px solid #ddd; padding: 20px; border-radius: 4px;">
      <h2 style="margin-top: 0;">4. Snackbar with Autofocus on Action</h2>
      <p style="color: #666; margin-bottom: 16px;">
        <strong>What happens:</strong> When <code>autofocus: true</code>, keyboard focus immediately 
        moves to the action button when snackbar appears. User can press Enter to trigger the action.
      </p>
      <KButton
        text="Show with Autofocus"
        @click="showWithAutofocus"
      />
      <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; font-family: monospace; font-size: 13px;">
        <code>createSnackbar({ text: 'Critical action', actionText: 'Confirm', autofocus: true, ... });</code>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- SECTION 5: AUTOFOCUS FALSE -->
    <!-- ============================================ -->
    <div style="margin-top: 40px; border: 1px solid #ddd; padding: 20px; border-radius: 4px;">
      <h2 style="margin-top: 0;">5. Snackbar without Autofocus (Default)</h2>
      <p style="color: #666; margin-bottom: 16px;">
        <strong>What happens:</strong> With <code>autofocus: false</code> (default), focus remains 
        where it was. User must Tab to reach the action button.
      </p>
      <KButton
        text="Show without Autofocus"
        @click="showWithoutAutofocus"
      />
      <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; font-family: monospace; font-size: 13px;">
        <code>createSnackbar({ text: 'Optional action', actionText: 'View', autofocus: false, ... });</code>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- SECTION 6: ONBLUR CALLBACK -->
    <!-- ============================================ -->
    <div style="margin-top: 40px; border: 1px solid #ddd; padding: 20px; border-radius: 4px;">
      <h2 style="margin-top: 0;">6. Snackbar with onBlur Callback</h2>
      <p style="color: #666; margin-bottom: 16px;">
        <strong>What happens:</strong> The <code>onBlur</code> callback fires when the action button 
        loses focus. Useful for auto-dismissing when user tabs away.
      </p>
      <KButton
        text="Show with onBlur Auto-dismiss"
        @click="showWithOnBlur"
      />
      <p style="margin-top: 12px; color: #666; font-size: 13px;">
        💡 Try: Click the button, then press Tab or click elsewhere. The snackbar will auto-dismiss.
      </p>
      <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; font-family: monospace; font-size: 13px;">
        <code>createSnackbar({ ..., autofocus: true, onBlur: () => clearSnackbar() });</code>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- SECTION 7: COMBINING FEATURES -->
    <!-- ============================================ -->
    <div style="margin-top: 40px; border: 1px solid #ddd; padding: 20px; border-radius: 4px;">
      <h2 style="margin-top: 0;">7. Combining Features: Autofocus + onBlur + Custom Duration</h2>
      <p style="color: #666; margin-bottom: 16px;">
        <strong>What happens:</strong> Demonstrates combining multiple features - custom duration (8s), 
        autofocus, and onBlur callback.
      </p>
      <KButton
        text="Show 8-second Snackbar"
        @click="showCombination"
      />
      <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; font-family: monospace; font-size: 13px;">
        <code>createSnackbar({ duration: 8000, autofocus: true, onBlur: () => {...}, ... });</code>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- SECTION 8: BOTTOM OFFSET -->
    <!-- ============================================ -->
    <div style="margin-top: 40px; border: 1px solid #ddd; padding: 20px; border-radius: 4px;">
      <h2 style="margin-top: 0;">8. Snackbar with Bottom Offset</h2>
      <p style="color: #666; margin-bottom: 16px;">
        <strong>What happens:</strong> Use <code>bottomOffset</code> to position the snackbar higher 
        from the bottom. Useful when you have a bottom navigation bar.
      </p>
      <KButton
        text="Show with 100px Offset"
        @click="showWithOffset"
      />
      <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; font-family: monospace; font-size: 13px;">
        <code>createSnackbar({ text: 'Positioned higher', bottomOffset: 100 });</code>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- SECTION 9: BACKDROP -->
    <!-- ============================================ -->
    <div style="margin-top: 40px; border: 1px solid #ddd; padding: 20px; border-radius: 4px;">
      <h2 style="margin-top: 0;">9. Snackbar with Backdrop</h2>
      <p style="color: #666; margin-bottom: 16px;">
        <strong>What happens:</strong> With <code>backdrop: true</code>, shows a darkening overlay 
        behind the snackbar. Also makes screen readers announce assertively instead of politely.
      </p>
      <KButton
        text="Show with Backdrop"
        @click="showWithBackdrop"
      />
      <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; font-family: monospace; font-size: 13px;">
        <code>createSnackbar({ text: 'Critical message', backdrop: true, autoDismiss: false, ... });</code>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- SECTION 10: STATUS UPDATES (FORCE REUSE) -->
    <!-- ============================================ -->
    <div style="margin-top: 40px; border: 1px solid #ddd; padding: 20px; border-radius: 4px;">
      <h2 style="margin-top: 0;">10. Status Updates (Force Reuse)</h2>
      <p style="color: #666; margin-bottom: 16px;">
        <strong>What happens:</strong> Using <code>forceReuse: true</code> updates the text in place 
        without replaying the transition. Perfect for connection status or progress updates.
      </p>
      <KButton
        text="Start Status Updates"
        @click="showStatusUpdates"
      />
      <p
        v-if="statusUpdateCount > 0"
        style="margin-top: 12px; color: #666;"
      >
        Updates sent: {{ statusUpdateCount }}
      </p>
      <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; font-family: monospace; font-size: 13px;">
        <code>createSnackbar({ text: 'Updated status', forceReuse: true });</code>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- SECTION 11: HIDE CALLBACK -->
    <!-- ============================================ -->
    <div style="margin-top: 40px; border: 1px solid #ddd; padding: 20px; border-radius: 4px;">
      <h2 style="margin-top: 0;">11. Hide Callback (Studio Pattern)</h2>
      <p style="color: #666; margin-bottom: 16px;">
        <strong>What happens:</strong> The <code>hideCallback</code> fires when the snackbar is 
        hidden or replaced. Useful for cleanup or promise resolution.
      </p>
      <KButton
        text="Show with Hide Callback"
        @click="showWithHideCallback"
      />
      <p
        v-if="hideCallbackTriggered"
        style="margin-top: 12px; color: purple; font-weight: bold;"
      >
        ✓ Hide callback was executed!
      </p>
      <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; font-family: monospace; font-size: 13px;">
        <code>createSnackbar({ text: '...', hideCallback: () => console.log('Hidden!') });</code>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- SNACKBAR COMPONENT -->
    <!-- ============================================ -->
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
  </div>

</template>


<script>

  import { ref } from 'vue';
  import useKSnackbar from '../../../lib/composables/useKSnackbar';

  export default {
    name: 'KSnackbarPlayground',
    setup() {
      const { snackbarIsVisible, snackbarOptions, createSnackbar, clearSnackbar } =
        useKSnackbar();

      const actionTriggered = ref(false);
      const hideCallbackTriggered = ref(false);
      const statusUpdateCount = ref(0);

      const handleActionClick = () => {
        if (snackbarOptions.value.actionCallback) {
          snackbarOptions.value.actionCallback();
        }
        clearSnackbar();
      };

      // 1. Basic auto-dismiss
      const showBasic = () => {
        createSnackbar({
          text: 'Changes saved successfully',
        });
      };

      // 2. Persistent snackbar
      const showPersistent = () => {
        createSnackbar({
          text: 'This is an important message that requires acknowledgment',
          autoDismiss: false,
          actionText: 'Dismiss',
          actionCallback: clearSnackbar,
        });
      };

      // 3. With action button
      const showWithAction = () => {
        actionTriggered.value = false;
        createSnackbar({
          text: 'Item deleted',
          actionText: 'Undo',
          actionCallback: () => {
            actionTriggered.value = true;
            console.log('Undo clicked!');
          },
        });
      };

      // 4. With autofocus
      const showWithAutofocus = () => {
        createSnackbar({
          text: 'Critical action required - focus on button',
          actionText: 'Confirm',
          autofocus: true,
          actionCallback: () => {
            console.log('Confirmed!');
          },
        });
      };

      // 5. Without autofocus
      const showWithoutAutofocus = () => {
        createSnackbar({
          text: 'Optional action available',
          actionText: 'View',
          autofocus: false,
          actionCallback: () => {
            console.log('View clicked!');
          },
        });
      };

      // 6. With onBlur callback
      const showWithOnBlur = () => {
        createSnackbar({
          text: 'Press Tab or click away to auto-dismiss',
          actionText: 'Keep Open',
          autofocus: true,
          onBlur: () => {
            console.log('Blurred - auto dismissing');
            setTimeout(() => clearSnackbar(), 100);
          },
          actionCallback: () => {
            console.log('Kept open!');
          },
        });
      };

      // 7. Combination of features
      const showCombination = () => {
        createSnackbar({
          text: 'This will auto-hide in 8 seconds',
          duration: 8000,
          actionText: 'Act Now',
          autofocus: true,
          onBlur: () => {
            console.log('User tabbed away');
          },
          actionCallback: () => {
            console.log('Action taken!');
          },
        });
      };

      // 8. Bottom offset
      const showWithOffset = () => {
        createSnackbar({
          text: 'Positioned 100px higher from bottom',
          bottomOffset: 100,
          duration: 4000,
        });
      };

      // 9. With backdrop
      const showWithBackdrop = () => {
        createSnackbar({
          text: 'Critical message with darkening backdrop',
          backdrop: true,
          autoDismiss: false,
          actionText: 'Dismiss',
          actionCallback: clearSnackbar,
        });
      };

      // 10. Status updates with forceReuse
      const showStatusUpdates = () => {
        statusUpdateCount.value = 0;

        createSnackbar({
          text: 'Connecting...',
          autoDismiss: false,
        });
        statusUpdateCount.value++;

        setTimeout(() => {
          createSnackbar({
            text: 'Authenticating...',
            forceReuse: true,
            autoDismiss: false,
          });
          statusUpdateCount.value++;
        }, 1500);

        setTimeout(() => {
          createSnackbar({
            text: 'Loading data...',
            forceReuse: true,
            autoDismiss: false,
          });
          statusUpdateCount.value++;
        }, 3000);

        setTimeout(() => {
          createSnackbar({
            text: 'Connected successfully!',
            forceReuse: true,
            duration: 2000,
          });
          statusUpdateCount.value++;
        }, 4500);
      };

      // 11. Hide callback
      const showWithHideCallback = () => {
        hideCallbackTriggered.value = false;
        createSnackbar({
          text: 'This has a hide callback (wait 3s)',
          duration: 3000,
          hideCallback: () => {
            console.log('Snackbar was hidden');
            hideCallbackTriggered.value = true;
          },
        });
      };

      return {
        snackbarIsVisible,
        snackbarOptions,
        clearSnackbar,
        handleActionClick,
        showBasic,
        showPersistent,
        showWithAction,
        showWithAutofocus,
        showWithoutAutofocus,
        showWithOnBlur,
        showCombination,
        showWithOffset,
        showWithBackdrop,
        showStatusUpdates,
        showWithHideCallback,
        actionTriggered,
        hideCallbackTriggered,
        statusUpdateCount,
      };
    },
  };

</script>


<style lang="scss" scoped>

  ::v-deep .k-snackbar-wrapper {
    z-index: 100;
  }

</style>
