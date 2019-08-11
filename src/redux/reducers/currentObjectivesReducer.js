const currentObjectivesReducer = (state=[], action) => {
    if(action.type === 'SET_OBJECTIVES'){
        return action.payload;
    } else {
        return state;
    }
}

export default currentObjectivesReducer;