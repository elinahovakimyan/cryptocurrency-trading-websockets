import { ADD_TRADES } from '../actionTypes';

export const addTrades = (newTrades) => ({
  type: ADD_TRADES,
  payload: newTrades,
});
