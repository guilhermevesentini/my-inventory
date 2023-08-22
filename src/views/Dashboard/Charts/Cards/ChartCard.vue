<template>
    <p v-if="isLoading"></p>
    <apexchart type="area" :options="chartOptions" :series="series" v-if="!isLoading"></apexchart>
</template>
  
<script setup lang="ts">
import { ref, onMounted, defineProps, computed } from 'vue'

const props = defineProps({
    path: String,
    color: String,
    title: String
})

const isLoading = ref(true)

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'area',
      width: 200,
      sparkline: {
        enabled: true
      },
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0
    },
    colors: [props.color],
    title: {
      text: '--',
      offsetX: 0,
      style: {
        fontSize: '24px',
      }
    },
    subtitle: {
      text: props.title,
      offsetX: 0,
      style: {
        fontSize: '14px',
      }
    }
  }
})

const series = ref([
    {
        data: [30, 15, 45]
    }
])

const generateRandomData = (length: number) => {
    return [{ data: Array.from({ length }, () => Math.floor(Math.random() * 100)) }]
}

const obterDados = async (path: string) => {

    const req = await fetch(`http://localhost:3001/${path}`)
    const response = await req.json();

    if (response) {
        const responseLength = response.length;

        chartOptions.value.title.text = responseLength

        series.value = generateRandomData(10)
        isLoading.value = false
    }
}

onMounted(() => obterDados(props?.path))
</script>
