import axios from 'axios';
import {
  USER_LOADING,
  USER_LOADED,
  SIGNIN_FAIL,
  SIGNIN_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR
} from './ActionTypes';
import { returnErrorMsg } from './MsgActions';

//const auth_server = "http://127.0.0.1:8000/api/auth";
const auth_server = "https://hospital-backend-api.herokuapp.com/api/auth";

export const configToken = (getState) =>{
  const token = getState().auth.token;

  const config={
    headers: {
      'Content-Type': 'application/json',
    }
  }
  if(token){
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
}

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  dispatch({type: USER_LOADING});

  axios.get(`${auth_server}/user/`, configToken(getState))
    .then(res =>{
      console.log(res.data);
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    })
    .catch(error =>{
      //dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({type: AUTH_ERROR});
    });
}

//register user
export const registerUser = ({username, email, password}) => (dispatch) => {

  const config={
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({username, email, password});
  console.log(body);

  dispatch({type: USER_LOADING});

  axios.post(`${auth_server}/register/`, body, config)
    .then(res => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data
      });
    })
    .catch(error =>{
      console.log(error.response);
      dispatch({type: SIGNUP_FAIL});
      dispatch(returnErrorMsg(error.response.data.msg, "Could not create account.Please try again with valid details."));
    });
};

//login user
export const loginUser = ({username, password}) => (dispatch) => {
  dispatch({type: USER_LOADING});

  const config={
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({username, password});

  axios.post(`${auth_server}/signin/`, body, config)
    .then(res => {
      dispatch({
      type: SIGNIN_SUCCESS,
      payload: res.data
      });
    })
    .catch(error =>{
      console.log(error.response)
      dispatch({type: SIGNIN_FAIL});
      //dispatch(returnErrorMsg(error.response.data.msg, "Could not Login."));
    });
};


//logout user
export const logoutUser = () => (dispatch, getState) => {
  axios.post(`${auth_server}/logout/`, null, configToken(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch(error =>{
      console.log(error.response);
    });
};
