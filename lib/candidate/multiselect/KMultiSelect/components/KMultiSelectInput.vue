<template>

  <div
    class="kmselect-input"
    :class="[
      disabled ? 'is-disabled' : '',
      $computedClass({
        ':hover:not(.is-disabled)': {
          borderBottomColor: $themePalette.grey.v_500 + ' !important',
        },
      }),
    ]"
    :style="{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '4px',
      minHeight: '40px',
      padding: '4px 40px 4px 8px',
      position: 'relative',
      border: 'none',
      borderBottom: `2px solid ${
        invalid ? $themeTokens.error : focused ? $themeTokens.primary : $themeTokens.fineLine
      }`,
      borderRadius: '2px 2px 0 0',
      cursor: disabled ? 'not-allowed' : 'default',
      backgroundColor: disabled ? $themeTokens.textDisabled + '20' : $themePalette.grey.v_100,
      outline: 'none',
    }"
    @click="handleWrapperClick"
  >
    <template v-if="multiple">
      <span
        v-for="option in selectedOptions"
        :key="option[itemValue] || option.value"
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
        fontSize: '14px',
        color: disabled ? $themeTokens.textDisabled : $themeTokens.text,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }"
    >
      {{ getOptionText(selectedOptions[0]) }}
    </span>

    <input
      ref="inputEl"
      v-model="inputModel"
      class="kmselect-native-input"
      :class="placeholderClass"
      type="text"
      :placeholder="selectedOptions.length === 0 ? placeholder : ''"
      :disabled="disabled"
      v-bind="inputAriaAttrs"
      data-focus="true"
      :style="{
        flex: '1 1 80px',
        minWidth: '80px',
        height: '28px',
        padding: '0 4px',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        fontSize: '14px',
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
      :style="{
        position: 'absolute',
        right: '36px',
        top: '50%',
        transform: 'translateY(-50%)',
      }"
      @click.stop="$emit('clear-all')"
      @keydown.enter.stop
      @keydown.space.stop
    />

    <KIconButton
      tabindex="-1"
      size="small"
      :icon="isOpen ? 'chevronUp' : 'chevronDown'"
      :ariaLabel="isOpen ? closeLabel : openLabel"
      :tooltip="isOpen ? closeLabel : openLabel"
      :disabled="disabled"
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

  import KIconButton from '../../../../buttons-and-links/KIconButton';
  import KChip from '../../KChip/index.vue';
  import KTooltip from '../../../../KTooltip/index.vue';

  export default {
    name: 'KMultiSelectInput',

    components: { KIconButton, KChip, KTooltip },

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
      required: {
        type: Boolean,
        default: false,
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
      clearAllLabel: {
        type: String,
        default: 'Clear all selections',
      },
      openLabel: {
        type: String,
        default: 'Open options',
      },
      closeLabel: {
        type: String,
        default: 'Close options',
      },
      activeDescendant: {
        type: String,
        default: null,
      },
      labelId: {
        type: String,
        default: null,
      },
    },

    computed: {
      inputModel: {
        get() {
          return this.searchText;
        },
        set(val) {
          this.$emit('update:searchText', val);
        },
      },
      inputAriaAttrs() {
        const attrs = {
          role: 'combobox',
          'aria-expanded': String(this.isOpen),
          'aria-haspopup': 'listbox',
          'aria-controls': this.listboxId,
          'aria-autocomplete': 'list',
          'aria-required': this.required ? 'true' : 'false',
          'aria-invalid': this.invalid ? 'true' : 'false',
        };
        if (this.labelId) {
          attrs['aria-labelledby'] = this.labelId;
        }
        if (this.isOpen && this.activeDescendant) {
          attrs['aria-activedescendant'] = this.activeDescendant;
        }
        if (this.invalid && this.errorId) {
          attrs['aria-describedby'] = this.errorId;
        }
        return attrs;
      },
      placeholderClass() {
        return this.$computedClass({
          '::placeholder': {
            color: this.$themeTokens.annotation,
          },
        });
      },
    },

    methods: {
      // eslint-disable-next-line vue/no-unused-properties
      focus() {
        this.$refs.inputEl.focus();
      },

      handleWrapperClick() {
        if (!this.disabled) {
          this.$refs.inputEl.focus();
          if (!this.isOpen) {
            this.$emit('toggle');
          }
        }
      },
      getOptionText(option) {
        if (!option) return '';
        return typeof this.itemText === 'function' ? this.itemText(option) : option[this.itemText];
      },
      getOptionValue(option) {
        if (!option) return null;
        return option[this.itemValue] !== undefined ? option[this.itemValue] : option.value;
      },
    },
  };

</script>


<style lang="scss" scoped></style>
