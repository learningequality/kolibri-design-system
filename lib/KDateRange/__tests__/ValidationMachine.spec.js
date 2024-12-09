import { createActor } from 'xstate';
import validationConstants from '../validationConstants';
import { validationMachine, initialContext } from '../ValidationMachine';

// Create a date that will be valid for all tests
const today = new Date();
const lastAllowedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const firstAllowedDate = new Date(2022, 0, 1);

const currentContext = {
  startDate: '2022-01-09',
  endDate: '2022-01-10',
  lastAllowedDate,
  firstAllowedDate,
};

describe('Validation Machine', () => {
  let validateActor;

  beforeEach(() => {
    // Initialize with null dates first
    validateActor = createActor(validationMachine, {
      input: {
        ...initialContext,
        lastAllowedDate,
        firstAllowedDate
      }
    }).start();

    // Then send the actual dates
    validateActor.send({
      type: 'REVALIDATE',
      startDate: currentContext.startDate,
      endDate: currentContext.endDate
    });
  });

  afterEach(() => {
    validateActor.stop();
  });

  it('validation machine should be in success state when given correct props', () => {
    const snapshot = validateActor.getSnapshot();
    expect(snapshot.value).toEqual('success');
  });

  it('returns startDateInvalid error message when start date is malformed', () => {
    validateActor.send({
      type: 'REVALIDATE',
      startDate: 'aaaaaaa',
      endDate: currentContext.endDate
    });
    const snapshot = validateActor.getSnapshot();
    expect(snapshot.value).toEqual('failure');
    expect(snapshot.context.startDateInvalid).toEqual(validationConstants.MALFORMED);
    expect(snapshot.context.endDateInvalid).toBeFalsy();
  });

  it('returns endDateInvalid error message when end date is malformed', () => {
    validateActor.send({
      type: 'REVALIDATE',
      startDate: currentContext.startDate,
      endDate: 'aaaaaaa'
    });
    const snapshot = validateActor.getSnapshot();
    expect(snapshot.value).toEqual('failure');
    expect(snapshot.context.endDateInvalid).toEqual(validationConstants.MALFORMED);
    expect(snapshot.context.startDateInvalid).toBeFalsy();
  });

  it('returns startDateInvalid error message when end date is before start date', () => {
    validateActor.send({
      type: 'REVALIDATE',
      startDate: '2022-01-09',
      endDate: '2022-01-06'
    });
    const snapshot = validateActor.getSnapshot();
    expect(snapshot.value).toEqual('failure');
    expect(snapshot.context.startDateInvalid).toEqual(
      validationConstants.START_DATE_AFTER_END_DATE
    );
    expect(snapshot.context.endDateInvalid).toBeFalsy();
  });

  it('returns startDateInvalid error message when start date is before the first allowed date and endDateInvalid error message when end date is malformed', () => {
    validateActor.send({
      type: 'REVALIDATE',
      startDate: '2019-01-12',
      endDate: 'aaaaaa'
    });
    const snapshot = validateActor.getSnapshot();
    expect(snapshot.value).toEqual('failure');
    expect(snapshot.context.startDateInvalid).toEqual(
      validationConstants.DATE_BEFORE_FIRST_ALLOWED
    );
    expect(snapshot.context.endDateInvalid).toEqual(validationConstants.MALFORMED);
  });

  it('returns endDateInvalid error message when end date is before first allowed and startDateInvalid error message when start date is malformed', () => {
    validateActor.send({
      type: 'REVALIDATE',
      startDate: 'invalid',
      endDate: '2019-01-06'
    });
    const snapshot = validateActor.getSnapshot();
    expect(snapshot.value).toEqual('failure');
    expect(snapshot.context.startDateInvalid).toEqual(validationConstants.MALFORMED);
    expect(snapshot.context.endDateInvalid).toEqual(
      validationConstants.DATE_BEFORE_FIRST_ALLOWED
    );
  });

  it('validation in success state after revalidating with correct props', () => {
    validateActor.send({
      type: 'REVALIDATE',
      startDate: currentContext.startDate,
      endDate: currentContext.endDate
    });
    const snapshot = validateActor.getSnapshot();
    expect(snapshot.value).toEqual('success');
    expect(snapshot.context.startDateInvalid).toBeFalsy();
    expect(snapshot.context.endDateInvalid).toBeFalsy();
  });
});