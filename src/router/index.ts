import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import layoutPage from '@/views/Layout/LayoutPage.vue'
import DashboardPage from "@/views/Dashboard/DashboardPage.vue";
import InventoryPage from "@/views/Inventory/InventoryPage.vue";
import AdicionarProduto from "@/components/Inventory/Produtos/AdicionarProduto.vue";
import EditarProduto from "@/components/Inventory/Produtos/EditarProduto.vue";
import InventoryConfiguration from '@/components/Inventory/Cadastros/InventoryConfiguration.vue'
import AdicionarCadastro from '@/components/Inventory/Cadastros/AdicionarCadastro.vue'
import EditarCadastro from '@/components/Inventory/Cadastros/EditarCadastro.vue'
import Login from "@/views/Login/LoginPage.vue";
import RegistrarNovoUsuario from "@/views/Login/RegistrarNovoUsuario.vue";

import { isAuthenticated } from '../../auth';
import CalendarPageVue from "@/views/Calendar/CalendarPage.vue";
import FinancePageVue from "@/views/Finance/FinancePage.vue";
import ReceitasPageVue from "@/views/Finance/Receitas/ReceitasPage.vue";
import AdicionarReceitasPageVue from "@/views/Finance/Receitas/AdicionarReceita.vue";
import DespesasPageVue from "@/views/Finance/Despesas/DespesasPage.vue";
import AdicionarDespesasPageVue from "@/views/Finance/Despesas/AdicionarDespesa.vue";
import OrdersPageVue from "@/views/Orders/OrdersPage.vue";
import AdicionarOrdemPageVue from "@/views/Orders/AdicionarOrdem.vue";

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
        name: "Novo Produto",
        component: AdicionarProduto,
        meta: { requiresAuth: true },
      },
      {
        path: "/EditarProduto/:id",
        name: "Editar Produto",
        component: EditarProduto,
        meta: { requiresAuth: true },
      },
      {
        path: "/Inventory_config/",
        name: "Cadastros",
        component: InventoryConfiguration,
        meta: { requiresAuth: true },
      },
      {
        path: "/Adicionar_cadastro",
        name: "Adicionar Cadastro",
        component: AdicionarCadastro,
        meta: { requiresAuth: true },
      },
      {
        path: "/Editar_cadastro",
        name: "Editar Cadastro",
        component: EditarCadastro,
        meta: { requiresAuth: true },
      },
      {
        path: "/Calendario",
        name: "Calendário",
        component: CalendarPageVue,
        meta: { requiresAuth: true },
      },
      {
        path: "/Receitas",
        name: "Receitas",
        component: ReceitasPageVue,
        meta: { requiresAuth: true },
      },
      {
        path: "/Adicionar_Receita",
        name: "Adicionar Receita",
        component: AdicionarReceitasPageVue,
        meta: { requiresAuth: true },
      },
      {
        path: "/Despesas",
        name: "Despesas",
        component: DespesasPageVue,
        meta: { requiresAuth: true },
      },
      {
        path: "/Adicionar_Despesa",
        name: "Adicionar Despesa",
        component: AdicionarDespesasPageVue,
        meta: { requiresAuth: true },
      },
      {
        path: "/Orders",
        name: "Orders",
        component: OrdersPageVue,
        meta: { requiresAuth: true },
      },
      {
        path: "/Adicionar_Ordem",
        name: "Adicionar Ordem",
        component: AdicionarOrdemPageVue,
        meta: { requiresAuth: true },
      },
      {
        path: "/Financeiro",
        name: "Financeiro",
        component: FinancePageVue,
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
