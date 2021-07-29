import { GET_SLOTS, SLOTS_LOADING, SLOTS_FAIL, CREATE_SLOTS } from '../actions/ActionTypes';

const initialState = {
  isLoading: false,
  slots: [],
}

const SlotReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_SLOTS:
      return {
        ...state,
        slots: action.payload,
        isLoading: false,
      };
    case SLOTS_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case SLOTS_FAIL:
      return {
        ...state,
        slots: [],
        isLoading: false,
      }
    case CREATE_SLOTS:
      return {
        ...state,
        slots: [...state.slots, action.payload],
      }
    default:
      return state;
  }
}
export default SlotReducer;
