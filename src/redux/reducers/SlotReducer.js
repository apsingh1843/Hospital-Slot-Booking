//import Data from "../../components/shared/data";
import { GET_SLOTS, SLOTS_LOADING, SLOTS_FAIL } from '../actions/ActionTypes';

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
    default:
      return state;
  }
}
export default SlotReducer;
