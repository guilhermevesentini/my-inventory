<template>
  <el-row :gutter="20" v-if="loading">
    <el-col :span="24">
      <TableTemplateSkeleton />
    </el-col>
  </el-row>
  <el-row v-else>
    <el-col :span="24">
      <MenuSuperiorAcoes name="Ordens" :btnCriarNovaOrdem="true" @clickCriarNovaOrdem="adicionarOrdem"/>
    </el-col>
    <el-col :span="24">
      <TableFilterableFrame v-on:handle-editar="editarOrdem" v-on:handle-deletar="deletarOrdem"
        :produtos="listaDeOrdens">
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
import { IOrdens } from "./types";
import { ICadastroItem } from "../Cadastros/types";

const loading = ref(false);

const listaDeOrdens = ref<Array<IOrdens>>([]);

const adicionarOrdem = () => {
  router.push('/Adicionar_Ordem')
}

const editarOrdem = ((produto: ICadastroItem) => {
  router.push({ path: `/Editar_Ordem/${produto.id}` });
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
  listaDeOrdens.value = response;
}

onMounted(() => {
  obterOrdens()
})
</script>
    
<style lang="scss" scoped></style>
    