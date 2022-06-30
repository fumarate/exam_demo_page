import { createApp } from "vue";
import App from "./App.vue";
import router from "./utils/router.js";
const app = createApp(App);
import axios from "axios";
axios.defaults.baseURL="http://localhost:8080";
axios.defaults.withCredentials = true;
app.use(router);
app.mount("#app");
