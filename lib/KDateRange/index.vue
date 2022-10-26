<template>

  <KModal
    cancelText="Cancel"
    :title="title"
    :submitText="submitText"
    :size="modalSize"
    :submitDisabled="disabled"
    @submit="apply"
    @cancel="cancel"
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
          return new Date();
        },
      },
      /**
       *  Submission text of modal
       */
      submitText: {
        type: String,
        default: 'Generate',
      },
      /**
       *  Title text to customize the modal's title
       */
      title: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        dateRange: {
          start: this.defaultStartDate ? this.defaultStartDate : null,
          end: this.defaultEndDate ? this.defaultEndDate : null,
        },
        description: 'The default start date is the last time you exported this log',
        modalSize: 480,
      };
    },
    computed: {
      // Modal generate button is disabled if this function returns true
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
          isAfter(this.dateRange.end, this.lastAllowedDate) ||
          isAfter(this.dateRange.start, this.dateRange.end)
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
        }
        this.$emit('setRange', { start: this.dateRange.start, end: this.dateRange.end });
      },
      // when a new value is inserted into the input, update end key of the dateRange object
      setEndDate(date) {
        if (this.dateRange.end || date != this.dateRange.end) {
          this.dateRange = { start: this.dateRange.start, end: date };
        }
        this.$emit('setRange', { start: this.dateRange.start, end: this.dateRange.end });
      },
      setSelectedDatesFromCalendar(dates) {
        this.dateRange = { start: dates['start'], end: dates['end'] };
        this.$emit('setRange', { start: this.dateRange.start, end: this.dateRange.end });
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