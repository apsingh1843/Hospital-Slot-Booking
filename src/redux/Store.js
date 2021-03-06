import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './reducers/RootReducer';

const initialState = {};
const middleware = [thunk];

const store = createStore(RootReducer, initialState, compose(
  applyMiddleware(...middleware),
));

export default store;

//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
