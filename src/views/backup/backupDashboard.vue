<template>
    <div>
      <!-- <h1>Dashboard</h1>
  
      <div class="chart">
        <h2>Total de Items: {{ totalDeItems }}</h2>
        <line-chart :data="chartData" :options="chartOptions" />
      </div> -->
    </div>
  </template>
  
  <script lang="ts" setup>
  //import { ref, computed, onMounted, watch } from 'vue';
  //import { IProduto } from './types';
  //import LineChart from '../components/LineChart.vue';
  
//   const listaDeProdutos = ref<IProduto[]>([]);
  
//   onMounted(() => {
//     getProdutos()
//   })
  
//   const getProdutos = (async () => {
//     const req = await fetch("http://localhost:3001/produtos");
//     const response = await req.json();
//     listaDeProdutos.value = response;
//   })
  
//   const totalDeItems = computed(() => {
//     return listaDeProdutos.value.reduce((total, produto) => {
//       return total + produto.quantidade;
//     }, 0);
//   });
  
//   const chartData = ref({
//     labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
//     datasets: [{
//       label: 'Produtos Criados',
//       backgroundColor: 'rgba(255, 99, 132, 0.2)',
//       borderColor: 'rgba(255, 99, 132, 1)',
//       borderWidth: 1,
//       hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
//       hoverBorderColor: 'rgba(255, 99, 132, 1)',
//       data: [5, 10, 15, 20, 25, 30, 35]
//     }]
//   });
  
//   const chartOptions = ref({
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero: true
//         }
//       }]
//     }
//   });
  </script>
  
  <style>
    /* estilos para os componentes do dashboard */
  </style>
  