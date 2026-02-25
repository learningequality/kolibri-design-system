<template>

  <KButton
    text="Options"
    hasDropdown
  >
    <template #menu>
      <KDropdownMenu
        :hideOnClick="hideOnClick"
        :constrainToScrollParent="constrainToScrollParent"
        :options="options"
        @select="onOptionSelect"
      >
        <template #option="{ option }">
          <div style="display: flex; align-items: center; padding: 0 16px">
            <KIcon
              :icon="option.icon"
              :style="{ color: option.color, marginInlineEnd: '8px' }"
            />
            <span :style="{ color: option.color }">{{ option.label }}</span>
          </div>
        </template>
      </KDropdownMenu>
    </template>
  </KButton>

</template>


<script>

  export default {
    name: 'CustomOption',
    props: {
      openOnMount: {
        type: Boolean,
        default: true,
      },
      hideOnClick: {
        type: Boolean,
        default: false,
      },
      constrainToScrollParent: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      options() {
        return [
          { label: 'Edit', value: 'edit', icon: 'edit', color: null },
          { label: 'Delete', value: 'delete', icon: 'delete', color: this.$themeTokens.error },
        ];
      },
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
