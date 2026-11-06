<template>

  <KButton
    autocomplete="off"
    :primary="false"
    appearance="flat-button"
    :appearanceOverrides="styleOverrides"
    :disabled="isDisabled"
    :aria-hidden="isDisabled"
    class="calendar-day"
    :class="[
      {
        'calendar-days-selected': isSelected,
        'calendar-days-in-range': isInRange,
        'end-of-week': isEndOfWeek,
        'start-of-week': isStartOfWeek,
        'first-day': isFirstDay,
        'last-day': isLastDay,
      },
    ]"
  >
    {{ day }}
    <span
      aria-hidden="true"
      class="k-date-vhidden"
    >{{ day }}</span>
    <span
      :aria-hidden="isDisabled"
      class="k-date-vhidden"
    >{{ toMonthName(activeMonth) }}</span>
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
    },
    data() {
      return {};
    },
    computed: {
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
        };
      },
      isFirstDay() {
        return this.day === 1;
      },
    },
    methods: {
      toMonthName(monthNumber) {
        const date = new Date();
        // set the day first to avoid rolling over into the following month when
        // today's date doesn't exist in the target month (e.g. 31st -> November)
        date.setDate(1);
        date.setMonth(monthNumber);
        return this.$formatDate(date, { month: 'long' });
      },
    },
  };

</script>


<style lang="css" scoped>

  button:hover,
  button.calendar-days-selected,
  .calendar-days-in-range:hover {
    border-radius: 15px;
  }

  /* KButton's own rules are scoped, so these repeat its classes to beat them.
     The :not() keeps the selected colors on a day that is also in the range. */
  .button.flat.calendar-day {
    color: var(--palette-grey-v700);
  }

  .button.flat.calendar-day.calendar-days-in-range:not(.calendar-days-selected) {
    background-color: var(--brand-primary-v100);
  }

  .button.flat.calendar-day.calendar-days-selected {
    color: var(--palette-white);
    background-color: var(--brand-primary-v500);
  }

  /* the rules above outrank KButton's flat hover, so repeat its value here */
  .button.flat.calendar-day.calendar-days-in-range:hover,
  .button.flat.calendar-day.calendar-days-selected:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .calendar-days-in-range {
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
