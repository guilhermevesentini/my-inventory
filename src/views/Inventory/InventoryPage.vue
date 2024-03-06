<template>
  <el-row :gutter="20" v-if="loading">
    <el-col :span="24">
      <TableTemplateSkeleton />
    </el-col>
  </el-row>
  <el-row v-else>
    <el-col :span="24">
      <MenuSuperiorAcoes name="Inventário" :btn-criar-novo-produto="true"
        @click-criar-novo-produto="adicionarProduto" />
    </el-col>
    <el-col :span="24">
      <TableFilterableFrame v-on:handle-editar="selecionarLinha" v-on:handle-deletar="deletarProduto"
        :produtos="listaDeProdutos">
        <template #tableCollumn>
          <el-table-column label="Id" prop="id" width="50" />
          <el-table-column label="Nome" prop="nome" />
          <el-table-column label="Categoria" prop="categoria" />
          <el-table-column label="Quantidade" prop="quantidade" />
          <el-table-column label="Preço" prop="preco" />
          <el-table-column label="Total" prop="total" />
        </template>
      </TableFilterableFrame>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "@vue/runtime-core";
import { inject } from 'vue';
import { IProduto } from "../../@types/types";
import router from "@/router";
import InvetoryGateway from "@/services/Inventory/gateways/InventorGateways";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import TableFilterableFrame from "@/components/shared/TableFilterableFrame.vue";
import TableTemplateSkeleton from "@/components/shared/TableTemplateSkeleton.vue";

const loading = ref(false);

const invetoryGateway = inject('invetoryGateway') as InvetoryGateway;
const listaDeProdutos = ref<Array<IProduto>>([]);

const adicionarProduto = () => {
  router.push('/Adicionar_Produto')
}

const getProdutos = async () => {
  try {
    loading.value = true;
    const response = await invetoryGateway.obterProdutos();
    listaDeProdutos.value = response;
  } catch (err) {
    throw new Error(
      'Erro ao carregar os produtos'
    );
  } finally {
    setTimeout(() => {
      loading.value = false;      
    }, 500);
  }

}

const deletarProduto = async (productId: string) => {
  const req = await invetoryGateway.excluirProduto(productId);

  if (req.ok) {
    getProdutos();
  }
}

const selecionarLinha = ((produto: number) => {
  router.push({ path: `/EditarProduto/${produto}` });
})

onMounted(() => {
  getProdutos();
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