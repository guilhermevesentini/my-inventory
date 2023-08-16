
import router from "./router";

import { createApp } from "vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Modal } from 'vue-modal'

import App from "./App.vue";

const app = createApp(App);
app.component('ModalVue', Modal);
app.use(router)
app.mount("#app");
