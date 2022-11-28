<template>

  <div>
    <fieldset :aria-labelledby="legendText" class="date-input-fieldset" aria-describedby="date-desc" aria-live="polite">
      <KTextBox
        :ref="inputRef"
        :value="value"
        type="text"
        :label="legendText"
        autoComplete="off"
        :invalid="Boolean(errorMessage)"
        :showInvalidText="Boolean(errorMessage)"
        :invalidText="errorMessage"
        @input="handleInput"
      />  
      <input type="hidden" name="date" :value="valueAsDate" data-test="valueAsDate">
      <span class="k-date-vhidden">
        <span v-if="valueAsDate" id="date-desc">
          {{ dateDescription }}
        </span>
      </span>
    </fieldset>
  </div>

</template>


<script>

  import { startOfDay } from 'date-fns';
  import KTextBox from '../KTextbox';
  import { DATE_FMT } from './validationConstants';

  export default {
    name: 'KDateInput',
    components: {
      KTextBox,
    },
    props: {
      dateLocale: {
        type: String,
        required: true,
      },
      inputRef: {
        type: String,
        default: null,
      },
      legendText: {
        type: String,
        required: true,
      },
      errorMessage: {
        type: [String, Boolean],
        default: false,
      },
      value: {
        type: String,
        default: DATE_FMT,
      },
    },
    computed: {
      valueAsDate() {
        if (this.value) {
          return this.createDate(this.value);
        }
        return '';
      },
      dateDescription() {
        if (
          Object.prototype.toString.call(this.valueAsDate) === '[object Date]' &&
          isNaN(this.valueAsDate)
        ) {
          return ' ';
        } else {
          return this.valueAsDate.toLocaleDateString(this.dateLocale, {
            year: 'numeric',
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          });
        }
      },
    },
    methods: {
      createDate(dateStr) {
        const [day, month, year] = dateStr.split('/');
        const newDate = startOfDay(new Date(year, month - 1, day));
        return newDate;
      },
      handleInput(val) {
        this.$emit('updateDate', val);
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