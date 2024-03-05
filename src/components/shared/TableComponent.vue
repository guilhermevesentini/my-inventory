<template>
  <el-row>
    <el-col>
      <el-col :span="24"> 
        <el-table v-bind="$attrs" style="width: 100%">
            <el-table-column label="Nome" prop="nome" />
            <el-table-column align="right" width="250">
              <!-- <template #header>
                <el-input v-model="filtroAtual" size="small" clearable  placeholder="Digite aqui..." :suffix-icon="Search" style="width: 100%"/>
              </template> -->
              <template #default="scope">
                <el-button size="small" @click="selecionarLinha()"
                  >Editar</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="deletarProduto(scope.row.id)"
                  >Excluir</el-button
                >
              </template>
            </el-table-column>
        </el-table>
        <el-col :span="12">
            <el-pagination
              v-model:current-page="currentPage"
              :page-size="itemsPerPagePage"
              layout="prev, pager, next"
              :total="5"
              @current-change="handlePageChange"
            />
        </el-col>
      </el-col>
    </el-col>  
  </el-row>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
//import { Search } from '@element-plus/icons-vue'

const currentPage = ref(1);
const itemsPerPagePage = ref(5);

//const filtroAtual = ref<string>('');

// function removerAcentos(texto: string) {
//   return texto
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .toLowerCase();
// }

// const produtosFiltrados = computed(() => {
//   try {
//     if(!props?.items) return

//     //const termoBusca = removerAcentos(props?.items?.trim().toLowerCase());
//     let filteredItems = props.items;

//     console.log(filteredItems);
    
  
//     if (filteredItems) {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       filteredItems = filteredItems.filter((produto: any) => {
//         return (
//           removerAcentos(produto.nome).includes(filtroAtual.value)
//         );
//       });
//     }  
//     const startIndex = (currentPage.value - 1) * itemsPerPage.value;
//     return filteredItems.slice(startIndex, startIndex + itemsPerPage.value);
//   }catch(err){
//     throw new Error(
//       'Erro ao carregar os produtos'
//       );
//   }
// });

const selecionarLinha = () => {
  // Lógica para selecionar a linha
};

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};

const emit = defineEmits<{
  (event: "deletar", value: string): void;
}>();

const deletarProduto = (id: string) => {  
  emit('deletar', id);
};

</script>

<style lang="scss" scoped>

</style>
