import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebase = initializeApp({
  apiKey: "AIzaSyCptGtDyQMKMZ1Ee2THaxd8VW2HOanCTik",
  authDomain: "vuejs-crm-proj.firebaseapp.com",
  projectId: "vuejs-crm-proj",
  storageBucket: "vuejs-crm-proj.appspot.com",
  messagingSenderId: "919015328841",
  appId: "1:919015328841:web:653b2fa035a176821b4398",
  measurementId: "G-GGH9R37SE9",
});

const auth = getAuth(firebase);
export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      console.log(dispatch, commit);
      try {
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
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
