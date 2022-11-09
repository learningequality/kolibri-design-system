<template>

  <div class="calendar">
    <div class="calendar-wrap">
      <KIconButton
        aria-label="Previous Month"
        tooltip="Previous Month"
        icon="chevronLeft"
        appearance="flat-button"
        class="left"
        size="mini"
        @click="goPrevMonth"
      />
      <KIconButton
        aria-label="Next Month"
        tooltip="Next Month"
        icon="chevronRight"
        appearance="flat-button"
        class="right"
        size="mini"
        @click="goNextMonth"
      />
      <div class="calendar-month-left">
        <div class="months-text">
          {{ monthsLocale[activeMonth] + ' ' + activeYearStart }}
        </div>
        <ul v-for="weekindex in 6" :key="weekindex" class="calendar-days">
          <li
            v-for="dayinweekindex in numOfDays"
            :key="dayinweekindex"
            :class="[{ 'calendar-days--disabled': isDateDisabled(weekindex, dayinweekindex, activeMonthDay, activeMonthDate) || isDateDisabledLeft(weekindex, dayinweekindex, activeMonthDay),
                       'selected-first': ( selectionOrder(weekindex, dayinweekindex, 'first', activeMonthDay, activeMonthDate) === 'first'),
                       'selected-second': ( selectionOrder(weekindex, dayinweekindex, 'first', activeMonthDay, activeMonthDate) === 'second')
            }]"
            @click="selectFirstItem(weekindex, dayinweekindex)"
          >
            <KDateDay
              :day="getDayCell(weekindex, dayinweekindex, activeMonthDay, activeMonthDate)"
              :isSelected="isDateSelected(weekindex, dayinweekindex, 'first', activeMonthDay, activeMonthDate)"
              :isInRange="isDateInRange(weekindex, dayinweekindex, 'first', activeMonthDay, activeMonthDate)"
              :isDisabled="isDateDisabled(weekindex, dayinweekindex, activeMonthDay, activeMonthDate) || isDateDisabledLeft(weekindex, dayinweekindex, activeMonthDay)"
              :isLastDay="isLastDay(weekindex, dayinweekindex, 'first', activeMonthDay, activeMonthDate)"
              :isEndOfWeek="dayinweekindex === 7"
              :isStartOfWeek="dayinweekindex === 1"
              :activeMonth="activeMonth"
            />
          </li>
        </ul>
      </div>
      <div class="calendar-month-right">
        <div class="months-text">
          {{ monthsLocale[nextActiveMonth] + ' ' + activeYearEnd }}
        </div>
        <ul v-for="weekindex in 6" :key="weekindex" class="calendar-days">
          <li
            v-for="dayinweekindex in numOfDays"
            :key="dayinweekindex"
            :class="[{ 'calendar-days--disabled': isDateDisabled(weekindex, dayinweekindex, nextActiveMonthDay, nextActiveMonthDate) || isDateDisabledRight(weekindex, dayinweekindex, nextActiveMonthDay),
                       'selected-first': ( selectionOrder(weekindex, dayinweekindex, 'second', nextActiveMonthDay, nextActiveMonthDate) === 'first'),
                       'selected-second': ( selectionOrder(weekindex, dayinweekindex, 'second', nextActiveMonthDay, nextActiveMonthDate) === 'second')
            }]"
            @click="selectSecondItem(weekindex, dayinweekindex)"
          >
            <KDateDay
              :day="getDayCell(weekindex, dayinweekindex, nextActiveMonthDay, nextActiveMonthDate)"
              :isSelected="isDateSelected(weekindex, dayinweekindex, 'second', nextActiveMonthDay, nextActiveMonthDate)"
              :isInRange="isDateInRange(weekindex, dayinweekindex, 'second', nextActiveMonthDay, nextActiveMonthDate)"
              :isDisabled="isDateDisabled(weekindex, dayinweekindex, nextActiveMonthDay, nextActiveMonthDate) || isDateDisabledRight(weekindex, dayinweekindex, nextActiveMonthDay)"
              :isLastDay="isLastDay(weekindex, dayinweekindex, 'second', nextActiveMonthDay, nextActiveMonthDate)"
              :isEndOfWeek="dayinweekindex === 7"
              :isStartOfWeek="dayinweekindex === 1"
              :activeMonth="nextActiveMonth"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>


