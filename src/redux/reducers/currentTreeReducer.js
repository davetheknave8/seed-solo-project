const currentTreeReducer = (state={subcategory: []}, action) => {
    if(action.type === 'SET_CURRENT_TREE'){
        return action.payload[0];
    } else{
        return state;
    }
}

export default currentTreeReducer;