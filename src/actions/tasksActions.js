import {
  TOGGLE_TASK_STATUS,
  DELETE_TASK,
  LOADING,
  EDIT_TASK,
  SET_TASK_LIST
} from './actionTypes';
import { getErrors, finishedLoading } from './authActions';
export const getCurrentTaskList = (firebase, uid) => {
  let currentTaskList;
  firebase
    .task(uid)
    .once('value', taskList => (currentTaskList = taskList.val()));
  return currentTaskList || [];
};
export const addNewTask = async (dispatch, firebase, uid, newTask) => {
  dispatch(isLoading());
  let currentTaskList = getCurrentTaskList(firebase, uid);
  const updatedTaskList = [
    ...currentTaskList,
    { ...newTask, id: `${Date.now()}0${currentTaskList.length + 1}` }
  ];
  firebase.task(uid).set(updatedTaskList);
  dispatch(finishedLoading());
};
export const editTask = (dispatch, firebase, uid, taskId, data, history) => {
  dispatch(isLoading());
  let currentTaskList = getCurrentTaskList(firebase, uid);
  const taskIndex = currentTaskList.findIndex(item => item.id === taskId);
  dispatch({ type: EDIT_TASK, payload: { taskId, data } });
  currentTaskList[taskIndex] = {
    ...currentTaskList[taskIndex],
    ...data
  };
  firebase.task(uid).set(currentTaskList);
  dispatch(finishedLoading());
  history.push('/dashboard');
};
export const ToggleTaskStatus = async (dispatch, firebase, uid, taskId) => {
  dispatch(isLoading());
  let currentTaskList = getCurrentTaskList(firebase, uid);
  const taskIndex = currentTaskList.findIndex(item => item.id === taskId);
  currentTaskList[taskIndex] = {
    ...currentTaskList[taskIndex],
    completed: !currentTaskList[taskIndex].completed
  };
  console.log(currentTaskList);
  await firebase.task(uid).set(currentTaskList);
  dispatch({
    type: TOGGLE_TASK_STATUS,
    payload: currentTaskList
  });
  dispatch(finishedLoading());
};
export const deleteTask = (dispatch, firebase, uid, taskId) => {
  dispatch(isLoading());
  dispatch({ type: DELETE_TASK });
  let currentTaskList = getCurrentTaskList(firebase, uid);
  let updatedList = currentTaskList.filter(item => item.id !== taskId);
  console.log(updatedList);
  firebase.task(uid).set(updatedList);

  // dispatch({ type: DELETE_TASK, payload: taskId });
  dispatch(finishedLoading());
};
export const isLoading = (loading = true) => ({
  type: LOADING,
  payload: loading
});

export const setTaskList = async (dispatch, firebase, uid) => {
  try {
    dispatch(isLoading());
    firebase
      .task(uid)
      .on('value', snapshot =>
        dispatch({ type: SET_TASK_LIST, payload: snapshot.val() })
      );
  } catch (error) {
    console.log(error);
    dispatch(getErrors(error));
  } finally {
    dispatch(finishedLoading());
  }
};
