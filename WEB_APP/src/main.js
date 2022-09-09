import { createApp } from "vue";
import { createPinia } from "pinia";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./assets/main.scss";
import "./assets/base.css";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
import http from "./http/instanceAxios";

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
const app = createApp(App);

app.config.globalProperties.$http = http;
app.config.globalProperties.$apiUri = "http://localhost/prog/web-app/public";

app.use(pinia);

app.use(router);

// eslint-disable-next-line prettier/prettier
app.mount("#app");