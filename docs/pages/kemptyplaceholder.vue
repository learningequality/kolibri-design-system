<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        The <code>KEmptyPlaceholder</code> component is used in situations where the value is not applicable ("N/A") or does not exist. It is a wide, light-gray dash, like this: <KEmptyPlaceholder />
      </p>
      <p>
        Using the placeholder component is preferred to leaving a empty or blank space because it communicates to the user that a value <em>could</em> possibly exist there, and aids with visual scanning in tables, grids, and lists of data.
      </p>
    </DocsPageSection>
    <DocsPageSection title="Example" anchor="#example">
      <p>
        In the example below, an average score cannot be calculated until the user has attempted at least one exercise:
      </p>
      <DocsShow>
        <table>
          <thead>
            <tr>
              <th class="table-text">
                Username
              </th>
              <th class="table-number">
                Number of exercises
              </th>
              <th class="table-number">
                Average score
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="table-text">
                user_1
              </td>
              <td class="table-number">
                11
              </td>
              <td class="table-number">
                85%
              </td>
            </tr>
            <tr>
              <td class="table-text">
                user_2
              </td>
              <td class="table-number">
                0
              </td>
              <td class="table-number">
                <KEmptyPlaceholder />
              </td>
            </tr>
            <tr>
              <td class="table-text">
                user_3
              </td>
              <td class="table-number">
                5
              </td>
              <td class="table-number">
                100%
              </td>
            </tr>
          </tbody>
        </table>
      </DocsShow>
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
            icon="optionsHorizontal"
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
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<script>

  export default {
    name: 'DocsKEmptyPlaceholder',
    computed: {
      items() {
        return [
          {
            label: 'Item 1',
            icon: 'edit',
          },
          {
            label: 'Item 2',
            icon: 'edit',
          },
          {
            label: 'Item 3',
            icon: 'edit',
          },
          {
            label: 'Item 4',
            icon: 'edit',
          },
          {
            label: 'Item 5',
            icon: 'edit',
          },
          {
            label: 'Item 6',
            icon: 'edit',
          },
          {
            label: 'Item 7',
            icon: 'edit',
          },
          {
            label: 'Item 8',
            icon: 'edit',
          },
          {
            label: 'Item 9',
            icon: 'edit',
          },
          {
            label: 'Item 10',
            icon: 'edit',
          },
        ];
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

</style>
