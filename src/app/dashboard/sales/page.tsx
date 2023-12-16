"use client";
import { appFirebase } from "@/services/firebase/config";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect } from "react";

export default function Sales() {
  const auth = getAuth(appFirebase);

  useEffect(() => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(
          auth,
          "tfragata.dev@gmail.com",
          "qweE123#",
        );
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }, []);

  return (
    <div>
      <h1>Vendas</h1>
    </div>
  );
}
