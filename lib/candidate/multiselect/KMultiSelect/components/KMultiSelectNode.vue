<template>

  <KListboxGroup
    v-if="hasChildren"
    :label="node.label"
    hideLabel
  >
    <KListboxOption
      :value="node.value"
      :label="node.label"
      :indeterminate="isIndeterminate"
      :showCheckbox="showCheckbox"
      :style="indentStyle"
    >
      <template v-if="$scopedSlots.option">
        <slot
          name="option"
          :node="node"
          :isGroup="true"
        ></slot>
      </template>
    </KListboxOption>

    <KMultiSelectNode
      v-for="child in node.children"
      :key="child.value"
      :node="child"
      :depth="depth + 1"
      :showCheckbox="showCheckbox"
      :indeterminateValues="indeterminateValues"
    >
      <template
        v-if="$scopedSlots.option"
        #option="slotProps"
      >
        <slot
          name="option"
          v-bind="slotProps"
        ></slot>
      </template>
    </KMultiSelectNode>
  </KListboxGroup>

  <KListboxOption
    v-else
    :value="node.value"
    :label="node.label"
    :showCheckbox="showCheckbox"
    :style="indentStyle"
  >
    <template v-if="$scopedSlots.option">
      <slot
        name="option"
        :node="node"
        :isGroup="false"
      ></slot>
    </template>
  </KListboxOption>

</template>


<script>

  import KListboxGroup from '../../../listbox/KListboxGroup/index.vue';
  import KListboxOption from '../../../listbox/KListboxOption/index.vue';

  export default {
    name: 'KMultiSelectNode',

    components: {
      KListboxGroup,
      KListboxOption,
    },

    props: {
      node: {
        type: Object,
        required: true,
      },
      depth: {
        type: Number,
        default: 0,
      },
      indeterminateValues: {
        type: Set,
        default: () => new Set(),
      },
      /**
       * When false, options are rendered without a checkbox visual.
       * Derived automatically by KMultiSelectDropdown as `multiple && !hideSelected`.
       */
      showCheckbox: {
        type: Boolean,
        default: true,
      },
    },

    computed: {
      hasChildren() {
        return Array.isArray(this.node.children) && this.node.children.length > 0;
      },

      isIndeterminate() {
        return this.indeterminateValues.has(this.node.value);
      },

      indentStyle() {
        return this.depth > 0 ? { paddingInlineStart: `${this.depth * 24}px` } : {};
      },
    },
  };

</script>
