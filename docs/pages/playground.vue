<template>

  <div id="app">
    <h1>KTable Component Example</h1>

    <!-- Local Sorting Table Example -->
    <h2>Local Sorting Table</h2>
    <KTable
      :headers="headers"
      :rows="rows"
      caption="Local Sorting Table"
      :useLocalSorting="true"
      sortable
    >
      <template #header="{ header, index }">
        <span>{{ header.label }} (Local)</span>
      </template>
      <template #cell="{ content, rowIndex, colIndex }">
        <span v-if="colIndex === 1">{{ content }} years old</span>
        <span v-else>{{ content }}</span>
      </template>
    </KTable>

    <!-- Backend Sorting Table Example -->
    <h2>Backend Sorting Table(with Custom Widths)</h2>
    <div ref="loadingArea" role="status" aria-live="polite" class="sr-only">
      {{ loadingMessage }}
    </div>
    <KTable
      :headers="headersWithCustomWidths"
      :rows="backendRows"
      caption="Backend Sorting Table"
      :useLocalSorting="false"
      sortable
      @changeSort="changeSortHandler"
    >
      <template #header="{ header, index }">
        <span>{{ header.label }} (Backend)</span>
      </template>
      <template #cell="{ content, rowIndex, colIndex }">
        <span v-if="colIndex === 2">{{ content }} (City)</span>
        <span v-else>{{ content }}</span>
      </template>
    </KTable>

    <div v-if="isLoading" class="loading-overlay">
      Data is loading. Please wait...
    </div>
  </div>

</template>


<script>

  /*
             Playground is a Vue component too,
             so you can also use `data`, `methods`, etc.
             as usual if helpful
           */
  import { ref } from '@vue/composition-api';
  import KTable from '../../lib/KTable';

  export default {
    name: 'Playground',
    components: {
      KTable,
    },
    setup() {
      const loadingArea = ref(null);
      const isLoading = ref(false);
      const loadingMessage = ref('');

      const updateLoadingMessage = message => {
        loadingMessage.value = message;
        if (loadingArea.value) {
          loadingArea.value.setAttribute('aria-live', 'off'); // Temporarily disable live region
          void loadingArea.value.offsetWidth; // Force reflow
          loadingArea.value.setAttribute('aria-live', 'polite'); // Re-enable live region
        }
      };

      return {
        loadingArea,
        isLoading,
        loadingMessage,
        updateLoadingMessage,
      };
    },
    data() {
      return {
        headers: [
          { label: 'Name', dataType: 'string' },
          { label: 'Age', dataType: 'numeric' },
          { label: 'City', dataType: 'string' },
          { label: 'Joined', dataType: 'date' },
          { label: 'Misc', dataType: 'others' },
        ],
        headersWithCustomWidths: [
          { label: 'Name', dataType: 'string', minWidth: '20px', width: '2%' },
          { label: 'Age', dataType: 'numeric', minWidth: '100px', width: '33%' },
          { label: 'City', dataType: 'string', minWidth: '200px', width: '25%' },
          { label: 'Joined', dataType: 'date', minWidth: '150px', width: '20%' },
          { label: 'Misc', dataType: 'others', minWidth: '100px', width: '20%' },
        ],
        rows: [
          ['John Doe', 28, 'New York', '2022-01-15T00:00:00Z', 'N/A'],
          ['Jane Smith', 34, 'Los Angeles', '2021-12-22T00:00:00Z', 'N/A'],
          ['Samuel Green', 22, 'Chicago', '2023-03-10T00:00:00Z', 'N/A'],
          ['Alice Johnson', 30, 'Houston', '2020-07-18T00:00:00Z', 'N/A'],
        ],
        backendRows: [
          ['John Doe', 28, 'New York', '2022-01-15T00:00:00Z', 'N/A'],
          ['Jane Smith', 34, 'Los Angeles', '2021-12-22T00:00:00Z', 'N/A'],
          ['Samuel Green', 22, 'Chicago', '2023-03-10T00:00:00Z', 'N/A'],
          ['Alice Johnson', 30, 'Houston', '2020-07-18T00:00:00Z', 'N/A'],
        ],
      };
    },
    methods: {
      async changeSortHandler(index, sortOrder) {
        this.isLoading = true;
        this.updateLoadingMessage('Data is loading. Please wait...');

        this.$nextTick(() => {
          if (this.$refs.loadingArea) {
            this.$refs.loadingArea.focus();
          }
        });

        // Simulate fetching sorted data from backend
        console.log('Fetching sorted data from backend for column:', index, 'order:', sortOrder);

        setTimeout(() => {
          // For demo purposes, we just reverse the rows
          this.backendRows = [...this.backendRows].reverse();
          this.isLoading = false;
          this.updateLoadingMessage('Data loaded successfully.');

          setTimeout(() => {
            this.updateLoadingMessage('');
          }, 5000);
        }, 10000); // Simulate a 10 second delay for fetching data
      },
    },
  };

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

h1, h2 {
  margin: 20px 0;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>