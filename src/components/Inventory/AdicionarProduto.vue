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
                    <input class="form-control" type="text" placeholder="Digite o Nome" v-model="produtoDetails.nome" />
                </div>
                <div class="input_form col-md-4">
                    <label>Descrição:</label>
                    <input class="form-control" type="text" placeholder="Digite a Descrição"
                        v-model="produtoDetails.descricao" />
                </div>
                <div class="input_form col-md-4">
                    <label>Codigo:</label>
                    <input class="form-control" type="text" placeholder="Digite a Descrição"
                        v-model="produtoDetails.descricao" />
                </div>
                <div class="input_form col-md-4">
                    <label>Marca:</label>
                    <input class="form-control" type="text" placeholder="Digite a Descrição"
                        v-model="produtoDetails.descricao" />
                </div>
                <div class="input_form col-md-4">
                    <label>Modelo:</label>
                    <input class="form-control" type="text" placeholder="Digite a Descrição"
                        v-model="produtoDetails.descricao" />
                </div>                
                <div class="input_form col-md-4">
                    <label>Categoria:</label>
                    <select class="form-control" v-model="produtoDetails.tipo">
                        <option disabled value="">Selecione uma opção</option>
                        <option v-for="tipo in tiposProduto" :value="tipo" :key="tipo">{{ tipo }}</option>
                    </select>
                </div>
                <div class="input_form col-md-4">
                    <label>Quantidade:</label>
                    <input class="form-control" type="number" placeholder="Digite a Quantidade"
                        v-model="produtoDetails.quantidade" />
                </div>
                <div class="input_form col-md-4">
                    <label>Preço:</label>
                    <input class="form-control" type="number" placeholder="Digite o Preço" v-model="produtoDetails.preco" />
                </div>
                <div class="input_form col-md-4">
                    <label>Fornecedor:</label>
                    <input class="form-control" type="number" placeholder="Digite o Preço" v-model="produtoDetails.preco" />
                </div>
                <div class="input_form col-md-4">
                    <label>Data de Aquisição:</label>
                    <input class="form-control" type="number" placeholder="Digite o Preço" v-model="produtoDetails.preco" />
                </div>
                <div class="input_form col-md-4">
                    <label>Unidade:</label>
                    <input class="form-control" type="number" placeholder="Digite o Preço" v-model="produtoDetails.preco" />
                </div>
                <div class="input_form col-md-4">
                    <label>Tag:</label>
                    <input class="form-control" type="number" placeholder="Digite o Preço" v-model="produtoDetails.preco" />
                </div>
                <div class="input_form col-md-12" style="width: 100%">
                    <label>Observação:</label>
                    <textarea name="observacao" rows="6" style="width: 100%;"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "@vue/runtime-core"
import { IProduto, ETipoProduto } from '@/@types/types'
import router from "@/router";
import useGerarId from "@/composables/shared/useCriarRandomId"
import { IGerarId } from "@/composables/types";
import BreadCrumb from "../shared/BreadCrumb.vue";
//import MenuDeAcoes from '@/components/shared/MenuSuperiorAcoes.vue'

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
    tipo: [],
    quantidade: 0,
    preco: 0,
    total: 0
})

const tiposProduto: ETipoProduto[] = [
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

    if (!produto.nome || !produto.descricao || !produto.tipo || !produto.quantidade || !produto.preco) {
        return false;
    }
    return true;
})

const Salvar = (async () => {
    if (!validarProduto(produto.value)) {
        alert("Preencha todos os campos do produto!");
        return;
    }

    const novoId = useGerarId(config);

    const getUser: any = localStorage.getItem('user')
    const idUsuario = JSON.parse(getUser);

    // Alterar o valor do campo "_id" do objeto "produto.value"
    produto.value._id_Produto = novoId;
    produto.value._id = idUsuario._id

    const dataJson = JSON.stringify(produto.value);

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
    produtoDetails.tipo = [];
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
    .inventory__actions___actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 25px 0;
        .btn {
            display: flex;          

            i {
                margin: 0 5px;
            }
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
}

.acoes button {
    margin: 5px;
}</style>@/@types/types