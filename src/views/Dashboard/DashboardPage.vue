<template>
  <div>
    <!-- <div class="chart">
      <h2>Total de Items: {{ totalDeItems }} </h2>
    </div> -->
    <CardLayout/>
    <BarChart />

  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { IProduto } from '../../@types/types';
import CardLayout from '@/views/shared/CardsLayout.vue'

const listaDeProdutos = ref<IProduto[]>([]);

onMounted(() => {
  getProdutos();
})

const getProdutos = async () => {
  const userId = localStorage.getItem('user');
  const user = JSON.parse(userId);
  if (!userId) {
    // Lógica para lidar com o caso em que o ID do usuário não está disponível
    return [];
  }

  const req = await fetch(`http://localhost:3001/produtos?userId=${user.id}`);
  const response = await req.json();
  return response ? listaDeProdutos.value = response : [];
}


const totalDeItems = computed(() => {
  return listaDeProdutos.value.reduce((total, produto) => {
    return total + produto.quantidade;
  }, 0);
});

</script>

<style></style>