import { createApp } from "vue";
import App from "./app.vue";
import "./registerServiceWorker";
import router from "./router";
import "./assets/styles/scss/app.scss";

createApp(App)
  .use(router)
  .mount("#app");
