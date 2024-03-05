<template>
  <el-row :gutter="20" v-if="loading">
    <el-col :span="24">
      <InventoryPageSkeleton />
    </el-col>
  </el-row>
  <el-row v-else>
    <el-col :span="24">
      <MenuSuperiorAcoes name="Ordens" :btnCriarNovaOrdem="true" @clickCriarNovaOrdem="adicionarOrdem"/>
    </el-col>
    <el-col>
      <el-col :span="24" v-if="!showTable">
        <InfoNoItems nome="Ordem" />
      </el-col>
      <el-col :span="24" v-if="showTable"> 
        <el-table :data="listaDeOrdens" style="width: 100%" v-loading="loadingTable">
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
                <el-button size="small" @click="editarOrdem(scope.row.id)"
                  >Editar</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="deletarOrdem(scope.row.id)"
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
          :total="listaDeOrdens.length"
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

const loading = ref(false);
const loadingTable = ref(false);

interface IOrdens {
  id: string
  nome: string
  descricao: string
  valor: number
  recorrente: string
  previsao: string
  frequencia: string
  observacao: string
}

const listaDeOrdens = ref<Array<IOrdens>>([]);

const showTable = computed(() => listaDeOrdens?.value?.length >= 1 ? true : false)

const currentPage = ref(1);
const itemsPerPage = ref(5);

const adicionarOrdem = () => {
  router.push('/Adicionar_Ordem')
}

const editarOrdem = ((produto: string) => {
  router.push({ path: `/Editar_Ordem/${produto}` });
})

const deletarOrdem = async (productId: string) => {
  const req = await fetch(`http://localhost:3001/orders/${productId}`, {
    method: "DELETE",
  });

  if (req.ok) {
    obterOrdens();
  }
}

const obterOrdens = async () => {
  const req = await fetch(`http://localhost:3001/orders`);
  const response = await req.json();

  //const produtosDoUsuario = response.filter(produto => produto._id === userId.toString());
  //console.log(produtosDoUsuario);

  listaDeOrdens.value = response;
}

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};

onMounted(() => {
  obterOrdens()
})
</script>
    
<style lang="scss" scoped></style>
    