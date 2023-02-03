import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

//import flowbite component lib...
import "flowbite";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount("#app");
