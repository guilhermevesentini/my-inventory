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
                    <input class="form-control" type="text" placeholder="Digite o Nome" v-model="produto.nome" />
                </div>
                <div class="input_form col-md-4">
                    <label>Descrição:</label>
                    <input class="form-control" type="text" placeholder="Digite a Descrição"
                        v-model="produto.descricao" />
                </div>
                <div class="input_form col-md-4">
                    <label>Codigo:</label>
                    <input class="form-control" type="text" placeholder="Digite a Descrição"
                        v-model="produto.descricao" />
                </div>
                <div class="input_form col-md-4">
                    <label>Marca:</label>
                    <input class="form-control" type="text" placeholder="Digite a Descrição"
                        v-model="produto.descricao" />
                </div>
                <div class="input_form col-md-4">
                    <label>Modelo:</label>
                    <input class="form-control" type="text" placeholder="Digite a Descrição"
                        v-model="produto.descricao" />
                </div>                
                <div class="input_form col-md-4">
                    <label>Categoria:</label>
                    <select class="form-control" v-model="produto.tipo">
                        <option disabled value="">Selecione uma opção</option>
                        <option v-for="tipo in tiposProduto" :value="tipo" :key="tipo">{{ tipo }}</option>
                    </select>
                </div>
                <div class="input_form col-md-4">
                    <label>Quantidade:</label>
                    <input class="form-control" type="number" placeholder="Digite a Quantidade"
                        v-model="produto.quantidade" />
                </div>
                <div class="input_form col-md-4">
                    <label>Preço:</label>
                    <input class="form-control" type="number" placeholder="Digite o Preço" v-model="produto.preco" />
                </div>
                <div class="input_form col-md-4">
                    <label>Fornecedor:</label>
                    <input class="form-control" type="number" placeholder="Digite o Preço" v-model="produto.preco" />
                </div>
                <div class="input_form col-md-4">
                    <label>Data de Aquisição:</label>
                    <input class="form-control" type="number" placeholder="Digite o Preço" v-model="produto.preco" />
                </div>
                <div class="input_form col-md-4">
                    <label>Unidade:</label>
                    <input class="form-control" type="number" placeholder="Digite o Preço" v-model="produto.preco" />
                </div>
                <div class="input_form col-md-4">
                    <label>Tag:</label>
                    <input class="form-control" type="number" placeholder="Digite o Preço" v-model="produto.preco" />
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
import { computed, onMounted, reactive } from "@vue/runtime-core"
import { IProduto, ETipoProduto } from '@/@types/types'
import router from "@/router";
import MenuDeAcoes from '@/components/shared/MenuSuperiorAcoes.vue'
import BreadCrumb from "../shared/BreadCrumb.vue";

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
    if (!produtoEditado) return false
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
    right: 0;
}

.acoes button {
    margin: 5px;
}</style>