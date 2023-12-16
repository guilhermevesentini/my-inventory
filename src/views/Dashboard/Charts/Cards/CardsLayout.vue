<template>
  <div class="card_container">
    <el-row>
      <el-col :span="6" class="card-charts">
        <ChartCard path="orders" color="#e2e142" title="Orders"/>
      </el-col>
      <el-col :span="6" class="card-charts">
        <ChartCard path="produtos" color="#319dd3" title="Produtos"/>
      </el-col>
      <el-col :span="6" class="card-charts">
        <ChartCard path="receitas" color="#42e285" title="Receitas"/>
      </el-col>
      <el-col :span="6" class="card-charts">
        <ChartCard path="despesas" color="#e24242" title="Despesas"/>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
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

