<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        The <code>KListWithOverflow</code> component is used in situations where we want a horizontal list to be responsive, and adapt to the size of the screen. So that the list only shows the items that fit on the screen, and the rest are in a "see more" button.
      </p>
    </DocsPageSection>
    <DocsPageSection title="Example" anchor="#example">
      <p>
        When a number of items fit within the screen boundaries, the list will be displayed without any changes. For example, since there are only 3 items here, we can see the entire list without problems.
      </p>
      <DocsShow block>
        <KListWithOverflow
          :items="getItems(3)"
        >
          <template #item="{ item }">
            <KIconButton
              :tooltip="item.label"
              :icon="item.icon"
            />
          </template>
          <template #more="{ overflowItems }">
            <KIconButton
              tooltip="More"
              icon="optionsVertical"
              appearance="flat-button"
              :primary="false"
            >
              <template #menu>
                <KDropdownMenu
                  :options="overflowItems"
                />
              </template>
            </KIconButton>
          </template>
        </KListWithOverflow>
      </DocsShow>
      <p>
        But if the list becomes very long, and does not fit within the screen, then the overflowed items will be cut, and an element will be placed to show more. For example, here are 20 items in the list.
      </p>
      <DocsShow block>
        <KListWithOverflow
          :items="getItems(20)"
        >
          <template #item="{ item }">
            <KIconButton
              :tooltip="item.label"
              :icon="item.icon"
            />
          </template>
          <template #more="{ overflowItems }">
            <KIconButton
              tooltip="More"
              icon="optionsVertical"
              appearance="flat-button"
              :primary="false"
            >
              <template #menu>
                <KDropdownMenu
                  :options="overflowItems"
                />
              </template>
            </KIconButton>
          </template>
        </KListWithOverflow>
      </DocsShow>
      <p>
        You can also use dividers within the list by passing a <code>{ type: "divider" }</code> object, and set a #divider slot.
        Note that the visible list will not end with a divider. And a divider object will not be passed as a first overflowed item.
      </p>
      <DocsShow block>
        <KListWithOverflow
          :items="getItems(20, 5)"
        >
          <template #item="{ item }">
            <KIconButton
              :tooltip="item.label"
              :icon="item.icon"
            />
          </template>
          <template #more="{ overflowItems }">
            <KIconButton
              tooltip="More"
              icon="optionsVertical"
              appearance="flat-button"
              :primary="false"
            >
              <template #menu>
                <KDropdownMenu
                  :options="overflowItems"
                />
              </template>
            </KIconButton>
          </template>
          <template #divider>
            <div class="divider-wrapper">
              <div :style="dividerStyle"></div>
            </div>
          </template>
        </KListWithOverflow>
      </DocsShow>
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<script>

  export default {
    name: 'DocsKListWithOverflow',
    computed: {
      dividerStyle() {
        return {
          height: '100%',
          backgroundColor: this.$themeTokens.fineLine,
          width: '1px',
        };
      },
    },
    methods: {
      getItems(number, dividerMod) {
        return Array.from({ length: number }, (_, i) =>
          dividerMod && i && i % dividerMod === 0
            ? { type: 'divider' }
            : { label: `Item ${i + 1}`, icon: 'edit' }
        );
      },
    },
  };

</script>


<style lang="scss" scoped>

  .table-number {
    text-align: right;
  }

  .table-text {
    text-align: left;
  }

  .table-number,
  .table-text {
    padding-right: 16px;
  }

  .divider-wrapper {
    padding: 8px 12px;
  }

</style>
