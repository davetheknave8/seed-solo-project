const recentTreeReducer = (state = {}, action) => {
    if(action.type === 'SET_RECENT_TREE'){
        return action.payload;
    } else{
        return state;
    }
}

export default recentTreeReducer;