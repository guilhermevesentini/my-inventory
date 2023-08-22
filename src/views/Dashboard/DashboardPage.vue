<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <CardLayout />
      </div>
      <div class="col-md-12" style="padding: 1rem 2rem;">
        <div class="row">
          <div class="col-md-7">
            <EstoqueCard />            
          </div>
          <div class="col-md-5">
            <LembreteCard />
          </div>
        </div>
      </div>
      <div class="col-md-12" style="padding: 1rem 2rem;">
        <div class="row">
          <div class="col-md-4">
            <CompraXvenda />
          </div>
          <div class="col-md-4">
            <ProdutosFornecedores />
          </div>
          <div class="col-md-4">
            <CompraXvenda />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardLayout from '@/views/Dashboard/Charts/Cards/CardsLayout.vue'
import EstoqueCard from '@/views/Dashboard/Charts/Cards/EstoqueCard.vue'
import CompraXvenda from '@/views/Dashboard/Charts/Cards/CompraEVenda.vue'
import ProdutosFornecedores from '@/views/Dashboard/Charts/Cards/ProdutosFornecedores.vue'
import LembreteCard from './Charts/Lembretes/LembreteCard.vue'
</script>

<style></style>