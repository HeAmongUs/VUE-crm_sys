import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlugin from "@/utils/message.plugin";

import "./registerServiceWorker";
import "materialize-css";

const app = createApp(App);
app.use(messagePlugin);

app.use(store).use(router).mount("#app");
