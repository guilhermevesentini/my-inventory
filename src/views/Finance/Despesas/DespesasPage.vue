<template>
  <el-row :gutter="20" v-if="loading">
    <el-col :span="24">
      <TableTemplateSkeleton />
    </el-col>
  </el-row>
  <el-row v-else>
    <el-col :span="24">
      <MenuSuperiorAcoes name="Despesas" :btnCriarNovaDespesa="true" @clickCriarNovaDespesa="adicionarDespesa"/>
    </el-col>
    <el-col :span="24">
      <TableFilterableFrame v-on:handle-editar="editarDespesa" v-on:handle-deletar="deletarDespesa"
        :produtos="listaDeDespesas">
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
import { ref } from "vue";
import router from "@/router";
import { IDespesas } from "../types";

const loading = ref(false);

const listaDeDespesas = ref<Array<IDespesas>>([]);

const adicionarDespesa = () => {
  router.push('/Adicionar_Despesa')
}

const editarDespesa = ((produto: string) => {
  console.log(produto);
  
  router.push({ path: `/Editar_Despesa/${produto}` });
})

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
onMounted(() => {
  obterDespesas()
})
</script>
    
<style lang="scss" scoped></style>
    