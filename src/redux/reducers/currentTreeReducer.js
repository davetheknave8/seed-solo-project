const currentTreeReducer = (state=[], action) => {
    if(action.type === 'SET_CURRENT_TREE'){
        return action.payload;
    } else{
        return state;
    }
}

export default currentTreeReducer;