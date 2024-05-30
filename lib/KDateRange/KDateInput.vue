<template>

  <div>
    <fieldset :aria-label="legendText" class="date-input-fieldset" :aria-describedby="inputId" aria-live="polite">
      <KTextBox
        :ref="inputRef"
        :value="value"
        type="date"
        pattern="\d{4}-\d{2}-\d{2}"
        :label="legendText"
        autoComplete="off"
        :invalid="Boolean(errorMessage)"
        :showInvalidText="Boolean(errorMessage)"
        :invalidText="errorMessage"
        :floatingLabel="false"
        @input="handleInput"
      />
      <span class="k-date-vhidden">
        <span v-if="value" :id="inputId">
          {{ dateDescription }}
        </span>
      </span>
    </fieldset>
  </div>

</template>


<script>

  import KTextBox from '../KTextbox';

  let uuid = 0;

  export default {
    name: 'KDateInput',
    components: {
      KTextBox,
    },
    props: {
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
        type: [Date, String],
        default: null,
      },
    },
    data() {
      return {
        uuid: 0,
      };
    },
    computed: {
      dateDescription() {
        if (this.value) {
          const valueAsDate = new Date(this.value);
          valueAsDate.setDate(valueAsDate.getDate() + 1);
          return (
            this.legendText +
            ' ' +
            this.$formatDate(valueAsDate, {
              year: 'numeric',
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })
          );
        }
        return '';
      },
      inputId() {
        if (this.value) {
          return `DateDesc_${this.uuid}`;
        }
        return '';
      },
    },
    beforeCreate() {
      this.uuid = String(uuid++);
    },
    mounted() {
      this.$nextTick(() => {
        const inputs = document.querySelectorAll('input[type = date]');
        for (const input of inputs) {
          input.addEventListener('click', this.disableNativeCalendar);
          input.addEventListener('focus', this.disableNativeCalendar);
        }
      });
    },
    methods: {
      handleInput(val) {
        if (val) {
          this.$emit('updateDate', val);
        }
      },
      disableNativeCalendar(e) {
        e.preventDefault();
      },
    },
  };

</script>


<style lang="scss" scoped>

  /* stylelint-disable */
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

  /* HIDES BROWSER NATIVE DATEPICKER */
  /deep/ input[type='date'] {
    width: 150px;
    text-align: left;
    text-transform: uppercase !important;
    border: 0;
    -webkit-appearance: none;
    appearance: none;

    &::-webkit-inner-spin-button,
    &::-webkit-calendar-picker-indicator {
      display: none;
      visibility: hidden !important;
      appearance: none;
    }
    &:dir(rtl) {
      clip-path: inset(0 0 0 25px);
    }
    &:dir(ltr) {
      clip-path: inset(0 25px 0 0);
    }
  }

</style>
