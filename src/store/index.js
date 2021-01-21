import { createStore, combineReducers } from 'redux';
import app from './App';
import product from './Products';
import order from './Orders';

const rootReducer = combineReducers({
  app,
  product,
  order
});

const store = createStore(rootReducer);

export default store;