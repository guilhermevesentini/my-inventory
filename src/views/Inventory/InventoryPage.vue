<template>
  <div class="row" style="margin: 10px 0;">
    <div class="col-md-8">
      <BarraDePesquisa @filtroMudou="atualizarFiltro"/>
    </div>
    <div class="col-md-4">
      <router-link to="/novoProduto" v-slot="{ navigate }">
        <button @click="navigate" class="btn btn-primary adicionar_produto">
          <i class="material-icons">add</i>Adicionar
        </button>
      </router-link>
    </div>
    <div class="col-md-12">
      <div class="mensagem_nao_contem_produto" v-if="produtosFiltrados.length <= 0">
        <div>Não existe nenhum produto cadastrado.</div>
      </div>
      <div class="table-responsive custom-scrollbar" v-if="produtosFiltrados.length > 0" style="
           max-height: calc(100vh - 195px); overflow-y: auto; margin: 10px 0;
            ">
        <table id="table-desktop" class="table table-bordered table-responsive light">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="produto in produtosFiltrados" :key="produto.id" class="table_line">
              <td @click="selecionarLinha(produto.id)">{{ produto.nome }}</td>
              <td @click="selecionarLinha(produto.id)">{{ produto.descricao }}</td>
              <td @click="selecionarLinha(produto.id)">{{ produto.tipo }}</td>
              <td @click="selecionarLinha(produto.id)">{{ produto.quantidade }}</td>
              <td @click="selecionarLinha(produto.id)">{{ produto.preco }}</td>
              <td @click="selecionarLinha(produto.id)">{{ produto.total }}</td>
              <td style="text-align: center"><i class="material-icons" @click="deletarProduto(produto.id)"
                  title="deletar">delete</i></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>total</th>
              <th></th>
              <th></th>
              <th>{{ totalQuantidade }}</th>
              <th></th>
              <th>{{ totalPreco }}</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { IProduto } from "../../@types/types";
import { darkMode } from "@/darkMode";
import router from "@/router";
import BarraDePesquisa from '@/components/BarraDePesquisa.vue'

const listaDeProdutos = ref<Array<IProduto>>([]);
const filtroAtual = ref<string>('');

const getUser: any = localStorage.getItem('user')
const userToJs = JSON.parse(getUser);


function removerAcentos(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function atualizarFiltro(filtro: string) {
  filtroAtual.value = filtro
}

const produtosFiltrados = computed(() => {
  const termoBusca = removerAcentos(filtroAtual.value.trim().toLowerCase());
  if (!termoBusca) {
    return listaDeProdutosComputed.value;
  }
  return listaDeProdutosComputed.value.filter((produto) => {
    return (
      removerAcentos(produto.nome).includes(termoBusca) ||
      removerAcentos(produto.descricao).includes(termoBusca) ||
      removerAcentos(produto.tipo).includes(termoBusca)
    );
  });
});

onMounted(() => {
  getProdutos(userToJs._id);
})

const getProdutos = async (userId: string) => {
  const req = await fetch(`http://localhost:3001/produtos`);
  const response = await req.json();

  const produtosDoUsuario = response.filter(produto => produto._id === userId.toString());
  listaDeProdutos.value = produtosDoUsuario;
}

const listaDeProdutosComputed = computed(() => {
  const produtosComTotal = listaDeProdutos.value.map(produto => {
    const total = produto.quantidade * produto.preco;
    return { ...produto, total };
  });
  return produtosComTotal;
});


const deletarProduto = async (productId: string) => {
  const req = await fetch(`http://localhost:3001/produtos/${productId}`, {
    method: "DELETE",
  });

  if (req.ok) {
    getProdutos(userToJs._id);
  }
}


const selecionarLinha = ((produto: number) => {
  router.push({ path: `/EditarProduto/${produto}` });
})

const totalQuantidade = computed(() => {
  return listaDeProdutos.value.reduce((total, produto) => {
    return total + produto.quantidade;
  }, 0);
});

const totalPreco = computed(() => {
  return listaDeProdutos.value.reduce((total, produto) => {
    return total + (produto.preco * produto.quantidade);
  }, 0);
});


</script>

<style scoped>
.dark_mode_on_table {
  color: #fff;
  background-color: #333;
}

.light_mode_on_table {
  color: #333;
  background-color: #fff;
}

.acoes-topo {
  display: flex;
  justify-content: space-between;
}

.table_line {
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 40px !important;
}

.table_line:hover {
  background-color: #a1a1a167;
}

table {
  height: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 11px solid #ddd;
}

thead th {
  position: sticky;
  top: 0;
  background-color: #f2f2f2;
  z-index: 2;
}

tfoot th {
  position: sticky;
  bottom: 0;
  background-color: #f2f2f2;
  z-index: 2;
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #888888 #f2f2f2;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: #f2f2f2;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #888888;
  border-radius: 10px;
}

.mensagem_nao_contem_produto {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 195px);
  padding: 20px 10px;
  background-color: #d6d6d6;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.adicionar_produto {
  display: flex;
  float: right;
  margin: 10px 0;
  padding: 7px;
  flex-direction: row;
  align-content: center;
  align-items: center;
}

.adicionar_produto i {
  margin-right: 5px;
}

#table-mobile {
  display: none;
}

@media (max-width: 768px) {
  #table-mobile {
    display: block;
  }

  #table-desktop {
    display: none;
  }
}
</style>