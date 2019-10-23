import authReducer from './authReducer';
import errorReducer from './errorReducer';

import { combineReducers } from 'redux';
import taskReducer from './tasksReducer';

const rootReducer = combineReducers({
  user: authReducer,
  error: errorReducer,
  tasks: taskReducer
});

export default rootReducer;
