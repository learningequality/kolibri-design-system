<template>

  <!-- <KModal
    cancelText="Cancel"
    :title="title"
    :submitText="submitText"
    size="480px"
    :submitDisabled="disabled"
    @submit="apply"
    @cancel="cancel"
  > -->
  <div>
    <slot name="description">
      <p id="modal-description" ref="description" class="description">
        {{ description }}
      </p>
    </slot>
    <div class="date-inputs">
      <div id="left-input">
        <KDateInput
          inputRef="dateStartRangeInput"
          :selectedDate="dateRange.start"
          :firstAllowedDate="firstAllowedDate"
          :lastAllowedDate="lastAllowedDate"
          legendText="Start Date"
          name="date"
          @updateDate="setStartDate"
        />
      </div>
      <div id="right-input">
        <KDateInput
          ref="dateEndRangeInput"
          :selectedDate="dateRange.end"
          :firstAllowedDate="firstAllowedDate"
          :lastAllowedDate="lastAllowedDate"
          legendText="End Date"
          name="date"
          @updateDate="setEndDate"
        />
      </div>
    </div>
    <div>
      <KDateCalendar
        :firstAllowedDate="firstAllowedDate"
        :lastAllowedDate="lastAllowedDate"
        :selectedStartDate="dateRange.start"
        :selectedEndDate="dateRange.end"
        v-bind.sync="dateRange"
        @updateSelectedDates="setSelectedDates"
      />
    </div>
  </div>
  <!-- </KModal> -->

</template>


<script>

  import { mapActions } from 'vuex';
  import KModal from '/Users/lharris/kolibri-design-system/lib/KModal.vue';
  import KDateInput from '/Users/lharris/kolibri-design-system/lib/KDateRange/KDateInput.vue';
  import KDateCalendar from '/Users/lharris/kolibri-design-system/lib/KDateRange/KDateCalendar.vue';

  export default {
    name: 'KDateRange',
    components: {
      KModal,
      KDateInput,
      KDateCalendar,
    },
    props: {
      // constrains the selection to after this date, disabling dates prior
      firstAllowedDate: {
        type: Date,
        default: null,
      },
      // constrains date selection to before this date, disabling dates after
      lastAllowedDate: {
        type: Date,
        default: new Date(),
      },
      // default value of start date
      defaultStartDate: {
        type: Date,
        default: null,
      },
      // default value of end date
      defaultEndDate: {
        type: Date,
        default: new Date(),
      },
      // submission text of modal
      submitText: {
        type: String,
        default: 'Generate',
      },
      // title text to customize the modal's title
      title: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        dateRange: {
          start: this.defaultStartDate ? this.defaultStartDate : null,
        },
        description: 'The default start date is the last time you exported this log',
      };
    },
    computed: {
      // Modal generate button is disabled if this function returns true
      disabled() {
        return (
          this.dateRange.start === null ||
          this.dateRange.end === null ||
          this.dateRange.start >= this.dateRange.end
        );
      },
    },
    methods: {
      ...mapActions(['displayModal']),
      // setting the range when the generate button is hit
      apply() {
        this.$emit('setRange', { start: this.dateRange.start, end: this.dateRange.end });
        this.displayModal(false);
      },
      cancel() {
        this.displayModal(false);
      },
      // when a new value is inserted into the input, update start key of the dateRange object
      setStartDate(newDate) {
        if (this.dateRange.start && newDate !== this.dateRange.start) {
          this.dateRange = { start: newDate, end: null };
          // this.$emit('selectedStart', this.dateRange.start);
        }
      },
      // when a new value is inserted into the input, update end key of the dateRange object
      setEndDate(date) {
        if (this.dateRange.end || date != this.dateRange.end) {
          this.dateRange = { start: this.dateRange.start, end: date };
          // this.$emit('selectedEnd', this.dateRange.end);
        }
      },
      setSelectedDates(dates) {
        this.dateRange = { start: dates['start'], end: dates['end'] };
      },
    },
  };

</script>


<style lang="css" scoped>

  .description {
    padding: 6px;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    color: #3a3a3a;
  }

  .date-inputs {
    display: inline-block;
    margin-left: -5px;
    text-decoration-color: #616161;
  }

  #left-input {
    float: left;
  }

  #right-input {
    float: right;
  }

</style>