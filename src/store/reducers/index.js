// @flow

import { combineReducers } from 'redux';

import wsReducer from './ws';
import orderBookReducer from './orderBook';
import tradesReducer from './trades';

const rootReducer = combineReducers({
  ws: wsReducer,
  orderBook: orderBookReducer,
  trades: tradesReducer,
});

export default rootReducer;
