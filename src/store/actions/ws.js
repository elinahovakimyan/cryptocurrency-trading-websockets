import { UPDATE_WS_STATE } from '../actionTypes';

export const updateWsState = (newStatus) => ({
  type: UPDATE_WS_STATE,
  payload: newStatus,
});
