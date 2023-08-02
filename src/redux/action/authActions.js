import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { USER_LOG_IN, USER_LOG_OUT } from "../actionTypes/authActionTypes";
import store from "../store";

export const handleUserRegistration = async (userData) => {
  const { email, password } = userData;

  try {
    const signUpRes = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ); // Create user in firebase with new email and password

    return signUpRes;
  } catch (e) {
    throw e.code;
  }
};

export const handleUserLogin = async (userData) => {
  const { email, password } = userData;
  try {
    const logInRes = await signInWithEmailAndPassword(auth, email, password);
    // Verify user with given credentials in firebase

    if (logInRes.user) {
      store.dispatch({
        type: USER_LOG_IN,
      }); // Dispatch redux function of login
    }

    return logInRes;
  } catch (e) {
    throw e.code;
  }
};

export const handleUserLogout = async () => {
  try {
    store.dispatch({
      type: USER_LOG_OUT,
    }); // Dispatch redux function of logout

    window.location = "/";
  } catch (e) {
    throw e.code;
  }
};
