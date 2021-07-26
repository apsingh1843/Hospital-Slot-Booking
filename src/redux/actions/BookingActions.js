import { GET_BOOKINGS, BOOKINGS_LOADING, BOOKINGS_FAIL } from '../actions/ActionTypes';
import axios from 'axios';
//import { returnErrors } from './errorActions';

const server = "http://127.0.0.1:8000"

export const getBookings = () => dispatch => {
  dispatch(setBookingsLoading());
  //const token = localStorage.getItem('token');
  axios.get(`${server}/api/bookings/`)
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
