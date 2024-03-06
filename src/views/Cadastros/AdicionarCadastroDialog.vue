<template>
    <el-dialog v-bind="$attrs" title="Adicionar Cadastro" width="500" :before-close="onClose">
        <el-form :model="form" label-position="top" style="width: 100%">
            <el-row>                
                <el-col :span="24">
                    <el-form-item label="Nome">
                        <el-input v-model="form.nome" autocomplete="off" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="Origem">
                        <el-select v-model="form.cadastro" placeholder="Selecione..." style="width: 100%;">
                            <el-option v-for="option in cadastrosList" :value="option.nome" :key="option.id">{{option.nome }}</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>            
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="onClose">Cancel</el-button>
                <el-button type="primary" @click="handleSalvar">
                    Salvar
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { defineEmits, ref } from 'vue';
import { EListaCadastro, IForm } from './types';

const form = ref<IForm>({
    nome: '',
    cadastro: ''
})

const cadastrosList = [
    { id: EListaCadastro.categorias, nome: "Categorias" },
    { id: EListaCadastro.fornecedores, nome: "Fornecedores" },
    { id: EListaCadastro.unidades, nome: "Unidades" },
    { id: EListaCadastro.tags, nome: "Tags" }
];

const emits = defineEmits<{
    (event: "handleFechar"): void;
    (event: "handleSalvar", form: IForm): void;
}>();

const onClose = () => {
    form.value.nome = ''
    form.value.cadastro = ''
    
    emits('handleFechar');
}

const handleSalvar = () => {
    emits('handleSalvar', form.value);
}
</script>
