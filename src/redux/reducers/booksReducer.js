import { DUMMY_BOOKS_DATA } from "../../data/DUMMY_BOOKS_DATA";
import {
  ADD_BOOK,
  REMOVE_BOOK,
  UPDATE_BOOK,
} from "../actionTypes/booksActionTypes";

const initialState = { booksData: [...DUMMY_BOOKS_DATA] };

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK: {
      return {
        ...state,
      };
    }
    case REMOVE_BOOK: {
      return {
        ...state,
      };
    }
    case UPDATE_BOOK: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default booksReducer;
