import { GET_ERROR_MSG, GET_SUCCESS_MSG, CLEAR_MSG } from './ActionTypes';

export const returnErrorMsg = (msg, status) => {
  return {
    type: GET_ERROR_MSG,
    payload: {msg, status}
  };
};

export const returnSuccessMsg = (msg, status) => {
  return {
    type: GET_SUCCESS_MSG,
    payload: {msg, status}
  };
};

export const clearMsg = () => {
  return {
    type: CLEAR_MSG,
  };
};
