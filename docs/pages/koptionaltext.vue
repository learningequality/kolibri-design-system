<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        The <code>KOptionalText</code> component is a wrapper for <DocsLibraryLink component="KEmptyPlaceholder" /> used in situations where a text can be missing. If the text exists and is not empty, the text will be rendered, if not, a wide, light-gray dash will be rendered, like this: <KEmptyPlaceholder />
      </p>
      <p>
        Using the KOptionalText component is preferred to leaving a empty or blank space because it communicates to the user that a value <em>could</em> possibly exist there, and aids with visual scanning in tables, grids, and lists of data.
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
                <KOptionalText text="Username" />
              </th>
              <th class="table-number">
                <KOptionalText text="Number of exercises" />
              </th>
              <th class="table-number">
                <KOptionalText text="Average score" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="table-text">
                <KOptionalText text="user_1" />
              </td>
              <td class="table-number">
                <KOptionalText text="11" />
              </td>
              <td class="table-number">
                <KOptionalText text="9%" :appearanceOverrides="{ color: 'red' }" />
              </td>
            </tr>
            <tr>
              <td class="table-text">
                <KOptionalText text="user_2" />
              </td>
              <td class="table-number">
                <KOptionalText text="0" />
              </td>
              <td class="table-number">
                <KOptionalText text="" />
              </td>
            </tr>
            <tr>
              <td class="table-text">
                <KOptionalText text="user_3" />
              </td>
              <td class="table-number">
                <KOptionalText text="5" />
              </td>
              <td class="table-number">
                <KOptionalText text="100%" appearanceOverrides="color: green" />
              </td>
            </tr>
          </tbody>
        </table>
      </DocsShow>
    </DocsPageSection>

  </DocsPageTemplate>

</template>


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
