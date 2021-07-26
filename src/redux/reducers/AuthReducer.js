import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  SIGNIN_FAIL,
  SIGNIN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  LOGOUT_SUCCESS,
  USER_LOGGEDIN,
  USER_NOT_LOGGEDIN
} from '../actions/ActionTypes';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
}

const AuthReducer = (state=initialState, action) => {
  switch (action.type) {
    case USER_LOGGEDIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case USER_NOT_LOGGEDIN:
      return {
        ...state,
        isAuthenticated: false,
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload
      };

    case SIGNIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return{
        ...state,
        ...action.payload,
        token: localStorage.getItem('token'),
        isLoading: false,
        isAuthenticated: true
      };

      case SIGNUP_SUCCESS:
      localStorage.setItem('token', action.payload.account.token);
        return{
          ...state,
          ...action.payload,
          token: localStorage.getItem('token'),
          isLoading: false,
          isAuthenticated: false
        };

    case SIGNUP_FAIL:
    case SIGNIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return{
        ...state,
        token: null,
        user: null,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
export default AuthReducer;
