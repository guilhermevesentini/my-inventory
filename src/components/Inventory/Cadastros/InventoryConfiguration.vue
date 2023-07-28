<template>
  <div class="row" style="margin: 10px 0;">
    <div class="col-md-12">
      <MenuSuperiorAcoes name="Cadastros" />
    </div>
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-8">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link btn btn-outline-primary active" id="pills-categoria-tab" data-bs-toggle="pill"
                data-bs-target="#pills-categoria" type="button" role="tab" aria-controls="pills-categoria"
                aria-selected="true">Categorias</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link btn btn-outline-primary" id="pills-fornecedores-tab" data-bs-toggle="pill"
                data-bs-target="#pills-fornecedores" type="button" role="tab" aria-controls="pills-fornecedores"
                aria-selected="false">Fornecedores</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link btn btn-outline-primary" id="pills-unidades-tab" data-bs-toggle="pill"
                data-bs-target="#pills-unidades" type="button" role="tab" aria-controls="pills-unidades"
                aria-selected="false">Unidades</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link btn btn-outline-primary" id="pills-tags-tab" data-bs-toggle="pill"
                data-bs-target="#pills-tags" type="button" role="tab" aria-controls="pills-tags"
                aria-selected="false">Tags</button>
            </li>
          </ul>
        </div>
        <div class="col-md-4 adicionar_btn">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalAdicionarCadastro">
            Adicionar
          </button>
        </div>
      </div>

      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-categoria" role="tabpanel" aria-labelledby="pills-categoria-tab">
          <div class="mensagem_nao_contem_produto" v-if="listaDeCadastros.categorias.length <= 0">
            <img src="../../../../dist/img/empty.png" alt="empty">
            <div>
              <p>Não existe nenhum cadastro.</p>
              <p>Clique em Adicionar para cadastrar.</p>
            </div>
          </div>
          <TableComponent :items="listaDeCadastros.categorias" v-if="listaDeCadastros.categorias.length > 0" />
        </div>
        <div class="tab-pane fade" id="pills-fornecedores" role="tabpanel" aria-labelledby="pills-fornecedores-tab">
          <div class="tab-pane fade show active" id="pills-categoria" role="tabpanel"
            aria-labelledby="pills-categoria-tab">
            <div class="mensagem_nao_contem_produto" v-if="listaDeCadastros.fornecedores.length <= 0">
              <img src="../../../../dist/img/empty.png" alt="empty">
              <div>
                <p>Não existe nenhum cadastro.</p>
                <p>Clique em Adicionar para cadastrar.</p>
              </div>
            </div>
            <TableComponent :items="listaDeCadastros.fornecedores" v-if="listaDeCadastros.fornecedores.length > 0" />
          </div>
        </div>
        <div class="tab-pane fade" id="pills-unidades" role="tabpanel" aria-labelledby="pills-unidades-tab">
          <div class="tab-pane fade show active" id="pills-categoria" role="tabpanel"
            aria-labelledby="pills-categoria-tab">
            <div class="mensagem_nao_contem_produto" v-if="listaDeCadastros.unidades.length <= 0">
              <img src="../../../../dist/img/empty.png" alt="empty">
              <div>
                <p>Não existe nenhum cadastro.</p>
                <p>Clique em Adicionar para cadastrar.</p>
              </div>
            </div>
            <TableComponent :items="listaDeCadastros.unidades" v-if="listaDeCadastros.unidades.length > 0" />
          </div>
        </div>
        <div class="tab-pane fade" id="pills-tags" role="tabpanel" aria-labelledby="pills-tags-tab">
          <div class="tab-pane fade show active" id="pills-tags" role="tabpanel" aria-labelledby="pills-tags-tab">
            <div class="mensagem_nao_contem_produto" v-if="listaDeCadastros.tags.length <= 0">
              <img src="../../../../dist/img/empty.png" alt="empty">
              <div>
                <p>Não existe nenhum cadastro.</p>
                <p>Clique em Adicionar para cadastrar.</p>
              </div>
            </div>
            <TableComponent :items="listaDeCadastros.tags" v-if="listaDeCadastros.tags.length > 0" />
          </div>
        </div>
      </div>

      
    </div>   
  </div>
  <ModalDeCadastro modalId="modalAdicionarCadastro" title="Cadastro de Fornecedores" @clickSalvar="criarCadastro">
    <div class="row">
      <div class="col-md-12">
      <div class="input_form col-md-12">
        <label>Nome:</label>
        <input class="form-control" type="text" placeholder="Digite ao nome"/>
      </div>
    </div>
  </div>
    
  </ModalDeCadastro>
</template>
  
<script lang="ts" setup>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { ICadastro } from "../../../@types/types";
import { darkMode } from "@/composables/shared/darkMode";
import router from "@/router";
import BarraDePesquisa from '@/components/BarraDePesquisa.vue';
import BreadCrumb from "@/components/shared/BreadCrumb.vue";
import TableComponent from "@/components/shared/TableComponent.vue";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import ModalDeCadastro from "./ModalDeCadastro.vue";
import $ from 'jquery';

let modalIsVisivel = ref<boolean>(false);

interface ICadastroItem {
  id: number;
  nome: string;
  // Adicione outras propriedades comuns se existirem
}

interface IListaDeCadastros {
  categorias: Array<ICadastroItem>;
  fornecedores: Array<ICadastroItem>;
  unidades: Array<ICadastroItem>;
  tags: Array<ICadastroItem>;
}

const listaDeCadastros = ref<IListaDeCadastros>({
  categorias: [],
  fornecedores: [],
  unidades: [],
  tags: [],
});

const getUser: any = localStorage.getItem('user')
const userToJs = JSON.parse(getUser);

onMounted(() => {
  getCadastros(userToJs._id);
})

const getCadastros = async (userId: string) => {
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
    console.log(listaDeCadastros.value);
  } catch (error) {
    console.error('Erro ao obter os cadastros:', error);
  }
};

const deletarProduto = async (productId: string) => {
  const req = await fetch(`http://localhost:3001/produtos/${productId}`, {
    method: "DELETE",
  });

  if (req.ok) {
    getCadastros(userToJs._id);
  }
}

const selecionarLinha = ((produto: number) => {
  router.push({ path: `/EditarProduto/${produto}` });
})

const criarCadastro = () => {
  console.log('teste');
  //$('#modalAdicionarCadastro').modal('hide')
}

</script>
  
<style lang="scss" scoped>
.adicionar_btn {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: flex-end;
}

.nav {
  margin: 1em 0 0 0;

  .nav-link {
    border: 1px solid #0067FF;
    text-decoration: none;
    margin-right: 15px;
  }

  .nav-link:hover {
    color: #fff;
  }
}

#myTabContent {
  margin-top: -15px;
  background-color: lightgray;

  .tab-pane {
    margin: 1rem;
  }
}
</style>