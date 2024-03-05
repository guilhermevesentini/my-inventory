<template>
    <el-row>
        <el-col :span="24">
            <MenuSuperiorAcoes name="Editar Ordem" :btnVoltar="true" @clickVoltar="Voltar" @clickLimpar="Limpar" @clickSalvar="Salvar" />
        </el-col>
        <el-col :span="24">
            <FormOrdems 
            :produto="produto"
            @click-salvar="Salvar"
            @click-voltar="Voltar"
            ></FormOrdems>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { reactive } from "@vue/runtime-core"
import router from "@/router";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import { onMounted } from "vue";
import FormOrdems from "@/components/Inventory/Produtos/FormOrdems.vue";
import { IOrdens } from "../Finance/types";

const routeId = router.currentRoute.value.params.id;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let produto = reactive<IOrdens>({
    id: '',
    nome: '',
    descricao: '',
    valor: 0,
    previsao: '',
    recorrente: '1',
    frequencia: '',
    observacao: ''
})

const getProduto = (async (id: string | undefined) => {
    const req = await fetch(`http://localhost:3001/orders/${id}`);
    const response = await req.json();
    console.log(response);
    
    Object.assign(produto, response);
})

const Limpar = (() => {
    produto.id = '';
    produto.nome = '';
})

const Voltar = (() => {
    Limpar()
    router.push('/Orders')
})

const Salvar = (async () => {
    const req = await fetch(`http://localhost:3001/orders/${routeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
    });

    if(req.ok){
        router.push('/Orders')
    } else {
        alert("Erro ao salvar suas alterações, tente novamente.");
    }
})

onMounted(() => {
    getProduto(routeId);
})
</script>

<style lang="scss" scoped>
</style>