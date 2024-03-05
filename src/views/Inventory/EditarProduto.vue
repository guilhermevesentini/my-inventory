<template>
    <el-row>
        <el-col :span="24">
            <MenuSuperiorAcoes name="Editar Produto" :btnVoltar="true" :btnLimpar="true" @clickVoltar="Voltar" @clickLimpar="Limpar" />
        </el-col>
        <el-col :span="24">
            <FormProduto 
            :produto="produto"
            @click-salvar="Salvar"
            @click-voltar="Voltar"
            ></FormProduto>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, inject } from "@vue/runtime-core"
import { IProduto } from '@/@types/types'
import router from "@/router";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import FormProduto from "@/components/Inventory/Produtos/FormProduto.vue";
import InventoryHttpGateway from "@/services/Inventory/gateways/InventoryHttpGateway";

const routeId = router.currentRoute.value?.params?.id;

let produto = reactive<IProduto>({
id: 0,
_id: "",
_id_Produto: "",
nome: "",
descricao: "",
codigo: "",
marca: "",
modelo: "",
categoria: "",
quantidade: 0,
preco: 0,
fornecedor: "",
dataAquisicao: "",
localizacao: "",
tag: "",
observacao: "",
total: 0
})

const invetoryGateway = inject('invetoryGateway') as InventoryHttpGateway;

const getProduto = (async (id: number | undefined) => {
    if (!id) return 
    
    const req = await invetoryGateway.obterProduto(id);

    Object.assign(produto, req);
})

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
    const routeId = router.currentRoute.value.params.id;
    const req = await invetoryGateway.editarProduto(routeId as string, produto);

    if (req) {
        router.push('/inventory')
    } else {
        alert("Erro ao salvar suas alterações, tente novamente.");
    }
})

const Voltar = (() => {
    router.push('/inventory')
})

const Limpar = (() => {
    produto.nome = '';
    produto.descricao = '';
    produto.categoria = '';
    produto.quantidade = 0;
    produto.preco = 0;
})

onMounted(async () => {
    await getProduto(Number(routeId));
})

</script>

<style lang="scss" scoped>
</style>