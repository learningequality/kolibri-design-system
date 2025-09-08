<template>

  <div
    class="input-wrapper"
    :style="{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      minHeight: '40px',
      padding: '4px',
      gap: '4px'
    }"
  >
    <!-- Search Icon -->
    <KIcon
      v-if="autocomplete && !selectedOptions.length"
      icon="search"
      class="search-icon"
      :style="{
        color: $themeTokens.annotation,
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '16px',
        zIndex: 1,
      }"
      aria-hidden="true"
    />

    <!-- Selected Pills inside input -->
    <div
      v-for="(option, index) in selectedOptionsData"
      :key="option.id"
      class="pill"
      :style="{
        backgroundColor: $themeTokens.surface,
        border: `1px solid ${$themeTokens.fineLine}`,
        borderRadius: '16px',
        padding: '4px 8px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '14px',
        flexShrink: 0,
      }"
      role="listitem"
    >
      <span>{{ option.label }}</span>
      <KIconButton
        size="small"
        icon="clear"
        :ariaLabel="getClearPillLabel(option.label)"
        :title="getClearPillLabel(option.label)"
        @click="$emit('deselect-option', option)"
        @keydown="$emit('pill-keydown', $event, option, index)"
      />
    </div>

    <!-- Clear All Button (only when there are selections) -->
    <KIconButton
      v-if="selectedOptions && selectedOptions.length"
      size="small"
      icon="clear"
      :ariaLabel="clearAllMessage"
      :title="clearAllMessage"
      class="clear-all-button"
      :style="{ flexShrink: 0 }"
      @click="$emit('clear-all')"
    />

    <!-- Input Field -->
    <input
      ref="comboboxInput"
      v-model.trim="searchTextModel"
      type="text"
      role="combobox"
      :class="['combobox-input', $computedClass(inputStyles)]"
      :style="{
        flex: '1',
        minWidth: '120px',
        height: '32px',
        padding: searchInputPadding,
        border: 'none',
        outline: 'none',
        fontSize: '14px',
        color: $themeTokens.text,
      }"
      :placeholder="searchPlaceholder"
      :aria-label="ariaLabel"
      :aria-expanded="isDropdownOpen.toString()"
      :aria-controls="listboxId"
      :aria-activedescendant="activeDescendant"
      :aria-describedby="ariaDescribedById"
      :aria-autocomplete="autocomplete ? 'list' : 'none'"
      :aria-required="required ? 'true' : 'false'"
      :aria-invalid="invalid ? 'true' : 'false'"
      :disabled="disabled"
      :readonly="!autocomplete"
      @input="handleInput"
      @keydown="$emit('input-keydown', $event)"
      @focus="$emit('input-focus')"
      @blur="$emit('input-blur')"
      @click="$emit('input-click')"
    >

    <!-- Clear Search Button -->
    <KIconButton
      v-if="searchText && autocomplete"
      size="small"
      icon="clear"
      class="clear-search-button"
      :style="{
        position: 'absolute',
        right: '32px',
        top: '50%',
        transform: 'translateY(-50%)',
        flexShrink: 0,
      }"
      :ariaLabel="clearSearchMessage"
      :title="clearSearchMessage"
      @click="$emit('clear-search')"
    />

    <!-- Dropdown Toggle Button -->
    <KIconButton
      size="small"
      :icon="isDropdownOpen ? 'chevronUp' : 'chevronDown'"
      class="dropdown-toggle"
      :style="{
        position: 'absolute',
        right: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        flexShrink: 0,
      }"
      :ariaLabel="toggleDropdownLabel"
      :title="toggleDropdownLabel"
      :aria-expanded="isDropdownOpen.toString()"
      @click="$emit('toggle-dropdown')"
      @mousedown.prevent
    />
  </div>

</template>


<script>

  import { computed, ref } from 'vue';

  export default {
    name: 'KMultiSelectInput',
    setup(props, { emit }) {
      const comboboxInput = ref(null);

      const searchTextModel = computed({
        get() { return props.searchText; },
        set(value) { emit('update:searchText', value); }
      });

      const inputStyles = computed(() => {
        try {
          return {
            '::placeholder': { color: props.$themeTokens?.annotation || '#666666' }
          };
        } catch (error) {
          return {
            '::placeholder': { color: '#666666' }
          };
        }
      });

      function handleInput(event) {
        emit('search-input', event);
      }

      function focusInput() {
        if (comboboxInput.value) {
          comboboxInput.value.focus();
        }
      }

      return {
        comboboxInput,
        searchTextModel,
        inputStyles,
        handleInput,
        focusInput,
      };
    },
    props: {
      // Input related props
      searchText: { type: String, default: '' },
      autocomplete: { type: Boolean, default: false },
      searchPlaceholder: { type: String, default: 'Search...' },
      searchInputPadding: { type: String, default: '0 40px 0 12px' },

      selectedOptions: { type: Array, default: () => [] },
      selectedOptionsData: { type: Array, default: () => [] },

      ariaLabel: { type: String, default: '' },
      listboxId: { type: String, default: '' },
      activeDescendant: { type: String, default: null },
      ariaDescribedById: { type: String, default: '' },

      isDropdownOpen: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
      invalid: { type: Boolean, default: false },

      clearAllMessage: { type: String, default: 'Clear all selections' },
      clearSearchMessage: { type: String, default: 'Clear search' },
      toggleDropdownLabel: { type: String, default: 'Toggle dropdown' },

      getClearPillLabel: { type: Function, required: true },
    },
    emits: [
      'update:searchText',
      'deselect-option',
      'clear-all',
      'input-keydown',
      'input-focus',
      'input-blur',
      'input-click',
      'clear-search',
      'toggle-dropdown',
      'search-input'
    ]
  };

</script>


<style lang="scss" scoped>

.pill {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.combobox-input:focus {
  outline: 2px solid var(--primary);
  outline-offset: -2px;
}

.combobox-input[readonly] {
  cursor: pointer;
  background-color: transparent;
}

.combobox-input[readonly]:focus {
  outline: 2px solid var(--primary);
  outline-offset: -2px;
}

.input-wrapper {
  min-height: 40px !important;
}

@media (prefers-contrast: high) {
  .combobox-input:focus {
    outline: 3px solid;
    outline-offset: -1px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pill {
    animation: none;
  }
}

</style>
