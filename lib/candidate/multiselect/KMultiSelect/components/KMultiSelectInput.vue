<template>

  <div
    class="kmselect-input"
    :class="[disabled ? 'is-disabled' : '']"
    :style="{
      cursor: disabled ? 'not-allowed' : 'default',
      backgroundColor: 'transparent',
    }"
    @click="handleWrapperClick"
  >
    <template v-if="multiple">
      <span
        v-for="option in selectedOptions"
        :key="getOptionValue(option)"
      >
        <slot
          name="chip"
          :option="option"
          :remove="() => $emit('chip-remove', getOptionValue(option))"
        >
          <span :ref="'chip-' + getOptionValue(option)">
            <KChip
              :text="getOptionText(option)"
              :disabled="disabled"
              close
              @close="$emit('chip-remove', getOptionValue(option))"
              @mousedown.native.prevent
            />
          </span>
          <KTooltip
            :reference="'chip-' + getOptionValue(option)"
            :refs="$refs"
            placement="top"
            :text="getOptionText(option)"
          />
        </slot>
      </span>
    </template>

    <span
      v-else-if="selectedOptions.length > 0 && !isOpen && !searchText"
      :style="{
        flex: '1 1 auto',
        padding: '0 4px',
        fontSize: '16px',
        color: disabled ? $themeTokens.textDisabled : $themeTokens.text,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }"
    >
      {{ getOptionText(selectedOptions[0]) }}
    </span>

    <input
      :id="inputId"
      ref="inputEl"
      v-model="inputModel"
      class="kmselect-native-input"
      :class="$computedClass(placeholderStyle)"
      type="text"
      :placeholder="selectedOptions.length === 0 ? placeholder : ''"
      :disabled="disabled"
      :maxlength="maxlength"
      v-bind="inputAriaAttrs"
      data-focus="true"
      :style="{
        flex: !multiple && selectedOptions.length > 0 && !isOpen && !searchText ? '0 0 0px' : '',
        minWidth: !multiple && selectedOptions.length > 0 && !isOpen && !searchText ? '0' : '',
        color: disabled ? $themeTokens.textDisabled : $themeTokens.text,
        cursor: disabled ? 'not-allowed' : 'text',
      }"
      @keydown="$emit('input-keydown', $event)"
      @focus="$emit('input-focus', $event)"
      @blur="$emit('input-blur', $event)"
    >

    <KIconButton
      v-if="clearable && selectedOptions.length > 0 && !disabled"
      size="small"
      icon="clear"
      :ariaLabel="clearAllLabel"
      :tooltip="clearAllLabel"
      tooltipPosition="top"
      :color="
        invalid
          ? $themeTokens.error
          : focused
            ? $themeTokens.primary
            : hovered
              ? $themeTokens.text
              : $themePalette.grey.v_700
      "
      class="kmselect-clear-btn"
      @click.stop="$emit('clear-all')"
      @mousedown.native.prevent
      @keydown.enter.stop
      @keydown.space.stop
    />

    <KIconButton
      tabindex="-1"
      size="small"
      :icon="isOpen ? 'dropup' : 'dropdown'"
      :ariaLabel="isOpen ? closeLabel : openLabel"
      :tooltip="isOpen ? closeLabel : openLabel"
      tooltipPosition="top"
      :disabled="disabled"
      :aria-expanded="String(isOpen)"
      :aria-controls="listboxId"
      :color="
        invalid
          ? $themeTokens.error
          : focused
            ? $themeTokens.primary
            : !disabled && hovered
              ? $themeTokens.text
              : $themePalette.grey.v_700
      "
      :style="{
        position: 'absolute',
        right: '4px',
        top: '50%',
        transform: 'translateY(-50%)',
      }"
      @click.stop="$emit('toggle')"
      @mousedown.native.prevent
    />
  </div>

</template>


