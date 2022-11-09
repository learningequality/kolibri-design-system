<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      <div>
        <DocsShow>
          <ClientOnly>
            <KDateRange
              class="demo"
              :defaultStartDate="defaultStartDate"
              :firstAllowedDate="firstAllowedDate"
              :lastAllowedDate="lastAllowedDate"
              title="Select a date range"
              @setRange="setDateRange"
            />
          </ClientOnly>
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
        startDate: null,
        endDate: null,
      };
    },
    methods: {
      setDateRange(dates) {
        this.startDate = dates['start'];
        this.endDate = dates['end'];
      },
    },
  };

</script>


<style lang="css" scoped>

  .demo {
    height: 850px;
  }

</style>

