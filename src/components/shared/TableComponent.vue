<template>
    <div>
        <table id="table-desktop" class="table table-bordered table-responsive">
            <thead>
              <tr>
                <th>Nome</th>
                <th colspan="2"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.nome }}</td>                
                <td style="text-align: center; width: 40px;">
                  <i class="material-icons" @click="selecionarLinha(item.id)" title="Editar">edit</i>
                </td>
                <td style="text-align: center; width: 40px;">
                  <i class="material-icons" @click="deletarProduto(item.id)" title="deletar">delete</i>
                </td>
              </tr>
            </tbody>
          </table>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    items: {
        type: Array,
    },
})

const selecionarLinha = (id: number) => {
  // Lógica para selecionar a linha
};

const deletarProduto = (id: number) => {
  // Lógica para deletar o produto
};
</script>

  
<style lang="scss" scoped>
/* Coloque os estilos SCSS específicos do componente aqui */
</style>