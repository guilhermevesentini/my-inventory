import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import layoutPage from '@/views/Layout/LayoutPage.vue'
import DashboardPage from "@/views/Dashboard/DashboardPage.vue";
import InventoryPage from "@/views/Inventory/InventoryPage.vue";
import AdicionarProduto from "@/components/Inventory/AdicionarProduto.vue";
import EditarProduto from "@/components/Inventory/EditarProduto.vue";
import Login from "@/views/Login/LoginPage.vue";
import RegistrarNovoUsuario from "@/views/Login/RegistrarNovoUsuario.vue";

import { isAuthenticated } from '../../auth';

const routes: RouteRecordRaw[] = [
  
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/NovoUsuario', component: RegistrarNovoUsuario },
  {
    path: '/',
    component: layoutPage,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: DashboardPage,
        meta: { requiresAuth: true },
      },
      {
        path: "/inventory",
        name: "Inventory",
        component: InventoryPage,
        meta: { requiresAuth: true },
      },
      {
        path: "/novoProduto",
        name: "Inventory / Novo Produto",
        component: AdicionarProduto,
        meta: { requiresAuth: true },
      },
      {
        path: "/EditarProduto/:id",
        name: "Inventory / Editar Produto",
        component: EditarProduto,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router;
