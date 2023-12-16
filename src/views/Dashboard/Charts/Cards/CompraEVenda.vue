<template>
    <el-card class="box-card">
      <template #header>
          <div class="card-header">
              <span>Compra x Venda de mercadoria</span>
          </div>
      </template>
      <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
  </el-card>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue'

// const props = defineProps({
//     path: String,
//     color: String,
//     title: String
// })

//const isLoading = ref(true)

const chartOptions = computed(() => {
    return {
        chart: {
            type: 'line',
            zoom: {
                enabled: false
            },
        },
        colors: ['#FF5733', '#00e396'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [5, 5],
            curve: 'straight',
            dashArray: [8, 5]
        },
        legend: {
            tooltipHoverFormatter: function (val: string, opts: { w: { globals: { series: { [x: string]: { [x: string]: string } } } }; seriesIndex: string | number; dataPointIndex: string | number }) {
                return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
            }
        },
        markers: {
            size: 0,
            hover: {
                sizeOffset: 6
            }
        },
        xaxis: {
            categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
                '10 Jan', '11 Jan', '12 Jan'
            ],
        },
        tooltip: {
            y: [
                {
                    title: {
                        formatter: function (val: string) {
                            return val + " (mins)"
                        }
                    }
                },
                {
                    title: {
                        formatter: function (val: string) {
                            return val + " per session"
                        }
                    }
                },
                {
                    title: {
                        formatter: function (val: unknown) {
                            return val;
                        }
                    }
                }
            ]
        },
        grid: {
            borderColor: '#f1f1f1',
        }
    }
})

const series = ref([
    {
        name: "Compra",
        data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
    },
    {
        name: 'Venda',
        data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
    }
])

// const generateRandomData = (length: number) => {
//     return [{ data: Array.from({ length }, () => Math.floor(Math.random() * 100)) }]
// }

// const obterDados = async (path: string) => {

//     const req = await fetch(`http://localhost:3001/${path}`)
//     const response = await req.json();

//     if (response) {
//         const responseLength = response.length;

//         chartOptions.value.title.text = responseLength

//         series.value = generateRandomData(10)
//         isLoading.value = false
//     }
// }

//onMounted(() => obterDados(props?.path))
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
