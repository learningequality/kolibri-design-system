<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      The KDateRange is a modal component that implements two KDateInput components 
      and a KDateCalendar for a start and end date selection. For design guidance, see the page 
      on <DocsInternalLink href="modals" text="modals" />.
      <div>
        <DocsShow>
          <ClientOnly>
            <KDateRange
              class="demo"
              :defaultStartDate="defaultStartDate"
              :firstAllowedDate="firstAllowedDate"
              :lastAllowedDate="lastAllowedDate"
              title="Select a date range"
              submitText="Generate"
              description="The default start date is the last time you exported this log"
              cancelText="Cancel"
              v-bind="errorMessages"
              @setRange="setDateRange"
            />
          </ClientOnly>
        </DocsShow>
      </div>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  import format from 'date-fns/format';
  import validationConstants from '../../lib/KDateRange/validationConstants';

  export default {
    data() {
      return {
        defaultStartDate: new Date(2022, 8, 1),
        firstAllowedDate: new Date(2022, 0, 1),
        lastAllowedDate: new Date(),
        startDate: null,
        endDate: null,
      };
    },
    computed: {
      errorMessages() {
        return {
          [validationConstants.MALFORMED]: 'Please enter a valid date',
          [validationConstants.START_DATE_AFTER_END_DATE]: 'Start date cannot be after end date',
          [validationConstants.FUTURE_DATE]: 'Cannot select a future date',
          [validationConstants.DATE_BEFORE_FIRST_ALLOWED]:
            'Date must be after ' + format(this.firstAllowedDate, 'DD/MM/YYYY'),
        };
      },
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

