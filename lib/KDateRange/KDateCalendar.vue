<template>

  <div class="calendar">
    <div class="calendar-wrap">
      <KIconButton
        :aria-label="previousMonthText"
        :tooltip="previousMonthText"
        icon="chevronLeft"
        appearance="flat-button"
        class="left"
        size="mini"
        @click="goPrevMonth"
      />
      <KIconButton
        :aria-label="nextMonthText"
        :tooltip="nextMonthText"
        icon="chevronRight"
        appearance="flat-button"
        class="right"
        size="mini"
        @click="goNextMonth"
      />
      <div class="calendar-month-left">
        <div class="months-text" data-test="previousMonth">
          {{ monthString(activeMonth) + ' ' + activeYearStart }}
        </div>
        <ul v-for="weekIndex in 6" :key="weekIndex" class="calendar-days">
          <li
            v-for="dayInWeekIndex in numOfDays"
            :key="dayInWeekIndex"
            :style="[
              (selectionOrder(weekIndex, dayInWeekIndex, 'first', activeMonthDay, activeMonthDate) === 'first') ||
                (selectionOrder(weekIndex, dayInWeekIndex, 'first', activeMonthDay, activeMonthDate) === 'second') ?
                  { backgroundColor: $themeBrand.primary.v_200 } : {}
            ]"
            :class="[{
              'calendar-days--disabled': isDateDisabled(weekIndex, dayInWeekIndex, activeMonthDay, activeMonthDate) || isDateDisabledLeft(weekIndex, dayInWeekIndex, activeMonthDay),
              'selected-first': ( selectionOrder(weekIndex, dayInWeekIndex, 'first', activeMonthDay, activeMonthDate) === 'first'),
              'selected-second': ( selectionOrder(weekIndex, dayInWeekIndex, 'first', activeMonthDay, activeMonthDate) === 'second'),
            }]"
            @click="selectFirstItem(weekIndex, dayInWeekIndex)"
          >
            <KDateDay
              :day="getDayCell(weekIndex, dayInWeekIndex, activeMonthDay, activeMonthDate)"
              :isSelected="isDateSelected(weekIndex, dayInWeekIndex, 'first', activeMonthDay, activeMonthDate)"
              :isInRange="isDateInRange(weekIndex, dayInWeekIndex, 'first', activeMonthDay, activeMonthDate)"
              :isDisabled="isDateDisabled(weekIndex, dayInWeekIndex, activeMonthDay, activeMonthDate) || isDateDisabledLeft(weekIndex, dayInWeekIndex, activeMonthDay)"
              :isLastDay="isLastDay(weekIndex, dayInWeekIndex, 'first', activeMonthDay, activeMonthDate)"
              :isEndOfWeek="dayInWeekIndex === 7"
              :isStartOfWeek="dayInWeekIndex === 1"
              :activeMonth="activeMonth"
            />
          </li>
        </ul>
      </div>
      <div class="calendar-month-right">
        <div class="months-text" data-test="currentMonth">
          {{ monthString(nextActiveMonth) + ' ' + activeYearEnd }}
        </div>
        <ul v-for="weekIndex in 6" :key="weekIndex" class="calendar-days">
          <li
            v-for="dayInWeekIndex in numOfDays"
            :key="dayInWeekIndex"
            :style="[
              (selectionOrder(weekIndex, dayInWeekIndex, 'second', nextActiveMonthDay, nextActiveMonthDate) === 'first') ||
                (selectionOrder(weekIndex, dayInWeekIndex, 'second', nextActiveMonthDay, nextActiveMonthDate) === 'second') ?
                  { backgroundColor: $themeBrand.primary.v_200 } : {}
            ]"
            :class="[{
              'calendar-days--disabled': isDateDisabled(weekIndex, dayInWeekIndex, nextActiveMonthDay, nextActiveMonthDate) || isDateDisabledRight(weekIndex, dayInWeekIndex, nextActiveMonthDay),
              'selected-first': (selectionOrder(weekIndex, dayInWeekIndex, 'second', nextActiveMonthDay, nextActiveMonthDate) === 'first'),
              'selected-second': (selectionOrder(weekIndex, dayInWeekIndex, 'second', nextActiveMonthDay, nextActiveMonthDate) === 'second')
            }]"
            @click="selectSecondItem(weekIndex, dayInWeekIndex)"
          >
            <KDateDay
              :day="getDayCell(weekIndex, dayInWeekIndex, nextActiveMonthDay, nextActiveMonthDate)"
              :isSelected="isDateSelected(weekIndex, dayInWeekIndex, 'second', nextActiveMonthDay, nextActiveMonthDate)"
              :isInRange="isDateInRange(weekIndex, dayInWeekIndex, 'second', nextActiveMonthDay, nextActiveMonthDate)"
              :isDisabled="isDateDisabled(weekIndex, dayInWeekIndex, nextActiveMonthDay, nextActiveMonthDate) || isDateDisabledRight(weekIndex, dayInWeekIndex, nextActiveMonthDay)"
              :isLastDay="isLastDay(weekIndex, dayInWeekIndex, 'second', nextActiveMonthDay, nextActiveMonthDate)"
              :isEndOfWeek="dayInWeekIndex === 7"
              :isStartOfWeek="dayInWeekIndex === 1"
              :activeMonth="nextActiveMonth"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>


