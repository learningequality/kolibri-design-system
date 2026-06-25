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

  import { computed } from 'vue';
  import { themeTokens } from '../../../../styles/theme';
  import KListboxGroup from '../../../listbox/KListboxGroup/index.vue';
  import KListboxOption from '../../../listbox/KListboxOption/index.vue';

  export default {
    name: 'KMultiSelectNode',

    components: {
      KListboxGroup,
      KListboxOption,
    },

    setup(props) {
      const hasChildren = computed(
        () => Array.isArray(props.node.children) && props.node.children.length > 0,
      );

      const isIndeterminate = computed(() => props.indeterminateValues.has(props.node.value));

      const indentStyle = computed(() => {
        const style = {
          paddingInlineStart: `${16 + (props.depth * 24)}px`,
          paddingInlineEnd: '16px',
          minHeight: '48px',
        };
        if (props.showTopBorder) {
          style.borderTop = `1px solid ${themeTokens().fineLine}`;
        }
        return style;
      });

      return { hasChildren, isIndeterminate, indentStyle };
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
      /**
       * When true, renders a top border on this node to visually separate
       * hierarchical root groups. Set by KMultiSelectDropdown's decoratedOptionTree.
       * Never applied to flat lists or child nodes.
       */
      showTopBorder: {
        type: Boolean,
        default: false,
      },
    },
  };

</script>
