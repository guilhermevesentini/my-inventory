<template>
    <el-card class="box-card">
      <template #header>
          <div class="card-header">
              <span>Produtos por fornecedores</span>
          </div>
      </template>
      <apexchart type="pie" :options="chartOptions" :series="series"></apexchart>
  </el-card>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { groupBy } from 'lodash' // Import lodash's groupBy function

const isLoading = ref(true)

const chartOptions = ref({
    chart: {
        type: 'pie',
    },
    labels: [], // Initialize labels as empty array
})

const series = ref([])

const fetchProdutos = async () => {
    try {
        const response = await fetch('http://localhost:3001/produtos') // Replace with your API URL
        const data = await response.json()
        console.log(data);
        
        return data
    } catch (error) {
        console.error('Error fetching produtos:', error)
        return []
    }
}

const generateChartData = (produtos) => {
    // Group produtos by fornecedor using lodash's groupBy
    const groupedData = groupBy(produtos, 'fornecedor')

    const labels = Object.keys(groupedData)
    const data = labels.map(label => groupedData[label].length)

    chartOptions.value.labels.push(...labels)
    series.value = data
}

onMounted(async () => {
    const produtos = await fetchProdutos()
    generateChartData(produtos)
    isLoading.value = false
})
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
