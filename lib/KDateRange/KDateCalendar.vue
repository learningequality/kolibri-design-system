<template>

  <div class="calendar">
    <div class="calendar-buttons">
      <KIconButton
        tooltip="Previous Month"
        icon="chevronLeft"
        appearance="flat-button"
        class="left"
        size="mini"
        @click="goPrevMonth"
      />
      <KIconButton
        tooltip="Next Month"
        icon="chevronRight"
        appearance="flat-button"
        class="right"
        size="mini"
        @click="goNextMonth"
      />
    </div>
    <div class="calendar-wrap">
      <div class="calendar-month-left">
        <div class="months-text">
          {{ monthsLocale[activeMonth] + ' ' + activeYearStart }}
        </div>
        <ul v-for="weekindex in 6" :key="weekindex" class="calendar-days">
          <li
            v-for="dayinweekindex in numOfDays"
            :key="dayinweekindex"
            :class="[{ 'calendar-days--disabled': isDateDisabled(weekindex, dayinweekindex, activeMonthDay, activeMonthDate) || isDateDisabledLeft(weekindex, dayinweekindex, activeMonthDay),
                       'selected': isDateSelected(weekindex, dayinweekindex, 'first', activeMonthDay, activeMonthDate) }]"
            @click="selectFirstItem(weekindex, dayinweekindex)"
          >
            <KDateDay
              :day="getDayCell(weekindex, dayinweekindex, activeMonthDay, activeMonthDate)"
              :isSelected="isDateSelected(weekindex, dayinweekindex, 'first', activeMonthDay, activeMonthDate)"
              :isInRange="isDateInRange(weekindex, dayinweekindex, 'first', activeMonthDay, activeMonthDate)"
              :isDisabled="isDateDisabled(weekindex, dayinweekindex, activeMonthDay, activeMonthDate) || isDateDisabledLeft(weekindex, dayinweekindex, activeMonthDay)"
              :isLastDay="isLastDay(weekindex, dayinweekindex, activeMonthDay, activeMonthDate)"
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
            :class="[{ 'calendar-days--disabled': isDateDisabled(weekindex, dayinweekindex, nextActiveMonthDay, nextActiveMonthDate) || isDateDisabledRight(weekindex, dayinweekindex, nextActiveMonthDay) }]"
            @click="selectSecondItem(weekindex, dayinweekindex)"
          >
            <KDateDay
              :day="getDayCell(weekindex, dayinweekindex, nextActiveMonthDay, nextActiveMonthDate)"
              :isSelected="isDateSelected(weekindex, dayinweekindex, 'second', nextActiveMonthDay, nextActiveMonthDate)"
              :isInRange="isDateInRange(weekindex, dayinweekindex, 'second', nextActiveMonthDay, nextActiveMonthDate)"
              :isDisabled="isDateDisabled(weekindex, dayinweekindex, nextActiveMonthDay, nextActiveMonthDate) || isDateDisabledRight(weekindex, dayinweekindex, nextActiveMonthDay)"
              :isLastDay="isLastDay(weekindex, dayinweekindex, nextActiveMonthDay, nextActiveMonthDate)"
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
  import parse from 'date-fns/parse';
  import startOfDay from 'date-fns/start_of_day';
  import isWithinRange from 'date-fns/is_within_range';
  import KIconButton from '/Users/lharris/kolibri-design-system/lib/buttons-and-links/KIconButton.vue';
  import KDateDay from '/Users/lharris/kolibri-design-system/lib/KDateRange/KDateDay.vue';

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
      // constrains the selection to after this date, disabling dates prior
      firstAllowedDate: {
        type: Date,
      },
      // constrains date selection to before this date, disabling dates after
      lastAllowedDate: {
        type: Date,
        // default: new Date(),
      },
      // default value of start date
      selectedStartDate: {
        type: Date,
      },
      // default value of end date
      selectedEndDate: {
        type: Date,
        // default: new Date(),
      },
    },
    data() {
      return {
        dateRange: {
          start: this.selectedStartDate ? this.selectedStartDate : null,
        },
        numOfDays: 7,
        isFirstChoice: this.selectedStartDate ? false : true,
        activeMonth: new Date().getMonth() - 1,
        activeYearStart: new Date().getFullYear(),
        activeYearEnd: new Date().getFullYear(),
      };
    },
    computed: {
      // returns the month names
      monthsLocale() {
        return months;
      },
      // returns the day of week of the beginning of the left side calendar month
      activeMonthDay() {
        return new Date(this.activeYearStart, this.activeMonth, 1).getDay();
      },
      // returns the day of week of the beginnning of the right side month
      nextActiveMonthDay() {
        return new Date(this.activeYearEnd, this.nextActiveMonth, 1).getDay();
      },
      // returns the date of the month of the end of the left side calendar month
      activeMonthDate() {
        return new Date(this.activeYearEnd, this.nextActiveMonth, 0).getDate();
      },
      // returns the date of the month of the end of the right side calendar month
      nextActiveMonthDate() {
        return new Date(this.activeYearEnd, this.activeMonth + 2, 0).getDate();
      },
      // returns the next month that will display after current active month
      nextActiveMonth() {
        return this.activeMonth >= 11 ? 0 : this.activeMonth + 1;
      },
    },
    watch: {
      // updates to the year based on nextActiveMonth changes
      nextActiveMonth(value) {
        if (value === 0) this.activeYearEnd = this.activeYearStart + 1;
      },
    },
    created() {
      // if the activeMonth is December, change year
      if (this.activeMonth === 11) this.activeYearEnd = this.activeYearStart + 1;
    },
    methods: {
      // find the index number within month of where day should be placed
      getDayIndexInMonth(weekindex, dayinweekindex, activeMonthDay) {
        const date = this.numOfDays * (weekindex - 1) + dayinweekindex;
        return date - activeMonthDay;
      },
      // find date cell of where day should be placed
      getDayCell(weekindex, dayinweekindex, activeMonthDay, activeMonthDate) {
        const result = this.getDayIndexInMonth(weekindex, dayinweekindex, activeMonthDay);
        // bound by > 0 and < last day of month
        return result > 0 && result <= activeMonthDate ? result : null;
      },
      // update end and start date of dateRangeObject
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
          this.selectedStartDate = resultDate;
          return { start: resultDate };
        }

        // toggle first choice
        this.isFirstChoice = !this.isFirstChoice;
        if (key === 'start') {
          this.selectedStartDate = resultDate;
        } else {
          this.selectedEndDate = resultDate;
        }
        newData[key] = resultDate;
        return newData;
      },
      // when a user selects the first item on the calendar
      selectFirstItem(weekindex, dayinweekindex) {
        const result = this.getDayIndexInMonth(weekindex, dayinweekindex, this.activeMonthDay);
        this.dateRange = Object.assign(
          {},
          this.dateRange,
          this.getNewDateRange(result, this.activeMonth, this.activeYearStart)
        );
        this.$emit('updateSelectedDates', this.dateRange);
      },
      // when a user selects the seccond item on the calendar
      selectSecondItem(weekindex, dayinweekindex) {
        const result = this.getDayIndexInMonth(weekindex, dayinweekindex, this.nextActiveMonthDay);
        this.dateRange = Object.assign(
          {},
          this.dateRange,
          this.getNewDateRange(result, this.nextActiveMonth, this.activeYearEnd)
        );
        this.$emit('updateSelectedDates', this.dateRange);
      },
      // returns true for the first and last selected dates in date range
      isDateSelected(weekindex, dayinweekindex, key, activeMonthDay, activeMonthDate) {
        const result = this.getDayIndexInMonth(weekindex, dayinweekindex, activeMonthDay);
        if (result < 1 || result > activeMonthDate) return false;

        let currDate = null;
        if (key === 'first') {
          currDate = new Date(this.activeYearStart, this.activeMonth, result);
        } else {
          currDate = new Date(this.activeYearEnd, this.nextActiveMonth, result);
        }
        return (
          (this.selectedStartDate &&
            format(this.selectedStartDate, 'DD/MM/YYYY') === format(currDate, 'DD/MM/YYYY')) ||
          (this.selectedEndDate &&
            format(this.selectedEndDate, 'DD/MM/YYYY') === format(currDate, 'DD/MM/YYYY'))
        );
      },
      // returns true for the dates in between start and end date range
      isDateInRange(weekindex, dayinweekindex, key, activeMonthDay, activeMonthDate) {
        const result = this.getDayIndexInMonth(weekindex, dayinweekindex, activeMonthDay);
        if (result < 1 || result > activeMonthDate) return false;

        let currDate = null;
        if (key === 'first') {
          currDate = new Date(this.activeYearStart, this.activeMonth, result);
        } else {
          currDate = new Date(this.activeYearEnd, this.nextActiveMonth, result);
        }
        return (
          this.selectedStartDate &&
          this.selectedEndDate &&
          isWithinRange(currDate, this.selectedStartDate, this.selectedEndDate)
        );
      },
      isDateDisabled(weekindex, dayinweekindex, activeMonthDay, activeMonthDate) {
        const result = this.getDayIndexInMonth(weekindex, dayinweekindex, activeMonthDay);
        // bound by > 0 and < last day of month
        return !(result > 0 && result <= activeMonthDate);
      },
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
      isLastDay(weekindex, dayinweekindex, nextActiveMonthDay, nextActiveMonthDate) {
        const result = this.getDayCell(
          weekindex,
          dayinweekindex,
          nextActiveMonthDay,
          nextActiveMonthDate
        );
        var LastDay = new Date(this.activeYearStart, this.activeMonth + 1, 0).getDate();
        return result === LastDay;
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
    },
  };

</script>


<style lang="css" scoped>

  .description {
    padding: 6px;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    color: #3a3a3a;
  }

  .date-inputs {
    display: inline-block;
    margin-left: -5px;
    text-decoration-color: #616161;
  }

  #left-input {
    float: left;
  }

  #right-input {
    float: right;
  }

  .calendar-buttons {
    display: flex;
    justify-content: space-between;
  }

  .months-text {
    margin-top: -22px;
    margin-bottom: 10px;
    font-size: 0.99em;
    font-weight: 400;
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
    position: absolute;
    width: 420px;
    height: auto;
    margin-top: -20px;
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
    width: 47%;

    /* padding: 5px; */
  }

  .calendar-month-right {
    margin-left: 25px;
  }

  .calendar-days {
    padding: 0;
    margin: 0;
  }

  .calendar-days li {
    display: inline-block;
    width: 13.6%;
    line-height: 2.1em;
  }

  .calendar-days li.calendar-days--disabled {
    color: #e0e0e0;
    pointer-events: none;
    cursor: not-allowed;
  }

  .calendar-days li.selected {
    background-color: #e3f0ed;
  }

  /* ---------------------------------------------
                          DATE PICKER __ VISUALLY HIDDEN ITEMS
                        --------------------------------------------- */
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