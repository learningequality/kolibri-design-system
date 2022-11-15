<template>

  <KButton
    autocomplete="off"
    :primary="false"
    appearance="flat-button"
    :appearanceOverrides="styleOverrides"
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
    <span class="k-date-vhidden">{{ day + " " + toMonthName(activeMonth) }}</span>
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
        return date.toLocaleString('en-US', { month: 'long' });
      },
    },
  };

</script>


<style lang="css" scoped>

  button:hover,
  .calendar-days-in-range:hover {
    color: #000000;
    background: #eeeeee;
    border-radius: 15px;
  }

  button.calendar-days-selected {
    color: #ffffff !important;
    background: #328168;
    border-radius: 15px;
  }

  .calendar-days-in-range {
    background: #e3f0ed;
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