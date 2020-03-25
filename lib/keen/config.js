import merge from 'lodash/merge';

const config = {
  disableRipple: true,

  UiAutocomplete: {
    keys: {
      label: 'label',
      value: 'value',
      image: 'image',
    },
  },

  UiCheckboxGroup: {
    keys: {
      id: 'id',
      name: 'name',
      class: 'class',
      label: 'label',
      value: 'value',
      disabled: 'disabled',
    },
  },

  UiMenu: {
    keys: {
      icon: 'icon',
      type: 'type',
      label: 'label',
      secondaryText: 'secondaryText',
      iconProps: 'iconProps',
      disabled: 'disabled',
    },
  },

  UiRadioGroup: {
    keys: {
      id: 'id',
      class: 'class',
      label: 'label',
      value: 'value',
      checked: 'checked',
      disabled: 'disabled',
    },
  },

  UiSelect: {
    keys: {
      label: 'label',
      value: 'value',
      image: 'image',
    },
  },
};

export class KeenUiConfig {
  constructor() {
    this.data = config;
    merge(
      this.data,
      typeof window !== 'undefined' && window.KeenUiConfig ? window.KeenUiConfig : {}
    );
  }

  set(newConfig = {}) {
    merge(this.data, newConfig);
  }
}

export default new KeenUiConfig();
