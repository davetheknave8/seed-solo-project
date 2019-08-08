const currentLessonReducer = (state={}, action) => {
    if (action.type === 'SET_CURRENT_LESSON'){
        return action.payload;
    } else{
        return state;
    }
}

export default currentLessonReducer;