<template>

  <li
    :id="optionId"
    role="option"
    class="k-listbox-option"
    :class="$computedClass(rowStyles)"
    :style="isFocused ? { ...$coreOutline, outlineOffset: '-3px' } : {}"
    :aria-selected="indeterminate ? undefined : String(isSelected)"
    @click="onClick"
  >
    <!--
      margin reset prevents KCheckbox from taking more space
      than necessary and aligns it correctly within the row
    -->
    <KCheckbox
      v-if="effectiveShowSelector"
      presentational
      :style="{ marginTop: '6px', marginBottom: '0' }"
      :checked="isSelected"
      :indeterminate="indeterminate"
      :label="label"
    >
      <!-- @slot For customizing option label -->
      <slot>{{ label }}</slot>
      <span
        v-if="indeterminate && partiallySelectedText"
        class="visuallyhidden"
        aria-hidden="false"
      >
        {{ partiallySelectedText }}
      </span>
    </KCheckbox>

    <span
      v-else
      class="k-option-plain-label"
      :style="{
        color: isSelected ? $themeTokens.primary : 'inherit',
        fontWeight: isSelected ? '500' : 'normal',
      }"
    >
      <KIcon
        icon="done"
        class="k-option-check-icon"
        :color="$themeTokens.primary"
        :style="{ visibility: isSelected ? 'visible' : 'hidden', top: '0' }"
      />
      <slot>{{ label }}</slot>
    </span>
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

      onMounted(() => {
        listbox.registerOption({ id: optionId, value: props.value });
      });

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

      const partiallySelectedText = computed(() => {
        if (!listbox.getMessage) return null;
        return listbox.getMessage('partiallySelected') || null;
      });

      const effectiveShowSelector = computed(() => {
        if (props.showSelector !== null) return props.showSelector;
        return listbox.multiple;
      });

      return {
        optionId,
        isSelected,
        isFocused,
        rowStyles,
        onClick,
        partiallySelectedText,
        effectiveShowSelector,
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
       * Sets the selection indicator to an indeterminate state.
       * Use when some but not all options within a group are selected.
       */
      indeterminate: {
        type: Boolean,
        default: false,
      },
      /**
       * Controls whether the selector is shown. By default it is `null`, which hides
       * it in single-select and shows it in multi-select. Set to `true` or `false` to override.
       */
      showSelector: {
        type: Boolean,
        default: null,
      },
    },
  };

</script>


<style lang="scss" scoped>

  .k-listbox-option {
    display: flex;
    align-items: center;
    min-height: 36px;
    padding-left: 4px;
    cursor: pointer;
  }

  .k-option-plain-label {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .k-option-check-icon {
    flex-shrink: 0;
    font-size: 16px;
  }

</style>
