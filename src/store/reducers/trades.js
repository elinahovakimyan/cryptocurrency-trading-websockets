import { ADD_TRADES } from '../actionTypes';

const initialState = {
  trades: [],
};

const getLimitedTrades = (newTrades, state) => {
  const trades = [
    ...newTrades,
    ...state.trades,
  ].slice(0, 20);

  return trades;
};

const tradesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRADES:
      return {
        ...state,
        trades: getLimitedTrades(action.payload, state),
      };

    default:
      return state;
  }
};

export default tradesReducer;
