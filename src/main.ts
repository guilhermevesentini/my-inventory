import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import VueApexCharts from 'vue3-apexcharts'; // Correct import for Vue 3
import { Modal } from 'vue-modal';
import router from './router';
import App from './App.vue';

const app = createApp(App);

app.component('ModalVue', Modal);
app.use(router);
app.use(VueApexCharts);
app.mount('#app');
