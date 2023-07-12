import { createApp } from "vue";
//import { BootstrapVue } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import router from "./router";
import App from "./App.vue";

const app = createApp(App);

app.use(router)

//app.use(BootstrapVue)

app.mount("#app");
