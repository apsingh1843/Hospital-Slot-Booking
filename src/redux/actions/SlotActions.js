import { GET_SLOTS, SLOTS_LOADING, SLOTS_FAIL, CREATE_SLOTS } from './ActionTypes';
import axios from 'axios';
import { configToken } from './AuthActions';
//import { returnErrors } from './errorActions';

//const server = "http://127.0.0.1:8000";
const server = "https://hospital-backend-api.herokuapp.com";

export const getSlots = () => (dispatch, getState) => {
  dispatch(setSlotsLoading());

  axios.get(`${server}/api/slots/`, configToken(getState))
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

export const createSlots = ({name, startTime, endTime}) => (dispatch, getState) => {

  const body = JSON.stringify({name, startTime, endTime});

  axios.post(`${server}/api/slots/`, body, configToken(getState))
  .then(res => {
    dispatch({
      type: CREATE_SLOTS,
      payload: res.data
    })}
  )
  .catch(error =>{
    console.log(error.response);
    //dispatch({type: SLOTS_FAIL});
  });
};

//activate slots
export const activateSlots = (id) => (dispatch, getState) =>{
  const slotId = id;
  const body = JSON.stringify({slotId});

  axios.post(`${server}/api/activate/`, body, configToken(getState))
  .then(res => {
    console.log(res.data);
    dispatch(getSlots());
  })
  .catch(error =>{
    console.log(error.response);
  });
};

//deactivate SlotsSerializer
export const deactivateSlots = (id) => (dispatch, getState) =>{
  const slotId = id;
  const body = JSON.stringify({slotId});

  axios.post(`${server}/api/deactivate/`, body, configToken(getState))
  .then(res => {
    console.log(res.data);
    dispatch(getSlots());
  })
  .catch(error =>{
    console.log(error.response);
  });
};
