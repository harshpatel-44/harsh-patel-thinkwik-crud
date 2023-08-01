import { combineReducers, createStore } from "redux";
import auth from "./reducers/authReducer";

const rootReducer = combineReducers({ auth });
const store = createStore(rootReducer);

export default store;
