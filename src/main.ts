import { createApp, inject } from 'vue'; // Import createApp and inject
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import VueApexCharts from 'vue3-apexcharts';
import { Modal } from 'vue-modal';
import router from './router';
import App from './App.vue';
import FetchAdapater from './infra/FetchAdapter';
import ReceitasHttpGateway from './gateways/ReceitaHttpGateway';

const app = createApp(App);

const httpClient = new FetchAdapater();
const receitasGateway = new ReceitasHttpGateway(httpClient, 'http://localhost:3001');

app.provide('receitasGateway', receitasGateway);

app.component('ModalVue', Modal);
app.use(router);
app.use(VueApexCharts);
app.mount('#app');


