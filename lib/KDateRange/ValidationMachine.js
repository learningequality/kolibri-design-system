import { createMachine, assign } from 'xstate';
import { isAfter, startOfDay, isBefore } from 'date-fns';
import validationConstants, { DATE_FMT } from './validationConstants';

/** Returns if the given prop is equal to the placeholder */
function isPlaceholder(dateStr) {
  return dateStr === DATE_FMT;
}

/** Returns if the given prop matches the constant dateFormat RegExp pattern */
const isCorrectFormat = dateStr => {
  return dateFormat.test(dateStr) || dateStr === DATE_FMT;
};

/** Returns if the end date is after the start date */
const isEndDateAfterStart = (startDate, endDate) => {
  const [startDay, startMonth, startYear] = startDate.split('/');
  const newStartDate = startOfDay(new Date(startYear, startMonth - 1, startDay));

  const [endDay, endMonth, endYear] = endDate.split('/');
  const newEndDate = startOfDay(new Date(endYear, endMonth - 1, endDay));
  return isAfter(newStartDate, newEndDate);
};

/** Returns if the given date string is after the last allowed date */
const isDateAfterLastAllowed = (dateStr, lastAllowedDate) => {
  const [day, month, year] = dateStr.split('/');
  const newDate = startOfDay(new Date(year, month - 1, day));
  return isAfter(newDate, lastAllowedDate);
};

/** Returns if the given date string is before the first allowed date */
const isDateBeforeFirstAllowed = (dateStr, firstAllowedDate) => {
  const [day, month, year] = dateStr.split('/');
  const newDate = startOfDay(new Date(year, month - 1, day));
  return isBefore(newDate, firstAllowedDate);
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
const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

export const initialContext = {
  startDate: DATE_FMT,
  endDate: DATE_FMT,
  startDateInvalid: false,
  endDateInvalid: false,
  errorText: null,
  lastAllowedDate: null,
  firstAllowedDate: null,
};

export const validationMachine = createMachine({
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
