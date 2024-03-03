<template>
    <el-row>
        <el-col :span="24">
            <MenuSuperiorAcoes name="Nova Receita" :btnVoltar="true" :btnLimpar="true"
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
import {inject} from 'vue';
import { computed, reactive } from "@vue/runtime-core"
import router from "@/router";
import useGerarId from "@/composables/shared/useCriarRandomId"
import { IGerarId } from "@/composables/types";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import ReceitasGateway from '@/services/receitas/gateways/ReceitasGateway';
import FormReceitas from "@/components/Inventory/Produtos/FormReceitas.vue";
import { IReceitas } from '../types';

const receitasGateway = inject('receitasGateway') as ReceitasGateway;

const config: IGerarId = {
    quantidade: 16,
    tipo: 'string'
}

let receitaDetails: IReceitas = reactive({
    id: '',
    nome: '',
    descricao: '',
    valor: 0,
    previsao: '',
    recorrente: '1',
    frequencia: '',
    observacao: ''
})

let produto = computed(() => receitaDetails);

const Salvar = (async () => {
    const novoId = useGerarId(config);

    // Alterar o valor do campo "_id" do objeto "produto.value"
    produto.value.id = novoId;

    const req = await receitasGateway.adicionarReceitas(produto.value);

    if (req.ok) {
        Limpar()
        router.push('/Receitas')
    }
})

const Limpar = (() => {
    produto.value.id = '';
    produto.value.nome = '';
})

const Voltar = (() => {
    Limpar()
    router.push('/Receitas')
})
</script>

<style lang="scss" scoped>
</style>