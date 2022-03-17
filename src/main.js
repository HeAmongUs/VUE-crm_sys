import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlugin from "@/utils/message.plugin";

import "./registerServiceWorker";
import "materialize-css";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
  } else {
    console.log("UnAuth");
  }
});

const app = createApp(App);
app.use(messagePlugin).use(store).use(router).mount("#app");
