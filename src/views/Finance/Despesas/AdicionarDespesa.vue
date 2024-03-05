<template>
    <el-row>
        <el-col :span="24">
            <MenuSuperiorAcoes name="Nova Despesa" :btnVoltar="true" :btnLimpar="true"
                @clickVoltar="Voltar" @clickLimpar="Limpar" @clickSalvar="Salvar"/>
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
import { computed, reactive } from "@vue/runtime-core"
import router from "@/router";
import useGerarId from "@/composables/shared/useCriarRandomId"
import { IGerarId } from "@/composables/types";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import FormReceitas from "@/components/Inventory/Produtos/FormReceitas.vue";
import { IDespesas } from "../types";

const config: IGerarId = {
    quantidade: 16,
    tipo: 'string'
}

let despesaDetails: IDespesas = reactive({
    id: '',
    nome: '',
    descricao: '',
    valor: 0,
    previsao: '',
    recorrente: '1',
    frequencia: '',
    observacao: ''
})

let produto = computed(() => despesaDetails)

const Salvar = (async () => {
    const novoId = useGerarId(config);

    // Alterar o valor do campo "_id" do objeto "produto.value"
    produto.value.id = novoId;

    const dataJson = JSON.stringify(produto.value);

    const req = await fetch("http://localhost:3001/despesas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
    });

    if (req.ok) {
        Limpar()
        router.push('/Despesas')
    }
})

const Limpar = (() => {
    produto.value.id = '';
    produto.value.nome = '';
})

const Voltar = (() => {
    Limpar()
    router.push('/Despesas')
});
</script>

<style lang="scss" scoped>
</style>