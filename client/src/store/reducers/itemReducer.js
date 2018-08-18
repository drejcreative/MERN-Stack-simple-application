import {
  GET_ITEMS,
  ADD_ITEMS,
  DELETE_ITEMS,
  ITEMS_LOADING,
  ITEMS_LOADING_STOP
} from '../actions/types';

const initialState = {
  items: [],
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      }
    case ADD_ITEMS:
      return {
        ...state,
        items: [action.payload, ...state.items],
        loading: false
      }
    case DELETE_ITEMS:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        loading: false
      }
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }
      case ITEMS_LOADING_STOP:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}