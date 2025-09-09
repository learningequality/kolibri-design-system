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
      <KMultiSelectOption
        v-for="(option, index) in displayedOptions"
        :key="option.id"
        :ref="el => { if (el) optionRefs[index] = el }"
        :option="option"
        :index="index"
        :isSelected="isOptionSelected(option)"
        :isFocused="focusedOption?.id === option.id"
        :totalOptions="displayedOptions.length"
        :position="index + 1"
        :optionStyles="getOptionStyles(option)"
        :backgroundColor="getOptionBackgroundColor(option)"
        :outline="getOptionOutline(option)"
        :outlineOffset="getOptionOutlineOffset(option)"
        :searchText="searchText"
        :shouldHighlight="shouldHighlightText(option.label)"
        :highlightedSegments="getHighlightedSegments(option.label, searchText)"
        :elementId="getElementOptionId(option)"
        @option-mouseenter="$emit('option-mouseenter', option)"
      />
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
  import KMultiSelectOption from './KMultiSelectOption.vue';

  export default {
    name: 'KMultiSelectDropdown',
    components: {
      KMultiSelectOption,
    },
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

</style>
