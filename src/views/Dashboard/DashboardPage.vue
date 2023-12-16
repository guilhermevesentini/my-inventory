<template>
  <el-row>
    <el-col :span="24">
      <CardLayout />
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <EstoqueCard />   
    </el-col>
    <el-col :span="12">
      <LembreteCard />
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="8">
      <CompraXvenda />
    </el-col>
    <el-col :span="8">
      <ProdutosFornecedores />
    </el-col>
    <el-col :span="8">
      <CompraXvenda />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import CardLayout from '@/views/Dashboard/Charts/Cards/CardsLayout.vue'
import EstoqueCard from '@/views/Dashboard/Charts/Cards/EstoqueCard.vue'
import CompraXvenda from '@/views/Dashboard/Charts/Cards/CompraEVenda.vue'
import ProdutosFornecedores from '@/views/Dashboard/Charts/Cards/ProdutosFornecedores.vue'
import LembreteCard from './Charts/Lembretes/LembreteCard.vue'
</script>

<style lang="scss">
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
</style>