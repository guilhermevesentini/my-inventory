import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import layoutPage from '@/views/LayoutPage.vue'
import DashboardPage from "@/views/DashboardPage.vue";
import InventoryPage from "@/views/InventoryPage.vue";
import AdicionarProduto from "@/views/AdicionarProduto.vue";
import EditarProduto from "@/views/EditarProduto.vue";
import Login from "@/views/LoginPage.vue";
import RegistrarNovoUsuario from "@/views/RegistrarNovoUsuario.vue";

import {isAuthenticated} from '../../auth';

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
        name: "dashboardPage",
        component: DashboardPage,
        meta: { requiresAuth: true },
      },
      {
        path: "/inventory",
        name: "inventoryPage",
        component: InventoryPage,
        meta: { requiresAuth: true },
      },
      {
        path: "/novoProduto",
        name: "novoProdutoPage",
        component: AdicionarProduto,
        meta: { requiresAuth: true },
      },
      {
        path: "/EditarProduto/:id",
        name: "EditarProdutoPage",
        component: EditarProduto,
        meta: { requiresAuth: true },
      },
    ],
  },
  // {
  //   path: "/dashboard",
  //   name: "dashboardPage",
  //   component: DashboardPage,
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: "/inventory",
  //   name: "inventoryPage",
  //   component: InventoryPage,
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: "/novoProduto",
  //   name: "novoProdutoPage",
  //   component: AdicionarProduto,
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: "/EditarProduto/:id",
  //   name: "EditarProdutoPage",
  //   component: EditarProduto,
  //   meta: { requiresAuth: true },
  // },
];

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/",
//     redirect: '/dashboard'
//   },
//   {
//     path: "/dashboard",
//     name: "dashboardPage",
//     component: DashboardPage,
//   },
//   {
//     path: "/inventory",
//     name: "inventoryPage",
//     component: InventoryPage,
//   },
//   {
//     path: "/novoProduto",
//     name: "novoProdutoPage",
//     component: AdicionarProduto,
//   },
//   {
//     path: "/EditarProduto/:id",
//     name: "EditarProdutoPage",
//     component: EditarProduto,
//   },
//   {
//     path: "/login",
//     name: "LoginPage",
//     component: Login,
//   },
  
// ];

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
