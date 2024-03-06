<template>
  <el-row :gutter="20" v-if="loading">
    <el-col :span="24">
      <TableTemplateSkeleton />
    </el-col>
  </el-row>
  <el-row v-else>
    <el-col :span="24">
      <MenuSuperiorAcoes name="Receitas" :btnCriarNovaReceita="true" @clickCriarNovaReceita="adicionarReceita" />
    </el-col>
    <el-col :span="24">
      <TableFilterableFrame v-on:handle-editar="editarReceita" v-on:handle-deletar="deletarReceita"
        :produtos="listaDeReceitas">
        <template #tableCollumn>
          <el-table-column label="Nome" prop="nome" />
          <el-table-column label="Descrição" prop="descricao" />
          <el-table-column label="Valor" prop="recorrente" />
          <el-table-column label="Recorrênte" prop="recorrente" />
          <el-table-column label="Frequência" prop="frequencia" />
          <el-table-column label="Previsão" prop="previsao" />
        </template>
      </TableFilterableFrame>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import { onMounted } from "@vue/runtime-core";
import { ref, inject } from "vue";
import router from "@/router";
import ReceitasGateway from "@/services/receitas/gateways/ReceitasGateway";
import TableFilterableFrame from "@/components/shared/TableFilterableFrame.vue";
import TableTemplateSkeleton from "@/components/shared/TableTemplateSkeleton.vue";

const loading = ref(false);

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

const adicionarReceita = () => {
  router.push('/Adicionar_Receita')
}

const editarReceita = ((produto: number) => {
  console.log(produto);

  router.push({ path: `/Editar_Receita/${produto}` });
})

const deletarReceita = async (productId: string) => {
  const req = await receitasComp.excluirReceitas(productId);

  if (req.ok) {
    obterReceitas();
  }
}

const obterReceitas = async () => {
  try {
    loading.value = true;
    const response = await receitasComp.obterReceitas();
    listaDeReceitas.value = response;
  } catch (err) {
    console.log(err);
  } finally {
    setTimeout(() => {
      loading.value = false;      
    }, 500);
  }

}

onMounted(() => {
  obterReceitas()
})
</script>