import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import treesReducer from './treesReducer';
import lessonsReducer from './lessonsReducer';
import lessonStatusReducer from './lessonStatusReducer';
import recentTreeReducer from './recentTreeReducer';
import currentTreeReducer from './currentTreeReducer';
import currentLessonReducer from './currentLessonReducer';
import searchReducer from './searchReducer';
import currentObjectivesReducer from './currentObjectivesReducer';
import objectiveStatusReducer from './objectiveStatusReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  treesReducer,
  lessonsReducer,
  lessonStatusReducer,
  recentTreeReducer,
  currentTreeReducer,
  currentLessonReducer,
  searchReducer,
  currentObjectivesReducer,
  objectiveStatusReducer
});

export default rootReducer;
