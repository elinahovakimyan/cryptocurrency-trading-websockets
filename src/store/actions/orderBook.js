import { INCREMENT_PRECISION, DECREMENT_PRECISION, ADD_ORDERS } from '../actionTypes';

export const incrementPrecision = () => ({
  type: INCREMENT_PRECISION,
});

export const decrementPrecision = () => ({
  type: DECREMENT_PRECISION,
});

export const addOrders = (newOrders) => ({
  type: ADD_ORDERS,
  payload: newOrders,
});
