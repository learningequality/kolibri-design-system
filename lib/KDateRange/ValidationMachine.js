import { setup, assign } from 'xstate';
import { isAfter, startOfDay, isBefore } from 'date-fns';
import validationConstants from './validationConstants';

/**
 * @params dateStr - The input date string value
 *  Returns if the given prop is equal to the placeholder
 **/
function isPlaceholder(dateStr) {
  return dateStr === null || dateStr === undefined;
}

/**
 * @params dateStr - The input date string value
 *  Returns if the given prop matches the constant dateFormat RegExp pattern
 **/
const isCorrectFormat = dateStr => {
  if (isPlaceholder(dateStr)) return true;
  return dateFormat.test(dateStr);
};

/**
 * @params startDate - input start date value
 * @params endDate - input end date value
 * Returns if the end date is after the start date
 **/
const isEndDateAfterStart = (startDate, endDate) => {
  if (isPlaceholder(startDate) || isPlaceholder(endDate)) {
    return false;
  }

  try {
    const [startYear, startMonth, startDay] = startDate.split('-');
    const newStartDate = startOfDay(new Date(startYear, startMonth - 1, startDay));

    const [endYear, endMonth, endDay] = endDate.split('-');
    const newEndDate = startOfDay(new Date(endYear, endMonth - 1, endDay));
    return isAfter(newStartDate, newEndDate);
  } catch (e) {
    return false;
  }
};

/**
 * @params dateStr - The input date string value
 * @params lastAllowedDate - date passed to context object that contrains dateStr to before this date
 * Returns if the given date string is after the last allowed date
 **/
const isDateAfterLastAllowed = (dateStr, lastAllowedDate) => {
  if (isPlaceholder(dateStr) || !lastAllowedDate) {
    return false;
  }

  try {
    const [year, month, day] = dateStr.split('-');
    const newDate = startOfDay(new Date(year, month - 1, day));
    return isAfter(newDate, lastAllowedDate);
  } catch (e) {
    return false;
  }
};

/**
 * @params dateStr - The input date string value
 * @params firstAllowedDate - date passed to context object that contrains dateStr to after this date
 * Returns if the given date string is before the first allowed date
 **/
const isDateBeforeFirstAllowed = (dateStr, firstAllowedDate) => {
  if (isPlaceholder(dateStr) || !firstAllowedDate) {
    return false;
  }

  try {
    const [year, month, day] = dateStr.split('-');
    const newDate = startOfDay(new Date(year, month - 1, day));
    return isBefore(newDate, firstAllowedDate);
  } catch (e) {
    return false;
  }
};

/**
 * @params context - A context object from the state machine
 * @returns { startDateInvalid, endDataInvalid }
 **/
export const validate = ({ startDate, endDate, firstAllowedDate, lastAllowedDate }) => {
  const validatedContext = { startDateInvalid: false, endDateInvalid: false };

  // Check format first
  if (!isCorrectFormat(startDate)) {
    validatedContext.startDateInvalid = validationConstants.MALFORMED;
  }
  if (!isCorrectFormat(endDate)) {
    validatedContext.endDateInvalid = validationConstants.MALFORMED;
  }

  // Only continue with other validations if format is correct
  if (!validatedContext.startDateInvalid && !validatedContext.endDateInvalid) {
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

export const validationMachine = setup({
  id: 'fetch',
  actions: {
    clearValidation: assign({
      startDateInvalid: false,
      endDateInvalid: false,
    }),
    validateDates: assign(context => validate(context)),
    updateDates: assign((context, event) => ({
      ...context,
      ...event,
      startDateInvalid: false,
      endDateInvalid: false,
    })),
  },
  guards: {
    areDatesPlaceholders: context =>
      isPlaceholder(context.startDate) && isPlaceholder(context.endDate),
    hasValidationErrors: context =>
      Boolean(context.startDateInvalid) || Boolean(context.endDateInvalid),
  },
}).createMachine({
  id: 'dateValidation',
  initial: 'placeholder',
  context: initialContext,
  states: {
    placeholder: {
      always: [
        {
          guard: 'areDatesPlaceholders',
          target: 'success',
          actions: 'clearValidation',
        },
        {
          target: 'validation',
          actions: 'validateDates',
        },
      ],
    },
    validation: {
      always: [
        {
          guard: 'hasValidationErrors',
          target: 'failure',
        },
        {
          target: 'success',
          actions: 'clearValidation',
        },
      ],
    },
    success: {
      on: {
        REVALIDATE: {
          target: 'placeholder',
          actions: 'updateDates',
        },
      },
    },
    failure: {
      on: {
        REVALIDATE: {
          target: 'placeholder',
          actions: 'updateDates',
        },
      },
    },
  },
});
