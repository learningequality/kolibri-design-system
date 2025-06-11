<template>

  <DocsPageTemplate apiDocs>
    <DocsPageSection
      title="Overview"
      anchor="#overview"
    >
      The KDateRange is a modal component that contains two input components and a calendar
      component that allow for a start and end date selection.
      <div>
        <KButton
          text="open demo"
          :primary="true"
          appearance="flat-button"
          :style="{ marginTop: '5px' }"
          @click="modalShown = true"
        />
        <ClientOnly>
          <KDateRange
            v-if="modalShown"
            class="demo"
            :firstAllowedDate="firstAllowedDate"
            :lastAllowedDate="lastAllowedDate"
            submitText="Submit"
            cancelText="Cancel"
            title="Select a date range"
            description="(Optional) Description of modal component"
            startDateLegendText="Start Date"
            endDateLegendText="End Date"
            previousMonthText="Previous Month"
            nextMonthText="Next Month"
            v-bind="errorMessages"
            @submit="modalShown = false"
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
  };

</script>


<style lang="css" scoped>

  .demo {
    position: relative;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 850px;
  }

</style>
