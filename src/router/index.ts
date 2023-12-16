import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { isAuthenticated } from '../../auth';
import layoutPage from '@/views/Layout/LayoutPage.vue'
import Login from "@/views/Login/LoginPage.vue";
import RegistrarNovoUsuario from "@/views/Login/RegistrarNovoUsuario.vue";
import routesPaths from "./interfaces/routesPaths";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const routes: Array<RouteRecordRaw | unknown | any> = [
  { path: '/login', component: Login },
  { path: '/NovoUsuario', component: RegistrarNovoUsuario },
  { 
    path: '/', redirect: '/login',
    component: layoutPage,
    meta: { requiresAuth: true },
    children: [
      ...routesPaths
    ]
  }
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
