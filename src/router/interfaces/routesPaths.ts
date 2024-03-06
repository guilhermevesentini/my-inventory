interface IRoutes {
    path: string,
    name: string,
    component: unknown,
    meta: { requiresAuth: boolean }
}

const routesPaths: IRoutes[] = [
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import('@/views/Dashboard/DashboardPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/inventory",
      name: "Inventory",
      component: () => import('@/views/Inventory/InventoryPage.vue'),
      meta: { requiresAuth: true },
      
    },
    {
      path: "/Adicionar_Produto",
      name: "Adicionar_Produto",
      component: () => import('@/views/Inventory/AdicionarProduto.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/EditarProduto/:id",
      name: "Editar Produto",
      component: () => import('@/views/Inventory/EditarProduto.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/Cadastros/",
      name: "Cadastros",
      component: () => import('@/views/Cadastros/CadastrosPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/Adicionar_cadastro",
      name: "Adicionar Cadastro",
      component: () => import('@/views/Cadastros/AdicionarCadastro.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/Editar_cadastro",
      name: "Editar Cadastro",
      component: () => import('@/views/Cadastros/EditarCadastroDialog.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/Calendario",
      name: "Calendário",
      component: () => import('@/views/Calendar/CalendarPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/Receitas",
      name: "Receitas",
      component: () => import('@/views/Finance/Receitas/ReceitasPage.vue'),
      meta: { requiresAuth: true },
    },      
    {
      path: "/Adicionar_Receita",
      name: "Adicionar Receita",
      component: () => import('@/views/Finance/Receitas/AdicionarReceita.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/Editar_Receita/:id",
      name: "Edirtar Receita",
      component: () => import('@/views/Finance/Receitas/EditarReceita.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/Despesas",
      name: "Despesas",
      component: () => import('@/views/Finance/Despesas/DespesasPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/Adicionar_Despesa",
      name: "Adicionar Despesa",
      component: () => import('@/views/Finance/Despesas/AdicionarDespesa.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/Editar_Despesa/:id",
      name: "Editar Despesa",
      component: () => import('@/views/Finance/Despesas/EditarDespesa.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/Orders",
      name: "Orders",
      component: () => import('@/views/Orders/OrdersPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/Adicionar_Ordem",
      name: "Adicionar Ordem",
      component: () => import('@/views/Orders/AdicionarOrdem.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/Editar_Ordem/:id",
      name: "Editar Ordem",
      component: () => import('@/views/Orders/EditarOrdem.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/Financeiro",
      name: "Financeiro",
      component: () => import('@/views/Finance/Receitas/ReceitasPage.vue'),
      meta: { requiresAuth: true },
  }
]

export default routesPaths