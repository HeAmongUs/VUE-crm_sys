import firebase from "@/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ref, set } from "firebase/database";

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      console.log(dispatch, commit);
      await signInWithEmailAndPassword(firebase.auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("sign-in by", user.email);
        })
        .catch((error) => {
          commit("setError", error);
          throw error;
        });
    },
    async register({ dispatch, commit }, { email, password, name }) {
      console.log(dispatch, commit);
      await createUserWithEmailAndPassword(firebase.auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          set(ref(firebase.database, `users/${user.uid}/info`), {
            username: name,
            email: email,
            bill: 10000,
          });
          console.log("sign-up by", user.email, name);
        })
        .catch((error) => {
          commit("setError", error);
          throw error;
        });
    },
    async logout({ commit }) {
      await signOut(firebase.auth)
        .then(() => {
          console.log("Sign-out successful.");
        })
        .catch((error) => {
          console.log(error);
        });
      commit("clearInfo");
    },
    getUid() {
      const user = firebase.auth.currentUser;
      return user ? user.uid : null;
    },
  },
};
