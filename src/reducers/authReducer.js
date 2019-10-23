import { LOGIN, LOGOUT, GET_USER_DATA, LOADING } from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  loading: false
};
const extractUserData = data => {
  const { uid, email, name, currency } = data.payload;
  return { uid, email, name, currency };
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
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
        loading: action.payload
      };
    case LOGOUT:
      return {
        isAuthenticated: false,
        loading: false
      };
    case GET_USER_DATA:
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducer;
