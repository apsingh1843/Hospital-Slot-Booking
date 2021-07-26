import { GET_SLOTS, SLOTS_LOADING, SLOTS_FAIL } from '../actions/ActionTypes';
import axios from 'axios';
//import { returnErrors } from './errorActions';

const server = "http://127.0.0.1:8000"

export const getSlots = () => dispatch => {
  dispatch(setSlotsLoading());
  //const token = localStorage.getItem('token');
  axios.get(`${server}/api/slots/`)
  .then(res => {
    dispatch({
      type: GET_SLOTS,
      payload: res.data
    })}
  )
  .catch(error =>{
    console.log(error.response);
    dispatch({type: SLOTS_FAIL});
  });
};

export const setSlotsLoading = () => {
  return {
    type: SLOTS_LOADING
  };
};
