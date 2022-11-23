<template>

  <DocsPageTemplate apiDocs>

    <DocsPageSection title="Overview" anchor="#overview">
      The KDateRange is a modal component that implements two KDateInput components 
      and a KDateCalendar for a start and end date selection.
      <div>
        <KButton text="open demo" :primary="true" appearance="flat-button" :style="{ marginTop: '5px' }" @click="modalShown = true" />
        <ClientOnly>
          <KDateRange
            v-if="modalShown"
            class="demo"
            :firstAllowedDate="firstAllowedDate"
            :lastAllowedDate="lastAllowedDate"
            dateFormatterLocale="ko-KR"
            title="Select a date range"
            submitText="Generate"
            description="The default start date is the last time you exported this log"
            cancelText="Cancel"
            v-bind="errorMessages"
            @submit="setDateRange"
            @cancel="modalShown = false"
          />
        </ClientOnly>
      </div>
    </DocsPageSection>
  </DocsPageTemplate>

</template>


<script>

  import format from 'date-fns/format';
  import validationConstants from '../../lib/KDateRange/validationConstants';
  import KButton from '../../lib/buttons-and-links/KButton';

  export default {
    components: {
      KButton,
    },
    data() {
      return {
        firstAllowedDate: new Date(2022, 0, 1),
        lastAllowedDate: new Date(),
        startDate: null,
        endDate: null,
        modalShown: false,
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
        this.modalShown = false;
        this.startDate = dates['start'];
        this.endDate = dates['end'];
        console.log('Date Range Set To:', this.startDate, this.endDate);
      },
    },
  };

</script>


<style lang="css" scoped>

  .demo {
    height: 850px;
  }

</style>

