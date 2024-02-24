import { signOut, signInWithPopup } from "firebase/auth";

import { auth, providerGoogle } from "../../firebase/firebase.config";

export const authSignUpProvider = async () => {
  try {
    const result = await signInWithPopup(auth, providerGoogle)
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

export const authSignOutUser = async () => {
  try {
    const result = await signOut(auth)
      .then(() => {
        return { status: true, description: "successful" };
      })
      .catch((error) => {
        return error.code;
      });

    return result;
  } catch (error) {
    console.log(error);
  }
};
