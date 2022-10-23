<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <div>
        <DocsShow>
          <KDateRange
            class="demo"
            :defaultStartDate="defaultStartDate"
            :firstAllowedDate="firstAllowedDate"
            :lastAllowedDate="lastAllowedDate"
            title="Select a date range"
          />

        </DocsShow>
      </div>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  export default {
    data() {
      return {
        defaultStartDate: new Date(2022, 8, 1),
        firstAllowedDate: new Date(2022, 1, 1),
        lastAllowedDate: new Date(),
      };
    },
  };

</script>


<style lang="css" scoped>

  .demo {
    height: 450px;
  }

</style>

