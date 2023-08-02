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
      // Action payload is new book data
      return {
        ...state,
        booksData: [...state.booksData, action.payload],
        //Add new book data in previous bookslist data
      };
    }

    case REMOVE_BOOK: {
      // Action payload is remove book id
      const filteredData = state.booksData?.filter(
        (book) => book.id !== action.payload
      );
      //Remove selected book data from bookslist data

      return {
        ...state,
        booksData: [...filteredData],
      };
    }

    case UPDATE_BOOK: {
      // Action payload is update data of selected book
      const updatedData = state.booksData?.map((book) => {
        if (book.id === action.payload.id) {
          return { ...action.payload };
        } else {
          return { ...book };
        }
      });
      //Update books data with new book data in bookslist

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
