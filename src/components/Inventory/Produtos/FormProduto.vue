<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
    <el-form ref="formRef" :model="produtoDetails" label-position="top" style="width: 100%">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-form-item label="Nome" :rules="[
                    { required: true, message: 'Campo obrigatório' },
                ]">
                    <el-input v-model="produtoDetails.nome" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Descrição">
                    <el-input v-model="produtoDetails.descricao" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Categoria" :rules="[
                    { required: true, message: 'Campo obrigatório' },
                ]">
                    <el-select v-model="produtoDetails.categoria" placeholder="Categoria" style="width: 100%">
                        <el-option v-for="categoria in categoriaList" :key="categoria.id" :label="categoria.nome"
                            :value="categoria.id" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Código">
                    <el-input v-model="produtoDetails.codigo" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Marca">
                    <el-input v-model="produtoDetails.marca" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Modelo">
                    <el-input v-model="produtoDetails.modelo" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Quantidade" :rules="[
                    { required: true, message: 'Campo obrigatório', trigger: 'blur' }
                ]">
                    <el-input v-model.number="produtoDetails.quantidade" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item type="number" label="Preço" :rules="[
                    { required: true, message: 'Campo obrigatório', trigger: 'blur' }
                ]">
                    <el-input v-model.number="produtoDetails.preco" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Fornecedores">
                    <el-select v-model="produtoDetails.fornecedor" placeholder="Fornecedore" style="width: 100%">
                        <el-option v-for="fornecedor in fornecedoresList" :key="fornecedor.id" :label="fornecedor.nome"
                            :value="fornecedor.id" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Data de Aquisição">
                    <el-date-picker v-model="produtoDetails.dataAquisicao" type="date" placeholder="Selecione a data"
                        style="width: 100%" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Unidades">
                    <el-select v-model="produtoDetails.localizacao" placeholder="Unidade" style="width: 100%">
                        <el-option v-for="unidades in unidadesList" :key="unidades.id" :label="unidades.nome"
                            :value="unidades.id" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Tags">
                    <el-select v-model="produtoDetails.tag" placeholder="Tag" style="width: 100%">
                        <el-option v-for="tags in tagsList" :key="tags.id" :label="tags.nome" :value="tags.id" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="Observação">
                    <el-input v-model="produtoDetails.observacao" type="textarea" />
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-button @click="handleVoltar">Cancel</el-button>
                <el-button type="primary" @click="handleSalvar(formRef)">Salvar</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup lang="ts">
import SharedHttpGateway from '@/services/shared/gateways/SharedHttpGateway';
import { defineProps, defineEmits, reactive, onMounted, ref, inject, computed } from 'vue';
import { IStandardList } from '../types';
import { FormInstance } from 'element-plus';

const formRef = ref<FormInstance>()

const sharedGateway = inject('sharedGateway') as SharedHttpGateway;

const categoriaList = ref<IStandardList[]>([])
const fornecedoresList = ref<IStandardList[]>([])
const unidadesList = ref<IStandardList[]>([])
const tagsList = ref<IStandardList[]>([])

interface IProps {
    nome: string,
    descricao: string,
    categoria: string,
    codigo: number,
    marca: string,
    modelo: string,
    quantidade: number,
    preco: number,
    fornecedores: string,
    dataAquisicao: string,
    unidades: string,
    tags: string,
    fornecedor: object,
    localizacao: object,
    tag: object,
    observacao: string,
}

const props = defineProps({
    produto: {
        type: Object as () => IProps,
        required: true
    }
});

const produtoDetails = reactive(props.produto)

const valid = computed(() => produtoDetails.quantidade)

console.log(valid.value);


const emits = defineEmits<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: "clickSalvar", produtoDetails: any): void;
    (event: "clickVoltar"): void;
}>();

const handleSalvar = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    emits('clickSalvar', produtoDetails);    
}

const handleVoltar = () => {
    emits('clickVoltar');
}

const obterListas = async () => {
    const [categorias, fornecedores, unidades, tags] = await Promise.all([
        sharedGateway.obterCategoriasList(), sharedGateway.obterFornecedoresList(), sharedGateway.obterUnidadesList(), sharedGateway.obterTagsList()
    ]);

    categoriaList.value = categorias
    fornecedoresList.value = fornecedores
    unidadesList.value = unidades
    tagsList.value = tags   
}

onMounted(async () => {
    await obterListas()
})
</script>