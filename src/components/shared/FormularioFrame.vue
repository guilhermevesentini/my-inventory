<template>
    
    <el-form ref="formRef" :model="formRef" label-position="top" style="width: 100%">
        <el-row :gutter="10">
            <slot name="formItems"></slot>
            <el-col :span="24">
                <el-button @click="handleVoltar">Cancel</el-button>
                <el-button type="primary" @click="handleSalvar(formRef)">Salvar</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script lang="ts" setup>
import { FormInstance } from 'element-plus';
import { ref, defineEmits } from 'vue';

const formRef = ref<FormInstance>();

const emits = defineEmits<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: "clickSalvar", produtoDetails: any): void;
    (event: "clickVoltar"): void;
}>();

const handleSalvar = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    emits('clickSalvar');    
}

const handleVoltar = () => {
    emits('clickVoltar');
}

</script>