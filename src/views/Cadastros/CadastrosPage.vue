<template>
  <el-row>
    <el-col :span="24">
      <MenuSuperiorAcoes name="Cadastros" />
    </el-col>
    <el-col :span="24">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Categorias" name="categorias">
          <TableFilterableFrame 
          :produtos="listaDeCadastros.categorias"
          v-on:handle-deletar="deletarProduto" 
          v-on:handle-editar="editarCadastro">
          <template #tableCollumn>
            <el-table-column label="Nome" prop="nome" />
          </template>
        </TableFilterableFrame>
        </el-tab-pane>
        <el-tab-pane label="Fornecedores" name="fornecedores">
          <TableComponent :data="listaDeCadastros.fornecedores" v-if="listaDeCadastros.fornecedores.length > 0" @deletar="deletarProduto" />
        </el-tab-pane>
        <el-tab-pane label="Unidades" name="unidades">
          <TableComponent :data="listaDeCadastros.unidades" v-if="listaDeCadastros.unidades.length > 0" @deletar="deletarProduto" />
        </el-tab-pane>
        <el-tab-pane label="Tags" name="tags">
          <TableComponent :data="listaDeCadastros.tags" v-if="listaDeCadastros.tags.length > 0" @deletar="deletarProduto" />
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
//import BarraDePesquisa from '@/components/BarraDePesquisa.vue';
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import { TabsPaneContext } from "element-plus";
import { ref, onMounted } from "vue";
import TableComponent from "@/components/shared/TableComponent.vue";
import TableFilterableFrame from "@/components/shared/TableFilterableFrame.vue";
import { IListaDeCadastros } from "./types";

const activeName = ref('categorias');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

// const config: IGerarId = {
//     quantidade: 16,
//     tipo: 'string'
// }

const listaDeCadastros = ref<IListaDeCadastros>({
  categorias: [],
  fornecedores: [],
  unidades: [],
  tags: [],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
//const getUser: any = localStorage.getItem('user')
//const userToJs = JSON.parse(getUser);

onMounted(() => {
  getCadastros();
})

const getCadastros = async () => {
  try {
    const urls = [
      'http://localhost:3001/categorias',
      'http://localhost:3001/fornecedores',
      'http://localhost:3001/unidades',
      'http://localhost:3001/tags',
    ];

    const responses = await Promise.all(urls.map(url => fetch(url)));
    const dataPromises = responses.map(response => response.json());
    const [categorias, fornecedores, unidades, tags] = await Promise.all(dataPromises);

    listaDeCadastros.value = {
      categorias,
      fornecedores,
      unidades,
      tags,
    };
  } catch (error) {
    console.error('Erro ao obter os cadastros:', error);
  }
};

const deletarProduto = async (id: string) => {
  const rota = activeName.value.toLocaleLowerCase();
  const req = await fetch(`http://localhost:3001/${rota}/${id}`, {
    method: "DELETE",
  });

  if (req.ok) {
    getCadastros();
  }
};

const editarCadastro = () => {
  // Lógica para selecionar a linha
};

// const selecionarLinha = ((produto: number) => {
//   router.push({ path: `/EditarProduto/${produto}` });
// })

// const criarCadastro = async (nome: string) => {
//   const rota = categoriaSelecionada.value.toLocaleLowerCase();

//   const novoId = useGerarId(config);

//   const model:ICadastroItem = {
//     nome: nome,
//     id: novoId
//   }

//   const dataJson = JSON.stringify(model);

//   const req = await fetch(`http://localhost:3001/${rota}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: dataJson,
//   });

//   if (req.ok) {
//     getCadastros()
//   } else {
//     alert('Failed to save data.');
//   }
// }
</script>

<style lang="scss" scoped>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>