<template>
    <el-form ref="formRef" :model="ordensDetails" label-position="top" style="width: 100%">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-form-item label="Nome" :rules="[
                    { required: true, message: 'Campo obrigatório' },
                ]">
                    <el-input v-model="ordensDetails.nome" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Descrição">
                    <el-input v-model="ordensDetails.descricao" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="valor">
                    <el-input v-model="ordensDetails.valor" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="recorrente">
                    <SelectComponent label="Recorrente:" v-model="ordensDetails.recorrente" data="recorrencias" />
                </el-form-item>
            </el-col>            
            <el-col :span="6">
                <el-form-item label="previsao">
                    <el-date-picker
                        v-model="ordensDetails.previsao"
                        type="date"
                        label="Selecione a data"
                        placeholder="Selecione a data"
                        style="width: 100%"
                        />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="frequencia" v-if="ordensDetails.recorrente == 'Sim'">
                    <SelectComponent label="Frequência:" v-model="ordensDetails.frequencia" data="frequencias" />
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="Observação">
                    <el-input v-model="ordensDetails.observacao" type="textarea" />
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
import { defineProps, defineEmits, reactive, ref } from 'vue';
import { FormInstance } from 'element-plus';
import SelectComponent from "@/components/shared/CustomInputSelect.vue";
import { IOrdens } from '@/views/Finance/types';

const formRef = ref<FormInstance>();

const props = defineProps({
    produto: {
        type: Object as () => IOrdens,
        required: true
    }
});

const ordensDetails = reactive(props.produto)

const emits = defineEmits<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: "clickSalvar", ordensDetails: any): void;
    (event: "clickVoltar"): void;
}>();

const handleSalvar = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    emits('clickSalvar', ordensDetails);    
}

const handleVoltar = () => {
    emits('clickVoltar');
}
</script>