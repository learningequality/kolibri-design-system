<template>

  <KModal
    cancelText="Cancel"
    :title="title"
    :submitText="submitText"
    :size="modalSize"
    :submitDisabled="disabled"
    @submit="onSubmit"
    @cancel="onCancel"
  >
    <div>
      <slot name="description">
        <p id="modal-description" ref="description" class="description">
          {{ description }}
        </p>
      </slot>
      <div class="date-inputs">
        <div class="left-input">
          <KDateInput
            inputRef="dateStartRangeInput"
            :selectedDate="dateRange.start"
            :firstAllowedDate="firstAllowedDate"
            :lastAllowedDate="lastAllowedDate"
            :comparisonDate="dateRange.end"
            legendText="Start Date"
            @updateDate="setStartDate"
          />
        </div>
        <div class="right-input">
          <KDateInput
            inputRef="dateEndRangeInput"
            :selectedDate="dateRange.end"
            :firstAllowedDate="firstAllowedDate"
            :lastAllowedDate="lastAllowedDate"
            legendText="End Date"
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
          @updateSelectedDates="setSelectedDatesFromCalendar"
        />
      </div>
    </div>
  </KModal>

</template>


<script>

  import { mapActions } from 'vuex';
  import isAfter from 'date-fns/is_after';
  import isBefore from 'date-fns/is_before';
  import KModal from '../KModal';
  import KResponsiveWindowMixin from '../KResponsiveWindowMixin';
  import KDateCalendar from './KDateCalendar';
  import KDateInput from './KDateInput';

  var startOfToday = require('date-fns/start_of_today');

  export default {
    name: 'KDateRange',
    components: {
      KModal,
      KDateInput,
      KDateCalendar,
    },
    mixins: [KResponsiveWindowMixin],
    props: {
      /**
       * Constrains the selection to after this date, disabling dates prior
       */
      firstAllowedDate: {
        type: Date,
        default: null,
      },
      /**
       * Constrains date selection to before this date, disabling dates after
       */
      lastAllowedDate: {
        type: Date,
        default: new Date(),
      },
      /**
       *  Default value of start date
       */
      defaultStartDate: {
        type: Date,
        default: null,
      },
      /**
       *  Default value of end date
       */
      defaultEndDate: {
        type: Date,
        default() {
          return startOfToday();
        },
      },
      submitText: {
        type: String,
        default: 'Generate',
      },
      title: {
        type: String,
        default: '',
      },
      description: {
        type: String,
        default: 'The default start date is the last time you exported this log',
      },
    },
    data() {
      return {
        dateRange: {
          start: this.defaultStartDate ? this.defaultStartDate : null,
          end: this.defaultStartDate && this.defaultEndDate ? this.defaultEndDate : null,
        },
        modalSize: 480,
      };
    },
    computed: {
      // Modal submit button is disabled if this function returns true
      disabled() {
        return (
          !this.dateRange.start ||
          !this.dateRange.end ||
          !this.isValidDate(this.dateRange.start) ||
          !this.isValidDate(this.dateRange.end) ||
          isBefore(this.dateRange.start, this.firstAllowed) ||
          isBefore(this.dateRange.end, this.firstAllowed) ||
          isBefore(this.dateRange.end, this.dateRange.start) ||
          isAfter(this.dateRange.start, this.lastAllowedDate) ||
          isAfter(this.dateRange.end, this.lastAllowedDate)
        );
      },
    },
    methods: {
      ...mapActions(['displayModal']),
      onSubmit() {
        this.$emit('setRange', { start: this.dateRange.start, end: this.dateRange.end });
        this.displayModal(false);
      },
      onCancel() {
        this.$emit('cancel');
        this.displayModal(false);
      },
      /**
       *  Updates start key of the dateRange object when a new value is inserted into the input
       */
      setStartDate(newDate) {
        if (this.dateRange.start && newDate !== this.dateRange.start) {
          this.dateRange = { start: newDate, end: null };
        }
      },
      /**
       *  Updates end key of the dateRange object when a new value is inserted into the input
       */
      setEndDate(date) {
        if (this.dateRange.end || date != this.dateRange.end) {
          this.dateRange = { start: this.dateRange.start, end: date };
        }
      },
      setSelectedDatesFromCalendar(dates) {
        this.dateRange = { start: dates['start'], end: dates['end'] };
      },
      isValidDate(date) {
        return new Date(date) !== 'Invalid Date' && !isNaN(new Date(date));
      },
    },
  };

</script>


<style lang="css" scoped>

  .description {
    margin-top: 0;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    color: #3a3a3a;
  }

  .date-inputs {
    margin-left: -15px;
    text-decoration-color: #616161;
  }

  .left-input {
    display: inline-block;
    width: 49%;
  }

  .right-input {
    display: inline-block;
    width: 49%;
  }

</style>