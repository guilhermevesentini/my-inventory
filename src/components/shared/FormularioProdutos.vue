<template>
    <div>
        <div class="row">
            <div class="input_form col-md-4">
                <label>Nome:</label>
                <input class="form-control" type="text" placeholder="Digite o nome" v-model="produto.nome" />
            </div>
            <div class="input_form col-md-4">
                <label>Descrição:</label>
                <input class="form-control" type="text" placeholder="Digite a descrição"
                    v-model="produto.descricao" />
            </div>
            <div class="input_form col-md-4">
                <SelectComponent label="Categoria:" v-model="produto.categoria" data="categorias" />
            </div>
            <div class="input_form col-md-4">
                <label>Codigo:</label>
                <input class="form-control" type="text" placeholder="Digite o código" v-model="produto.codigo" />
            </div>
            <div class="input_form col-md-4">
                <label>Marca:</label>
                <input class="form-control" type="text" placeholder="Digite a marca" v-model="produto.marca" />
            </div>
            <div class="input_form col-md-4">
                <label>Modelo:</label>
                <input class="form-control" type="text" placeholder="Digite o modelo" v-model="produto.modelo" />
            </div>
            <div class="input_form col-md-4">
                <label>Quantidade:</label>
                <input class="form-control" type="number" placeholder="Digite a quantidade"
                    v-model="produto.quantidade" />
            </div>
            <div class="input_form col-md-4">
                <label>Preço:</label>
                <input class="form-control" type="number" placeholder="Digite o preço" v-model="produto.preco" />
            </div>
            <div class="input_form col-md-4">
                <SelectComponent label="Forcecedor:" v-model="produto.fornecedor" data="fornecedores" />
            </div>
            <div class="input_form col-md-4">
                <label>Data de Aquisição:</label>
                <input class="form-control" type="date" placeholder="Digite a data de aquisição"
                    v-model="produto.dataAquisicao" />
            </div>
            <div class="input_form col-md-4">
                <SelectComponent label="Unidades:" v-model="produto.localizacao" data="unidades" />
            </div>
            <div class="input_form col-md-4">
                <SelectComponent label="Tag:" v-model="produto.tag" data="tags" />
            </div>
            <div class="input_form col-md-12" style="width: 100%">
                <label>Observação:</label>
                <textarea name="observacao" rows="6" style="width: 100%;" placeholder="Digite sua observação"
                    v-model="produto.observacao"></textarea>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { IProduto } from '@/@types/types';
import { defineProps, defineEmits, PropType, watch, ref } from 'vue';
import SelectComponent from "@/components/shared/CustomInputSelect.vue"

const props = defineProps({
    produto: {
        type: Array as PropType<IProduto[]>,
    }
});

const emit = defineEmits<{
  (event: "update:produto", produto: IProduto[]): void;
}>();

const produto = ref(props.produto);

watch(produto, (newValue) => {
  emit("update:produto", newValue);
});

</script>

<style lang="scss" scoped>
.input_form {
    margin: 7px 0;
}
</style>