<script>

  import format from 'date-fns/format';
  import isAfter from 'date-fns/is_after';
  import KIconButton from '../buttons-and-links/KIconButton';
  import KDateDay from './KDateDay';

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  export default {
    name: 'KDateCalendar',
    components: {
      KIconButton,
      KDateDay,
    },
    props: {
      /**
       * constrains the selection to after this date, disabling dates prior
       */
      firstAllowedDate: {
        type: Date,
        default: null,
      },
      /**
       * constrains date selection to before this date, disabling dates after
       */
      lastAllowedDate: {
        type: Date,
        default: new Date(),
      },
      /**
       * default value of selected start date
       */
      selectedStartDate: {
        type: Date,
        default: null,
      },
      /**
       * default value of selected end date
       */
      selectedEndDate: {
        type: Date,
        default: null,
      },
    },
    data() {
      return {
        // Set preselected dates if selected start and end dates are given
        dateRange: {
          start: this.selectedStartDate ? this.selectedStartDate : null,
          end: this.selectedStartDate && this.selectedEndDate ? this.selectedEndDate : null,
        },
        numOfDays: 7,
        isFirstChoice: this.selectedStartDate ? true : false,
        activeMonth: new Date().getMonth() - 1,
        activeYearStart: new Date().getFullYear(),
        activeYearEnd: new Date().getFullYear(),
      };
    },
    computed: {
      monthsLocale() {
        return months;
      },
      /**
       * returns the day of week of the beginning of the left side calendar month
       */
      activeMonthDay() {
        return new Date(this.activeYearStart, this.activeMonth, 1).getDay();
      },
      /**
       * returns the day of week of the beginnning of the right side month
       */
      nextActiveMonthDay() {
        return new Date(this.activeYearEnd, this.nextActiveMonth, 1).getDay();
      },
      /**
       * returns the last day of the month on the left side calendar month
       */
      activeMonthDate() {
        return new Date(this.activeYearEnd, this.nextActiveMonth, 0).getDate();
      },
      /**
       * returns the last day of the month on the right side calendar month
       */
      nextActiveMonthDate() {
        return new Date(this.activeYearEnd, this.activeMonth + 2, 0).getDate();
      },
      /**
       * returns the next month that comes after the current active month
       */
      nextActiveMonth() {
        return this.activeMonth >= 11 ? 0 : this.activeMonth + 1;
      },
    },
    watch: {
      nextActiveMonth(value) {
        if (value === 0) this.activeYearEnd = this.activeYearStart + 1;
      },
    },
    created() {
      if (this.activeMonth === 11) this.activeYearEnd = this.activeYearStart + 1;
    },
    methods: {
      /**
       * returns the index number within month of where day should be placed
       */
      getDayIndexInMonth(weekindex, dayinweekindex, activeMonthDay) {
        const date = this.numOfDays * (weekindex - 1) + dayinweekindex;
        return date - activeMonthDay;
      },
      /**
       * returns placement where day should be placed on calendar
       */
      getDayCell(weekindex, dayinweekindex, activeMonthDay, activeMonthDate) {
        const result = this.getDayIndexInMonth(weekindex, dayinweekindex, activeMonthDay);
        // bound by > 0 and < last day of month
        return result > 0 && result <= activeMonthDate ? result : null;
      },
      /**
       * update end and start date of dateRange Object
       */
      getNewDateRange(result, activeMonth, activeYear) {
        const newData = {};
        let key = 'start';
        if (!this.isFirstChoice) {
          key = 'end';
        } else {
          newData['end'] = null;
        }
        const resultDate = new Date(activeYear, activeMonth, result);
        if (!this.isFirstChoice && resultDate < this.dateRange.start) {
          this.isFirstChoice = false;
          return { start: resultDate };
        }

        // toggle first choice
        this.isFirstChoice = !this.isFirstChoice;
        newData[key] = resultDate;
        return newData;
      },
      selectFirstItem(weekindex, dayinweekindex) {
        const result = this.getDayIndexInMonth(weekindex, dayinweekindex, this.activeMonthDay);
        this.dateRange = Object.assign(
          {},
          this.dateRange,
          this.getNewDateRange(result, this.activeMonth, this.activeYearStart)
        );
        this.$emit('updateSelectedDates', this.dateRange);
      },
      selectSecondItem(weekindex, dayinweekindex) {
        const result = this.getDayIndexInMonth(weekindex, dayinweekindex, this.nextActiveMonthDay);
        this.dateRange = Object.assign(
          {},
          this.dateRange,
          this.getNewDateRange(result, this.nextActiveMonth, this.activeYearEnd)
        );
        this.$emit('updateSelectedDates', this.dateRange);
      },
      isDateSelected(weekindex, dayinweekindex, key, activeMonthDay, activeMonthDate) {
        const result = this.getDayIndexInMonth(weekindex, dayinweekindex, activeMonthDay);
        if (result < 1 || result > activeMonthDate) return false;
        var currDate = this.getDate(key, result);
        return (
          (this.selectedStartDate &&
            format(this.selectedStartDate, 'DD/MM/YYYY') === format(currDate, 'DD/MM/YYYY')) ||
          (this.selectedEndDate &&
            format(this.selectedEndDate, 'DD/MM/YYYY') === format(currDate, 'DD/MM/YYYY'))
        );
      },
      /**
       * returns order of selection for css styling
       */
      selectionOrder(weekindex, dayinweekindex, key, activeMonthDay, activeMonthDate) {
        const result = this.getDayIndexInMonth(weekindex, dayinweekindex, activeMonthDay);
        if (result < 1 || result > activeMonthDate) return false;
        var currDate = this.getDate(key, result);
        // the light green background radius and direction order is based on these attributes
        if (
          this.selectedStartDate &&
          this.selectedEndDate &&
          this.isValidDate(this.selectedStartDate) &&
          this.isValidDate(this.selectedEndDate) &&
          isAfter(this.selectedEndDate, this.selectedStartDate) &&
          format(this.selectedStartDate, 'DD/MM/YYYY') !==
            format(this.selectedEndDate, 'DD/MM/YYYY')
        ) {
          if (
            this.selectedStartDate &&
            format(this.selectedStartDate, 'DD/MM/YYYY') === format(currDate, 'DD/MM/YYYY') &&
            !(dayinweekindex === 7)
          ) {
            return 'first';
          } else if (
            this.selectedEndDate &&
            format(this.selectedEndDate, 'DD/MM/YYYY') === format(currDate, 'DD/MM/YYYY') &&
            !(dayinweekindex === 1) &&
            !(result === 1)
          ) {
            return 'second';
          }
        } else {
          return '';
        }
      },
      isDateInRange(weekindex, dayinweekindex, key, activeMonthDay, activeMonthDate) {
        const result = this.getDayIndexInMonth(weekindex, dayinweekindex, activeMonthDay);
        if (result < 1 || result > activeMonthDate) return false;
        var currDate = this.getDate(key, result);
        return (
          this.selectedStartDate &&
          this.selectedEndDate &&
          this.selectedStartDate < currDate &&
          this.selectedEndDate > currDate
        );
      },
      /**
       * returns true for dates that are not apart of the current month; should be hidden from view
       */
      isDateDisabled(weekindex, dayinweekindex, activeMonthDay, activeMonthDate) { 
        const result = this.getDayIndexInMonth(weekindex, dayinweekindex, activeMonthDay);
        // bound by > 0 and < last day of month
        return !(result > 0 && result <= activeMonthDate);
      },
      /**
       * returns true for disabled dates before the firstAllowedDate; should be visible but grayed out
       */
      isDateDisabledLeft(weekindex, dayinweekindex, activeMonthDay) {
        const result = this.getDayIndexInMonth(weekindex, dayinweekindex, activeMonthDay);
        const currDate = new Date(this.activeYearStart, this.activeMonth, result);
        const firstAllowed = new Date(
          this.firstAllowedDate.getFullYear(),
          this.firstAllowedDate.getMonth() - 1,
          0
        );
        return currDate <= firstAllowed || currDate > this.lastAllowedDate;
      },
      /**
       * returns true for disabled dates after the lastAllowedDate; should be visible but grayed out
       */
      isDateDisabledRight(weekindex, dayinweekindex, activeMonthDay) {
        const result = this.getDayIndexInMonth(weekindex, dayinweekindex, activeMonthDay);
        const currDate = new Date(this.activeYearStart, this.activeMonth + 1, result);
        const firstAllowed = new Date(
          this.firstAllowedDate.getFullYear(),
          this.firstAllowedDate.getMonth() - 1,
          0
        );
        return currDate <= firstAllowed || currDate > this.lastAllowedDate;
      },
      /**
       * return true if date is last day of month for css border rounding
       */
      isLastDay(weekindex, dayinweekindex, key, nextActiveMonthDay, nextActiveMonthDate) {
        const result = this.getDayCell(
          weekindex,
          dayinweekindex,
          nextActiveMonthDay,
          nextActiveMonthDate
        );
        let lastDay = null;
        if (key === 'first') {
          lastDay = new Date(this.activeYearStart, this.activeMonth + 1, 0).getDate();
        } else {
          lastDay = new Date(this.activeYearEnd, this.nextActiveMonth + 1, 0).getDate();
        }
        return result === lastDay;
      },
      goPrevMonth() {
        const prevMonth = new Date(this.activeYearStart, this.activeMonth, 0);
        this.activeMonth = prevMonth.getMonth();
        this.activeYearStart = prevMonth.getFullYear();
        this.activeYearEnd = prevMonth.getFullYear();
      },
      goNextMonth() {
        const nextMonth = new Date(this.activeYearEnd, this.nextActiveMonth, 2);
        this.activeMonth = nextMonth.getMonth();
        this.activeYearStart = nextMonth.getFullYear();
        this.activeYearEnd = nextMonth.getFullYear();
      },
      isValidDate(date) {
        return new Date(date) !== 'Invalid Date' && !isNaN(new Date(date));
      },
      getDate(key, day) {
        let currDate = null;
        if (key === 'first') {
          currDate = new Date(this.activeYearStart, this.activeMonth, day);
        } else {
          currDate = new Date(this.activeYearEnd, this.nextActiveMonth, day);
        }
        return currDate;
      },
    },
  };