<script>

  import { format, isAfter } from 'date-fns';
  import KIconButton from '../buttons-and-links/KIconButton';
  import KDateDay from './KDateDay';

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
        type: [Date, null],
        default: null,
      },
      /**
       * default value of selected end date
       */
      selectedEndDate: {
        type: [Date, null],
        default: null,
      },
      /**
       *  label for previous month button
       */
      previousMonthText: {
        type: String,
        required: true,
      },
      /**
       *  label for next month button
       */
      nextMonthText: {
        type: String,
        required: true,
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
        isFirstChoice: this.selectedStartDate == null ? true : false,
        activeMonth: new Date().getMonth() - 1 == -1 ? 11 : new Date().getMonth() - 1,
        activeYearStart: new Date().getFullYear(),
      };
    },
    computed: {
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
      activeYearEnd() {
        if (this.nextActiveMonth === 0) {
          return this.activeYearStart + 1;
        }
        return this.activeYearStart;
      },
    },
    created() {
      if (this.activeMonth === 11) this.activeYearStart = this.activeYearStart - 1;
    },
    methods: {
      /**
       * returns the index number within month of where day should be placed
       */
      getDayIndexInMonth(weekIndex, dayInWeekIndex, activeMonthDay) {
        const date = this.numOfDays * (weekIndex - 1) + dayInWeekIndex;
        return date - activeMonthDay;
      },
      /**
       * returns placement where day should be placed on calendar
       */
      getDayCell(weekIndex, dayInWeekIndex, activeMonthDay, activeMonthDate) {
        const result = this.getDayIndexInMonth(weekIndex, dayInWeekIndex, activeMonthDay);
        // bound by > 0 and < last day of month
        return result > 0 && result <= activeMonthDate ? result : null;
      },
      /**
       * update end and start date of dateRange Object
       */
      getNewDateRange(result, activeMonth, activeYear) {
        const resultDate = new Date(activeYear, activeMonth, result);
        if (!this.isFirstChoice && resultDate < this.dateRange.start) {
          this.isFirstChoice = false;
          return { start: resultDate };
        }
        const newData = {};
        let key = 'start';
        if (!this.isFirstChoice) {
          key = 'end';
        } else {
          newData.end = null;
        }
        // toggle first choice
        this.isFirstChoice = !this.isFirstChoice;
        newData[key] = resultDate;
        return newData;
      },
      selectFirstItem(weekIndex, dayInWeekIndex) {
        const result = this.getDayIndexInMonth(weekIndex, dayInWeekIndex, this.activeMonthDay);
        this.dateRange = Object.assign(
          {},
          this.dateRange,
          this.getNewDateRange(result, this.activeMonth, this.activeYearStart)
        );
        this.$emit('updateSelectedDates', this.dateRange);
      },
      selectSecondItem(weekIndex, dayInWeekIndex) {
        const result = this.getDayIndexInMonth(weekIndex, dayInWeekIndex, this.nextActiveMonthDay);
        this.dateRange = Object.assign(
          {},
          this.dateRange,
          this.getNewDateRange(result, this.nextActiveMonth, this.activeYearEnd)
        );
        this.$emit('updateSelectedDates', this.dateRange);
      },
      isDateSelected(weekIndex, dayInWeekIndex, key, activeMonthDay, activeMonthDate) {
        const result = this.getDayIndexInMonth(weekIndex, dayInWeekIndex, activeMonthDay);
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
      selectionOrder(weekIndex, dayInWeekIndex, key, activeMonthDay, activeMonthDate) {
        const result = this.getDayIndexInMonth(weekIndex, dayInWeekIndex, activeMonthDay);
        if (result < 1 || result > activeMonthDate) return false;
        var currDate = this.getDate(key, result);
        // the light colored background radius and direction order is based on these attributes
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
            !(dayInWeekIndex === 7)
          ) {
            return 'first';
          } else if (
            this.selectedEndDate &&
            format(this.selectedEndDate, 'DD/MM/YYYY') === format(currDate, 'DD/MM/YYYY') &&
            !(dayInWeekIndex === 1) &&
            !(result === 1)
          ) {
            return 'second';
          }
        } else {
          return '';
        }
      },
      isDateInRange(weekIndex, dayInWeekIndex, key, activeMonthDay, activeMonthDate) {
        const result = this.getDayIndexInMonth(weekIndex, dayInWeekIndex, activeMonthDay);
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
      isDateDisabled(weekIndex, dayInWeekIndex, activeMonthDay, activeMonthDate) {
        const result = this.getDayIndexInMonth(weekIndex, dayInWeekIndex, activeMonthDay);
        // bound by > 0 and < last day of month
        return !(result > 0 && result <= activeMonthDate);
      },
      /**
       * returns true for disabled dates before the firstAllowedDate; should be visible but grayed out
       */
      isDateDisabledLeft(weekIndex, dayInWeekIndex, activeMonthDay) {
        const result = this.getDayIndexInMonth(weekIndex, dayInWeekIndex, activeMonthDay);
        const currDate = new Date(this.activeYearStart, this.activeMonth, result);
        return currDate < this.firstAllowedDate || currDate > this.lastAllowedDate;
      },
      /**
       * returns true for disabled dates after the lastAllowedDate; should be visible but grayed out
       */
      isDateDisabledRight(weekIndex, dayInWeekIndex, activeMonthDay) {
        const result = this.getDayIndexInMonth(weekIndex, dayInWeekIndex, activeMonthDay);
        const currDate = new Date(this.activeYearStart, this.activeMonth + 1, result);
        return currDate < this.firstAllowedDate || currDate > this.lastAllowedDate;
      },
      /**
       * return true if date is last day of month for css border rounding
       */
      isLastDay(weekIndex, dayInWeekIndex, key, nextActiveMonthDay, nextActiveMonthDate) {
        const result = this.getDayCell(
          weekIndex,
          dayInWeekIndex,
          nextActiveMonthDay,
          nextActiveMonthDate
        );
        const lastDay =
          key === 'first'
            ? new Date(this.activeYearStart, this.activeMonth + 1, 0).getDate()
            : new Date(this.activeYearEnd, this.nextActiveMonth + 1, 0).getDate();
        return result === lastDay;
      },
      goPrevMonth() {
        const prevMonth = new Date(this.activeYearStart, this.activeMonth, 0);
        this.activeMonth = prevMonth.getMonth();
        this.activeYearStart = prevMonth.getFullYear();
      },
      goNextMonth() {
        const nextMonth = new Date(this.activeYearEnd, this.nextActiveMonth, 2);
        this.activeMonth = nextMonth.getMonth();
        this.activeYearStart = nextMonth.getFullYear();
      },
      isValidDate(date) {
        return !isNaN(new Date(date));
      },
      getDate(key, day) {
        const currDate =
          key === 'first'
            ? new Date(this.activeYearStart, this.activeMonth, day)
            : new Date(this.activeYearEnd, this.nextActiveMonth, day);
        return currDate;
      },
      /**
       * takes in index of month, returns string of month based on languagel/locale tag
       */
      monthString(monthIndex) {
        const date = new Date();
        date.setMonth(monthIndex);
        return this.$formatDate(date, { month: 'long' });
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
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.3;
  }

  li.selected-first {
    border-top-left-radius: 95px;
    border-bottom-left-radius: 80px;
  }

  li.selected-second {
    border-top-right-radius: 60px;
    border-bottom-right-radius: 60px;
  }

</style>