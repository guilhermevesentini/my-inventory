import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import layoutPage from '@/views/LayoutPage.vue'
import DashboardPage from "@/views/DashboardPage.vue";
import InventoryPage from "@/views/InventoryPage.vue";
import AdicionarProduto from "@/views/AdicionarProduto.vue";
import EditarProduto from "@/views/EditarProduto.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: '/dashboard'
  },
  {
    path: "/dashboard",
    name: "dashboardPage",
    component: DashboardPage,
  },
  {
    path: "/inventory",
    name: "inventoryPage",
    component: InventoryPage,
  },
  {
    path: "/novoProduto",
    name: "novoProdutoPage",
    component: AdicionarProduto,
  },
  {
    path: "/EditarProduto/:id",
    name: "EditarProdutoPage",
    component: EditarProduto,
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
