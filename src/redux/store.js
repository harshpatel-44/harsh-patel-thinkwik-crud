import { combineReducers, createStore } from "redux";
import auth from "./reducers/authReducer";
import books from "./reducers/booksReducer";

const rootReducer = combineReducers({ auth, books });
const store = createStore(rootReducer);

export default store;
