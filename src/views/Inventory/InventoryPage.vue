<template>
  <el-row :gutter="20" v-if="loading">
    <el-col :span="24">
      <InventoryPageSkeleton />
    </el-col>
  </el-row>
  <el-row v-else>
    <el-col :span="24">
      <MenuSuperiorAcoes name="Inventário" :btn-criar-novo-produto="true" @click-criar-novo-produto="adicionarProduto"/>
    </el-col>
    <el-col>
      <el-col :span="24" v-if="!showTable">
        <div class="mensagem_nao_contem_produto" >
          <img src="../../assets/img/empty.png" alt="empty">
          <div>
            <p>Não existe nenhum produto cadastrado.</p>
            <p>Clique em Adicionar para cadastrar seu primeiro produto.</p>
          </div>
        </div>
      </el-col>
      <el-col :span="24" v-if="showTable"> 
        <el-table :data="produtosFiltrados" style="width: 100%" v-loading="loadingTable">
            <el-table-column label="Id" prop="id" width="50"/>
            <el-table-column label="Nome" prop="nome" />
            <el-table-column label="Categoria" prop="categoria" />
            <el-table-column label="Quantidade" prop="quantidade" />
            <el-table-column label="Preço" prop="preco" />
            <el-table-column label="Total" prop="total" />
            <el-table-column align="right" width="250">
              <template #header>
                <el-input v-model="filtroAtual" size="small" clearable  placeholder="Digite aqui..." :suffix-icon="Search" style="width: 100%"/>
              </template>
              <template #default="scope">
                <el-button size="small" @click="selecionarLinha(scope.row.id)"
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
          :page-size="itemsPerPage"
          layout="prev, pager, next"
          :total="listaDeProdutosComputed.length"
          @current-change="handlePageChange"
        />
      </el-col>
      </el-col>
    </el-col>  
  </el-row>  
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "@vue/runtime-core";
import {inject} from 'vue';
import { IProduto } from "../../@types/types";
import router from "@/router";
import InvetoryGateway from "@/services/Inventory/gateways/InventorGateways";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import InventoryPageSkeleton from "./skeleton/InventoryPageSkeleton.vue";
import { Search } from '@element-plus/icons-vue'

const loading = ref(false);

const loadingTable = ref(false);

const invetoryGateway = inject('invetoryGateway') as InvetoryGateway;
const listaDeProdutos = ref<Array<IProduto>>([]);
const filtroAtual = ref<string>('');

const currentPage = ref(1);
const itemsPerPage = ref(5);

const showTable = computed(() => produtosFiltrados?.value.length >= 1 ? true : false)

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
    let filteredItems = listaDeProdutosComputed.value;
  
    if (termoBusca) {
      filteredItems = filteredItems.filter((produto) => {
        return (
          removerAcentos(produto.nome).includes(termoBusca) ||
          removerAcentos(produto.descricao).includes(termoBusca) ||
          removerAcentos(produto.categoria).includes(termoBusca)
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

const adicionarProduto = () => {
  router.push('/Adicionar_Produto')
}

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};

onMounted(() => {
  getProdutos();
})

const getProdutos = async () => {
  try {
    loading.value = true;
    const response = await invetoryGateway.obterProdutos();
    listaDeProdutos.value = response;
  }catch(err){
    throw new Error(
      'Erro ao carregar os produtos'
      );
  }finally {
    loading.value = false;
  }
  
}

const listaDeProdutosComputed = computed(() => {
  const produtosComTotal = listaDeProdutos.value.map(produto => {
    const total = produto.quantidade * produto.preco;   
    
    return { ...produto, total };
  });
  return produtosComTotal;
});


const deletarProduto = async (productId: string) => { 
  const req = await invetoryGateway.excluirProduto(productId);

  if (req.ok) {
    getProdutos();
  }
}

const selecionarLinha = ((produto: number) => {
  router.push({ path: `/EditarProduto/${produto}` });
})

</script>

<style lang="scss" scoped>

.mensagem_nao_contem_produto {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 195px);
  padding: 20px 10px;
  background-color: #ffffff;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: center;

  img {
    width: 400px;
    margin: 1em;
  }

  p {
    text-align: center;
  }
}
</style>