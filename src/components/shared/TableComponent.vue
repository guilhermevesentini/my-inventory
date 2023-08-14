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
            <i class="material-icons" @click="selecionarLinha(item._id)" title="Editar">edit</i>
          </td>
          <td style="text-align: center; width: 40px;">
            <i class="material-icons" @click="deletarProduto(item.id)" title="deletar">delete</i>
          </td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example" v-if="showPagination">
    <ul class="pagination justify-content">
      <li class="page-item" :class="{ disabled: current === 1 }">
        <button class="page-link" @click="prevPage" :disabled="current === 1">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li class="page-item" v-for="page in 
      totalPageCount" :key="page" 
      :class="{ active: current === page }">
        <button class="page-link" @click="gotoPage(page)">{{ page }}</button>
      </li>
      <li class="page-item" :class="{ disabled: current === Math.ceil(produtosFiltrados?.length / itemsPerPage) }">
        <button class="page-link" @click="nextPage" :disabled="current === Math.ceil(produtosFiltrados?.length / itemsPerPage)">
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, computed, watch } from 'vue';
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

const gotoPage = (page) => {
  current.value = page;
};

const selecionarLinha = (id: number) => {
  // Lógica para selecionar a linha
};

const emit = defineEmits<{
  (event: "deletar", value: string): void;
}>();

const deletarProduto = (id: string) => {  
  emit('deletar', id);
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
