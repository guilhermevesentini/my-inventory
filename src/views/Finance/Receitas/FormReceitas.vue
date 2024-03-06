<template>
    <el-form ref="formRef" :model="receitasDetails" label-position="top" style="width: 100%">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-form-item label="Nome" :rules="[
                    { required: true, message: 'Campo obrigatório' },
                ]">
                    <el-input v-model="receitasDetails.nome" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="Descrição">
                    <el-input v-model="receitasDetails.descricao" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="valor">
                    <el-input v-model="receitasDetails.valor" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="recorrente">
                    <SelectComponent label="Recorrente:" v-model="receitasDetails.recorrente" data="recorrencias" />
                </el-form-item>
            </el-col>            
            <el-col :span="6">
                <el-form-item label="previsao">
                    <el-date-picker
                        v-model="receitasDetails.previsao"
                        type="date"
                        label="Selecione a data"
                        placeholder="Selecione a data"
                        style="width: 100%"
                        format="DD/MM/YYYY"
                        />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="frequencia" v-if="receitasDetails.recorrente == 'Sim'">
                    <SelectComponent label="Frequência:" v-model="receitasDetails.frequencia" data="frequencias" />
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="Observação">
                    <el-input v-model="receitasDetails.observacao" type="textarea" />
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
import { IReceitas } from '@/views/Finance/types';

const formRef = ref<FormInstance>();

const props = defineProps({
    produto: {
        type: Object as () => IReceitas,
        required: true
    }
});

const receitasDetails = reactive(props.produto)

const emits = defineEmits<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: "clickSalvar", receitasDetails: any): void;
    (event: "clickVoltar"): void;
}>();

const handleSalvar = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    emits('clickSalvar', receitasDetails);    
}

const handleVoltar = () => {
    emits('clickVoltar');
}
</script>