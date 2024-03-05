<template>
  <el-row :gutter="20" v-if="loading">
    <el-col :span="24">
      <InventoryPageSkeleton />
    </el-col>
  </el-row>
  <el-row v-else>
    <el-col :span="24">
      <MenuSuperiorAcoes name="Despesas" :btnCriarNovaDespesa="true" @clickCriarNovaDespesa="adicionarDespesa"/>
    </el-col>
    <el-col>
      <el-col :span="24" v-if="!showTable">
        <InfoNoItems nome="Receita" />
      </el-col>
      <el-col :span="24" v-if="showTable"> 
        <el-table :data="listaDeDespesas" style="width: 100%" v-loading="loadingTable">
            <el-table-column label="Nome" prop="nome" />
            <el-table-column label="Descrição" prop="descricao" />
            <el-table-column label="Valor" prop="recorrente" />
            <el-table-column label="Recorrênte" prop="recorrente" />
            <el-table-column label="Frequência" prop="frequencia" />
            <el-table-column label="Previsão" prop="previsao" />
            <el-table-column align="right" width="250">
              <template #header>
                <el-input v-model="filtroAtual" size="small" clearable  placeholder="Digite aqui..." :suffix-icon="Search" style="width: 100%"/>
              </template>
              <template #default="scope">
                <el-button size="small" @click="editarDespesa(scope.row.id)"
                  >Editar</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="deletarDespesa(scope.row.id)"
                  >Excluir</el-button
                >
              </template>
            </el-table-column>
        </el-table>
        <el-col :span="12">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="itemsPerPage"
          layout="prev, pager, next"
          :total="listaDeDespesas.length"
          @current-change="handlePageChange"
        />
      </el-col>
      </el-col>
    </el-col>  
  </el-row>
</template>
    
<script lang="ts" setup>
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import InfoNoItems from "@/components/shared/InfoNoItems.vue";
import { onMounted, computed } from "@vue/runtime-core";
import { ref } from "vue";
import router from "@/router";
import { Search } from '@element-plus/icons-vue'
import { IDespesas } from "../types";

const loading = ref(false);

const loadingTable = ref(false);
const filtroAtual = ref<string>('');

const currentPage = ref(1);
const itemsPerPage = ref(5);

const listaDeDespesas = ref<Array<IDespesas>>([]);

const showTable = computed(() => produtosFiltrados?.value?.length >= 1 ? true : false)

const adicionarDespesa = () => {
  router.push('/Adicionar_Despesa')
}

const editarDespesa = ((produto: string) => {
  console.log(produto);
  
  router.push({ path: `/Editar_Despesa/${produto}` });
})

function removerAcentos(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const produtosFiltrados = computed(() => {
  try {
    loadingTable.value = true;
    const termoBusca = removerAcentos(filtroAtual.value.trim().toLowerCase());
    let filteredItems = listaDeDespesas.value;
  
    if (termoBusca) {
      filteredItems = filteredItems.filter((produto) => {
        return (
          removerAcentos(produto.nome).includes(termoBusca) ||
          removerAcentos(produto.descricao).includes(termoBusca)
        );
      });
    }  
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage.value);
  }catch(err){
    throw new Error(
      'Erro ao carregar os produtos'
      );
  }finally {
    setTimeout(() => {
      loadingTable.value = false;
    }, 500)
  }
});

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};

const deletarDespesa = async (productId: string) => {
  const req = await fetch(`http://localhost:3001/despesas/${productId}`, {
    method: "DELETE",
  });

  if (req.ok) {
    obterDespesas();
  }
}

const obterDespesas = async () => {
  try {
    loading.value = true
    const req = await fetch(`http://localhost:3001/despesas`);
    const response = await req.json();

    listaDeDespesas.value = response;
  } catch(err){
    console.log(err);    
  } finally {
    loading.value = false
  }
  
}

const totalPreco = computed(() => {
  const valores = listaDeDespesas.value.map(t => t.valor)
  return valores.reduce((valor, valores) => {
    return valor + valores;
  }, 0);
});

onMounted(() => {
  obterDespesas()
})
</script>
    
<style lang="scss" scoped></style>
    