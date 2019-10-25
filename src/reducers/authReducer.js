import {
  LOGIN,
  LOGOUT,
  SET_USER_DATA,
  LOADING,
  FINISHED_LOADING,
  CLEAR_USER_DATA
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  loading: false
};
const extractUserData = data => {
  const { uid, email } = data;
  return { uid, email };
};
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      const info = extractUserData(action);
      return {
        ...state,
        isAuthenticated: true,
        ...info,
        loading: false
      };
    case LOADING:
      return {
        ...state,
        loading: payload
      };
    case FINISHED_LOADING:
      return {
        ...state,
        loading: payload
      };
    case LOGOUT:
      return {
        ...initialState,
        isAuthenticated: false
      };
    case CLEAR_USER_DATA:
      return {
        isAuthenticated: false
      };
    case SET_USER_DATA:
      return {
        ...state,
        isAuthenticated: true,
        ...payload,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducer;
