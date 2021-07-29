import { GET_ERROR_MSG, GET_SUCCESS_MSG, CLEAR_MSG } from './ActionTypes';

export const returnErrorMsg = (msg, msgType) => {
  return {
    type: GET_ERROR_MSG,
    payload: {msg, msgType}
  };
};

export const returnSuccessMsg = (msg, msgType) => {
  return {
    type: GET_SUCCESS_MSG,
    payload: {msg, msgType}
  };
};

export const clearMsg = () => {
  return {
    type: CLEAR_MSG,
  };
};
