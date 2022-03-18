import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
  firebase: firebase,
  auth: auth,
};
