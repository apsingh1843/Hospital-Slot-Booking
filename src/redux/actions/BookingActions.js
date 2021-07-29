import {
  GET_BOOKINGS,
  BOOKINGS_LOADING,
  BOOKINGS_FAIL,
  GET_SUCCESS_MSG,
  GET_ERROR_MSG
} from '../actions/ActionTypes';
import axios from 'axios';
import { configToken } from './AuthActions';
import { returnErrorMsg, returnSuccessMsg } from './MsgActions';

const server = "http://127.0.0.1:8000"

// get user bookings
export const getBookings = () => (dispatch, getState) => {
  dispatch(setBookingsLoading());

  axios.get(`${server}/api/bookings/`,configToken(getState))
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


// create booking
export const createBooking = (booking) => (dispatch, getState) => {

  const body = JSON.stringify(booking);

  axios.post(`${server}/api/bookings/`, body, configToken(getState))
  .then(res => {
    console.log(res.data);
    dispatch(returnSuccessMsg(res.data.msg, "booking_created"))
  })
  .catch(error =>{
    console.log(error.response);
    dispatch(returnErrorMsg(error.response.data.msg, "Could not book slot. Please fill the details properly."))
  });
};


// request to cancel booking by user
export const handleRequestCancel = (data) => (dispatch, getState) => {
  const body = JSON.stringify(data);

  axios.post(`${server}/api/reqcancel/`, body, configToken(getState))
  .then(res => {
    console.log(res.data);
    dispatch(getBookings());
  })
  .catch(error =>{
    console.log(error.response);
  });
};


// response of staff
export const handleResponseCancel = (data) => (dispatch, getState) => {
  const body = JSON.stringify(data);

  axios.post(`${server}/api/rescancel/`, body, configToken(getState))
  .then(res => {
    console.log(res.data);
    dispatch(getBookings());
  })
  .catch(error =>{
    console.log(error.response);
  });
};


// mark as completed by staff
export const markCompleted = (data) => (dispatch, getState) => {
  const body = JSON.stringify(data);

  axios.post(`${server}/api/completed/`, body, configToken(getState))
  .then(res => {
    console.log(res.data);
    dispatch(getBookings());
  })
  .catch(error =>{
    console.log(error.response);
  });
};
