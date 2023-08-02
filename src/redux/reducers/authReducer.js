import { USER_LOG_IN, USER_LOG_OUT } from "../actionTypes/authActionTypes";

const initialState = {
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOG_IN: {
      return {
        ...state,
        isLoggedIn: true,
      };
    }

    case USER_LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
