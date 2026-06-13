<template>

  <!-- Wrapper provides the visible focus ring around the whole input area -->
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
    <!-- ── Selected chips ─────────────────────────────────────── -->
    <template v-if="multiple">
      <span
        v-for="option in selectedOptions"
        :key="option[itemValue] || option.value"
      >
        <!--
          #chip slot: { option, remove }
          Consumers can customize each chip (e.g. wrap in KTooltip).
          Default: plain KChip with close button.
        -->
        <slot
          name="chip"
          :option="option"
          :remove="() => $emit('chip-remove', getOptionValue(option))"
        >
          <!--
            Wrap each chip in a ref'd span so KTooltip can anchor to it.
            Dynamic ref key = 'chip-' + value — unique per option,
            matching the pattern used in LanguageFilter (Studio).
          -->
          <span :ref="'chip-' + getOptionValue(option)">
            <KChip
              :text="getOptionText(option)"
              :disabled="disabled"
              close
              @close="$emit('chip-remove', getOptionValue(option))"
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

    <!-- ── Single select text ─────────────────────────────────────── -->
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

    <!-- ── Search input ───────────────────────────────────────── -->
    <input
      ref="inputEl"
      v-model="inputModel"
      class="kmselect-native-input"
      :class="placeholderClass"
      type="text"
      :placeholder="selectedOptions.length === 0 ? placeholder : ''"
      :disabled="disabled"
      :maxlength="maxlength || undefined"
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

    <!-- ── Clear-all button ───────────────────────────────────── -->
    <KIconButton
      v-if="clearable && selectedOptions.length > 0 && !disabled"
      size="small"
      icon="clear"
      :ariaLabel="'Clear all selections'"
      :tooltip="'Clear all selections'"
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

    <!-- ── Dropdown toggle ────────────────────────────────────── -->
    <KIconButton
      v-if="!hideDropdown"
      tabindex="-1"
      size="small"
      :icon="isOpen ? 'chevronUp' : 'chevronDown'"
      :ariaLabel="isOpen ? 'Close options' : 'Open options'"
      :tooltip="isOpen ? 'Close options' : 'Open options'"
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
      /** Array of full option objects that are currently selected */
      selectedOptions: {
        type: Array,
        required: true,
      },
      /** Bound to the native input for type-to-filter */
      searchText: {
        type: String,
        default: '',
      },
      placeholder: {
        type: String,
        default: '',
      },
      /** ID of the KListbox <ul> — used for aria-controls on the <input> */
      listboxId: {
        type: String,
        required: true,
      },
      /** Whether the field is required (aria-required) */
      required: {
        type: Boolean,
        default: false,
      },
      /** ID of the error message element (aria-describedby when invalid) */
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
      hideDropdown: {
        type: Boolean,
        default: false,
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
      /**
       * Forwarded from KMultiSelect. Applied as the HTML maxlength attribute
       * on the native <input> so the browser natively prevents typing beyond
       * the limit. null means no limit.
       */
      maxlength: {
        type: Number,
        default: null,
      },
      focused: {
        type: Boolean,
        default: false,
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
      /**
       * ARIA attributes for the combobox <input>.
       * Inlined here following the KDS KCard pattern — no separate composable.
       *
       * role="combobox" follows the ARIA 1.0 pattern (widely supported).
       */
      inputAriaAttrs() {
        const attrs = {
          role: 'combobox',
          'aria-expanded': String(this.isOpen),
          'aria-controls': this.listboxId,
          'aria-autocomplete': 'list',
          'aria-required': this.required ? 'true' : 'false',
          'aria-invalid': this.invalid ? 'true' : 'false',
        };
        // Only link the error message element when actually invalid.
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
      /**
       * @public
       * Focus the native input. Called by the parent via $refs.inputComponent.focus().
       */
      // eslint-disable-next-line vue/no-unused-properties
      focus() {
        this.$refs.inputEl.focus();
      },

      handleWrapperClick() {
        if (!this.disabled) {
          this.$refs.inputEl.focus();
          if (!this.isOpen && !this.hideDropdown) {
            this.$emit('toggle');
          }
        }
      },
      getOptionText(option) {
        if (!option) return '';
        return option[this.itemText];
      },
      getOptionValue(option) {
        if (!option) return null;
        return option[this.itemValue] !== undefined ? option[this.itemValue] : option.value;
      },
    },
  };

</script>


<style lang="scss" scoped>

  // Styles handled via inline :style bindings to use KDS $themeTokens

</style>