<script>

  import { ref, computed, getCurrentInstance } from 'vue';
  import KIconButton from '../../../../buttons-and-links/KIconButton';
  import KChip from '../../KChip/index.vue';
  import KTooltip from '../../../../KTooltip/index.vue';

  export default {
    name: 'KMultiSelectInput',

    components: { KIconButton, KChip, KTooltip },

    setup(props, { emit }) {
      const inputEl = ref(null);
      const instance = getCurrentInstance();

      const inputModel = computed({
        get() {
          return props.searchText;
        },
        set(val) {
          emit('update:searchText', val);
        },
      });

      const inputAriaAttrs = computed(() => {
        const attrs = {
          role: 'combobox',
          'aria-expanded': String(props.isOpen),
          'aria-haspopup': 'listbox',
          'aria-controls': props.listboxId,
          'aria-autocomplete': 'list',
          'aria-invalid': props.invalid ? 'true' : 'false',
        };
        if (props.labelId) {
          attrs['aria-labelledby'] = props.labelId;
        }
        if (props.isOpen && props.activeDescendant) {
          attrs['aria-activedescendant'] = props.activeDescendant;
        }
        if (props.invalid && props.errorId) {
          attrs['aria-describedby'] = props.errorId;
        }
        return attrs;
      });

      const placeholderStyle = computed(() => ({
        '::placeholder': {
          color: instance.proxy.$themeTokens.textDisabled,
        },
      }));

      function focus() {
        inputEl.value?.focus();
      }

      function handleWrapperClick() {
        if (!props.disabled) {
          inputEl.value?.focus();
          if (!props.isOpen) {
            emit('toggle');
          }
        }
      }

      function getOptionText(option) {
        if (!option) return '';
        return option[props.itemText];
      }

      function getOptionValue(option) {
        if (!option) return null;
        return option[props.itemValue];
      }

      return {
        inputEl,
        inputModel,
        inputAriaAttrs,
        placeholderStyle,
        // eslint-disable-next-line vue/no-unused-properties
        focus,
        handleWrapperClick,
        getOptionText,
        getOptionValue,
      };
    },

    props: {
      selectedOptions: {
        type: Array,
        required: true,
      },
      searchText: {
        type: String,
        default: '',
      },
      placeholder: {
        type: String,
        default: '',
      },
      listboxId: {
        type: String,
        required: true,
      },
      inputId: {
        type: String,
        required: true,
      },
      errorId: {
        type: String,
        default: null,
      },
      multiple: {
        type: Boolean,
        default: true,
      },
      itemText: {
        type: String,
        default: 'label',
      },
      itemValue: {
        type: String,
        default: 'value',
      },
      clearable: {
        type: Boolean,
        default: false,
      },
      isOpen: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      invalid: {
        type: Boolean,
        default: false,
      },
      focused: {
        type: Boolean,
        default: false,
      },
      hovered: {
        type: Boolean,
        default: false,
      },
      clearAllLabel: {
        type: String,
        default: null,
      },
      openLabel: {
        type: String,
        default: null,
      },
      closeLabel: {
        type: String,
        default: null,
      },
      activeDescendant: {
        type: String,
        default: null,
      },
      labelId: {
        type: String,
        default: null,
      },
      maxlength: {
        type: Number,
        default: null,
      },
    },
  };

</script>


<style lang="scss" scoped>

  .kmselect-input {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: center;
    min-height: 32px;
    padding-top: 4px;
    padding-right: 40px;
    padding-bottom: 4px;
    padding-left: 10px;
    border: 0;
    outline: none;
  }

  .kmselect-native-input {
    flex: 1 1 80px;
    min-width: 80px;
    height: 28px;
    padding: 0 4px;
    font-size: 16px;
    background: transparent;
    border: 0;
    outline: none;
  }

  .kmselect-clear-btn {
    position: absolute;
    top: 50%;
    right: 36px;
    transform: translateY(-50%);
  }

</style>
