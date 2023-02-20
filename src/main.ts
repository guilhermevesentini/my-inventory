import { createApp } from "vue";
import { createPopper } from '@popperjs/core';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

import router from "./router";
import App from "./App.vue";

const app = createApp(App);

app.use(router)

app.mount("#app");
