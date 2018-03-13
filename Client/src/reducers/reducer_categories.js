import { FETCH_CATEGORIES } from '../actions/index';

const INITIAL_STATE = { all: [], blog: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { ...state, all: action.payload.data }
    default:
      return state;
  }
}
