<template>

  <div>
    <fieldset :aria-label="legendText" class="date-input-fieldset">
      <legend class="k-date-vhidden">
        {{ legendText }}
      </legend>
      <KTextBox
        :ref="inputRef"
        v-model.lazy="dateStr"
        type="text"
        :label="legendText"
        autoComplete="off"
        :invalid="isInvalidDate"
        :showInvalidText="isInvalidDate"
        :invalidText="invalidDateErrorText"
      />
      <input type="hidden" name="date" :value="selectedDate">
      <span class="k-date-vhidden">
        <span v-if="selectedDate">
          The selected {{ legendText }} date is {{ selectedDate.toLocaleDateString(dateFormatterLocale, { weekday:
            'long', month: 'long', day: 'numeric' }) }}
        </span>
      </span>
    </fieldset>
  </div>

</template>


<script>

  import format from 'date-fns/format';
  import isAfter from 'date-fns/is_after';
  import isBefore from 'date-fns/is_before';
  import { interpret, send } from 'xstate';
  import KTextBox from '../KTextbox';
  import { validationMachine } from './ValidationMachine';

  var startOfDay = require('date-fns/start_of_day');

  /* eslint-disable no-useless-escape */
  const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  export default {
    name: 'KDateInput',
    components: {
      KTextBox,
    },
    props: {
      dateFormatterLocale: {
        type: String,
        default: 'en-US',
      },
      inputRef: {
        type: String,
        default: null,
      },
      legendText: {
        type: String,
        required: true,
      },
      firstAllowedDate: {
        type: Date,
        default: null,
      },
      lastAllowedDate: {
        type: Date,
        default: null,
      },
      selectedDate: {
        type: Date,
        default: null,
      },
      comparisonDate: {
        type: Date,
        default: null,
      },
    },
    data() {
      return {
        timeout: null,
        invalidDateErrorText: '',
        firstAllowed: null,
        validationMachine: interpret(validationMachine),
      };
    },
    computed: {
      dateStr: {
        // getter
        get() {
          return this.getDateString(this.selectedDate);
        },
        // setter
        set(newValue) {
          if (this.timeout) clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            const [day, month, year] = newValue.split('/');
            const newDate = startOfDay(new Date(year, month - 1, day));
            if (newDate !== 'Invalid Date') {
              this.$emit('updateDate', newDate);
            }
          }, 1000);
        },
      },
      isInvalidDate() {
        return this.validationMachine._state.value === 'failure';
      },
    },
    watch: {
      dateStr(newValue, oldValue) {
        this.validationMachine.send('REVALIDATE', { dateStr: newValue });
      },
      comparisonDate(newValue, oldValue) {
        this.validationMachine.send('REVALIDATE', { comparisonDate: newValue });
      },
    },
    created() {
      this.validationMachine.start();
      this.firstAllowed = new Date(
        this.firstAllowedDate.getFullYear(),
        this.firstAllowedDate.getMonth() - 1,
        this.firstAllowedDate.getDate()
      );
      console.log(validationMachine);
      console.log(interpret);
    },
    methods: {
      // isInvalidDate(dateStr) {
      //   if (dateStr) {
      //     if (dateStr === 'DD/MM/YYYY') {
      //       return false;
      //     } else if (dateStr.match(dateFormat)) {
      //       const [day, month, year] = dateStr.split('/');
      //       if (isNaN(day) || isNaN(month) || isNaN(year)) {
      //         //this.setErrorText(true, 'Please enter a valid date');
      //         return true;
      //       }
      //       const newDate = startOfDay(new Date(year, month - 1, day));
      //       // validate if start date is after comparision (end) date
      //       if (
      //         this.legendText === 'Start Date' &&
      //         this.comparisonDate &&
      //         isAfter(newDate, this.comparisonDate)
      //       ) {
      //         //this.setErrorText(true, 'Start date cannot be after end date');
      //         return true;
      //       }
      //       // validate if input date is after the last allowed date
      //       if (isAfter(newDate, this.lastAllowedDate)) {
      //         //this.setErrorText(true, 'Cannot select a future date');
      //         return true;
      //       }
      //       // validate if input date is before the first allowed date
      //       if (isBefore(newDate, this.firstAllowed)) {
      //         // this.setErrorText(
      //         //   true,
      //         //   'Date must be after ' + format(this.firstAllowed, 'DD/MM/YYYY')
      //         // );
      //         return true;
      //       }
      //     } else {
      //       //this.setErrorText(true, 'Please enter a valid date');
      //       return true;
      //     }
      //     //this.showInvalidText = false;
      //     return false;
      //   }
      // },
      getDateString(date) {
        if (!date) {
          return 'DD/MM/YYYY';
        }
        return format(date, 'DD/MM/YYYY');
      },
      setErrorText(showError, errorText) {
        this.invalidDateErrorText = errorText;
        this.showInvalidText = showError;
      },
    },
  };

</script>


<style lang="css" scoped>

  .date-input-fieldset {
    padding-bottom: 0;
    border: 0;
  }

  /* VISUALLY HIDDEN ITEMS */
  .k-date-vhidden {
    position: absolute;
    top: 0;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    border: 0;
  }

</style>