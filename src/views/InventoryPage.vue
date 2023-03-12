<template>
  <div class="container">
    <div class="container_pesquisar">
      <input type="search" placeholder="Digite o item" v-model="filtro" />
    </div>
    <table class="table table-bordered" :class="{ dark_mode_on_table: darkMode, light_mode_on_table: !darkMode }"
      v-if="!hasProduct">
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
              title="deletar">close</i></td>
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
    <div class="mensagem_nao_contem_produto" v-if="hasProduct">
      <p>Não existe produto</p>
    </div>
  </div>
  <router-link to="/novoProduto" v-slot="{ navigate }">
    <button @click="navigate" class="btn btn-primary adicionar_produto">
      <i class="material-icons">add</i>
    </button>
  </router-link>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { IProduto } from "./types";
import { darkMode } from "@/darkMode";
import router from "@/router";

const listaDeProdutos = ref<Array<IProduto>>([]);
const filtro = ref<string>('');

let hasProduct = false;

function removerAcentos(texto:string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}


const produtosFiltrados = computed(() => {
  const termoBusca = removerAcentos(filtro.value.trim().toLowerCase());
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
  getProdutos()
})

const getProdutos = (async () => {
  const req = await fetch("http://localhost:3001/produtos");
  const response = await req.json();
  listaDeProdutos.value = response;
})

const listaDeProdutosComputed = computed(() => {
  const produtosComTotal = listaDeProdutos.value.map(produto => {
    const total = produto.quantidade * produto.preco;
    return { ...produto, total };
  });
  return produtosComTotal;
});


const deletarProduto = (async (id: number) => {
  const req = await fetch(`http://localhost:3001/produtos/${id}`, {
    method: "DELETE",
  });
  //const res = await req.json();

  if (req.ok) {
    getProdutos()
  }
})

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
}

.light_mode_on_table {
  color: #333;
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
  overflow: auto;
}

table tbody {
  overflow: scroll;
  overflow-y: scroll;
  height: 50px !important;
}

.container_pesquisar input {
  width: 100%;
  margin: 10px 0;
  padding: 8px;
}

.mensagem_nao_contem_produto {
  display: flex;
  width: 100%;
  height: 100px;
  padding: 20px 10px;
  background-color: #b5e6fd;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.adicionar_produto {
  position: absolute;
  right: 20px;
  bottom: 20px;
  border-radius: 40%;
  padding: 10px;
  font-size: 10px;
  opacity: 0.9;
}
</style>
