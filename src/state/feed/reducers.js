import { Types } from './action';

const INITIAL_STATE = {
  items: [],
  error: '',
};

export default function feeds(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_FEEDS_SUCCESS: {
      return {
        ...state,
        items: action.payload.items,
      };
    }
    case Types.FEEDS_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
}
