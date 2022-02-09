import KButton from '../lib/buttons-and-links/KButton.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'KButton',
  component: KButton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    text: {
      control: 'text',
      defaultValue: 'Click me!',
    },
    icon: {
      control: {
        type: 'text',
        defaultValue: null,
      },
    },
    iconAfter: {
      control: {
        type: 'text',
        defaultValue: null,
      },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { KButton },
  template: '<KButton v-bind="$props">{{ text }}</KButton>',
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  primary: true,
  text: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  text: 'Secondary Button',
};

export const PrimaryDisabled = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
PrimaryDisabled.args = {
  primary: true,
  text: 'Primary Button',
  disabled: true,
};

export const SecondaryDisabled = Template.bind({});
SecondaryDisabled.args = {
  primary: false,
  text: 'Secondary Button',
  disabled: true,
};

export const BasicLink = Template.bind({});
BasicLink.args = {
  primary: true,
  appearance: 'basic-link',
  text: 'Link',
};

export const FlatButtonPrimary = Template.bind({});
FlatButtonPrimary.args = {
  primary: true,
  appearance: 'flat-button',
  text: 'Flat Primary',
};

export const FlatButtonSecondary = Template.bind({});
FlatButtonSecondary.args = {
  primary: true,
  appearance: 'flat-button',
  text: 'Flat Secondary',
};

export const WithIconBefore = Template.bind({});
WithIconBefore.args = {
  primary: true,
  text: 'Add',
  icon: 'add',
};
export const WithIconAfter = Template.bind({});
WithIconAfter.args = {
  primary: true,
  text: 'Remove',
  iconAfter: 'remove',
};
