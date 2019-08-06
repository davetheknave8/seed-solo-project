const treesReducer = (state = [{subject: ''}], action) => {
    if(action.type === 'SET_TREES'){
        return action.payload;
    }
    else{
        return state;
    }
}

export default treesReducer;