import { Types } from './action';

const INITIAL_STATE = {
  items: [],
  error: '',
};

export default function profiles(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_PROFILES_SUCCESS: {
      return {
        ...state,
        items: action.payload.items,
      };
    }
    case Types.PROFILES_ERROR: {
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
