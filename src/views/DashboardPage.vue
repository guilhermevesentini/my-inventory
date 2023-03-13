<template>
  <div>
    <h1>Dashboard</h1>

    <div class="chart">
      <h2>Total de Items: {{ totalDeItems }} </h2>
    </div>

    <BarChart />

  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { IProduto } from './types';
import BarChart from '../components/BarChart.vue'

const listaDeProdutos = ref<IProduto[]>([]);

onMounted(() => {
  getProdutos()
})

const getProdutos = (async () => {
  const req = await fetch("http://localhost:3001/produtos");
  const response = await req.json();
  listaDeProdutos.value = response;
})

const totalDeItems = computed(() => {
  return listaDeProdutos.value.reduce((total, produto) => {
    return total + produto.quantidade;
  }, 0);
});

</script>


<style></style>
