import {
  ADD_BOOK,
  REMOVE_BOOK,
  UPDATE_BOOK,
} from "../actionTypes/booksActionTypes";
import store from "../store";

export const handleAddBook = async (bookData) => {
  try {
    store.dispatch({
      type: ADD_BOOK,
      payload: bookData,
    });
    //Dispatch Add book in book reducer
  } catch (e) {
    throw e;
  }
};

export const handleRemoveBook = async (bookId) => {
  try {
    store.dispatch({
      type: REMOVE_BOOK,
      payload: bookId,
    });
    //Dispatch remove book in book reducer
  } catch (e) {
    throw e;
  }
};

export const handleUpdateBookData = async (newBookData) => {
  try {
    store.dispatch({
      type: UPDATE_BOOK,
      payload: newBookData,
    });
    //Dispatch update book in book reducer
  } catch (e) {
    throw e;
  }
};
