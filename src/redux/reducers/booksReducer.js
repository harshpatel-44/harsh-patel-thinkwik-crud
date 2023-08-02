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
        booksData: [...state.booksData, action.payload],
      };
    }
    case REMOVE_BOOK: {
      const filteredData = state.booksData?.filter(
        (book) => book.id !== action.payload
      );
      return {
        ...state,
        booksData: [...filteredData],
      };
    }
    case UPDATE_BOOK: {
      const updatedData = state.booksData?.map((book) => {
        if (book.id === action.payload.id) {
          return { ...action.payload };
        } else {
          return { ...book };
        }
      });

      return {
        ...state,
        booksData: [...updatedData],
      };
    }
    default:
      return state;
  }
};

export default booksReducer;
