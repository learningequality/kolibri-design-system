import { before } from 'lodash';
import { interpret } from 'xstate';
import validationConstants from '../validationConstants';
import { validationMachine, initialContext, validate } from '../ValidationMachine';


const currentContext = {
    startDate: '01/09/2022',
    endDate: '01/10/2022',
    lastAllowedDate: new Date(),
    firstAllowedDate: new Date(2022,0,1),
}
describe('Validation Machine', () => {
    let validateService;
    beforeAll(()=> {
        validateService = interpret(
            validationMachine.withContext({ ...initialContext, ...currentContext })
        );
        validateService.start();
    })

    it('validation machine should be in success state when given correct props', async () => {
        expect(validateService._state.value).toEqual('success');
    })

    it('returns startDateInvalid error message when start date is malformed', async () => {
        validateService.send('REVALIDATE', {startDate: 'aaaaaaa'});
        expect(validateService._state.value).toEqual('failure');
        expect(validateService._state.context.startDateInvalid).toEqual(validationConstants.MALFORMED);
        expect(validateService._state.context.endDateInvalid).toBeFalsy();
    })

    it('returns endDateInvalid error message when end date is malformed', async () => {
        validateService.send('REVALIDATE', {startDate: '01/09/2022', endDate: 'aaaaaaa'});
        expect(validateService._state.value).toEqual('failure');
        expect(validateService._state.context.endDateInvalid).toEqual(validationConstants.MALFORMED);
        expect(validateService._state.context.startDateInvalid).toBeFalsy();
    })

    it('returns startDateInvalid error message when end date is before start date', async () => {
        validateService.send('REVALIDATE', {startDate: '01/09/2022', endDate: '01/06/2022'});
        expect(validateService._state.value).toEqual('failure');
        expect(validateService._state.context.startDateInvalid).toEqual(validationConstants.START_DATE_AFTER_END_DATE);
        expect(validateService._state.context.endDateInvalid).toBeFalsy();
    })

    it('returns startDateInvalid error message when start date is before the first allowed date and endDateInvalid error message when end date is malformed', async () => {
        validateService.send('REVALIDATE', {startDate: '01/12/2019', endDate: 'aaaaaa'});
        expect(validateService._state.value).toEqual('failure');
        expect(validateService._state.context.startDateInvalid).toEqual(validationConstants.DATE_BEFORE_FIRST_ALLOWED);
        expect(validateService._state.context.endDateInvalid).toEqual(validationConstants.MALFORMED);
    })

    it('returns endDateInvalid error message when end date is before first allowed and startDateInvalid error message when start date is malformed', async () => {
        validateService.send('REVALIDATE', {startDate: 'invalid', endDate: '01/06/2019'});
        expect(validateService._state.value).toEqual('failure');
        expect(validateService._state.context.startDateInvalid).toEqual(validationConstants.MALFORMED);
        expect(validateService._state.context.endDateInvalid).toEqual(validationConstants.DATE_BEFORE_FIRST_ALLOWED);
    })

    it('validation in success state after revalidating with correct props', async () => {
        validateService.send('REVALIDATE', currentContext);
        expect(validateService._state.value).toEqual('success');
        expect(validateService._state.context.startDateInvalid).toBeFalsy();
        expect(validateService._state.context.endDateInvalid).toBeFalsy();
    })

});
