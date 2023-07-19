<template>
    <div class="col-md-12">
        <div class="inventory__actions">
            <div class="inventory__actions___breadCrumb col-md-4">
                <BreadCrumb />
            </div>
            <div class="inventory__actions___filters col-md-8">
                <BarraDePesquisa class="inventory__actions___filters--pesquisa" @filtroMudou="atualizarFiltro" />                
                <button class="btn btn-secondary" @click="Voltar">Voltar</button>
                <button class="btn btn-light" @click="Limpar">Limpar</button>
                <button class="btn btn-success" @click="Salvar">Salvar</button>
                <router-link class="inventory__actions___filters--link" to="/novoProduto" v-slot="{ navigate }">
                    <div class="inventory__actions___filters--btn-Adicionar" @click="navigate">
                        <i class="material-icons">add</i>
                        Adicionar
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import BreadCrumb from './BreadCrumb.vue'
</script>
<style lang="scss" scoped>
.inventory__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .inventory__actions___filters {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .inventory__actions___filters--pesquisa {
        min-width: 500px;
      }
      .inventory__actions___filters--link{
        text-decoration: none;
      }
      .inventory__actions___filters--btn-Adicionar {
        display: flex;
        padding: 25px;
        i {
          text-decoration: none;
        }
      }
    }
  }</style>
