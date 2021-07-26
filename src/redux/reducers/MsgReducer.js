import { GET_ERROR_MSG, GET_SUCCESS_MSG, CLEAR_MSG } from '../actions/ActionTypes';

const initialState = {
  errorMsg: {},
  successMsg: {},
  status: null,
}

const MsgReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_ERROR_MSG:
      return {
        successMsg: {},
        errorMsg: action.payload.msg,
        status: action.payload.status,
      };
    case GET_SUCCESS_MSG:
      return {
        successMsg: action.payload.msg,
        errorMsg: {},
        status: action.payload.status,
      };
    case CLEAR_MSG:
      return {
        errorMsg: {},
        successMsg: {},
        status: null,
      };
    default:
      return state;
  }
}
export default MsgReducer;
