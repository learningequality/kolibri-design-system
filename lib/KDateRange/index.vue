<template>

  <KModal
    :cancelText="cancelText"
    :title="title"
    :submitText="submitText"
    :size="modalSize"
    :submitDisabled="disabled"
    data-test="dateRangeModal"
    @submit="onSubmit"
    @cancel="$emit('cancel')"
  >
    <div>
      <!-- @slot Description of modal -->
      <slot name="description">
        <p id="modal-description" ref="description" class="description">
          {{ description }}
        </p>
      </slot>
      <div class="date-inputs">
        <div class="left-input">
          <KDateInput
            :value="dateRange.start"
            inputRef="dateStartRangeInput"
            :errorMessage="invalidStartErrorMessage"
            :legendText="startDateLegendText"
            data-test="startDate"
            @updateDate="debouncedSetStartDate"
          />
        </div>
        <div class="right-input">
          <KDateInput
            :value="dateRange.end"
            inputRef="dateEndRangeInput"
            :errorMessage="invalidEndErrorMessage"
            :legendText="endDateLegendText"
            data-test="endDate"
            @updateDate="debouncedSetEndDate"
          />
        </div>
      </div>
      <div>
        <KDateCalendar
          :firstAllowedDate="firstAllowedDate"
          :lastAllowedDate="lastAllowedDate"
          :selectedStartDate="createDate(dateRange.start)"
          :selectedEndDate="createDate(dateRange.end)"
          :previousMonthText="previousMonthText"
          :nextMonthText="nextMonthText"
          v-bind.sync="dateRange"
          @updateSelectedDates="setSelectedDatesFromCalendar"
        />
      </div>
    </div>
  </KModal>

</template>


<script>

  import { format, startOfDay, startOfToday } from 'date-fns';
  import { createActor } from 'xstate';
  import get from 'lodash/get';
  import debounce from 'lodash/debounce';
  import KModal from '../KModal';
  import KDateCalendar from './KDateCalendar';
  import KDateInput from './KDateInput';
  import { validationMachine, initialContext } from './ValidationMachine';
  import validationConstants from './validationConstants';

  export default {
    name: 'KDateRange',
    components: {
      KModal,
      KDateInput,
      KDateCalendar,
    },
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
      /**
       *  Submission text of modal
       */
      submitText: {
        type: String,
        required: true,
      },
      /**
       *  Cancellation text of modal
       */
      cancelText: {
        type: String,
        required: true,
      },
      /**
       *  Title of modal
       */
      title: {
        type: String,
        required: true,
      },
      /**
       *  Description of modal
       */
      description: {
        type: [String, null],
        default: null,
      },
      /**
       *  Start date input label
       */
      startDateLegendText: {
        type: String,
        required: true,
      },
      /**
       *  End date input label
       */
      endDateLegendText: {
        type: String,
        required: true,
      },
      /**
       *  label for previous month button
       */
      previousMonthText: {
        type: String,
        required: true,
      },
      /**
       *  label for next month button
       */
      nextMonthText: {
        type: String,
        required: true,
      },
      /**
       *  Validation machine error messages
       *  bound to validationConstants.js
       */
      [validationConstants.MALFORMED]: {
        type: String,
        required: true,
      },
      [validationConstants.START_DATE_AFTER_END_DATE]: {
        type: String,
        required: true,
      },
      [validationConstants.FUTURE_DATE]: {
        type: String,
        required: true,
      },
      [validationConstants.DATE_BEFORE_FIRST_ALLOWED]: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        dateRange: {
          start: this.defaultStartDate ? format(this.defaultStartDate, 'YYYY-MM-DD') : null,
          end:
            this.defaultStartDate && this.defaultEndDate
              ? format(this.defaultEndDate, 'YYYY-MM-DD')
              : null,
        },
        modalSize: 480,
        validationMachine: null,
        invalidStartErrorMessage: '',
        invalidEndErrorMessage: '',
      };
    },
    computed: {
      // Modal submit button is disabled if this function returns true
      disabled() {
        return (
          Boolean(this.invalidStartErrorMessage) ||
          Boolean(this.invalidEndErrorMessage) ||
          this.isPlaceholder(this.dateRange.start) ||
          this.isPlaceholder(this.dateRange.end)
        );
      },
    },
    created() {
      this.debouncedSetStartDate = debounce(this.setStartDate, 750);
      this.debouncedSetEndDate = debounce(this.setEndDate, 750);
      const currentContext = {
        startDate: this.dateRange.start,
        endDate: this.dateRange.end,
        lastAllowedDate: this.lastAllowedDate,
        firstAllowedDate: this.firstAllowedDate,
      };


      this.validationActor = createActor(validationMachine, {
        input: { ...initialContext, ...currentContext }
      }).start();

      /** On every transition of the machine, we will revalidate and update our messages */
      this.validationActor.subscribe((state) => {
        this.getInvalidStartErrorMessage();
        this.getInvalidEndErrorMessage();
      });
    },
    methods: {
      onSubmit() {
        /**
         * Emitted when the submit button or the enter key is pressed
         */
        this.$emit('submit', {
          start: this.createDate(this.dateRange.start),
          end: this.createDate(this.dateRange.end),
        });
      },
      /** Updates dateRange object with dates selected through calendar click */
      setSelectedDatesFromCalendar(dates) {
        this.dateRange = {
          start: this.getDateString(dates['start']),
          end: this.getDateString(dates['end']),
        };
        this.validationActor.send({
          type: 'REVALIDATE',
          startDate: this.dateRange.start,
          endDate: this.dateRange.end,
        });        
      },
      /** Checks if dateStr is equal to the placeholder. If so, submit should be disabled */
      isPlaceholder(dateStr) {
        return dateStr === null;
      },
      getDateString(date) {
        if (!date) {
          return null;
        }
        return format(date, 'YYYY-MM-DD');
      },
       /** Returns startDateInvalid message from validation actor */
      invalidStart() {
        return this.validationActor.getSnapshot().context.startDateInvalid;
      },
      /** Returns endDateInvalid message from validation actor */
      invalidEnd() {
        return this.validationActor.getSnapshot().context.endDateInvalid;
      },
      /**
       *  Maps the value of invalidStart to validationConstants
       *  and sets the start date error message to the
       *  corresponding error message
       */
      getInvalidStartErrorMessage() {
        this.invalidStartErrorMessage = get(this, this.invalidStart(), '');
      },
      /**
       *  Maps the value of invalidEnd to validationConstants
       *  and sets the end date error message to the
       *  corresponding error message
       */
      getInvalidEndErrorMessage() {
        this.invalidEndErrorMessage = get(this, this.invalidEnd(), '');
      },
      createDate(dateStr) {
        if (!dateStr) {
          return null;
        }
        const [year, month, day] = dateStr.split('-');
        const newDate = startOfDay(new Date(year, month - 1, day));
        return newDate;
      },
      /** Updates start date with input from textbox */
      setStartDate(newVal) {
        this.dateRange = { start: newVal, end: null };
        this.validationActor.send({
        type: 'REVALIDATE',
        startDate: newVal,
        endDate: null
      });        
      },
      /** Updates end date with input from textbox */
      setEndDate(newVal) {
        this.dateRange = { start: this.dateRange.start, end: newVal };
        this.validationActor.send({
        type: 'REVALIDATE',
        endDate: newVal
      });
      },
    },
    beforeUnmount() {
      // Cleanup actor when component is destroyed
      this.validationActor?.stop();
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