</script>


<style lang="css" scoped>

  .calendar-wrap {
    position: relative;
  }

  .left {
    position: absolute;
    top: 0;
    left: 0;
  }

  .right {
    position: absolute;
    top: 0;
    right: 0;
  }

  .months-text {
    margin-bottom: 10px;
    text-align: center;
  }

  .months-text .left {
    float: left;
    cursor: pointer;
  }

  .months-text .right {
    float: right;
    cursor: pointer;
  }

  .calendar {
    height: auto;
    margin-right: 5px;
    font-family: 'Noto Sans';
    font-size: 14px;
    background: white;
  }

  .calendar ul {
    list-style-type: none;
  }

  .calendar-month-left,
  .calendar-month-right {
    float: left;
    width: 48%;
  }

  .calendar-month-right {
    margin-left: 15px;
  }

  .calendar-days {
    padding: 0;
    margin: 0;
  }

  .calendar-days li {
    display: inline-block;
    width: 14%;
    margin-top: 6px;
  }

  .calendar-days li.calendar-days--disabled {
    color: #e0e0e0;
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.3;
  }

  li.selected-first {
    background-color: #e3f0ed;
    border-top-left-radius: 95px;
    border-bottom-left-radius: 80px;
  }

  li.selected-second {
    background-color: #e3f0ed;
    border-top-right-radius: 60px;
    border-bottom-right-radius: 60px;
  }

</style>