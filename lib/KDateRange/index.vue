<template>

  <KModal
    :cancelText="cancelText"
    :title="title"
    :submitText="submitText"
    :size="modalSize"
    :submitDisabled="disabled"
    @submit="onSubmit"
    @cancel="onCancel"
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
            legendText="Start Date"
            @updateDate="debouncedSetStartDate"
          />
        </div>
        <div class="right-input">
          <KDateInput
            :value="dateRange.end"
            inputRef="dateEndRangeInput"
            :errorMessage="invalidEndErrorMessage"
            legendText="End Date"
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
          v-bind.sync="dateRange"
          @updateSelectedDates="setSelectedDatesFromCalendar"
        />
      </div>
    </div>
  </KModal>

</template>


<script>

  import { mapActions } from 'vuex';
  import { format, startOfDay, startOfToday } from 'date-fns';
  import { interpret } from 'xstate';
  import get from 'lodash/get';
  import debounce from 'lodash/debounce';
  import KModal from '../KModal';
  import KResponsiveWindowMixin from '../KResponsiveWindowMixin';
  import KDateCalendar from './KDateCalendar';
  import KDateInput from './KDateInput';
  import { validationMachine, initialContext } from './ValidationMachine';
  import validationConstants, { DATE_FMT } from './validationConstants';

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
          start: this.defaultStartDate ? format(this.defaultStartDate, DATE_FMT) : DATE_FMT,
          end:
            this.defaultStartDate && this.defaultEndDate
              ? format(this.defaultEndDate, DATE_FMT)
              : DATE_FMT,
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
      this.validationMachine = interpret(
        validationMachine.withContext({ ...initialContext, ...currentContext })
      );
      this.validationMachine.start();

      /** On every transition of the machine, we will revalidate and update our messages */
      this.validationMachine.onTransition(() => {
        this.getInvalidStartErrorMessage();
        this.getInvalidEndErrorMessage();
      });
    },
    methods: {
      ...mapActions(['displayModal']),
      onSubmit() {
        /**
         * Emitted when the submit button or the enter key is pressed
         */
        this.$emit('setRange', { start: this.dateRange.start, end: this.dateRange.end });
        this.displayModal(false);
      },
      onCancel() {
        /**
         * Emitted when the cancel button is clicked or the esc key is pressed
         */
        this.$emit('cancel');
        this.displayModal(false);
      },
      /** updating dateRange object with dates selected through calendar click */
      setSelectedDatesFromCalendar(dates) {
        this.dateRange = {
          start: this.getDateString(dates['start']),
          end: this.getDateString(dates['end']),
        };
        this.validationMachine.send('REVALIDATE', {
          startDate: this.dateRange.start,
          endDate: this.dateRange.end,
        });
      },
      isPlaceholder(dateStr) {
        return dateStr === DATE_FMT;
      },
      getDateString(date) {
        if (!date) {
          return DATE_FMT;
        }
        return format(date, DATE_FMT);
      },
      invalidStart() {
        return this.validationMachine._state.context.startDateInvalid;
      },
      invalidEnd() {
        return this.validationMachine._state.context.endDateInvalid;
      },
      getInvalidStartErrorMessage() {
        this.invalidStartErrorMessage = get(this, this.invalidStart(), '');
      },
      getInvalidEndErrorMessage() {
        this.invalidEndErrorMessage = get(this, this.invalidEnd(), '');
      },
      createDate(dateStr) {
        if (!dateStr) {
          return null;
        }
        const [day, month, year] = dateStr.split('/');
        const newDate = startOfDay(new Date(year, month - 1, day));
        return newDate;
      },
      /** updating start date with input from textbox */
      setStartDate(newVal) {
        this.dateRange = { start: newVal, end: DATE_FMT };
        this.validationMachine.send('REVALIDATE', { startDate: newVal, endDate: DATE_FMT });
      },
      /** updating end date with input from textbox */
      setEndDate(newVal) {
        this.dateRange = { start: this.dateRange.start, end: newVal };
        this.validationMachine.send('REVALIDATE', { endDate: newVal });
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