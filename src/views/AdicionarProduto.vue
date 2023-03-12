<template>
    <div class="container">
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
                <label>Selecione o Tipo:</label>
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
        </div>
        <div class="acoes">
            <div class="acoes_item">
                <button class="btn btn-secondary" @click="Voltar">Voltar</button>
            </div>
            <div class="acoes_item">
                <button class="btn btn-secondary" @click="Limpar">Limpar</button>
                <button class="btn btn-success" @click="Salvar">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "@vue/runtime-core"
import { IProduto, ETipoProduto } from '@/views/types'
import router from "@/router";
//import CurrencyInput from 'vue3-currency-input';

let produtoDetails: IProduto = reactive({
    id: 0,
    nome: "",
    descricao: "",
    tipo: "",
    quantidade: 0,
    preco: 0,
    total: 0
})

const tiposProduto: ETipoProduto[] = [
    ETipoProduto.AcessoriosTecnologia,
    ETipoProduto.ArVentilacao,
    ETipoProduto.Artesanato,
    ETipoProduto.ArtigosFesta,
    ETipoProduto.Audio,
    ETipoProduto.Automotivo,
    ETipoProduto.Bebes,
    ETipoProduto.BelezaPerfumaria,
    ETipoProduto.BemEstarSexual,
    ETipoProduto.Brinquedos,
    ETipoProduto.CamaMesaBanho,
    ETipoProduto.CamerasDrones,
    ETipoProduto.CasaConstrucao,
    ETipoProduto.CasaInteligente,
    ETipoProduto.CelularSmartphone,
    ETipoProduto.Colchoes,
    ETipoProduto.ComercioIndustria,
    ETipoProduto.Cursos,
    ETipoProduto.Decoracao,
    ETipoProduto.Eletrodomesticos,
    ETipoProduto.Eletroportateis,
    ETipoProduto.EsporteLazer,
    ETipoProduto.Ferramentas,
    ETipoProduto.FilmesSeries,
    ETipoProduto.FloresJardim,
    ETipoProduto.Games,
    ETipoProduto.Informatica,
    ETipoProduto.InstrumentosMusicais,
    ETipoProduto.Livros,
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

    if(hasLength){
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
    produtoDetails.tipo = '';
    produtoDetails.quantidade = 0;
    produtoDetails.preco = 0;
})

const Voltar = (() => {
    Limpar()
    router.push('/inventory')
})

</script>

<style scoped>
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
}
</style>