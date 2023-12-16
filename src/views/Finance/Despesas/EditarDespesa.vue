<template>
    <div class="row" style="margin: 10px 0;">
        <div class="col-md-12">
            <MenuSuperiorAcoes 
                name="Editar Despesas" 
                :btnVoltar="true"
                :btnSalvar="true"
                @clickVoltar="Voltar"
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
import { reactive } from "@vue/runtime-core"
import router from "@/router";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import SelectComponent from "@/components/shared/CustomInputSelect.vue";
import { onMounted } from "vue";

const routeId = router.currentRoute.value.params.id;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let produto = reactive<any>({})

//let produtoEditado = computed(() => produto)

const getProduto = (async (id: string) => {
    const req = await fetch(`http://localhost:3001/despesas/${id}`);
    const response = await req.json();
    console.log(response);
    
    Object.assign(produto, response);
})

const Limpar = (() => {
    produto.value.id = '';
    produto.value.nome = '';
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
    getProduto(router.currentRoute.value.params.id);
})
</script>

<style lang="scss" scoped>
</style>