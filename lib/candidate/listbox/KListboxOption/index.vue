<template>

  <li
    :id="optionId"
    role="option"
    class="k-listbox-option"
    :class="$computedClass(rowStyles)"
    :style="isFocused ? { ...$coreOutline, outlineOffset: '-3px' } : {}"
    :aria-selected="String(isSelected)"
    @click="onClick"
  >
    <!--
      margin reset prevents KCheckbox from taking more space
      than necessary and aligns its correctly within the row
    -->
    <KCheckbox
      presentational
      :style="{ marginTop: '6px', marginBottom: '0' }"
      :checked="isSelected"
      :indeterminate="indeterminate"
      :label="label"
    >
      <!-- @slot For customizing option label -->
      <slot></slot>
    </KCheckbox>
  </li>

</template>


<script>

  import { computed, inject, onMounted, onBeforeUnmount } from 'vue';
  import { themePalette, themeTokens } from '../../../styles/theme';

  let optionCount = 0;

  /**
   * Single option inside KListbox
   */
  export default {
    name: 'KListboxOption',
    setup(props) {
      const listbox = inject('klistbox');

      const uid = optionCount++;
      const optionId = `klistbox-option-${uid}`;

      onMounted(() => listbox.registerOption({ id: optionId, value: props.value }));

      onBeforeUnmount(() => listbox.unregisterOption({ id: optionId, value: props.value }));

      const isSelected = computed(() => listbox.isSelected(props.value));

      const isFocused = computed(() => listbox.isFocused(props.value));

      const rowStyles = computed(() => ({
        backgroundColor: themeTokens().surface,
        ':hover': {
          backgroundColor: themePalette().grey.v_100,
        },
      }));

      function onClick() {
        listbox.toggleOption(props.value);
      }

      return {
        optionId,
        isSelected,
        isFocused,
        rowStyles,
        onClick,
      };
    },
    props: {
      /**
       * A unique value identifying the option within a listbox
       */
      value: {
        type: [String, Number],
        required: true,
      },
      /**
       * Option label also used as the accessible name
       */
      label: {
        type: String,
        required: true,
      },
      /**
       * Indeterminate visual state for group checkboxes.
       */
      indeterminate: {
        type: Boolean,
        default: false,
      },
    },
  };

</script>


<style lang="scss" scoped>

  .k-listbox-option {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

</style>
