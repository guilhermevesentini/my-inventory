<template>
    <el-table :data="produtosFiltrados" style="width: 100%" empty-text="Sem Valores">
        <slot name="tableCollumn"></slot>
        <el-table-column align="right" width="250">
            <template #header>
                <el-input v-model="filtroAtual" size="small" clearable placeholder="Digite aqui..."
                    :suffix-icon="Search" style="width: 100%" />
            </template>

            <template #default="scope">
                <el-button size="small" @click="handleEditar(scope.row.id)">Editar</el-button>
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
import { IListaDeCadastros } from '@/views/Cadastros/types';
import { IReceitas, IDespesas, IOrdens } from '@/views/Finance/types';
import { Search } from '@element-plus/icons-vue'
import { computed, ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  produtos:  IListaDeCadastros[] | IProduto[] | IReceitas[] | IDespesas[] | IOrdens[];
}>();

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
    (event: "handleEditar", id: number): number;
    (event: "handleDeletar", id: string): string;
}>();

const handleEditar = (id: number) => {
    emits('handleEditar', id);    
}
const handleDeletar = (id: string) => {
    emits('handleDeletar', id);    
}
</script>