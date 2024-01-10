<template>

  <DocsPageTemplate>

    <DocsPageSection title="Overview" anchor="#overview">
      <p>
        Filters allow users to show or hide data from view and can also be used to narrow down displayed information to a specific criteria. Filters can be placed in interfaces with search functionality and can accompany other components and patterns like lists and data tables.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Components" anchor="#components">
      <h3>
        Dropdown menus
      </h3>
      <p>
        Use dropdown menu filters when you would like users to filter by one criteria at a time and when there are less than 10 options to select from. 
      </p>
      <img class="img-med" src="./dropdown-menu.png">
      <p>
        Dropdown menu filters use the <DocsInternalLink text="menu" href="/menus" /> component and are usually left-aligned at the top of a list or table. The label should specify what type of information is being filtered.
      </p>
      <h3>Text input dropdowns</h3>
      <img class="img-med" src="./text-input-dropdown.png">
      <p>
        Text input dropdowns use the <DocsInternalLink text="text field" href="/textfields" /> component. They allow the user to select from a list of options and quickly filter down from many options by inputting text. Use this component when there are at least 10 options to select from.
      </p>
      <h3>
        Text filters
      </h3>
      <p>
        Use text filters to help users narrow down lists or tables that contain many items. Text filters should be right-aligned above lists and tables.
      </p>
      <img class="img-med" src="./text-filter.png">
      <p>
        By default, results should update as the user types. If updating as the user types would cause noticeable performance and load time issues, then update the list of results after the user loses focus on the text filter.
      </p>
      <p>
        Placeholder text should let the user know what data can be filtered when they input text. State this concisely in the imperative form.
      </p>
      <DocsDoNot>
        <template #do>
          <img class="do-dont" src="./text-filter-do.png">
        </template>
        <template #not>
          <img class="do-dont" src="./text-filter-dont.png">
        </template>
      </DocsDoNot>
      <h3>
        Checkbox lists
      </h3>
      <p>
        Use a checkbox list if you’d like to allow multiple options within a category to be filtered for at once. They can also be used when you’d like to provide more visibility to the options themselves. 
      </p>
      <p>
        By default, the list of results should update as the user selects different checkbox options.
      </p>
      <p>
        Frame the text of options concisely and as affirmative statements.
      </p>
      <DocsDoNot>
        <template #do>
          <img class="do-dont" src="./checkbox-1.png">
        </template>
        <template #not>
          <img class="do-dont" src="./checkbox-2.png">
        </template>
      </DocsDoNot>
    </DocsPageSection>

    <DocsPageSection title="Behaviors" anchor="#behaviors">
      <p>
        Any filters that have been applied should persist on refresh or browser back.
      </p>
      <p>
        By default, data should be filtered by the “all data” option. However, pre-filtering to one or more options can happen in exceptional cases where doing so improves the experience.
      </p>
      <h3>Hiding vs disabling</h3>
      <p>
        If selecting a filter option would result in “0 results” being shown, that option should be hidden from the dropdown, hide the filter option. If all filter options in a dropdown would always result in “0 results,” hide the entire filter.
      </p>
      <p>
        If one or more filters have already been applied, and combining remaining filter options would show “0 results,” those remaining filters should be disabled. If all potential remaining selections in a filter dropdown/section will show “0 results,” disable the entire filter section until the current filter sections are cleared.
      </p>
    </DocsPageSection>

    <DocsPageSection title="Filter groups" anchor="#filtergroups">
      <p>
        Filters can be flexibly combined in groups horizontally or vertically to create a more customized filtering experience. 
      </p>
      <h3>
        Layout
      </h3>
      <p>
        Text filters and dropdown filters should be aligned in the same row when placed above data tables.
      </p>
      <img class="img-lg" src="./table.png">
      <p>
        Filters can also be left-aligned for lists and search results. Use clearable chips to show which filters have been selected and offer the option to clear all selected filters. 
      </p>
      <img class="img-lg" src="./left-align.png">
    </DocsPageSection>

  </DocsPageTemplate>

</template>


<style lang="scss" scoped>
 .img-med {
    max-width: 100%;  /* Adjusted to be responsive */
    height: auto;     /* Maintain aspect ratio */
  }

  .img-lg {
    width: 100%;  /* Adjusted to be responsive */
    height: auto; /* Maintain aspect ratio */
  }

  .do-dont {
    max-width: 100%;  /* Adjusted to be responsive */
    height: auto;     /* Maintain aspect ratio */
  }

  @media (max-width: 768px) {
    .img-med {
      /* Adjust styles for smaller screens if needed */
    }

    .img-lg {
      /* Adjust styles for smaller screens if needed */
    }

    .do-dont {
      /* Adjust styles for smaller screens if needed */
    }
  }
</style>
