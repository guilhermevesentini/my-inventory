<template>
    <el-table :data="produtosFiltrados" style="width: 100%" empty-text="Sem Valores" v-loading="isLoading">
        <slot name="tableCollumn"></slot>
        <el-table-column align="right" width="250">
            <template #header>
                <el-input v-model="filtroAtual" size="small" clearable placeholder="Digite aqui..."
                    :suffix-icon="Search" style="width: 100%" />
            </template>

            <template #default="scope">
                <el-button size="small" @click="handleEditar(scope.row)">Editar</el-button>
                <el-button size="small" type="danger" @click="handleDeletar(scope.row.id)">Excluir</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-col :span="12">
        <el-pagination v-model:current-page="currentPage" :page-size="itemsPerPage" layout="prev, pager, next"
            :total="produtos?.length" @current-change="handlePageChange" />
    </el-col>
</template>

<script lang="ts" setup>
import { IProduto } from '@/@types/types';
import { filtrarItems } from '@/utils/utils';
import { ICadastroItem, IListaDeCadastros } from '@/views/Cadastros/types';
import { IReceitas, IDespesas, IOrdens } from '@/views/Finance/types';
import { Search } from '@element-plus/icons-vue'
import { computed, ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  produtos:  IListaDeCadastros[] | IProduto[] | IReceitas[] | IDespesas[] | IOrdens[] | ICadastroItem[];
  Loading?: boolean
}>();

const isLoading = computed(() => props.Loading)

const filtroAtual = ref<string>('');
const currentPage = ref(1);
const itemsPerPage = ref(5);

const produtosFiltrados = computed(() => {
    return filtrarItems(props.produtos, filtroAtual, currentPage, itemsPerPage)
});

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};

const emits = defineEmits<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: "handleEditar", params: ICadastroItem): ICadastroItem;
    (event: "handleDeletar", id: string): string;
}>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleEditar = (params: ICadastroItem) => {
    emits('handleEditar', params);    
}
const handleDeletar = (id: string) => {
    emits('handleDeletar', id);    
}
</script>