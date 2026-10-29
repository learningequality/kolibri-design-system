<template>

  <KDateRange
    :firstAllowedDate="firstAllowedDate"
    :lastAllowedDate="lastAllowedDate"
    :defaultStartDate="defaultStartDate"
    :defaultEndDate="defaultEndDate"
    submitText="Submit"
    cancelText="Cancel"
    title="Select a date range"
    startDateLegendText="Start date"
    endDateLegendText="End date"
    previousMonthText="Previous month"
    nextMonthText="Next month"
    malformedErrorMessage="Please enter a valid date"
    startDateAfterEndDateErrorMessage="Start date cannot be after end date"
    cannotSelectAFutureDateErrorMessage="Cannot select a future date"
    dateBeforefirstAllowedErrorMessage="Date must be after 01/01/2024"
  />

</template>


<script>

  export default {
    computed: {
      // fixed, so the snapshot does not move with the clock
      firstAllowedDate() {
        return new Date(2024, 0, 1);
      },
      lastAllowedDate() {
        return new Date(2024, 5, 30);
      },
      defaultStartDate() {
        return new Date(2024, 4, 8);
      },
      defaultEndDate() {
        return new Date(2024, 4, 20);
      },
    },
  };

</script>
