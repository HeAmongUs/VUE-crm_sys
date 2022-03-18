import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlugin from "./utils/message.plugin";

import "./registerServiceWorker";
import "materialize-css";

import { onAuthStateChanged } from "firebase/auth";
import firebase from "./firebase";

let app;
onAuthStateChanged(firebase.auth, () => {
  if (!app) {
    app = createApp(App);
    app.use(messagePlugin).use(store).use(router).mount("#app");
  }
});
