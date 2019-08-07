const lessonStatusReducer = (state=[], action) => {
    if(action.type === 'SET_LESSON_STATUS'){
        return action.payload;
    } else{
        return state;
    }
}

export default lessonStatusReducer;