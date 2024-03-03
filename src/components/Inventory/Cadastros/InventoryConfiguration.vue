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
                aria-selected="true" @click="setCategoriaSelecionada('Categorias')">Categorias</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link btn btn-outline-primary" id="pills-fornecedores-tab" data-bs-toggle="pill"
                data-bs-target="#pills-fornecedores" type="button" role="tab" aria-controls="pills-fornecedores"
                aria-selected="false" @click="setCategoriaSelecionada('Fornecedores')">Fornecedores</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link btn btn-outline-primary" id="pills-unidades-tab" data-bs-toggle="pill"
                data-bs-target="#pills-unidades" type="button" role="tab" aria-controls="pills-unidades"
                aria-selected="false" @click="setCategoriaSelecionada('Unidades')">Unidades</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link btn btn-outline-primary" id="pills-tags-tab" data-bs-toggle="pill"
                data-bs-target="#pills-tags" type="button" role="tab" aria-controls="pills-tags" aria-selected="false"
                @click="setCategoriaSelecionada('Tags')">Tags</button>
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
            <img src="../../../assets/img/empty.png" alt="empty">
            <div>
              <p>Não existe nenhum cadastro.</p>
              <p>Clique em Adicionar para cadastrar.</p>
            </div>
          </div>
          <TableComponent :items="listaDeCadastros.categorias" :showPagination="true"
            v-if="listaDeCadastros.categorias.length > 0" @deletar="deletarProduto"/>
        </div>
        <div class="tab-pane fade" id="pills-fornecedores" role="tabpanel" aria-labelledby="pills-fornecedores-tab">
          <div class="tab-pane fade show active" id="pills-categoria" role="tabpanel"
            aria-labelledby="pills-categoria-tab">
            <div class="mensagem_nao_contem_produto" v-if="listaDeCadastros.fornecedores.length <= 0">
              <img src="../../../assets/img/empty.png" alt="empty">
              <div>
                <p>Não existe nenhum cadastro.</p>
                <p>Clique em Adicionar para cadastrar.</p>
              </div>
            </div>
            <TableComponent :items="listaDeCadastros.fornecedores" :showPagination="true"
              v-if="listaDeCadastros.fornecedores.length > 0" @deletar="deletarProduto"/>
          </div>
        </div>
        <div class="tab-pane fade" id="pills-unidades" role="tabpanel" aria-labelledby="pills-unidades-tab">
          <div class="tab-pane fade show active" id="pills-categoria" role="tabpanel"
            aria-labelledby="pills-categoria-tab">
            <div class="mensagem_nao_contem_produto" v-if="listaDeCadastros.unidades.length <= 0">
              <img src="../../../assets/img/empty.png" alt="empty">
              <div>
                <p>Não existe nenhum cadastro.</p>
                <p>Clique em Adicionar para cadastrar.</p>
              </div>
            </div>
            <TableComponent :items="listaDeCadastros.unidades" :showPagination="true"
              v-if="listaDeCadastros.unidades.length > 0" @deletar="deletarProduto"/>
          </div>
        </div>
        <div class="tab-pane fade" id="pills-tags" role="tabpanel" aria-labelledby="pills-tags-tab">
          <div class="tab-pane fade show active" id="pills-tags" role="tabpanel" aria-labelledby="pills-tags-tab">
            <div class="mensagem_nao_contem_produto" v-if="listaDeCadastros.tags.length <= 0">
              <img src="../../../assets/img/empty.png" alt="empty">
              <div>
                <p>Não existe nenhum cadastro.</p>
                <p>Clique em Adicionar para cadastrar.</p>
              </div>
            </div>
            <TableComponent :items="listaDeCadastros.tags" :showPagination="true"
              v-if="listaDeCadastros.tags.length > 0" @deletar="deletarProduto"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalDeCadastro modalId="modalAdicionarCadastro" :title='categoriaSelecionada' @clickSalvar="criarCadastro">
  </ModalDeCadastro>
</template>
  
<script lang="ts" setup>
import { onMounted, ref, watch } from "@vue/runtime-core";
import router from "@/router";
//import BarraDePesquisa from '@/components/BarraDePesquisa.vue';
import TableComponent from "@/components/shared/TableComponent.vue";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import ModalDeCadastro from "./ModalDeCadastro.vue";
import { ICadastroItem, IListaDeCadastros } from "../types"
import useGerarId from "@/composables/shared/useCriarRandomId";
import { IGerarId } from "@/composables/types";

const config: IGerarId = {
    quantidade: 16,
    tipo: 'string'
}

let categoriaSelecionada = ref<string>('categorias')

const setCategoriaSelecionada = (value: string) => {
  categoriaSelecionada.value = value;
};

const listaDeCadastros = ref<IListaDeCadastros>({
  categorias: [],
  fornecedores: [],
  unidades: [],
  tags: [],
});

const getUser: unknown = localStorage.getItem('user')
const userToJs = JSON.parse(getUser);

onMounted(() => {
  getCadastros(userToJs._id);
})

watch(listaDeCadastros, (newVal) => {
  console.log('Dados atualizados:', newVal);
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
    console.log(listaDeCadastros.value);
  } catch (error) {
    console.error('Erro ao obter os cadastros:', error);
  }
};

const deletarProduto = async (id: string) => {
  const rota = categoriaSelecionada.value.toLocaleLowerCase();
  const req = await fetch(`http://localhost:3001/${rota}/${id}`, {
    method: "DELETE",
  });

  if (req.ok) {
    getCadastros(userToJs._id);
  }
};


const selecionarLinha = ((produto: number) => {
  router.push({ path: `/EditarProduto/${produto}` });
})

const criarCadastro = async (nome: string) => {
  const rota = categoriaSelecionada.value.toLocaleLowerCase();

  const novoId = useGerarId(config);

  const model:ICadastroItem = {
    nome: nome,
    id: novoId
  }

  const dataJson = JSON.stringify(model);

  const req = await fetch(`http://localhost:3001/${rota}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: dataJson,
  });

  if (req.ok) {
    getCadastros(userToJs._id)
  } else {
    alert('Failed to save data.');
  }
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
}</style>