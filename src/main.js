import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
//import flowbite component lib...
import "flowbite";
import router from "./router";

import "./assets/main.css";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(router);
app.use(pinia);

app.mount("#app");
