import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

//import flowbite component lib...
import 'flowbite';
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");