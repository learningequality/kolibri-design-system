<template>

  <!--
    KMultiSelectNode — renders a single tree node recursively.

    If the node has children it wraps itself in a KListboxGroup and renders
    each child as another KMultiSelectNode.  Leaf nodes (no children) render
    a plain KListboxOption.

    `depth` drives visual indentation (24px per level) applied directly to
    the KListboxOption wrapper.  It increments automatically on every
    recursive call — no hardcoded level checks anywhere.

    `indeterminateValues` is a Set of values that should display the dash
    state (some-but-not-all descendants selected).  It is forwarded down
    recursively so every node at every depth can read its own state.
  -->

  <!-- ── Group node ──────────────────────────────────────────────── -->
  <KListboxGroup
    v-if="hasChildren"
    :label="node.label"
    :hideLabel="node.selectable !== false"
  >
    <!--
      A group node can also be selectable itself (e.g. "Select channel").
      Render its own KListboxOption first, then its children.
    -->
    <KListboxOption
      v-if="node.selectable !== false"
      :value="node.value"
      :label="node.label"
      :indeterminate="isIndeterminate"
      :style="indentStyle"
    >
      <!--
        Named `option` slot — consumer can override the row content.
        Fallback: plain label text so basic lists always render correctly
        even when no #option slot is provided by the consumer.
      -->
      <slot
        name="option"
        :node="node"
        :isGroup="true"
      >
        {{ node.label }}
      </slot>
    </KListboxOption>

    <!-- Recurse into children — no depth limit -->
    <KMultiSelectNode
      v-for="child in node.children"
      :key="child.value"
      :node="child"
      :depth="depth + 1"
      :indeterminateValues="indeterminateValues"
    >
      <!--
        Forward the consumer's #option slot down into child nodes.
        Only wires up the template when the parent actually provides the slot,
        so the child's own {{ node.label }} fallback stays active otherwise.
      -->
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

  <!-- ── Leaf node ───────────────────────────────────────────────── -->
  <KListboxOption
    v-else
    :value="node.value"
    :label="node.label"
    :style="indentStyle"
  >
    <slot
      name="option"
      :node="node"
      :isGroup="false"
    >
      {{ node.label }}
    </slot>
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
      // Vue 2 resolves recursive components by name automatically —
      // the `name: 'KMultiSelectNode'` above is enough for <KMultiSelectNode>
      // to work recursively without any async/circular import tricks.
    },

    props: {
      /**
       * A tree node object.
       * Shape: { value, label, [children], [selectable] }
       *
       * - value      {String|Number}  Unique identifier (required for leaf + group-with-value)
       * - label      {String}         Display text (required)
       * - children   {Array}          Nested child nodes (makes this a group node)
       * - selectable {Boolean}        When false on a group node, the group header
       *                               is not rendered as a KListboxOption (default: true)
       */
      node: {
        type: Object,
        required: true,
      },

      /**
       * Current nesting depth (0 = top-level).
       * Incremented automatically on every recursive call.
       * Used to compute the left padding that visually signals hierarchy.
       */
      depth: {
        type: Number,
        default: 0,
      },

      /**
       * Set of option values whose KListboxOption should show the indeterminate
       * (dash) state — meaning some but not all descendants are selected.
       * Computed in KMultiSelect/index.vue and forwarded through the tree.
       */
      indeterminateValues: {
        type: Set,
        default: () => new Set(),
      },
    },

    computed: {
      hasChildren() {
        return Array.isArray(this.node.children) && this.node.children.length > 0;
      },

      /**
       * Whether this node's checkbox should show the indeterminate (dash) state.
       * True when some-but-not-all descendants are selected.
       */
      isIndeterminate() {
        return this.indeterminateValues.has(this.node.value);
      },

      /**
       * Adds 24px of left padding per depth level.
       * Uses paddingInlineStart for automatic RTL support.
       */
      indentStyle() {
        return this.depth > 0 ? { paddingInlineStart: `${this.depth * 24}px` } : {};
      },
    },
  };

</script>
