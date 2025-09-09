<template>

  <div
    v-show="isDropdownOpen"
    ref="dropdownContainer"
    class="dropdown-container"
    :style="{
      position: 'absolute',
      top: '100%',
      left: '0',
      right: '0',
      zIndex: '1000',
      backgroundColor: $themeTokens.surface,
      border: `1px solid ${$themeTokens.fineLine}`,
      borderTop: 'none',
      borderRadius: '0 0 4px 4px',
      maxHeight: '400px',
      overflowY: 'auto',
    }"
    role="region"
    @mousedown.prevent
  >
    <ul
      :id="listboxId"
      class="dropdown-list"
      role="listbox"
      aria-multiselectable="true"
      :style="{
        margin: '0',
        padding: '0',
        listStyle: 'none',
        outline: 'none',
      }"
      :aria-labelledby="ariaLabelledby"
      :aria-describedby="ariaDescribedById"
      tabindex="-1"
      @keydown="$emit('list-keydown', $event)"
      @click="$emit('list-click', $event)"
      @mouseenter="$emit('list-mouseenter', $event)"
      @mouseleave="$emit('list-mouseleave', $event)"
      @focus="$emit('list-focus', $event)"
    >
      <!-- Select All Option -->
      <li
        v-if="showSelectAll"
        :id="`select-all-${uid}`"
        role="option"
        :class="$computedClass(selectAllStyles)"
        :aria-selected="allOptionsSelected.toString()"
        :style="{
          padding: '8px 12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          minHeight: '40px',
          borderBottom: `1px solid ${$themeTokens.fineLine}`,
          fontWeight: 'bold',
          backgroundColor: selectAllBackgroundColor,
          outline: selectAllOutline,
          outlineOffset: selectAllOutlineOffset,
        }"
        :tabindex="isSelectAllFocused ? 0 : -1"
        data-option-type="select-all"
        @mousedown.prevent
        @mouseenter="$emit('select-all-mouseenter')"
      >
        <KCheckbox
          presentational
          :checked="allOptionsSelected"
          :indeterminate="someOptionsSelected && !allOptionsSelected"
          :style="{ flexShrink: 0 }"
          tabindex="-1"
          aria-hidden="true"
        />
        <span :style="{ flex: 1 }">Select All</span>
      </li>

      <!-- Individual Options -->
      <li
        v-for="(option, index) in displayedOptions"
        :id="getElementOptionId(option)"
        :key="option.id"
        :ref="el => { if (el) optionRefs[index] = el }"
        role="option"
        :class="$computedClass(getOptionStyles(option))"
        :aria-selected="isOptionSelected(option).toString()"
        :aria-setsize="displayedOptions.length"
        :aria-posinset="index + 1"
        :style="{
          padding: '8px 12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          minHeight: '40px',
          backgroundColor: getOptionBackgroundColor(option),
          outline: getOptionOutline(option),
          outlineOffset: getOptionOutlineOffset(option),
        }"
        :tabindex="focusedOption?.id === option.id ? 0 : -1"
        :data-option-id="option.id"
        :data-option-index="index"
        data-option-type="regular"
        @mousedown.prevent
        @mouseenter="$emit('option-mouseenter', option)"
      >
        <KCheckbox
          presentational
          :checked="isOptionSelected(option)"
          :style="{ flexShrink: 0 }"
          tabindex="-1"
          aria-hidden="true"
        />
        <span :style="{ flex: 1, wordBreak: 'break-word' }">
          <!-- Safe highlighting using computed text segments -->
          <template v-if="shouldHighlightText(option.label)">
            <span
              v-for="(segment, segmentIndex) in
                getHighlightedSegments(option.label, searchText)"
              :key="`${option.id}-segment-${segmentIndex}`"
            >
              <mark
                v-if="segment.highlight"
                :style="{
                  backgroundColor: 'yellow',
                  color: 'black',
                  padding: '0'
                }"
              >{{ segment.text }}</mark>
              <span v-else>{{ segment.text }}</span>
            </span>
          </template>
          <template v-else>
            {{ option.label }}
          </template>
        </span>
      </li>
    </ul>

    <!-- No Results Message -->
    <div
      v-if="!displayedOptions.length"
      role="status"
      class="no-options"
      :style="{
        padding: '12px',
        margin: '0',
        textAlign: 'center',
        color: $themeTokens.annotation,
      }"
    >
      {{ noResultsMessage }}
    </div>
  </div>

</template>


<script>

  import { ref } from 'vue';

  export default {
    name: 'KMultiSelectDropdown',
    setup() {
      const dropdownContainer = ref(null);
      const optionRefs = ref([]);

      return {
        dropdownContainer,
        optionRefs,
      };
    },
    props: {
      // Dropdown state
      isDropdownOpen: { type: Boolean, default: false },

      // Options data
      displayedOptions: { type: Array, default: () => [] },
      searchText: { type: String, default: '' },

      // Selection state
      allOptionsSelected: { type: Boolean, default: false },
      someOptionsSelected: { type: Boolean, default: false },
      showSelectAll: { type: Boolean, default: false },

      // Focus state
      focusedOption: { type: Object, default: null },
      isSelectAllFocused: { type: Boolean, default: false },

      // Styling functions
      selectAllStyles: { type: Object, default: () => ({}) },
      selectAllBackgroundColor: { type: String, default: 'transparent' },
      selectAllOutline: { type: String, default: 'none' },
      selectAllOutlineOffset: { type: String, default: '0' },

      // Accessibility
      listboxId: { type: String, default: '' },
      ariaLabelledby: { type: String, default: null },
      ariaDescribedById: { type: String, default: '' },
      uid: { type: [String, Number], required: true },

      // Messages
      noResultsMessage: { type: String, default: 'No options available' },

      // Functions passed from parent
      getElementOptionId: { type: Function, required: true },
      getOptionStyles: { type: Function, required: true },
      getOptionBackgroundColor: { type: Function, required: true },
      getOptionOutline: { type: Function, required: true },
      getOptionOutlineOffset: { type: Function, required: true },
      isOptionSelected: { type: Function, required: true },
      shouldHighlightText: { type: Function, required: true },
      getHighlightedSegments: { type: Function, required: true },
    },
    emits: [
      'list-keydown',
      'list-click',
      'list-mouseenter',
      'list-mouseleave',
      'list-focus',
      'select-all-mouseenter',
      'option-mouseenter'
    ]
  };

</script>


<style lang="scss" scoped>

.dropdown-container {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-list li {
  user-select: none;
  transition: background-color 0.15s ease, outline 0.15s ease;
}

.dropdown-list li:hover {
  background-color: var(--hover-background);
}

.dropdown-list li:focus {
  outline: 2px solid var(--primary) !important;
  outline-offset: -2px !important;
}

.dropdown-list li:focus-visible {
  outline: 2px solid var(--primary) !important;
  outline-offset: -2px !important;
}

@media (prefers-contrast: high) {
  .dropdown-list li:focus {
    outline: 3px solid;
    outline-offset: -1px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dropdown-list li {
    transition: none;
  }
}

</style>
