<template>

  <div
    v-show="isOpen"
    class="kmselect-dropdown"
    :style="{ backgroundColor: $themeTokens.surface }"
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
        :showSelector="showSelector"
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
      v-if="decoratedOptionTree.length === 0"
      class="kmselect-dropdown-empty"
      role="status"
      :style="{ color: $themeTokens.annotation }"
    >
      <slot name="no-results">
        <p class="kmselect-dropdown-empty-text">
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

      // True when at least one root node has children — used to add group separators.
      const isHierarchical = computed(() =>
        optionTree.value.some(node => node.children && node.children.length > 0),
      );

      // Adds _showTopBorder to each root node so KMultiSelectNode can draw group separators.
      const decoratedOptionTree = computed(() =>
        filteredOptionTree.value.map((node, index) => ({
          ...node,
          _showTopBorder: isHierarchical.value && index > 0,
        })),
      );

      const showSelector = computed(() => props.multiple && !props.hideSelected);

      function forwardKeydown(event) {
        const listEl = klistboxRef.value?.$refs?.listEl;
        if (!listEl) return;

        let keyToDispatch = event.key;

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          const optionEls = listEl.querySelectorAll('[role="option"]');
          const optionCount = optionEls.length;

          if (optionCount > 0) {
            const focusedId = listEl.getAttribute('aria-activedescendant');
            const focusedIndex = focusedId
              ? Array.from(optionEls).findIndex(el => el.id === focusedId)
              : -1;

            if (event.key === 'ArrowDown' && focusedIndex === optionCount - 1) {
              // At last option → wrap to first
              keyToDispatch = 'Home';
            } else if (event.key === 'ArrowUp' && focusedIndex === 0) {
              // At first option → wrap to last
              keyToDispatch = 'End';
            }
          }
        }

        listEl.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: keyToDispatch,
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
        showSelector,
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
       * Removes selected options from the dropdown list. Intended for tags-style
       * UX where selections should only appear as chips, not in the dropdown.
       * Also suppresses checkboxes automatically.
       */
      hideSelected: {
        type: Boolean,
        default: false,
      },
    },
  };

</script>


<style lang="scss" scoped>

  @import '../../../../styles/definitions';
  @import '../../../../keen/styles/variables';

  .kmselect-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    z-index: $z-index-dropdown;
    max-height: 256px;
    padding: 8px 0;
    margin-top: 2px;
    overflow-y: auto;
    border-radius: 2px;
    @extend %dropshadow-2dp;
  }

  .kmselect-dropdown-empty {
    padding: 12px 16px;
    margin: 0;
    font-size: 14px;
    text-align: center;
  }

  .kmselect-dropdown-empty-text {
    margin: 0;
  }

</style>
