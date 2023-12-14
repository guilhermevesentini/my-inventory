<template>
    <div class="row" style="margin: 10px 0;">
        <div class="col-md-12">
            <MenuSuperiorAcoes 
                name="Novo Produto" 
                :btnVoltar="true"
                :btnLimpar="true"
                :btnSalvar="true"
                @clickVoltar="Voltar"
                @clickLimpar="Limpar"
                @clickSalvar="Salvar"
            />
        </div>
        <div class="col-md-12">
            <div class="row">
            <div class="input_form col-md-4">
                <label>Nome:</label>
                <input class="form-control" type="text" placeholder="Digite o nome" v-model="produtoDetails.nome" />
            </div>
            <div class="input_form col-md-4">
                <label>Descrição:</label>
                <input class="form-control" type="text" placeholder="Digite a descrição"
                    v-model="produtoDetails.descricao" />
            </div>
            <div class="input_form col-md-4">
                <SelectComponent label="Categoria:" v-model="produtoDetails.categoria" data="categorias" />
            </div>
            <div class="input_form col-md-4">
                <label>Codigo:</label>
                <input class="form-control" type="text" placeholder="Digite o código" v-model="produtoDetails.codigo" />
            </div>
            <div class="input_form col-md-4">
                <label>Marca:</label>
                <input class="form-control" type="text" placeholder="Digite a marca" v-model="produtoDetails.marca" />
            </div>
            <div class="input_form col-md-4">
                <label>Modelo:</label>
                <input class="form-control" type="text" placeholder="Digite o modelo" v-model="produtoDetails.modelo" />
            </div>
            <div class="input_form col-md-4">
                <label>Quantidade:</label>
                <input class="form-control" type="number" placeholder="Digite a quantidade"
                    v-model="produtoDetails.quantidade" />
            </div>
            <div class="input_form col-md-4">
                <label>Preço:</label>
                <input class="form-control" type="number" placeholder="Digite o preço" v-model="produtoDetails.preco" />
            </div>
            <div class="input_form col-md-4">
                <SelectComponent label="Forcecedor:" v-model="produtoDetails.fornecedor" data="fornecedores" />
            </div>
            <div class="input_form col-md-4">
                <label>Data de Aquisição:</label>
                <input class="form-control" type="date" placeholder="Digite a data de aquisição"
                    v-model="produtoDetails.dataAquisicao" />
            </div>
            <div class="input_form col-md-4">
                <SelectComponent label="Unidades:" v-model="produtoDetails.localizacao" data="unidades" />
            </div>
            <div class="input_form col-md-4">
                <SelectComponent label="Tag:" v-model="produtoDetails.tag" data="tags" />
            </div>
            <div class="input_form col-md-12" style="width: 100%">
                <label>Observação:</label>
                <textarea name="observacao" rows="6" style="width: 100%;" placeholder="Digite sua observação"
                    v-model="produtoDetails.observacao"></textarea>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "@vue/runtime-core"
import { IProduto } from '@/@types/types'
import router from "@/router";
import useGerarId from "@/composables/shared/useCriarRandomId"
import { IGerarId } from "@/composables/types";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";

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
    categoria: "",
    quantidade: 1,
    preco: 0,
    fornecedor: "",
    dataAquisicao: "",
    localizacao: "",
    tag: "",
    observacao: '',
    total: 0,
})

let produto = computed(() => produtoDetails)

const validarProduto = ((produto: IProduto) => {
    var validateName = produto.nome.length > 20 ? true : false;
    var validateDescricao = produto.descricao.length > 20 ? true : false;

    var hasLength = validateName || validateDescricao;

    if (hasLength) {
        alert("Nome ou descrição não deve conter mais do que 20 caracters!");
        return false
    }

    if (!produto.nome || !produto.descricao || !produto.quantidade || !produto.preco) {
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
    produtoDetails.categoria = '';
    produtoDetails.quantidade = 0;
    produtoDetails.preco = 0;
})

const Voltar = (() => {
    Limpar()
    router.push('/inventory')
})

const updateProdutoDetails = (updatedProduto) => {
  produtoDetails = updatedProduto;
};

</script>

<style lang="scss" scoped>
</style>