<template>

  <DocsPageTemplate>

    <div>
      <Hello :number="3" />
    </div>

    <!--
    <div>
      <KButton text="button" primary />
    </div>
    <div>
      <KRouterLink :to="{ test: 'what' }" text="router link" />
    </div>
    <div>
      <KExternalLink href="https://www.google.com" text="www.google.com" />
    </div>
    <div>
      <KRadioButton value="1" label="radiobutton" currentValue="1" />
    </div>
    <div>
      <KCheckbox value="1" label="checkbox" currentValue="1" />
    </div>
    <div>
      <span ref="test">tooltip ref</span>
      <KTooltip reference="test" :refs="$refs">
        tooltip content
      </KTooltip>
    </div>
    <div>
      <KCircularLoader type="determinate" :progress="33" />
    </div>
    <div>
      <KLinearLoader type="determinate" :progress="33" />
    </div>
    <div>
      <KEmptyPlaceholder />
    </div>
    <div>
      <KButton text="show modal" @click="modalVisible = true" />
      <KModal
        v-if="modalVisible"
        title="I'm a modal"
        cancelText="Okay"
        @cancel="modalVisible = false"
      >
        modal content
      </KModal>
    </div>

    <div>
      <KIcon icon="inProgress" />
    </div>
    <div>
      <KLabeledIcon icon="inProgress">
        hello
      </KLabeledIcon>
    </div>
    <div>
      <KSwitch label="switch" :value="false" />
    </div>
    <div>
      <KTextbox label="text box" />
    </div>
    <KPageContainer>page container</KPageContainer>
    <KFixedGrid numCols="4">
      <KFixedGridItem span="2">
        Grid item A
      </KFixedGridItem>
      <KFixedGridItem span="2">
        Grid item B
      </KFixedGridItem>
    </KFixedGrid>
    <div>
      <KDropdownMenu
        appearance="flat-button"
        text="Dropdown menu button"
        :options="menuOptions"
      />
    </div>
    -->
  </DocsPageTemplate>

</template>


<script>

  import Hello from '~~/lib/Hello';

  export default {
    components: {
      Hello,
    },
    data() {
      return {
        modalVisible: false,
      };
    },
    computed: {
      breadcrumbs() {
        return [
          { text: 'Top level crumb', link: {} },
          { text: 'Second level crumb', link: {} },
          { text: 'Third level crumb', link: {} },
          { text: 'Last level crumb' },
        ];
      },
      selectOptions() {
        return [
          {
            label: 'Label 1',
            value: 1,
            disabled: false,
          },
          {
            label: 'Label 2',
            value: 2,
            disabled: false,
          },
          {
            label: 'Label 3',
            value: 3,
            disabled: true,
          },
        ];
      },
      menuOptions() {
        return ['rename', 'delete'];
      },
    },
  };

</script>


<style lang="scss" scoped></style>
