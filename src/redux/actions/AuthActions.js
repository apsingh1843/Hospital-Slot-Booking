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
//import { returnErrors } from './errorActions';
//import { requestVerify } from './verifyActions';

const auth_server = "http://127.0.0.1:8000/api/auth"

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

  dispatch({type: USER_LOADING});

  axios.post(`${auth_server}/register/`, body, config)
    .then(res => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data
      });
    })
    .catch(error =>{
      //dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({type: SIGNUP_FAIL});
    });
};

//login user
// export const loginUser = ({email, phone, password}) => (dispatch) => {
//   //headers
//   const config={
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }
//   //request body
//   const body = JSON.stringify({email, phone, password});
//   dispatch({type: USER_LOADING});
//
//   axios.post('https://testapi.etark.in/buszs/login', body, config)
//     .then(res => {
//       dispatch({
//       type: SIGNIN_SUCCESS,
//       payload: res.data
//       });
//     })
//     .catch(error =>{
//       dispatch(returnErrors(error.response.data, error.response.status, 'SIGNIN_FAIL'));
//       dispatch({type: SIGNIN_FAIL});
//     });
// };
//

//logout user
export const logoutUser = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};
