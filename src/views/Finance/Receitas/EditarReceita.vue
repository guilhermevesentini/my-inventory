<template>
    <el-row>
        <el-col :span="24">
            <MenuSuperiorAcoes name="Editar Receita" :btnVoltar="true" @clickVoltar="Voltar" @clickLimpar="Limpar" @clickSalvar="Salvar" />
        </el-col>
        <el-col :span="24">
            <FormReceitas 
            :produto="produto"
            @click-salvar="Salvar"
            @click-voltar="Voltar"
            ></FormReceitas>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { reactive } from "@vue/runtime-core"
import router from "@/router";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import { onMounted, inject } from "vue";
import ReceitasGateway from "@/services/receitas/gateways/ReceitasGateway";
import FormReceitas from "@/components/Inventory/Produtos/FormReceitas.vue";

const routeId = router.currentRoute.value.params.id;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let produto = reactive<any>({})

//let produtoEditado = computed(() => produto)

const receitasGateway = inject('receitasGateway') as ReceitasGateway;

const getProduto = (async (id: string) => {
    const response = await receitasGateway.obterReceita(id);
    Object.assign(produto, response);
})

const Limpar = (() => {
    produto.value.id = '';
    produto.value.nome = '';
})

const Voltar = (() => {
    Limpar()
    router.push('/Receitas')
})

const Salvar = (async () => {
    const id = String(routeId);
    const req = await receitasGateway.editarReceitas(id, produto);

    if(req.ok){
        router.push('/Receitas')
    } else {
        alert("Erro ao salvar suas alterações, tente novamente.");
    }
})

onMounted(() => {
    const id = String(routeId);
    getProduto(id);
})
</script>

<style lang="scss" scoped>
</style>