<template>

  <!--
    Playground: A private page for components development
    *****************************************************
    Place a component you're working on here and see it
    live on http://localhost:4000/playground

    Please do not commit your local updates of this file.
  -->
  <div style="padding: 40px; font-family: sans-serif">
    <h1 style="margin-bottom: 8px">KChip Playground</h1>
    <p style="margin-bottom: 32px; color: #666666">
      Testing all states and variations of the candidate <code>KChip</code> component.
    </p>

    <!-- Interactive Event Logger -->
    <div
      v-if="eventLog.length"
      style="
  padding: 12px;
  margin-bottom: 24px;
  font-family: monospace;
  background-color: #f0f0f0;
  border-left: 4px solid #0077c2;
  border-radius: 4px;
      "
    >
      <strong>Latest Event:</strong> {{ eventLog }}
    </div>

    <!-- Playground Grid -->
    <div style="display: flex; flex-direction: column; gap: 24px">
      <!-- State 1: Basic Chips -->
      <section>
        <h3 style="margin-bottom: 12px">Standard Chips (Non-closeable)</h3>
        <div style="display: flex; gap: 12px; align-items: center">
          <KChip text="Mathematics" />
          <KChip text="English Language Arts" />
        </div>
      </section>

      <!-- State 2: Closeable Chips -->
      <section>
        <h3 style="margin-bottom: 12px">Closeable Chips</h3>
        <div style="display: flex; gap: 12px; align-items: center">
          <KChip
            text="Science"
            close
            @close="logEvent('Science chip closed')"
          />
          <KChip
            text="Social Studies"
            close
            @close="logEvent('Social Studies chip closed')"
          />
        </div>
      </section>

      <!-- State 3: Disabled Chips -->
      <section>
        <h3 style="margin-bottom: 12px">Disabled Chips</h3>
        <div style="display: flex; gap: 12px; align-items: center">
          <KChip
            text="History (Disabled)"
            disabled
          />
          <KChip
            text="Geography (Disabled & Closeable)"
            close
            disabled
            @close="logEvent('This should not trigger!')"
          />
        </div>
      </section>

      <!-- State 4: Custom Accessible Label -->
      <section>
        <h3 style="margin-bottom: 12px">Custom Close Accessible Label (removeLabel)</h3>
        <div style="display: flex; gap: 12px; align-items: center">
          <KChip
            text="Custom Action"
            close
            removeLabel="Delete Custom Action tag"
            @close="logEvent('Custom Action chip closed')"
          />
        </div>
      </section>
    </div>
  </div>

</template>


<script>

  import KChip from '../../../lib/candidate/multiselect/KChip/index.vue';

  export default {
    name: 'Playground',
    components: {
      KChip,
    },
    data() {
      return {
        eventLog: '',
      };
    },
    methods: {
      logEvent(msg) {
        this.eventLog = `${msg} at ${new Date().toLocaleTimeString()}`;
      },
    },
  };

</script>
