import {
  ADD_NEW_TASK,
  TOGGLE_TASK_STATUS,
  DELETE_TASK,
  EDIT_TASK,
  SET_TASK_LIST
} from '../actions/actionTypes';

const initialState = {
  list: []
};

const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TASK_LIST: {
      return { ...state, list: payload || [] };
    }
    case ADD_NEW_TASK: {
      return state;
    }
    case TOGGLE_TASK_STATUS: {
      return state;
    }
    case EDIT_TASK: {
      // const { taskId, data } = payload;
      // let tasksList = state.list;
      // const taskIndex = tasksList.findIndex(item => item.id === taskId);
      // tasksList[taskIndex] = {
      //   ...tasksList[taskIndex],
      //   ...data
      // };
      return state;
    }
    case DELETE_TASK: {
      return state;
    }
    default:
      return state;
  }
};

export default taskReducer;
