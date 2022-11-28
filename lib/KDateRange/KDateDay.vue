<template>

  <KButton
    autocomplete="off"
    :primary="false"
    appearance="flat-button"
    :appearanceOverrides="styleOverrides"
    :style="buttonStyles"
    :disabled="isDisabled"
    :class="[{
      'calendar-days-selected': isSelected,
      'calendar-days-in-range': isInRange,
      'end-of-week': isEndOfWeek,
      'start-of-week': isStartOfWeek,
      'first-day': isFirstDay,
      'last-day': isLastDay,
    }]"
  >
    {{ day }}
    <span aria-hidden="true" class="k-date-vhidden">{{ day }}</span>
    <span :aria-hidden="isDisabled" class="k-date-vhidden">{{ toMonthName(activeMonth) }}</span>
  </KButton>

</template>


<script>

  import KButton from '../buttons-and-links/KButton';

  export default {
    name: 'KDateDay',
    components: {
      KButton,
    },
    props: {
      day: {
        type: Number,
        default: null,
      },
      isSelected: {
        type: Boolean,
      },
      isInRange: {
        type: Boolean,
      },
      isDisabled: {
        type: Boolean,
      },
      isEndOfWeek: {
        type: Boolean,
      },
      isStartOfWeek: {
        type: Boolean,
      },
      isLastDay: {
        type: Boolean,
      },
      activeMonth: {
        type: Number,
        default: null,
      },
      dateLocale: {
        type: String,
        required: true,
      },
    },
    data() {
      return {};
    },
    computed: {
      buttonStyles() {
        return {
          '--selected-button-bg-color': this.$themeBrand.secondary.v_600,
          '--selected-button-text-color': this.$themePalette.white,
          '--in-range-button-bg-color': this.$themeBrand.secondary.v_50,
          '--in-range-button-text-color': this.$themePalette.grey.v_700,
          '--in-range-button-hover-color': this.$themePalette.grey.v_200,
        };
      },
      styleOverrides() {
        return {
          width: '30px',
          minWidth: '24px',
          height: '29px',
          minHeight: '23px',
          fontSize: '0.885em',
          fontWeight: 'lighter',
          lineHeight: '0px',
          padding: '0',
          color: this.$themePalette.grey.v_700,
        };
      },
      isFirstDay() {
        return this.day === 1;
      },
    },
    methods: {
      toMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber);
        return date.toLocaleString(this.dateLocale, { month: 'long' });
      },
    },
  };

</script>


<style lang="css" scoped>

  button:hover,
  .calendar-days-in-range:hover {
    background-color: var(--in-range-button-hover-color);
    border-radius: 15px;
  }

  button.calendar-days-selected {
    color: var(--selected-button-text-color) !important;
    background-color: var(--selected-button-bg-color);
    border-radius: 15px;
  }

  .calendar-days-in-range {
    background-color: var(--in-range-button-bg-color);
    border-radius: 0;
  }

  .calendar-days-in-range.end-of-week,
  .calendar-days-in-range.last-day {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  .calendar-days-in-range.start-of-week,
  .calendar-days-in-range.first-day {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
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