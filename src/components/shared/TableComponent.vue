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
        <tr v-for="item in itemsToShow" :key="item.id">
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
    <PaginationComponent :currentPage="current" :totalPageCount="totalPageCount" @nextPage="nextPage"
      @prevPage="prevPage" v-if="showPaginationCheck" />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, computed, watch } from 'vue';
import PaginationComponent from './PaginationComponent.vue';

const props = defineProps({
  items: {
    type: Array,
  },
  showPagination: {
    type: Boolean,
    default: false,
  },
  itemsPerPage: {
    type: Number,
    default: 5,
  },
});

const current = ref(1);
const itemsPerPage = ref(props.itemsPerPage);

const showPaginationCheck = computed(() => props.showPagination && props.items?.length > 5)

const totalPageCount = computed(() => {
  return Math.ceil((props.items?.length || 0) / itemsPerPage.value);
});

const itemsToShow = computed(() => {
  const startIndex = (current.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return props.items.slice(startIndex, endIndex);
});

const nextPage = () => {
  current.value++;
};

const prevPage = () => {
  current.value--;
};

const selecionarLinha = (id: number) => {
  // Lógica para selecionar a linha
};

const deletarProduto = (id: number) => {
  // Lógica para deletar o produto
};

// Watch for changes in itemsPerPage prop and update totalPageCount
watch(() => props.itemsPerPage, () => {
  itemsPerPage.value = props.itemsPerPage;
});

// ... Rest of your script setup ...
</script>

<style lang="scss" scoped>
/* Coloque os estilos SCSS específicos do componente aqui */
</style>
