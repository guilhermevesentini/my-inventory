<template>
  <el-row :gutter="20" v-if="loading">
    <el-col :span="24">
      <InventoryPageSkeleton />
    </el-col>
  </el-row>
  <el-row v-else>
    <el-col :span="24">
      <MenuSuperiorAcoes name="Receitas" :btnCriarNovaReceita="true" @clickCriarNovaReceita="adicionarReceita" />
    </el-col>
    <el-col>
      <el-col :span="24" v-if="!showTable">
        <InfoNoItems nome="Receita" />
      </el-col>
      <el-col :span="24" v-if="showTable">
        <el-table :data="listaDeReceitas" style="width: 100%" v-loading="loadingTable">
          <el-table-column label="Nome" prop="nome" />
          <el-table-column label="Descrição" prop="descricao" />
          <el-table-column label="Valor" prop="recorrente" />
          <el-table-column label="Recorrênte" prop="recorrente" />
          <el-table-column label="Frequência" prop="frequencia" />
          <el-table-column label="Previsão" prop="previsao" />
          <el-table-column align="right" width="250">
            <template #header>
              <el-input v-model="filtroAtual" size="small" clearable placeholder="Digite aqui..." :suffix-icon="Search"
                style="width: 100%" />
            </template>

            <template #default="scope">
              <el-button size="small" @click="editarReceita(scope.row.id)">Editar</el-button>
              <el-button size="small" type="danger" @click="deletarReceita(scope.row.id)">Excluir</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col :span="12">
          <el-pagination v-model:current-page="currentPage" :page-size="itemsPerPage" layout="prev, pager, next"
            :total="listaDeReceitas.length" @current-change="handlePageChange" />
        </el-col>
      </el-col>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import InfoNoItems from "@/components/shared/InfoNoItems.vue";
import { onMounted } from "@vue/runtime-core";
import { ref, inject, computed } from "vue";
import router from "@/router";
import ReceitasGateway from "@/services/receitas/gateways/ReceitasGateway";
import { Search } from '@element-plus/icons-vue'

const loading = ref(false);

const loadingTable = ref(false);

const currentPage = ref(1);
const itemsPerPage = ref(5);

const receitasComp = inject('receitasGateway') as ReceitasGateway;

interface IReceitas {
  id: string
  nome: string
  descricao: string
  valor: number
  recorrente: string
  previsao: string
  frequencia: string
  observacao: string
}

const listaDeReceitas = ref<Array<IReceitas>>([]);

const showTable = computed(() => listaDeReceitas?.value?.length >= 1 ? true : false)

const adicionarReceita = () => {
  router.push('/Adicionar_Receita')
}

const editarReceita = ((produto: string) => {
  console.log(produto);

  router.push({ path: `/Editar_Receita/${produto}` });
})

const deletarReceita = async (productId: string) => {
  const req = await receitasComp.excluirReceitas(productId);

  if (req.ok) {
    obterReceitas();
  }
}

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};

const obterReceitas = async () => {
  try {
    loading.value = true;
    const response = await receitasComp.obterReceitas();
    listaDeReceitas.value = response;
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }

}

onMounted(() => {
  obterReceitas()
})
</script>