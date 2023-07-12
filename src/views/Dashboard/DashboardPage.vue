<template>
  <div>
    <div class="chart">
      <h2>Total de Items: {{ totalDeItems }} </h2>
    </div>

    <BarChart />

  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { IProduto } from '../types';

const listaDeProdutos = ref<IProduto[]>([]);
const getUser: any = localStorage.getItem('user')
const userToJs = JSON.parse(getUser);

onMounted(() => {
  getProdutos(userToJs._id);
})

const getProdutos = async (userId: number) => {
  const req = await fetch(`http://localhost:3001/user-produtos?userId=ae77fa5b2fc1d3fa8b42194638f7d938`);
  const response = await req.json();
  return response[0].produtos || [];
}


const totalDeItems = computed(() => {
  return listaDeProdutos.value.reduce((total, produto) => {
    return total + produto.quantidade;
  }, 0);
});

</script>


<style></style>
