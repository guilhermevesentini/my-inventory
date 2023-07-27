<template>
    <div class="row" style="margin: 10px 0;">
        <div class="col-md-12">
            <MenuSuperiorAcoes 
                name="Editar Produto" 
                :btnVoltar="true"
                :btnSalvar="true"
                @clickVoltar="Voltar"
                @clickSalvar="Salvar"
            />
        </div>  
        <div class="col-md-12">
            <FormularioProdutos :produto="produto" @update:produto="updateProdutoDetails" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from "@vue/runtime-core"
import { IProduto, ETipoProduto } from '@/@types/types'
import router from "@/router";
import MenuDeAcoes from '@/components/shared/MenuSuperiorAcoes.vue'
import BreadCrumb from "../../shared/BreadCrumb.vue";
import SelectComponent from "@/components/shared/CustomInputSelect.vue"
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import FormularioProdutos from "@/components/shared/FormularioProdutos.vue";

const routeId = router.currentRoute.value.params.id;

onMounted(() => {
    console.log('teste editar')
    getProduto(Number(router.currentRoute.value.params.id));
})

let produto = reactive<IProduto>({})

const getProduto = (async (id: number) => {
    const req = await fetch(`http://localhost:3001/produtos/${id}`);
    const response = await req.json();
    Object.assign(produto, response);
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

let produtoEditado = computed(() => produto)

const validarProduto = ((produtoEditado: IProduto) => {
    if (!produtoEditado) return false
    var validateFields = !produto.nome || !produto.descricao || !produto.categoria || !produto.quantidade || !produto.preco;
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
        body: JSON.stringify(produto),
    });

    if(req.ok){
        console.log('sucesso')
        router.push('/inventory')
    } else {
        alert("Erro ao salvar suas alterações, tente novamente.");
    }
})

const Voltar = (() => {
    router.push('/inventory')
})

const updateProdutoDetails = (updatedProduto) => {
    produto = updatedProduto;
};

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
    right: 0;
}

.acoes button {
    margin: 5px;
}</style>