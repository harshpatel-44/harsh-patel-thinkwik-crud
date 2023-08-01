import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { USER_LOG_IN, USER_LOG_OUT } from "../actionTypes/authentication";
import store from "../store";

export const handleUserRegistration = async (userData) => {
  const { email, password } = userData;

  try {
    const signUpRes = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return signUpRes;
  } catch (e) {
    throw e.code;
  }
};

export const handleUserLogin = async (userData) => {
  const { email, password } = userData;
  try {
    const logInRes = await signInWithEmailAndPassword(auth, email, password);

    if (logInRes.user) {
      store.dispatch({
        type: USER_LOG_IN,
      });
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
    });
    window.location = "/";
  } catch (e) {
    throw e.code;
  }
};
