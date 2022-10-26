<template>

  <div>
    <fieldset :aria-label="legendText" class="date-input-fieldset">
      <legend class="k-date-vhidden">
        {{ legendText }}
      </legend>
      <KTextBox
        :ref="inputRef"
        v-model.lazy="defaultSelectedDate"
        type="text"
        :label="legendText"
        aria-autocomplete="none"
        autoComplete="off"
        :invalid="isValidDate(defaultSelectedDate)"
        :showInvalidText="showInvalidText"
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
  import KTextBox from '/Users/lharris/kolibri-design-system/lib/KTextbox';
  import isAfter from 'date-fns/is_after';
  import isBefore from 'date-fns/is_before';

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
      },
      legendText: {
        type: String,
        required: true,
      },
      // constrains the selection to after this date, disabling dates prior
      firstAllowedDate: {
        type: Date,
      },
      // last allowed date to be returned as End Date
      lastAllowedDate: {
        type: Date,
      },
      // date that is selected, if there is one
      selectedDate: {
        type: Date,
        default: null,
      },
      // comparision date for validation
      comparisonDate: {
        type: Date,
      },
    },
    data() {
      return {
        showInvalidText: false,
        timeout: null,
        invalidDateErrorText: 'Please enter a valid date',
        firstAllowed: null,
      };
    },
    computed: {
      defaultSelectedDate: {
        // getter
        get() {
          return this.getDateString(this.selectedDate);
        },
        // setter
        set(newValue) {
          if (this.timeout) clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            const [day, month, year] = newValue.split('/');
            const newDate = new Date(year, month - 1, day);
            this.$emit('updateDate', newDate);
          }, 1000);
        },
      },
    },
    created() {
      this.firstAllowed = new Date(
        this.firstAllowedDate.getFullYear(),
        this.firstAllowedDate.getMonth() - 1,
        this.firstAllowedDate.getDate()
      );
    },
    methods: {
      isValidDate(dateStr) {
        if (dateStr) {
          if (dateStr === 'DD/MM/YYYY') {
            return false;
          } else if (dateStr.match(dateFormat)) {
            const [day, month, year] = dateStr.split('/');
            if (isNaN(day) || isNaN(month) || isNaN(year)) {
              this.invalidDateErrorText = 'Please enter a valid date';
              this.showInvalidText = true;
              return true;
            }
            const newDate = new Date(year, month - 1, day);
            // validate if start date is after comparision date
            if (
              this.legendText === 'Start Date' &&
              this.comparisonDate &&
              isAfter(newDate, this.comparisonDate)
            ) {
              this.invalidDateErrorText = 'Start date cannot be after end date';
              this.showInvalidText = true;
              return true;
            }
            // validate if input date is after the last allowed date
            if (isAfter(newDate, this.lastAllowedDate)) {
              this.invalidDateErrorText = 'Cannot select a future date';
              this.showInvalidText = true;
              return true;
            }
            // validate if input date is before the first allowed date
            if (isBefore(newDate, this.firstAllowed)) {
              this.invalidDateErrorText =
                'Date must be after ' + format(this.firstAllowed, 'DD/MM/YYYY');
              this.showInvalidText = true;
              return true;
            }
          } else {
            this.invalidDateErrorText = 'Please enter a valid date';
            this.showInvalidText = true;
            return true;
          }
          this.showInvalidText = false;
          return false;
        }
      },
      getDateString(date) {
        if (!date) {
          return 'DD/MM/YYYY';
        }
        return format(date, 'DD/MM/YYYY');
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