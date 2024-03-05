<template>
    <el-row>
        <el-col :span="24">
            <MenuSuperiorAcoes name="Editar Despesas" :btnVoltar="true" @clickVoltar="Voltar" @clickLimpar="Limpar" @clickSalvar="Salvar" />
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
import { onMounted } from "vue";
import FormReceitas from "@/components/Inventory/Produtos/FormReceitas.vue";
import { IDespesas } from "../types";

const routeId = router.currentRoute.value?.params?.id;

let produto = reactive<IDespesas>({
nome: "",
valor: 0,
recorrente: "",
previsao: "",
frequencia: "",
observacao: "",
id: '',
descricao: ''
})

const getProduto = (async (id: string | undefined) => {
    const req = await fetch(`http://localhost:3001/despesas/${id}`);
    const response = await req.json();
    
    Object.assign(produto, response);
})

const Limpar = (() => {
    produto.id = '';
    produto.nome = '';
})

const Voltar = (() => {
    Limpar()
    router.push('/Despesas')
})

const Salvar = (async () => {
    const req = await fetch(`http://localhost:3001/despesas/${routeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
    });

    if(req.ok){
        router.push('/Despesas')
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