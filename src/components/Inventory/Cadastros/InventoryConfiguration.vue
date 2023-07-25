<template>
    <div class="row" style="margin: 10px 0;">
      <div class="col-md-12">
        <div class="inventory__actions">
          <div class="inventory__actions___breadCrumb col-md-4">
            <BreadCrumb />
          </div>
          <div class="inventory__actions___filters col-md-8">          
            <router-link class="inventory__actions___filters--link" to="/Adicionar_cadastro" v-slot="{ navigate }">
              <div class="inventory__actions___filters--btn-Adicionar" @click="navigate">
                <i class="material-icons">add</i>
                Adicionar
              </div>
            </router-link>
          </div>
        </div>
      </div>
  
      <div class="col-md-12">
        <div class="mensagem_nao_contem_produto" v-if="cadastrosFiltrados.length <= 0">
          <img src="../../../../dist/img/empty.png" alt="empty">
          <div>
            <p>Não existe nenhum cadastro.</p>
            <p>Clique em Adicionar para cadastrar.</p>
          </div>
        </div>
        <div class="table-responsive custom-scrollbar" v-if="cadastrosFiltrados.length > 0" style="
             max-height: calc(100vh - 195px); overflow-y: auto; margin: 10px 0;
              ">
          <BarraDePesquisa @filtroMudou="atualizarFiltro" />
          <table id="table-desktop" class="table table-bordered table-responsive">
            <thead>
              <tr>
                <th>Nome</th>
                <th colspan="2"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cadastro in cadastrosFiltrados" :key="cadastro.id">
                <td>{{ cadastro.nome }}</td>                
                <td style="text-align: center; width: 40px;">
                  <i class="material-icons" @click="selecionarLinha(cadastro.id)" title="Editar">edit</i>
                </td>
                <td style="text-align: center; width: 40px;">
                  <i class="material-icons" @click="deletarProduto(cadastro.id)" title="deletar">delete</i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed, onMounted, ref } from "@vue/runtime-core";
  import { ICadastro } from "../../../@types/types";
  import { darkMode } from "@/composables/shared/darkMode";
  import router from "@/router";
  import BarraDePesquisa from '@/components/BarraDePesquisa.vue';
  import BreadCrumb from "@/components/shared/BreadCrumb.vue";
  
  //const visible = ref(false)
  const listaDeCadastros = ref<Array<ICadastro>>([]);
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
  
  const cadastrosFiltrados = computed(() => {
    const termoBusca = removerAcentos(filtroAtual.value.trim().toLowerCase());
    if (!termoBusca) {
      return listaDeCadastrosComputed.value;
    }
    return listaDeCadastrosComputed.value.filter((produto) => {
      return (
        removerAcentos(produto.nome).includes(termoBusca)
      );
    });
  });
  
  onMounted(() => {
    getCadastros(userToJs._id);
  })
  
  const getCadastros = async (userId: string) => {
    const req = await fetch(`http://localhost:3001/cadastros`);
    const response = await req.json();
  
    const produtosDoUsuario = response.filter(cadastro => cadastro._id === userId.toString());
    listaDeCadastros.value = produtosDoUsuario;
  }
  
  const listaDeCadastrosComputed = computed(() => {
    return listaDeCadastros.value;
  });
  
  
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

  </script>
  
  <style lang="scss" scoped>
  .inventory__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4em;
    border-bottom: 1px solid #80808040;
    margin-bottom: 1.5rem;
    .inventory__actions___filters {
      display: flex;
      align-items: center;
      justify-content: flex-end;
  
      .inventory__actions___filters--link {
        text-decoration: none;
      }
  
      .inventory__actions___filters--btn-Adicionar {
        display: flex;
        padding: 5px;
        margin: 5px;
        border-radius: 5px;
        color: #333;
  
        i {
          text-decoration: none;
        }      
      }
      .inventory__actions___filters--btn-Adicionar:hover {
        border: 1px solid #0067ff;
        color: #0067ff;
        transition: ease-in-out 0.5s;
      }
    }
  }
  
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
  }</style>