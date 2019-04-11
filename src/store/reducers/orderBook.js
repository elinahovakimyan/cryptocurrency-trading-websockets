import { ADD_ORDERS, INCREMENT_PRECISION, DECREMENT_PRECISION } from '../actionTypes';
import { sortByPrice } from '../../core/helpers';

const initialState = {
  precision: 0,
  orderAsks: [],
  orderBids: [],
};

const getCategorizedOrders = (orders, state) => {
  const newBids = orders.filter(order => order.amount > 0);
  const newAsks = orders.filter(order => order.amount < 0);

  const orderBids = [
    ...newBids,
    ...state.orderBids,
  ].slice(0, 20);
  const orderAsks = [
    ...newAsks,
    ...state.orderAsks,
  ].slice(0, 20);

  return {
    orderBids: sortByPrice(orderBids, -1),
    orderAsks: sortByPrice(orderAsks, 1),
  };
};

const orderBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDERS:
      return {
        ...state,
        ...getCategorizedOrders(action.payload, state),
      };
    case INCREMENT_PRECISION:
      return {
        ...state,
        precision: state.precision + 1,
      };
    case DECREMENT_PRECISION:
      return {
        ...state,
        precision: state.precision - 1,
      };

    default:
      return state;
  }
};

export default orderBookReducer;
