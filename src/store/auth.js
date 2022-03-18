import firebase from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      console.log(dispatch, commit);
      try {
        await signInWithEmailAndPassword(firebase.auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
