<template>
    <div class="container">
        <div class="row">
            <div class="input_form col-md-4">
                <label>Nome:</label>
                <input class="form-control" type="text" placeholder="Digite o Nome" v-model="produto.nome" />
            </div>
            <div class="input_form col-md-4">
                <label>Descrição:</label>
                <input class="form-control" type="text" placeholder="Digite a Descrição" v-model="produto.descricao" />
            </div>
            <div class="input_form col-md-4">
                <label>Selecione o Tipo:</label>
                <select class="form-control" v-model="produto.tipo">
                    <option disabled value="">Selecione uma opção</option>
                    <option v-for="tipo in tiposProduto" :value="tipo" :key="tipo">{{ tipo }}</option>
                </select>
            </div>
            <div class="input_form col-md-4">
                <label>Quantidade:</label>
                <input class="form-control" type="number" placeholder="Digite a Quantidade" v-model="produto.quantidade" />
            </div>
            <div class="input_form col-md-4">
                <label>Preço:</label>
                <input class="form-control" type="number" placeholder="Digite o Preço" v-model="produto.preco" />
            </div>
        </div>
        <div class="acoes">
            <div class="acoes_item">
                <button class="btn btn-secondary" @click="Voltar">Voltar</button>
            </div>
            <div class="acoes_item">
                <button class="btn btn-success" @click="Salvar">Salvar</button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from "@vue/runtime-core"
import { IProduto, ETipoProduto } from '@/@types/types'
import router from "@/router";

const routeId = router.currentRoute.value.params.id;

onMounted(() => {
    getProduto(Number(router.currentRoute.value.params.id));
})

let produto = reactive<IProduto>({})

const getProduto = (async (id: number) => {
    const req = await fetch(`http://localhost:3001/produtos/${id}`);
    const response = await req.json();

    produto.nome = response.nome;
    produto.descricao = response.descricao;
    produto.tipo = response.tipo;
    produto.quantidade = response.quantidade;
    produto.preco = response.preco;
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

let produtoEditado = computed(() => produto)

const validarProduto = ((produtoEditado: IProduto) => {
    if(!produtoEditado) return false
    var validateFields = !produto.nome || !produto.descricao || !produto.tipo || !produto.quantidade || !produto.preco;
    if (validateFields) {
        return false;
    }
    return true;
})

const Salvar = (async () => {
    if (!validarProduto(produtoEditado.value)) {
        alert("Preencha todos os campos do produto!");
        return;
    }
    const req = await fetch(`http://localhost:3001/produtos/${routeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: produtoEditado.value.nome,
            descricao: produtoEditado.value.descricao,
            tipo: produtoEditado.value.tipo,
            quantidade: produtoEditado.value.quantidade,
            preco: produtoEditado.value.preco,
        }),
    });

    const response = await req.json();

    router.push('/inventory')
})

const Voltar = (() => {
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
    right: 0;
}

.acoes button {
    margin: 5px;
}
</style>