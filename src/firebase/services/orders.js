import { nanoid } from "nanoid";
import { doc, setDoc, Timestamp } from "firebase/firestore";

import { db } from "../firebase.config";

export const addOrder = async (order) => {
  const id = nanoid(5);
  const docRef = doc(db, "orders", id);

  try {
    const result = await setDoc(docRef, {
      ...order,
      id,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    })
      .then(() => {
        return { status: true, description: "successful" };
      })
      .catch((error) => {
        return error.code;
      });

    return result;
  } catch (error) {
    return error;
  }
};
