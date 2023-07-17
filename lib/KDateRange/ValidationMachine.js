import { createMachine, assign } from 'xstate';
import { isAfter, startOfDay, isBefore } from 'date-fns';
import validationConstants from './validationConstants';

/**
 * @params dateStr - The input date string value
 *  Returns if the given prop is equal to the placeholder
 **/
function isPlaceholder(dateStr) {
  return dateStr === null;
}

/**
 * @params dateStr - The input date string value
 *  Returns if the given prop matches the constant dateFormat RegExp pattern
 **/
const isCorrectFormat = dateStr => {
  return dateFormat.test(dateStr) || dateStr === null;
};

/**
 * @params startDate - input start date value
 * @params endDate - input end date value
 * Returns if the end date is after the start date
 **/
const isEndDateAfterStart = (startDate, endDate) => {
  if (startDate && endDate != null) {
    const [startYear, startMonth, startDay] = startDate.split('-');
    const newStartDate = startOfDay(new Date(startYear, startMonth - 1, startDay));

    const [endYear, endMonth, endDay] = endDate.split('-');
    const newEndDate = startOfDay(new Date(endYear, endMonth - 1, endDay));
    return isAfter(newStartDate, newEndDate);
  }
};

/**
 * @params dateStr - The input date string value
 * @params lastAllowedDate - date passed to context object that contrains dateStr to before this date
 * Returns if the given date string is after the last allowed date
 **/
const isDateAfterLastAllowed = (dateStr, lastAllowedDate) => {
  if (!isPlaceholder(dateStr)) {
    const [year, month, day] = dateStr.split('-');
    const newDate = startOfDay(new Date(year, month - 1, day));
    return isAfter(newDate, lastAllowedDate);
  }
};

/**
 * @params dateStr - The input date string value
 * @params firstAllowedDate - date passed to context object that contrains dateStr to after this date
 * Returns if the given date string is before the first allowed date
 **/
const isDateBeforeFirstAllowed = (dateStr, firstAllowedDate) => {
  if (!isPlaceholder(dateStr)) {
    const [year, month, day] = dateStr.split('-');
    const newDate = startOfDay(new Date(year, month - 1, day));
    return isBefore(newDate, firstAllowedDate);
  }
};

/**
 * @params context - A context object from the state machine
 * @returns { startDateInvalid, endDataInvalid }
 **/
export const validate = ({ startDate, endDate, firstAllowedDate, lastAllowedDate }) => {
  const validatedContext = { startDateInvalid: false, endDateInvalid: false };
  if (!isCorrectFormat(startDate)) {
    validatedContext.startDateInvalid = validationConstants.MALFORMED;
  }
  if (!isCorrectFormat(endDate)) {
    validatedContext.endDateInvalid = validationConstants.MALFORMED;
  }
  if (isEndDateAfterStart(startDate, endDate)) {
    validatedContext.startDateInvalid = validationConstants.START_DATE_AFTER_END_DATE;
  }
  if (isDateAfterLastAllowed(startDate, lastAllowedDate)) {
    validatedContext.startDateInvalid = validationConstants.FUTURE_DATE;
  }
  if (isDateBeforeFirstAllowed(startDate, firstAllowedDate)) {
    validatedContext.startDateInvalid = validationConstants.DATE_BEFORE_FIRST_ALLOWED;
  }
  if (isDateAfterLastAllowed(endDate, lastAllowedDate)) {
    validatedContext.endDateInvalid = validationConstants.FUTURE_DATE;
  }
  if (isDateBeforeFirstAllowed(endDate, firstAllowedDate)) {
    validatedContext.endDateInvalid = validationConstants.DATE_BEFORE_FIRST_ALLOWED;
  }
  return validatedContext;
};

/* eslint-disable no-useless-escape */
const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

export const initialContext = {
  startDate: null,
  endDate: null,
  startDateInvalid: false,
  endDateInvalid: false,
  errorText: null,
  lastAllowedDate: null,
  firstAllowedDate: null,
};

export const validationMachine = createMachine({
  predictableActionArguments: true,
  id: 'fetch',
  initial: 'placeholder',
  context: initialContext,
  states: {
    placeholder: {
      always: [
        {
          cond: context => isPlaceholder(context.startDate) && isPlaceholder(context.endDate),
          target: 'success',
          actions: assign({
            startDateInvalid: false,
            endDateInvalid: false,
          }),
        },
        {
          target: 'validation',
          actions: assign(context => validate(context)),
        },
      ],
    },
    validation: {
      always: [
        {
          cond: context => context.startDateInvalid || context.endDateInvalid,
          target: 'failure',
        },
        {
          target: 'success',
          actions: assign({
            startDateInvalid: false,
            endDateInvalid: false,
          }),
        },
      ],
    },

    success: {
      on: {
        REVALIDATE: {
          target: 'placeholder',
          actions: assign((_, event) => {
            return { ...event, startDateInvalid: false, endDateInvalid: false };
          }),
        },
      },
    },
    failure: {
      on: {
        REVALIDATE: {
          target: 'placeholder',
          actions: assign((_, event) => {
            return { ...event, startDateInvalid: false, endDateInvalid: false };
          }),
        },
      },
    },
  },
});
