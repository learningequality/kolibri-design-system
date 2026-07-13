<template>

  <KIconButton
    tooltip="Dropdown options"
    icon="optionsHorizontal"
    appearance="flat-button"
    :primary="false"
  >
    <template #menu>
      <KDropdownMenu
        :options="options"
        :hideOnClick="hideOnClick"
        :constrainToScrollParent="constrainToScrollParent"
        @select="onOptionSelect"
      />
    </template>
  </KIconButton>

</template>


<script>

  export default {
    name: 'WithDropdown',
    props: {
      openOnMount: {
        type: Boolean,
        default: true,
      },
      constrainToScrollParent: {
        type: Boolean,
        default: true,
      },
      hideOnClick: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        options: [
          { label: 'Option 1', value: 'option1', icon: 'add' },
          { label: 'Option 2', value: 'option2', icon: 'delete' },
        ],
      };
    },
    mounted() {
      if (this.openOnMount) {
        this.$nextTick(() => {
          this.$el.click();
        });
      }
    },
    methods: {
      onOptionSelect(option) {
        console.log('Selected option:', option);
      },
    },
  };

</script>
