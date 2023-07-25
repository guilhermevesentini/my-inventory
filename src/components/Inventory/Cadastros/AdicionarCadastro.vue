<template>
    <div class="row" style="margin: 10px 0;"> 
        <div class="col-md-12">
            <div class="inventory__actions">
                <div class="inventory__actions___breadCrumb col-md-4">
                    <BreadCrumb />
                </div>
                <div class="inventory__actions___actions col-md-8">
                    <div class="btn" @click="Voltar">
                        <i class="material-icons">keyboard_return</i>                        
                    </div>
                    <div class="btn" @click="Limpar">
                        <i class="material-icons">cleaning_services</i>                        
                    </div>
                    <div class="btn" @click="Salvar">
                        <i class="material-icons">save</i>                        
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="row">
                <div class="input_form col-md-4">
                    <label>Nome:</label>
                    <input class="form-control" type="text" placeholder="Digite o nome" v-model="produtoDetails.nome" />
                </div>
            </div>
        </div>
        <div class="col-md-12">
        <div class="table-responsive custom-scrollbar" style="
             max-height: calc(100vh - 195px); overflow-y: auto; margin: 10px 0;
              ">
          <BarraDePesquisa />
          <table id="table-desktop" class="table table-bordered table-responsive">
            <thead>
              <tr>
                <th>Nome</th>
                <th colspan="2"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cadastro in listaDeCadastros" :key="cadastro.id">
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

<script setup lang="ts">
import { computed, reactive, ref } from "@vue/runtime-core"
import { IProduto, ETipoProduto } from '@/@types/types'
import router from "@/router";
import useGerarId from "@/composables/shared/useCriarRandomId"
import { IGerarId } from "@/composables/types";
import BreadCrumb from "../../shared/BreadCrumb.vue";

const listaDeCadastros = ref([
    { nome : "teste" }
]);

const config: IGerarId = {
    quantidade: 16,
    tipo: 'string'
}

let produtoDetails: IProduto = reactive({
    id: 0,
    _id: '',
    _id_Produto: '',
    nome: "",
    descricao: "",
    codigo: "",
    marca: "",
    modelo: "",
    categoria: [],
    quantidade: 0,
    preco: 0,
    fornecedor: "",
    dataAquisicao: "",
    localizacao: "",
    tag: "",
    observacao: '',
    total: 0,
})

const categorias: ETipoProduto[] = [
    ETipoProduto.Mercado,
    ETipoProduto.Moda,
    ETipoProduto.Moveis,
    ETipoProduto.MusicaShows,
    ETipoProduto.Natal,
    ETipoProduto.Papelaria,
    ETipoProduto.PetShop,
    ETipoProduto.ReligiaoEspiritualidade,
    ETipoProduto.Relogios,
    ETipoProduto.SaudeCuidadosPessoais,
    ETipoProduto.Servicos,
    ETipoProduto.SuplementosAlimentares,
    ETipoProduto.TabletsIpadEReaders,
    ETipoProduto.TelefoniaFixa,
    ETipoProduto.TVVideo,
    ETipoProduto.UtilidadesDomesticas,
];

let produto = computed(() => produtoDetails)

const validarProduto = ((produto: IProduto) => {
    var validateName = produto.nome.length > 20 ? true : false;
    var validateDescricao = produto.descricao.length > 20 ? true : false;

    var hasLength = validateName || validateDescricao;

    if (hasLength) {
        alert("Nome ou descrição não deve conter mais do que 20 caracters!");
        return false
    }

    if (!produto.nome || !produto.descricao || !produto.categoria || !produto.quantidade || !produto.preco) {
        return false;
    }
    return true;
})

const Salvar = (async () => {
    if (!validarProduto(produto.value)) {
        alert("Preencha todos os campos do produto!");
        console.log('teste')
        return;
    }
    console.log('teste')
    const novoId = useGerarId(config);

    const getUser: any = localStorage.getItem('user')
    const idUsuario = JSON.parse(getUser);

    // Alterar o valor do campo "_id" do objeto "produto.value"
    produto.value._id_Produto = novoId;
    produto.value._id = idUsuario._id

    const dataJson = JSON.stringify(produto.value);
    console.log('teste')
    const req = await fetch("http://localhost:3001/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
    });
    //const res = await req.json();
    if (req.ok) {
        Limpar()
        router.push('/inventory')
    }
})

const Limpar = (() => {
    produtoDetails.nome = '';
    produtoDetails.descricao = '';
    produtoDetails.categoria = [];
    produtoDetails.quantidade = 0;
    produtoDetails.preco = 0;
})

const Voltar = (() => {
    Limpar()
    router.push('/inventory')
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
    .inventory__actions___actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0;
        .btn {
            display: flex;          
            margin-left: 5px;
        }
    }
}

.input_form {
    margin: 10px 0;
}

.acoes {
    display: flex;
    margin: 10px 0;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
}</style>