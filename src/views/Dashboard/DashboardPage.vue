<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <CardLayout />
      </div>
      <div class="col-md-12" style="padding: 1rem 2rem;">
        <div class="row">
          <div class="col-md-7">
            <div class="card">
              <div class="card-header">
                Estoque - Controle analítico (2009 - 2016)
              </div>
              <div class="card-body">
                <apexchart type="line" :options="stockOptions" :series="stockSeries"></apexchart>
              </div>
            </div>
          </div>
          <div class="col-md-5">
            <div class="card" style="min-height: 100%;">
              <div class="card-header">
                Lembretes
              </div>
              <div class="card-body">
                <ul style="list-style: none; padding-left: 0">
                  <li v-for="evento in eventosHoje" v-bind:key="evento" style="background-color: #319dd344;padding: 10px; margin-bottom: 10px; border-radius: 5px;">
                    <span v-if="evento.allDay">Todo o dia: </span>
                    <span v-if="!evento.allDay">{{ evento.hourStart }} - {{ evento.hourEnd }}: </span>
                    {{ evento.title }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12" style="padding: 1rem 2rem;">
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="card-header">
                Compra x Venda de mercadoria
              </div>
              <div class="card-body">
                <apexchart type="line" :options="compraXvendaOptions" :series="compraXvendaSeries"></apexchart>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card" style="min-height: 100%;">
              <div class="card-header">
                Produtos por fornecedores
              </div>
              <div class="card-body">
                <apexchart type="pie" :options="qtdProdutosOptions" :series="qtdProdutosSeries"></apexchart>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <div class="card-header">
                a decidir
              </div>
              <div class="card-body">
                <apexchart type="area" :options="compraXvendaOptions" :series="compraXvendaSeries"></apexchart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { IProduto } from '../../@types/types';
import CardLayout from '@/views/Dashboard/Charts/Cards/CardsLayout.vue'
import  useObterDadosDashboard from '@/composables/dashboard/ObterDadosWidgets';

const listaDeProdutos = ref<IProduto[]>([]);
const listaDeEventos = ref<any[]>([]);

const widgetsValues = {
  orders: 0,
  produtos: 0,
  receitas: 0,
  despesas: 0,
}

const { dados } = useObterDadosDashboard('receitas');

var stockOptions = {
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
      position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
      offsetY: 30,
      offsetX: 60
    },
  },
  legend: {
    horizontalAlign: 'left',
    offsetX: 40
  }
};


const stockSeries = ref([
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
]);

var compraXvendaOptions = {
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
    tooltipHoverFormatter: function (val, opts) {
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
          formatter: function (val) {
            return val + " (mins)"
          }
        }
      },
      {
        title: {
          formatter: function (val) {
            return val + " per session"
          }
        }
      },
      {
        title: {
          formatter: function (val) {
            return val;
          }
        }
      }
    ]
  },
  grid: {
    borderColor: '#f1f1f1',
  }
};


const compraXvendaSeries = ref([
  {
    name: "Compra",
    data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
  },
  {
    name: 'Venda',
    data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
  }
]);

const qtdProdutosOptions = {
  chart: {
    type: 'pie',
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
}

const qtdProdutosSeries = ref([14, 23, 21, 17, 15]);

const getProdutos = async () => {
  try {
    const userId = localStorage.getItem('user');
    const user = JSON.parse(userId);

    if (!userId) {
      // Lógica para lidar com o caso em que o ID do usuário não está disponível
      return;
    }

    const req = await fetch(`http://localhost:3001/produtos?userId=${user.id}`);
    const response = await req.json();

    if (response && Array.isArray(response)) {
      listaDeProdutos.value = response; // Update the ref with the fetched data
    }
  } catch (error) {
    console.error('Error fetching produtos:', error);
  }
}

const eventosHoje = computed(() => {
  const eventos = listaDeEventos.value;
  const hoje = new Date();
  const formattedDate = `${hoje.getFullYear()}/${(hoje.getMonth() + 1).toString().padStart(2, '0')}/${hoje.getDate().toString().padStart(2, '0')}`;

  const eventosToday = eventos.filter(evento => {
  const eventDate = new Date(evento.start);
  const formattedEventDate = `${eventDate.getFullYear()}/${(eventDate.getMonth() + 1).toString().padStart(2, '0')}/${eventDate.getDate().toString().padStart(2, '0')}`;
  return formattedEventDate === formattedDate;
});
  
  return eventosToday
})

const getEventos = async () => {
  try {
    const req = await fetch(`http://localhost:3001/calendarEvents`);
    const response = await req.json();

    if (response) {
      listaDeEventos.value = response;
    }
  } catch (error) {
    console.error('Error fetching eventos:', error);
  }
};


const totalDeItems = computed(() => {
  return listaDeProdutos.value.reduce((total, produto) => {
    return total + produto.quantidade;
  }, 0);
});

onMounted(() => {
  getProdutos();
  getEventos()
})
</script>

<style></style>