<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Estoque - Controle analítico (2009 - 2016)</span>
            </div>
        </template>
        <apexchart type="line" :options="chartOptions" :series="series" />
    </el-card>
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
            height: 350,
            type: 'line',
            stacked: false
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [1, 1, 4]
        },
        xaxis: {
            categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
        },
        yaxis: [
            {
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#008FFB'
                },
                labels: {
                    style: {
                        colors: '#008FFB',
                    }
                },
                title: {
                    text: "Income (thousand crores)",
                    style: {
                        color: '#008FFB',
                    }
                },
                tooltip: {
                    enabled: true
                }
            },
            {
                seriesName: 'Income',
                opposite: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#00E396'
                },
                labels: {
                    style: {
                        colors: '#00E396',
                    }
                },
                title: {
                    text: "Operating Cashflow (thousand crores)",
                    style: {
                        color: '#00E396',
                    }
                },
            },
            {
                seriesName: 'Revenue',
                opposite: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#FEB019'
                },
                labels: {
                    style: {
                        colors: '#FEB019',
                    },
                },
                title: {
                    text: "Revenue (thousand crores)",
                    style: {
                        color: '#FEB019',
                    }
                }
            },
        ],
        tooltip: {
            fixed: {
                enabled: true,
                position: 'topLeft',
                offsetY: 30,
                offsetX: 60
            },
        },
        legend: {
            horizontalAlign: 'left',
            offsetX: 40
        }
    }
})

const series = ref([
    {
        name: 'Income',
        type: 'column',
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
    }, {
        name: 'Cashflow',
        type: 'column',
        data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
    }, {
        name: 'Revenue',
        type: 'line',
        data: [30, 29, 10, 36, 44, 25, 50, 40]
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

onMounted(() => {
    if(props.path) {
        obterDados(props.path)
    }
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
