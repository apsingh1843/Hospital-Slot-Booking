import { GET_BOOKINGS, BOOKINGS_LOADING, BOOKINGS_FAIL } from '../actions/ActionTypes';

const initialState = {
  isLoading: false,
  bookings: [],
}

const BookingReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
        isLoading: false,
      };
    case BOOKINGS_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case BOOKINGS_FAIL:
      return {
        ...state,
        bookings: [],
        isLoading: false,
      }
    default:
      return state;
  }
}
export default BookingReducer;
