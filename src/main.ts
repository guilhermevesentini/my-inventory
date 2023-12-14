import { createApp } from 'vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueApexCharts from 'vue3-apexcharts';
import { Modal } from 'vue-modal';
import router from './router';
import App from './App.vue';
import FetchAdapater from './infra/FetchAdapter';
import ReceitasHttpGateway from './services/receitas/gateways/ReceitaHttpGateway';
import InventoryHttpGateway from './services/Inventory/gateways/InventoryHttpGateway';

const app = createApp(App);

const baseUrl = 'http://localhost:3001';

const httpClient = new FetchAdapater();
const receitasGateway = new ReceitasHttpGateway(httpClient, baseUrl);
const invetoryGateway = new InventoryHttpGateway(httpClient, baseUrl);

app.provide('receitasGateway', receitasGateway);
app.provide('invetoryGateway', invetoryGateway);

app.use(ElementPlus)
app.component('ModalVue', Modal);
app.use(router);
app.use(VueApexCharts);
app.mount('#app');


