<template>
    <el-row>
        <el-col :span="24">
            <MenuSuperiorAcoes name="Nova Receita" :btnVoltar="true" :btnLimpar="true"
                @clickVoltar="Voltar" @clickLimpar="Limpar" @clickSalvar="Salvar"/>
        </el-col>
        <el-col :span="24">
            <FormOrdems 
            :produto="ordem"
            @click-salvar="Salvar"
            @click-voltar="Voltar"
            ></FormOrdems>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { computed, reactive } from "@vue/runtime-core"
import router from "@/router";
import useGerarId from "@/composables/shared/useCriarRandomId"
import { IGerarId } from "@/composables/types";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import { IOrdens } from "../Finance/types";
import FormOrdems from "@/components/Inventory/Produtos/FormOrdems.vue";

const config: IGerarId = {
    quantidade: 16,
    tipo: 'string'
}

let ordensDetails: IOrdens = reactive({
    id: '',
    nome: '',
    descricao: '',
    valor: 0,
    previsao: '',
    recorrente: '1',
    frequencia: '',
    observacao: ''
})

let ordem = computed(() => ordensDetails)

const Salvar = (async () => {
    const novoId = useGerarId(config);

    // Alterar o valor do campo "_id" do objeto "produto.value"
    ordem.value.id = novoId;

    const dataJson = JSON.stringify(ordem.value);

    const req = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
    });

    if (req.ok) {
        Limpar()
        router.push('/Orders')
    }
})

const Limpar = (() => {
    ordem.value.id = '';
    ordem.value.nome = '';
})

const Voltar = (() => {
    Limpar()
    router.push('/Orders')
})
</script>

<style lang="scss" scoped>
</style>