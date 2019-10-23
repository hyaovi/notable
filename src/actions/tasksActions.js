import {
  ADD_NEW_TASK,
  TOGGLE_TASK_STATUS,
  DELETE_TASK,
  LOADING,
  EDIT_TASK
} from './actionTypes';

export const addNewTask = (dispatch, newTask) => {
  dispatch(isLoading());
  dispatch({ type: ADD_NEW_TASK, payload: newTask });
  dispatch(isLoading(false));
};
export const editTask = (dispatch, taskId, data, history) => {
  dispatch(isLoading());
  dispatch({ type: EDIT_TASK, payload: { taskId, data } });
  dispatch(isLoading(false));
  history.push('/dashboard');
};
export const ToggleTaskStatus = (dispatch, taskId) => {
  dispatch(isLoading());
  dispatch({ type: TOGGLE_TASK_STATUS, payload: taskId });
  dispatch(isLoading(false));
};
export const deleteTask = (dispatch, taskId) => {
  dispatch(isLoading());
  dispatch({ type: DELETE_TASK, payload: taskId });
  dispatch(isLoading(false));
};
export const isLoading = (loading = true) => ({
  type: LOADING,
  payload: loading
});
