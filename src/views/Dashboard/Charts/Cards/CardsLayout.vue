<template>
  <div class="card_container">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-3 card-charts">
            <ChartCard path="orders" color="#e2e142" title="Orders"/>
          </div>
          <div class="col-md-3 card-charts">
            <ChartCard path="produtos" color="#319dd3" title="Produtos"/>
          </div>
          <div class="col-md-3 card-charts">
            <ChartCard path="receitas" color="#42e285" title="Receitas"/>
          </div>
          <div class="col-md-3 card-charts">
            <ChartCard path="despesas" color="#e24242" title="Despesas"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useObterDadosDashboard from '@/composables/dashboard/ObterDadosWidgets';
import { ref, onMounted, computed } from 'vue'
import ChartCard from './ChartCard.vue';
</script>

<style lang="scss" scoped>
.card_container {
  padding: 1rem 0;

  .card-charts {
    padding: 0 2rem;
  }
}
</style>

