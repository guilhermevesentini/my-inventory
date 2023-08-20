import { ref, Ref, watchEffect } from 'vue';

interface IRoutes {
  orders: string;
  produtos: string;
  receitas: string;
  despesas: string;
}

export default function useObterDadosDashboard(path: string): { dados: Ref<any> | null; loading: Ref<boolean> } {
  const route = 'http://localhost:3001';

  const routes: IRoutes = {
    orders: `${route}/receitas`,
    produtos: `${route}/produtos`,
    receitas: `${route}/receitas`,
    despesas: `${route}/despesas`,
  };

  const dados = ref(null);
  const loading = ref(true);

  watchEffect(async () => {
    try {
      const response = await fetch(routes[path as keyof IRoutes]);
      const data = await response.json();
      dados.value = data;
      loading.value = false;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      loading.value = false;
    }
  });

  return {
    dados,
    loading,
  };
}
