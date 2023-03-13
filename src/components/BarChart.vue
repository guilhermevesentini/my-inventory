<template>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
  
<script lang="ts" setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = {
    labels: ['January', 'February', 'March'],
    datasets: [{ data: [40, 20, 12] }]
};

const chartOptions = {
    responsive: true
};
</script>

<style scoped>
#my-chart-id {
    width: 100% !important;
    height: 450px !important;
    padding:40px;
}

@media (max-width: 650px) {
  #my-chart-id {
    height: 350px !important;
    padding: 31px;
  }
}
</style>