import {
  ADD_NEW_TASK,
  TOGGLE_TASK_STATUS,
  DELETE_TASK,
  EDIT_TASK
} from '../actions/actionTypes';

const initialState = {
  list: []
};

const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_NEW_TASK: {
      const updatedList = [
        ...state.list,
        { ...payload, id: `0${state.list.length + 1}` }
      ];
      return {
        ...state,
        list: updatedList
      };
    }
    case TOGGLE_TASK_STATUS: {
      let tasksList = state.list;
      const taskIndex = tasksList.findIndex(item => item.id === payload);
      tasksList[taskIndex] = {
        ...tasksList[taskIndex],
        completed: !tasksList[taskIndex].completed
      };
      return { ...state, list: tasksList };
    }
    case EDIT_TASK: {
      const { taskId, data } = payload;
      let tasksList = state.list;
      const taskIndex = tasksList.findIndex(item => item.id === taskId);
      tasksList[taskIndex] = {
        ...tasksList[taskIndex],
        ...data
      };
      return { ...state, list: tasksList };
    }
    case DELETE_TASK: {
      let updatedList = state.list.filter(item => item.id !== payload);
      return { ...state, list: updatedList };
    }
    default:
      return state;
  }
};

export default taskReducer;
