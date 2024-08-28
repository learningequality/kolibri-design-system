<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        The <code>KListWithOverflow</code> component is useful when we want a horizontal list that is responsive and adaptable to the container size. The list only shows the items that fit on the container element. When items exceed the available space, the component seamlessly integrates a "see more" button to show additional items.
      </p>
    </DocsPageSection>
    <DocsPageSection title="Example" anchor="#example">
      <p>
        When a number of items fit within the screen boundaries, the list will be displayed without any changes. For example, since there are only 3 items here, we can see the entire list without problems.
      </p>
      <div class="klist-example">
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
      </div>
      <p>
        But if the list becomes very long, and does not fit within the screen, then the overflowed items will be cut, and an element will be placed to show more. For example, here are 12 items in the list.
      </p>
      <div class="klist-example">
        <DocsShow block>
          <KListWithOverflow
            :items="getItems(12)"
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
      </div>
      <p>
        The following is a code example to render the above examples:
      </p>
      <DocsShowCode language="html">
        <KListWithOverflow
          :items="items"
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
            >
              <template #menu>
                <KDropdownMenu
                  :options="overflowItems"
                />
              </template>
            </KIconButton>
          </template>

        </KListWithOverflow>
      </DocsShowCode>
      <!-- eslint-disable -->
      <DocsShowCode language="javascript">
        data() {
          return {
            items: [
              { label: "Item 1", icon: "edit" },
              { label: "Item 2", icon: "edit" },
              { label: "Item 3", icon: "edit" },
              // ...
              { label: "Item 12", icon: "edit" },
            ]
          };
        },
      </DocsShowCode>
      <!-- eslint-enable -->
      <p>
        You can also use dividers within the list by passing a <code>{ type: "divider" }</code> object, and set a #divider slot.
        Note that the visible list will not end with a divider. And a divider object will not be passed as a first overflowed item.
      </p>
      <div class="klist-example">
        <DocsShow block>
          <KListWithOverflow
            :items="getItems(12, 2)"
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
      </div>
      <p>
        To use dividers, you can include a divider object in the items list, and add a #divider slot.
      </p>
      <DocsShowCode language="html">
        <KListWithOverflow
          :items="items"
        >
          <!-- ... -->
          <template #divider>
            <div class="divider-wrapper">
              <div :style="dividerStyle"></div>
            </div>
          </template>
        </KListWithOverflow>
      </DocsShowCode>
      <!-- eslint-disable -->
      <DocsShowCode language="javascript">
        data() {
          return {
            items: [
              { label: "Item 1", icon: "edit" },
              { label: "Item 2", icon: "edit" },
              { type: "divider" },
              { label: "Item 4", icon: "edit" },
              // ...
            ]
          };
        },
      </DocsShowCode>
      <!-- eslint-enable -->
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
    align-self: stretch;
    padding: 8px 12px;
  }

  .klist-example {
    width: 50%;
    margin-right: auto;
    margin-left: auto;
  }

  @media (max-width: 768px) {
    .klist-example {
      width: 100%;
    }
  }

</style>
