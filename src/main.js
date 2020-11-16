import { createApp } from "vue";
import App from "./_app.vue";
import "./registerServiceWorker";
import router from "./router";

createApp(App)
  .use(router)
  .mount("#app");
