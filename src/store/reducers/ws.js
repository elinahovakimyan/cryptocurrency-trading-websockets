import { UPDATE_WS_STATE } from '../actionTypes';
import { WS_STATE } from '../../core/constants';

const initialState = {
  wsState: WS_STATE.DISCONNECTED,
};

const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WS_STATE:
      return {
        ...state,
        wsState: action.payload,
      };

    default:
      return state;
  }
};

export default wsReducer;
