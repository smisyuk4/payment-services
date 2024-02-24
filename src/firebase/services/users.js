import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  providerGoogle,
  providerFacebook,
} from "../../firebase/firebase.config";

export const authSignUpUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return error.code;
    }
  };

export const authSignUpProvider = (value) => async () => {
  const provider = value === "google" ? providerGoogle : providerFacebook;
  try {
    const result = await signInWithPopup(auth, provider)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    return result;
  } catch (error) {
    return error;
  }
};

export const authLoginProvider = (value) => async () => {
  const provider = value === "google" ? providerGoogle : providerFacebook;
  try {
    const result = await signInWithPopup(auth, provider)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    return result;
  } catch (error) {
    return error;
  }
};

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return error.code;
    }
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, async (user) => {});
};

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    const result = await signOut(auth)
      .then(() => {})
      .catch((error) => {
        return error.code;
      });

    return result;
  } catch (error) {
    console.log(error);
  }
};
