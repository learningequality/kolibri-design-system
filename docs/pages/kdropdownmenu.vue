<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      <p>
        Dropdown set of options, based on
        <DocsExternalLink
          text="Keen's UI Menu"
          href="https://josephuspaye.github.io/Keen-UI/#/ui-menu"
        />. See these docs to understand the current implementation of the options object array.
        Notable possible for configuring the menu include icons, text, secondary text, and dividers.
      </p>
    </DocsPageSection>

    <DocsPageSection
      title="Usage"
      anchor="#usage"
    >
      <DocsSubNav
        :items="[
          { text: 'Button with dropdown', href: '#button-with-dropdown' },
          { text: 'Icon button with dropdown', href: '#icon-button-with-dropdown' },
          { text: 'Options with icons', href: '#options-with-icons' },
          { text: 'Context menu', href: '#context-menu' },
          { text: 'Custom option slot', href: '#custom-option-slot' },
        ]"
      />

      <h3>
        Button with dropdown
        <DocsAnchorTarget anchor="#button-with-dropdown" />
      </h3>

      <DocsExample
        loadExample="KDropdownMenu/MultipleItems.vue"
        exampleId="button-with-dropdown"
        block
        :hideOnClick="true"
        :openOnMount="false"
        :constrainToScrollParent="false"
      >
        <template #html>
          <!-- eslint-disable -->
          <DocsShowCode language="html">
            <KButton
              text="Options"
              hasDropdown
            >
              <template #menu>
                <KDropdownMenu
                  :options="options"
                  @select="onOptionSelect"
                />
              </template>
            </KButton>
          </DocsShowCode>
          <!-- eslint-enable -->
        </template>

        <template #javascript>
          <!-- eslint-disable -->
          <!-- prettier-ignore -->
          <DocsShowCode language="javascript">
              export default {
                data() {
                  return {
                    options: [
                      { label: 'Option 1', value: 'option1' },
                      { label: 'Option 2', value: 'option2' },
                      { label: 'Option 3', value: 'option3' },
                    ],
                  };
                },
                methods: {
                  onOptionSelect(option) {
                    console.log('Selected option:', option);
                  },
                },
              };
            </DocsShowCode>
          <!-- eslint-enable -->
        </template>
      </DocsExample>

      <h3>
        Icon button with dropdown
        <DocsAnchorTarget anchor="#icon-button-with-dropdown" />
      </h3>
      <DocsExample
        loadExample="KDropdownMenu/IconButton.vue"
        exampleId="icon-button-with-dropdown"
        block
        :hideOnClick="true"
        :openOnMount="false"
        :constrainToScrollParent="false"
      >
        <template #html>
          <!-- eslint-disable -->
          <DocsShowCode language="html">
            <KIconButton
              tooltip="Dropdown options"
              icon="optionsHorizontal"
              appearance="flat-button"
              :primary="false"
            >
              <template #menu>
                <KDropdownMenu
                  :options="options"
                  @select="onOptionSelect"
                />
              </template>
            </KIconButton>
          </DocsShowCode>
          <!-- eslint-enable -->
        </template>
        <template #javascript>
          <!-- eslint-disable -->
          <!-- prettier-ignore -->
          <DocsShowCode language="javascript">
              export default {
                data() {
                  return {
                    options: [
                      { label: 'Option 1', value: 'option1' },
                      { label: 'Option 2', value: 'option2' },
                      { label: 'Option 3', value: 'option3' },
                    ],
                  };
                },
                methods: {
                  onOptionSelect(option) {
                    console.log('Selected option:', option);
                  },
                },
              };
            </DocsShowCode>
          <!-- eslint-enable -->
        </template>
      </DocsExample>

      <h3>
        Options with icons
        <DocsAnchorTarget anchor="#options-with-icons" />
      </h3>

      <DocsExample
        loadExample="KDropdownMenu/WithIcons.vue"
        exampleId="options-with-icons"
        block
        :hideOnClick="true"
        :openOnMount="false"
        :constrainToScrollParent="false"
      >
        <template #html>
          <!-- eslint-disable -->
          <DocsShowCode language="html">
            <KButton
              text="Options"
              hasDropdown
            >
              <template #menu>
                <KDropdownMenu
                  hasIcons
                  :options="options"
                  @select="onOptionSelect"
                />
              </template>
            </KButton>
          </DocsShowCode>
          <!-- eslint-enable -->
        </template>

        <template #javascript>
          <!-- eslint-disable -->
          <!-- prettier-ignore -->
          <DocsShowCode language="javascript">
              export default {
                data() {
                  return {
                    options: [
                      { label: 'Option 1', value: 'option1', icon: 'add' },
                      { label: 'Option 2', value: 'option2', icon: 'delete' },
                    ],
                  };
                },
                methods: {
                  onOptionSelect(option) {
                    console.log('Selected option:', option);
                  },
                },
              };
            </DocsShowCode>
          <!-- eslint-enable -->
        </template>
      </DocsExample>

      <h3>
        Context menu
        <DocsAnchorTarget anchor="#context-menu" />
      </h3>

      <p>
        This component can be also used to create a context menu, which is a dropdown menu that
        appears when a user right-clicks on an element. The context menu will then be attached to
        the parent element.
      </p>

      <DocsExample
        loadExample="KDropdownMenu/ContextMenu.vue"
        exampleId="context-menu"
        block
      />

      <h3>
        Custom option slot
        <DocsAnchorTarget anchor="#custom-option-slot" />
      </h3>

      <p>
        Use the <code>#option</code> scoped slot to customize each menu item. The slot provides the
        option object via the <code>option</code> prop.
      </p>

      <DocsExample
        loadExample="KDropdownMenu/CustomOption.vue"
        exampleId="custom-option-slot"
        block
        :hideOnClick="true"
        :openOnMount="false"
      >
        <template #html>
          <!-- eslint-disable -->
          <DocsShowCode language="html">
            <KButton
              text="Options"
              hasDropdown
            >
              <template #menu>
                <KDropdownMenu
                  :options="options"
                  ...
                >
                  <template #option="{ option }">
                    <KLabeledIcon
                      :icon="option.icon"
                      :label="option.label"
                      :color="option.color"
                      :style="{ color: option.color }"
                    />
                  </template>
                </KDropdownMenu>
              </template>
            </KButton>
          </DocsShowCode>
          <!-- eslint-enable -->
        </template>

        <template #javascript>
          <!-- eslint-disable -->
          <!-- prettier-ignore -->
          <DocsShowCode language="javascript">
              export default {
                data() {
                  return {
                    options: [
                      { label: 'Edit', value: 'edit', icon: 'edit', color: null },
                      { label: 'Delete', value: 'delete', icon: 'delete', color: this.$themeTokens.error },
                    ],
                  };
                },
              };
            </DocsShowCode>
          <!-- eslint-enable -->
        </template>
      </DocsExample>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {};

</script>


<style lang="scss" scoped></style>
