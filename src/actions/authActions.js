import {
  LOGOUT,
  SET_USER_DATA,
  CLEAR_USER_DATA,
  GET_ERRORS,
  CLEAR_ERRORS,
  LOADING,
  FINISHED_LOADING
} from './actionTypes';
import { LANDING } from '../constant/routes';
export const signUp = async (firebase, dispatch, userData) => {
  try {
    const { email, password } = userData;
    const userAuth = await firebase.createUserWithEmailAndPassword(
      email,
      password
    );
    const { uid } = extractEmailAndId(userAuth);
    dispatch(setUserData({ email, uid }));
    firebase.user(uid).set({ email: email });
    const list = [{}];
    firebase.task(uid).set(list);
  } catch (error) {
    return dispatch(getErrors(error));
  }
};

export const signIn = async (firebase, dispatch, userData) => {
  try {
    const { email, password } = userData;
    const userAuth = await firebase.signInWithEmailAndPassword(email, password);
    dispatch(setUserData(userAuth));
  } catch (error) {
    return dispatch(getErrors(error));
  }
};
export const setCurrentUser = (dispatch, userAuth) => {
  const { email, uid } = userAuth;
  dispatch(isLoading());
  dispatch(setUserData({ email, uid }));
  dispatch(finishedLoading());
};

export const getErrors = error => ({
  type: GET_ERRORS,
  payload: error
});
export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const logOut = async (dispatch, firebase, history) => {
  try {
    dispatch(isLoading());
    await firebase.signOut();
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_USER_DATA });
  } catch (error) {
    getErrors(error);
  } finally {
    dispatch(finishedLoading);
    history.push(LANDING);
  }
};
export const isLoading = (loading = true) => ({
  type: LOADING,
  payload: loading
});
export const finishedLoading = () => ({
  type: FINISHED_LOADING,
  payload: false
});

export const setUserData = data => {
  return {
    type: SET_USER_DATA,
    payload: data
  };
};
const extractEmailAndId = ({ user }) => ({
  email: user.email,
  uid: user.uid
});
