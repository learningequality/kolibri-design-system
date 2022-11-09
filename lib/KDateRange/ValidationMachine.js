import { createMachine, assign } from 'xstate';
import isAfter from 'date-fns/is_after';
import startOfDay from 'date-fns/start_of_day';
import isBefore from 'date-fns/is_before';
import format from 'date-fns/format';
import get from 'lodash/get';

const isPlaceholder = context => {
  return context.dateStr === 'DD/MM/YYYY';
};

const isCorrectFormat = ({ dateStr }) => {
  return dateFormat.test(dateStr);
};

const isComparisonDateAfter = ({ dateStr, comparisonDate }) => {
  const [day, month, year] = dateStr.split('/');
  const newDate = startOfDay(new Date(year, month - 1, day));
  return isAfter(newDate, comparisonDate);
};

const isDateAfterLastAllowed = ({ dateStr, lastAllowedDate }) => {
  const [day, month, year] = dateStr.split('/');
  const newDate = startOfDay(new Date(year, month - 1, day));
  return isAfter(newDate, lastAllowedDate);
};

const isDateBeforeFirstAllowed = ({ dateStr, firstAllowedDate }) => {
  const [day, month, year] = dateStr.split('/');
  const newDate = startOfDay(new Date(year, month - 1, day));
  return isBefore(newDate, firstAllowedDate);
};

const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

export const validationMachine = createMachine({
  id: 'fetch',
  initial: 'placeholder',
  context: {
    dateStr: 'DD/MM/YYYY',
    errorText: null,
    comparisonDate: null,
    lastAllowedDate: null,
    firstAllowedDate: null,
  },
  states: {
    placeholder: {
      always: [
        {
          cond: isPlaceholder,
          target: 'success',
        },
        {
          target: 'validation',
        },
      ],
    },
    validation: {
      always: [
        {
          cond: isCorrectFormat,
          target: 'comparisonDateOrderValidation',
        },
        {
          target: 'failure',
          actions: assign({
            errorText: () => 'Please enter a valid date',
          }),
        },
      ],
    },
    comparisonDateOrderValidation: {
      always: [
        {
          cond: context => !context.comparisonDate,
          target: 'lastDateAllowedValidation',
        },
        {
          cond: isComparisonDateAfter,
          target: 'lastDateAllowedValidation',
        },
        {
          target: 'failure',
          actions: assign({
            errorText: () => 'Start date cannot be after end date',
          }),
        },
      ],
    },
    lastDateAllowedValidation: {
      always: [
        {
          cond: isDateAfterLastAllowed,
          target: 'firstDateAllowedValidation',
        },
        {
          target: 'failure',
          actions: assign({
            errorText: () => 'Cannot select a future date',
          }),
        },
      ],
    },

    firstDateAllowedValidation: {
      always: [
        {
          cond: isDateBeforeFirstAllowed,
          target: 'success',
        },
        {
          target: 'failure',
          actions: assign({
            errorText: context =>
              'Date must be after ' + format(context.firstAllowed, 'DD/MM/YYYY'),
          }),
        },
      ],
    },

    success: {
      on: {
        REVALIDATE: {
          target: 'placeholder',
          actions: assign((_, event) => {
            console.log(event);
            return { ...event };
          }),
        },
      },
    },
    failure: {
      on: {
        REVALIDATE: {
          target: 'placeholder',
          actions: assign((_, event) => {
            console.log(event);
            return { ...event };
          }),
        },
      },
    },
  },
});
