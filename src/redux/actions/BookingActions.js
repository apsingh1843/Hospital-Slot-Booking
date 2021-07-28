import {
  GET_BOOKINGS,
  BOOKINGS_LOADING,
  BOOKINGS_FAIL,
  GET_SUCCESS_MSG,
  GET_ERROR_MSG
} from '../actions/ActionTypes';
import axios from 'axios';
//import { returnErrors } from './errorActions';

const server = "http://127.0.0.1:8000"

export const getBookings = () => dispatch => {
  dispatch(setBookingsLoading());

  const token = localStorage.getItem('token');

  const config={
    headers: {
      'Content-Type': 'application/json',
    }
  }
  if(token){
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios.get(`${server}/api/bookings/`,config)
  .then(res => {
    console.log(res.data);
    dispatch({
      type: GET_BOOKINGS,
      payload: res.data
    })}
  )
  .catch(error =>{
    console.log(error.response);
    dispatch({type: BOOKINGS_FAIL});
  });
};

export const setBookingsLoading = () => {
  return {
    type: BOOKINGS_LOADING
  };
};

export const createBooking = (booking) => dispatch => {

  const token = localStorage.getItem('token');

  const body = JSON.stringify(booking);

  const config={
    headers: {
      'Content-Type': 'application/json',
    }
  }
  if(token){
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios.post(`${server}/api/bookings/`, body, config)
  .then(res => {
    console.log(res.data);
  })
  .catch(error =>{
    console.log(error.response);
  });
};
