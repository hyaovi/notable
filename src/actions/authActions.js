import {
  LOGIN,
  LOGOUT,
  GET_USER_DATA,
  GET_ERRORS,
  CLEAR_ERRORS,
  LOADING
} from './actionTypes';

export const signIn = userData => {
  localStorage.setItem('userData', JSON.stringify(userData));
  return { type: LOGIN, payload: userData };
};
export const setCurrentUser = () => dispatch => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  console.log(userData);
  dispatch({ type: LOGIN, payload: userData });
  dispatch(isLoading(false));
};
export const userAuth = dispatch => {
  dispatch({ type: LOGIN });
};

export const getErrors = error => ({
  type: GET_ERRORS,
  payload: error
});
export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const logOut = () => {
  localStorage.removeItem('userData');
  return { type: LOGOUT };
};
export const isLoading = (loading = true) => ({
  type: LOADING,
  payload: loading
});

export const setUserData = transactions => {
  return {
    type: GET_USER_DATA,
    payload: transactions
  };
};
