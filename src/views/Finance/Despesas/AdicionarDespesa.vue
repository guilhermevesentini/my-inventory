<template>
    <div class="row" style="margin: 10px 0;">
        <div class="col-md-12">
            <MenuSuperiorAcoes 
                name="Nova Despesa" 
                :btnVoltar="true"
                :btnLimpar="true"
                :btnSalvar="true"
                @clickVoltar="Voltar"
                @clickLimpar="Limpar"
                @clickSalvar="Salvar"
            />
        </div>
        <div class="col-md-12">
            <div class="row">
                <div class="input_form col-md-4">
                    <label>Nome:</label>
                    <input class="form-control" type="text" placeholder="Digite o nome" v-model="produto.nome" />
                </div>   
                <div class="input_form col-md-4">
                    <label>Descrição:</label>
                    <input class="form-control" type="text" placeholder="Digite a descrição" v-model="produto.descricao" />
                </div>
                <div class="input_form col-md-4">
                    <label>Valor:</label>
                    <input class="form-control" type="number" placeholder="Digite o valor" v-model="produto.valor" />
                </div>
                <div class="input_form col-md-4">
                    <SelectComponent label="Recorrente:" v-model="produto.recorrente" data="recorrencias" />
                </div>
                <div class="input_form col-md-4" v-if="produto.recorrente == 'Sim'">
                    <SelectComponent label="Frequência:" v-model="produto.frequencia" data="frequencias" />
                </div>
                <div class="input_form col-md-4">
                    <label>Previsão:</label>
                    <input class="form-control" type="date" v-model="produto.previsao" />
                </div>  
                <div class="input_form col-md-12" style="width: 100%">
                    <label>Observação:</label>
                    <textarea name="observacao" rows="6" style="width: 100%;" placeholder="Digite sua observação"
                    v-model="produto.observacao"></textarea>
                </div>     
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "@vue/runtime-core"
import router from "@/router";
import useGerarId from "@/composables/shared/useCriarRandomId"
import { IGerarId } from "@/composables/types";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import SelectComponent from "@/components/shared/CustomInputSelect.vue";

const config: IGerarId = {
    quantidade: 16,
    tipo: 'string'
}

interface IDespesas {
    id: string
    nome: string
    descricao: string
    valor: number
    recorrente: string
    previsao: string
    frequencia: string
    observacao: string
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
})

const updateProdutoDetails = (updatedProduto) => {
    despesaDetails = updatedProduto;
};

</script>

<style lang="scss" scoped>
</style>