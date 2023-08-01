<template>
  <div class="row" style="margin: 10px 0;">
    <div class="col-md-12">
      <MenuSuperiorAcoes name="Inventário" :adicionar="true" />
    </div>

    <div class="col-md-12">
      <div class="mensagem_nao_contem_produto" v-if="produtosFiltrados.length <= 0">
        <img src="../../assets/img/empty.png" alt="empty">
        <div>
          <p>Não existe nenhum produto cadastrado.</p>
          <p>Clique em Adicionar para cadastrar seu primeiro produto.</p>
        </div>
      </div>
      <div v-if="produtosFiltrados.length > 0">
        <div class="table-responsive custom-scrollbar" style="
           max-height: calc(100vh - 195px); overflow-y: auto; margin: 10px 0;
            ">
          <BarraDePesquisa @filtroMudou="atualizarFiltro" />
          <table id="table-desktop" class="table table-bordered table-responsive">
            <thead>
              <tr>
                <!-- <th></th> -->
                <th>Id</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Total</th>
                <th colspan="2">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="produto in produtosFiltrados" :key="produto.id" style="max-width: 25px;">
                <!-- <td @click="toggleIconExpand" style="max-width: 25px;">
                <a data-bs-toggle="collapse" href="#subLinha" role="button" aria-expanded="false"
                    aria-controls="subLinha">
                    <i class="material-icons" title="eye">{{ isExpanded ? 'expand_less' : 'expand_more' }}</i>
                  </a>
                </td> -->
                <td>{{ produto.id }}</td>
                <td>{{ produto.nome }}</td>
                <td>{{ produto.categoria }}</td>
                <td>{{ produto.quantidade }}</td>
                <td>{{ produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
                <td>{{ produto.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
                <td style="text-align: center; max-width: 25px;">
                  <i class="material-icons" @click="selecionarLinha(produto.id)" title="Editar">edit</i>
                </td>
                <td style="text-align: center; max-width: 25px;">
                  <i class="material-icons" @click="deletarProduto(produto.id)" title="deletar">delete</i>
                </td>
              </tr>
              <!-- <tr>
              <td colspan="10" class="collapse" id="subLinha">
                <div>adawdwad</div>
              </td>              
            </tr> -->
            </tbody>
            <tfoot>
              <tr>
                <th colspan="3">Total</th>
                <th>{{ totalQuantidade }}</th>
                <th></th>
                <th>{{ totalPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</th>
                <th colspan="2"></th>
              </tr>
            </tfoot>
          </table>
        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="prevPage" :disabled="currentPage === 1"><span aria-hidden="true">&laquo;</span></button>
            </li>
            <li class="page-item" v-for="page in Math.ceil(listaDeProdutosComputed.length / itemsPerPage)" :key="page"
              :class="{ active: currentPage === page }">
              <button class="page-link" @click="currentPage = page">{{ page }}</button>
            </li>
            <li class="page-item"
              :class="{ disabled: currentPage === Math.ceil(listaDeProdutosComputed.length / itemsPerPage) }">
              <button class="page-link" @click="nextPage"
                :disabled="currentPage === Math.ceil(listaDeProdutosComputed.length / itemsPerPage)">Next</button>
            </li>
          </ul>
        </nav>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { IProduto } from "../../@types/types";
import { darkMode } from "@/composables/shared/darkMode";
import router from "@/router";
import BarraDePesquisa from '@/components/BarraDePesquisa.vue';
import BreadCrumb from "@/components/shared/BreadCrumb.vue";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
//import MenuDeAcoes from '@/components/shared/MenuSuperiorAcoes.vue'

const visible = ref(false)
const listaDeProdutos = ref<Array<IProduto>>([]);
const filtroAtual = ref<string>('');

const currentPage = ref(1);
const itemsPerPage = ref(5);

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
  let filteredItems = listaDeProdutosComputed.value;

  if (termoBusca) {
    filteredItems = filteredItems.filter((produto) => {
      return (
        removerAcentos(produto.nome).includes(termoBusca) ||
        removerAcentos(produto.descricao).includes(termoBusca) ||
        removerAcentos(produto.categoria).includes(termoBusca)
      );
    });
  }

  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  return filteredItems.slice(startIndex, startIndex + itemsPerPage.value);
});

const nextPage = () => {
  currentPage.value++;
};

const prevPage = () => {
  currentPage.value--;
};


onMounted(() => {
  getProdutos(userToJs._id);
})

const getProdutos = async (userId: string) => {
  const req = await fetch(`http://localhost:3001/produtos`);
  const response = await req.json();

  //const produtosDoUsuario = response.filter(produto => produto._id === userId.toString());
  //console.log(produtosDoUsuario);

  listaDeProdutos.value = response;
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
  return produtosFiltrados.value.reduce((total, produto) => {
    return total + produto.quantidade;
  }, 0);
});

const totalPreco = computed(() => {
  return produtosFiltrados.value.reduce((total, produto) => {
    return total + (produto.preco * produto.quantidade);
  }, 0);
});

// let isExpanded = false;

// const toggleIconExpand = (): void => {
//   // Toggle the expansion state
//   isExpanded = !isExpanded;
// };
</script>

<style lang="scss" scoped>
.dark_mode_on_table {
  color: #fff;
  background-color: #333;
}

.light_mode_on_table {
  color: #333;
  background-color: #fff;
}

table {
  height: 100%;
  border-collapse: collapse;

  thead {
    th {
      position: sticky;
      top: 0;
      background-color: #f2f2f2;
      z-index: 2;
    }
  }

  tbody {
    tr:hover {
      background-color: #333;
    }
  }

  tfoot {
    th {
      position: sticky;
      bottom: 0;
      background-color: #f2f2f2;
      z-index: 2;
    }
  }

  .table_line {
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 40px !important;
  }
}

.navigation {
  display: flex;
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
  background-color: #ffffff;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: center;

  img {
    width: 400px;
    margin: 1em;
  }

  p {
    text-align: center;
  }
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