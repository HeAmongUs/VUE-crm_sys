import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlugin from "./utils/message.plugin";
import tooltipDirective from "./directives/tooltip.directive";

import { onAuthStateChanged } from "firebase/auth";
import firebase from "./firebase";

import "./registerServiceWorker";
import "materialize-css";

import globalComponents from "@/components/Global";

let app;
onAuthStateChanged(firebase.auth, () => {
  if (!app) {
    app = createApp(App);
    globalComponents.forEach((component) => {
      app.component(component.name, component);
    });
    app.directive(tooltipDirective.name, tooltipDirective);
    app.use(messagePlugin).use(store).use(router).mount("#app");
  }
});
