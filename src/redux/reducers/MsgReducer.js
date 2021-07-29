import { GET_ERROR_MSG, GET_SUCCESS_MSG, CLEAR_MSG } from '../actions/ActionTypes';

const initialState = {
  errorMsg: null,
  successMsg: null,
  msgType: null,
}

const MsgReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_ERROR_MSG:
      return {
        successMsg: null,
        msgType: action.payload.msgType,
        errorMsg: action.payload.msg,
      };
    case GET_SUCCESS_MSG:
      return {
        successMsg: action.payload.msg,
        msgType: action.payload.msgType,
        errorMsg: null,
      };
    case CLEAR_MSG:
      return {
        errorMsg: null,
        msgType: "",
        successMsg: null,
      };
    default:
      return state;
  }
}
export default MsgReducer;
