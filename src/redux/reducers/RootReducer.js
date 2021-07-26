import { combineReducers } from 'redux';
import SlotReducer from './SlotReducer';
import BookingReducer from './BookingReducer';
import AuthReducer from './AuthReducer';
import MsgReducer from './MsgReducer';
//import InternalReducer from './internalReducer';

export default combineReducers({
  slots: SlotReducer,
  bookings: BookingReducer,
  auth: AuthReducer,
  msg: MsgReducer,
});
