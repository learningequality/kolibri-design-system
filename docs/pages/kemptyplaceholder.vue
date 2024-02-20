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
          tooltip="Add"
          icon="edit"
        />
      </template>
      <template #more="{ overflowItems }">
        <KIconButton
          tooltip="Dropdown options"
          icon="optionsHorizontal"
          appearance="flat-button"
          :primary="false"
        >
          <template #menu>
            <KDropdownMenu
              style="margin-right: 16px;"
              text="Primary"
              :primary="true"
              :options="['Option 1', 'Option 2']"
              appearance="raised-button"
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
        return [ {
          username: 'user_1',
          exercises: 11,
          averageScore: '85%',
        }, {
          username: 'user_2',
          exercises: 0,
          averageScore: null,
        }, {
          username: 'user_2',
          exercises: 0,
          averageScore: null,
        }, {
          username: 'user_2',
          exercises: 0,
          averageScore: null,
        }, {
          username: 'user_2',
          exercises: 0,
          averageScore: null,
        }, {
          username: 'user_2',
          exercises: 0,
          averageScore: null,
        }, {
          username: 'user_2',
          exercises: 0,
          averageScore: null,
        }, {
          username: 'user_2',
          exercises: 0,
          averageScore: null,
        }, {
          username: 'user_2',
          exercises: 0,
          averageScore: null,
        }, {
          username: 'user_3',
          exercises: 5,
          averageScore: '100%',
        }];
      }
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
