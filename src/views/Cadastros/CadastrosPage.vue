<template>
  <el-row>
    <el-col :span="24">
      <MenuSuperiorAcoes name="Cadastros" :btn-criar-cadastro="true" @click-criar-cadastro="handleAbrirDialog" />
    </el-col>
    <el-col :span="24">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="Categorias" name="categorias">
          <TableFilterableFrame :produtos="listaDeCadastros.categorias" v-on:handle-deletar="deletarProduto" :-loading="loadingTable"
            v-on:handle-editar="handleAbrirEditarDialog">
            <template #tableCollumn>
              <el-table-column label="Nome" prop="nome" />
            </template>
          </TableFilterableFrame>
        </el-tab-pane>
        <el-tab-pane label="Fornecedores" name="fornecedores">
          <TableFilterableFrame :produtos="listaDeCadastros.fornecedores" v-on:handle-deletar="deletarProduto" :-loading="loadingTable"
            v-on:handle-editar="handleAbrirEditarDialog">
            <template #tableCollumn>
              <el-table-column label="Nome" prop="nome" />
            </template>
          </TableFilterableFrame>
        </el-tab-pane>
        <el-tab-pane label="Unidades" name="unidades">
          <TableFilterableFrame :produtos="listaDeCadastros.unidades" v-on:handle-deletar="deletarProduto" :-loading="loadingTable"
            v-on:handle-editar="handleAbrirEditarDialog($event)">
            <template #tableCollumn>
              <el-table-column label="Nome" prop="nome" />
            </template>
          </TableFilterableFrame>
        </el-tab-pane>
        <el-tab-pane label="Tags" name="tags">
          <TableFilterableFrame :produtos="listaDeCadastros.tags" v-on:handle-deletar="deletarProduto" :-loading="loadingTable"
            v-on:handle-editar="handleAbrirEditarDialog">
            <template #tableCollumn>
              <el-table-column label="Nome" prop="nome" />
            </template>
          </TableFilterableFrame>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>

  <AdicionarCadastroDialog v-model="showCriarDialog" v-on:handle-fechar="handleFecharDialog"
    v-on:handle-salvar="criarCadastro" />

    <EditarCadastroDialog v-model="showEditarDialog" :id="idSelecionado" :nome="nomeSelecionado" :show-dialog="showEditarDialog" v-on:handle-fechar="handleFecharEditarDialog"
    v-on:handle-editar="editarCadastro" />
</template>

<script lang="ts" setup>
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import { ref, onMounted } from "vue";
import TableFilterableFrame from "@/components/shared/TableFilterableFrame.vue";
import { ICadastroItem, IForm, IListaDeCadastros } from "./types";
import AdicionarCadastroDialog from "./AdicionarCadastroDialog.vue";
import useGerarId from "@/composables/shared/useCriarRandomId";
import { IGerarId } from "@/composables/types";
import EditarCadastroDialog from "./EditarCadastroDialog.vue";

const activeName = ref('categorias');
const showCriarDialog = ref(false);
const showEditarDialog = ref(false);
const loadingTable = ref(false);
const nomeSelecionado = ref('');
const idSelecionado = ref<string | number>('');

const handleAbrirDialog = () => {
  showCriarDialog.value = true;
}

const handleFecharDialog = () => {
  showCriarDialog.value = false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleAbrirEditarDialog = (params: any) => {
  nomeSelecionado.value = params.nome;
  idSelecionado.value = params.id;

  showEditarDialog.value = true;
}

const handleFecharEditarDialog = () => {
  showEditarDialog.value = false;
}

const config: IGerarId = {
    quantidade: 16,
    tipo: 'string'
}

const listaDeCadastros = ref<IListaDeCadastros>({
  categorias: [],
  fornecedores: [],
  unidades: [],
  tags: [],
});

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
  try {
    loadingTable.value = true
    const rota = activeName.value.toLocaleLowerCase();
    const req = await fetch(`http://localhost:3001/${rota}/${id}`, {
      method: "DELETE",
    });

    if (req.ok) {
      getCadastros();
    }
  } catch(err){
    console.log(err);    
  } finally {
    setTimeout(() => {
      loadingTable.value = false
    }, 1000); 
  }  
};

const editarCadastro = async (nome: string, id: string) => {
  console.log(nome);
  
  try {
    loadingTable.value = true
    const model = {
      nome: nome
    }
    const req = await fetch(`http://localhost:3001/${activeName.value}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(model),
    });

    if (req.ok) {
      getCadastros();
      showEditarDialog.value = false;
    }
  } catch(err){
    console.log(err);    
  } finally {
    setTimeout(() => {
      loadingTable.value = false
    }, 1000); 
  }
};

const criarCadastro = async (params: IForm) => {
  const rota = params.cadastro.toLocaleLowerCase();

  const novoId = useGerarId(config);

  const model: ICadastroItem = {
    nome: params.nome,
    id: novoId
  }

  const dataJson = JSON.stringify(model);

  try {
    loadingTable.value = true
    const req = await fetch(`http://localhost:3001/${rota}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: dataJson,
    });

    if (req.ok) {
      getCadastros()
      showCriarDialog.value = false;
    } else {
      alert('Failed to save data.');
    }
  } catch(err){
    console.log(err);    
  } finally {
    setTimeout(() => {
      loadingTable.value = false
    }, 1000);    
  }
  
}

onMounted(() => {
  getCadastros();
})
</script>

<style lang="scss" scoped>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>