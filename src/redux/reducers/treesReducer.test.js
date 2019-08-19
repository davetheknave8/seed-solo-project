import treesReducer from './treesReducer';

describe('testing treesReducer', () => {
    test('reducer will return an array with an object with property subject with an empty string with no action', () => {
        const action = {}
        const state = treesReducer(undefined, action)
        expect(state).toEqual([{subject: ''}]);
    })
    test('reducer will return an array of object with action SET_TREES', () => {
        const action = {type: 'SET_TREES', payload: [{tree: 'one'}, {tree: 'two'}]}
        const returnedState = treesReducer(undefined, action);
        expect(returnedState.length).toBe(2);
    })
})