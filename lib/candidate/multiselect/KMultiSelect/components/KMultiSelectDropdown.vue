<template>

  <div
    v-show="isOpen"
    class="kmselect-dropdown"
    :style="{
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      zIndex: 8,
      marginTop: '2px',
      padding: '8px 0',
      borderRadius: '2px',
      maxHeight: '256px',
      overflowY: 'auto',
      backgroundColor: $themeTokens.surface,
      boxShadow: [
        '0 2px 2px 0 rgba(0,0,0,0.14)',
        '0 1px 5px 0 rgba(0,0,0,0.12)',
        '0 3px 1px -2px rgba(0,0,0,0.2)',
      ].join(', '),
    }"
    @mousedown.prevent
  >
    <KListbox
      :id="listboxId"
      ref="klistboxRef"
      :value="normalizedSelectedValues"
      :ariaLabel="listboxLabel"
      :messages="listboxMessages"
      :multiple="multiple"
      @input="$emit('input', $event)"
      @active-descendant-change="$emit('active-descendant-change', $event)"
    >
      <KMultiSelectNode
        v-for="node in decoratedOptionTree"
        :key="node.value"
        :node="node"
        :showCheckbox="showCheckbox"
        :indeterminateValues="indeterminateValues"
        :showTopBorder="node._showTopBorder"
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
    </KListbox>

    <div
      v-if="optionTree.length === 0"
      role="status"
      :style="{
        margin: 0,
        padding: '12px 16px',
        textAlign: 'center',
        color: $themeTokens.annotation,
        fontSize: '14px',
      }"
    >
      <slot name="empty">
        <p :style="{ margin: 0 }">
          {{ noResultsText }}
        </p>
      </slot>
    </div>
  </div>

</template>


<script>

  import { computed, ref } from 'vue';
  import KListbox from '../../../listbox/KListbox/index.vue';
  import KMultiSelectNode from './KMultiSelectNode.vue';

  // Converts a flat options array with integer levels into a nested tree
  function buildTree(flatOptions, resolveLabel, resolveValue) {
    const roots = [];
    const stack = [];

    for (const opt of flatOptions) {
      const depth = typeof opt.level === 'number' ? opt.level : 0;
      const label = resolveLabel(opt) ?? opt.label ?? opt.text ?? '';
      const value = resolveValue(opt) ?? opt.value;
      const node = { value, label };

      Object.keys(opt).forEach(k => {
        if (!['label', 'level'].includes(k)) node[k] = opt[k];
      });

      if (depth === 0) {
        roots.push(node);
        stack.length = 1;
        stack[0] = node;
      } else {
        const parent = stack[depth - 1];
        if (parent) {
          if (!parent.children) parent.children = [];
          parent.children.push(node);
          stack[depth] = node;
          stack.length = depth + 1;
        } else {
          roots.push(node);
          stack[0] = node;
          stack.length = 1;
        }
      }
    }

    return roots;
  }

  export default {
    name: 'KMultiSelectDropdown',

    components: { KListbox, KMultiSelectNode },

    setup(props) {
      const klistboxRef = ref(null);

      const normalizedSelectedValues = computed(() =>
        Array.isArray(props.selectedValues) ? props.selectedValues : [],
      );

      const resolveLabel = computed(() => {
        const key = props.itemText;
        return typeof key === 'function' ? key : opt => opt[key];
      });

      const resolveValue = computed(() => {
        const key = props.itemValue;
        return opt => opt[key];
      });

      const optionTree = computed(() =>
        buildTree(props.options, resolveLabel.value, resolveValue.value),
      );

      const filteredOptionTree = computed(() => {
        if (!props.hideSelected) return optionTree.value;
        const selectedSet = new Set(normalizedSelectedValues.value.map(String));
        return optionTree.value.filter(node => !selectedSet.has(String(node.value)));
      });

      /**
       * True if the option tree has at least one node with children.
       * Used to decide whether to draw top-border separators between root nodes.
       */
      const isHierarchical = computed(() =>
        optionTree.value.some(node => node.children && node.children.length > 0),
      );

      /**
       * Decorates each root node with a `_showTopBorder` flag.
       * When true, KMultiSelectNode renders a top border to visually
       * separate hierarchical groups. Never applied to flat lists.
       */
      const decoratedOptionTree = computed(() =>
        filteredOptionTree.value.map((node, index) => ({
          ...node,
          _showTopBorder: isHierarchical.value && index > 0,
        })),
      );

      /**
       * Checkboxes are only shown when:
       * 1. multiple=true  — single-select mode never needs checkboxes, and
       * 2. hideSelected=false — tags mode hides them because selected items vanish.
       */
      const showCheckbox = computed(() => props.multiple && !props.hideSelected);

      // Forward keyboard event from input to KListbox so focus stays on the input.
      function forwardKeydown(event) {
        const listEl = klistboxRef.value?.$refs?.listEl;
        if (!listEl) return;
        listEl.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: event.key,
            code: event.code,
            ctrlKey: event.ctrlKey,
            metaKey: event.metaKey,
            shiftKey: event.shiftKey,
            altKey: event.altKey,
            bubbles: true,
            cancelable: true,
          }),
        );
      }

      function hasFocusedOption() {
        const listEl = klistboxRef.value?.$refs?.listEl;
        if (!listEl) return false;
        return !!listEl.getAttribute('aria-activedescendant');
      }

      return {
        klistboxRef,
        normalizedSelectedValues,
        decoratedOptionTree,
        optionTree,
        showCheckbox,
        // eslint-disable-next-line vue/no-unused-properties
        forwardKeydown,
        // eslint-disable-next-line vue/no-unused-properties
        hasFocusedOption,
      };
    },

    props: {
      isOpen: {
        type: Boolean,
        default: false,
      },
      options: {
        type: Array,
        required: true,
      },
      selectedValues: {
        type: Array,
        default: () => [],
      },
      listboxId: {
        type: String,
        required: true,
      },
      listboxLabel: {
        type: String,
        default: '',
      },
      noResultsText: {
        type: String,
        default: null,
      },
      itemText: {
        type: String,
        default: 'label',
      },
      itemValue: {
        type: String,
        default: 'value',
      },
      indeterminateValues: {
        type: Set,
        default: () => new Set(),
      },
      listboxMessages: {
        type: Object,
        default: () => ({
          clickable: () => '',
          allOptionsSelected: () => '',
          allOptionsDeselected: () => '',
          optionDeselected: () => '',
        }),
      },
      multiple: {
        type: Boolean,
        default: true,
      },
      /**
       * When true, options that are currently selected are removed from the
       * dropdown list. Used for Tags-style chip creation where selected items
       * should only appear as chips, not remain visible in the dropdown.
       * Also automatically suppresses checkboxes since there is nothing to "check".
       */
      hideSelected: {
        type: Boolean,
        default: false,
      },
    },
  };

</script>
