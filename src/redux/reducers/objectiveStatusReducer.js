const objectiveStatusReducer = (state=[], action) => {
    if(action.type === 'SET_FINISHED_OBJECTIVES'){
        return action.payload;
    } else{
        return state;
    }
}

export default objectiveStatusReducer;