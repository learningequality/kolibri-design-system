<template>

  <li
    :id="elementId"
    role="option"
    :class="$computedClass(optionStyles)"
    :aria-selected="isSelected.toString()"
    :aria-setsize="totalOptions"
    :aria-posinset="position"
    :style="{
      padding: '8px 12px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      minHeight: '40px',
      backgroundColor: backgroundColor,
      outline: outline,
      outlineOffset: outlineOffset,
    }"
    :tabindex="isFocused ? 0 : -1"
    :data-option-id="option.id"
    :data-option-index="index"
    data-option-type="regular"
    @mousedown.prevent
    @mouseenter="$emit('option-mouseenter', option)"
  >
    <KCheckbox
      presentational
      :checked="isSelected"
      :style="{ flexShrink: 0 }"
      tabindex="-1"
      aria-hidden="true"
    />
    <span :style="{ flex: 1, wordBreak: 'break-word' }">
      <!-- Safe highlighting using computed text segments -->
      <template v-if="shouldHighlight">
        <span
          v-for="(segment, segmentIndex) in highlightedSegments"
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

</template>


<script>

  export default {
    name: 'KMultiSelectOption',
    setup() {
      return {};
    },
    props: {
      option: { type: Object, required: true },
      index: { type: Number, required: true },
      isSelected: { type: Boolean, default: false },
      isFocused: { type: Boolean, default: false },
      totalOptions: { type: Number, default: 0 },
      position: { type: Number, default: 1 },
      optionStyles: { type: Object, default: () => ({}) },
      backgroundColor: { type: String, default: 'transparent' },
      outline: { type: String, default: 'none' },
      outlineOffset: { type: String, default: '0' },
      shouldHighlight: { type: Boolean, default: false },
      highlightedSegments: { type: Array, default: () => [] },
      elementId: { type: String, required: true },
    },
    emits: [
      'option-mouseenter'
    ]
  };

</script>


<style lang="scss" scoped>

li {
  user-select: none;
  transition: background-color 0.15s ease, outline 0.15s ease;
}

li:hover {
  background-color: var(--hover-background);
}

li:focus {
  outline: 2px solid var(--primary) !important;
  outline-offset: -2px !important;
}

li:focus-visible {
  outline: 2px solid var(--primary) !important;
  outline-offset: -2px !important;
}

@media (prefers-contrast: high) {
  li:focus {
    outline: 3px solid;
    outline-offset: -1px;
  }
}

@media (prefers-reduced-motion: reduce) {
  li {
    transition: none;
  }
}

</style>