<template>
  <div class="card_container">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-3 card-charts">
            <apexchart type="area" :options="ordersOptions" :series="ordersSeries"></apexchart>
          </div>
          <div class="col-md-3 card-charts">
            <apexchart type="area" :options="productsOptions" :series="productsSeries"></apexchart>
          </div>
          <div class="col-md-3 card-charts">
            <apexchart type="area" :options="receitasOptions" :series="receitasSeries"></apexchart>
          </div>
          <div class="col-md-3 card-charts">
            <apexchart type="area" :options="despesasOptions" :series="despesasSeries"></apexchart>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const sparklineData = [30, 90, 45, 20, 49, 80, 70, 91];

var ordersOptions = {
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
  colors: ['#e2e142'],
  title: {
    text: '25',
    offsetX: 0,
    style: {
      fontSize: '24px',
    }
  },
  subtitle: {
    text: 'Orders',
    offsetX: 0,
    style: {
      fontSize: '14px',
    }
  }
};

const ordersSeries = ref([
  {
    data: sparklineData
  }
]);

var productsOptions = {
  chart: {
    type: 'area',
    height: 160,
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
  colors: ['#319dd3'],
  title: {
    text: '3600',
    offsetX: 0,
    style: {
      fontSize: '24px',
    }
  },
  subtitle: {
    text: 'Produtos',
    offsetX: 0,
    style: {
      fontSize: '14px',
    }
  }
};
const productsSeries = ref([
  {
    data: sparklineData
  }
]);

var receitasOptions = {
  chart: {
    type: 'area',
    height: 160,
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
  colors: ['#42e285'],
  title: {
    text: 'R$2500',
    offsetX: 0,
    style: {
      fontSize: '24px',
    }
  },
  subtitle: {
    text: 'Receitas',
    offsetX: 0,
    style: {
      fontSize: '14px',
    }
  }
};
const receitasSeries = ref([
  {
    data: sparklineData
  }
]);

var despesasOptions = {
  chart: {
    type: 'area',
    height: 160,
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
  colors: ['#e24242'],
  title: {
    text: 'R$500',
    offsetX: 0,
    style: {
      fontSize: '24px',
    }
  },
  subtitle: {
    text: 'Receitas',
    offsetX: 0,
    style: {
      fontSize: '14px',
    }
  }
};
const despesasSeries = ref([
  {
    data: sparklineData
  }
]);

</script>

<style lang="scss" scoped>
.card_container {
  padding: 1rem 0;

  .card-charts {
    padding: 0 2rem;
  }
}
</style>
