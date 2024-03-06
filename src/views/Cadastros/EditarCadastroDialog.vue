<template>
    <el-dialog v-model:visible="showDialog" title="Editar Cadastro" width="500" :before-close="onClose">
        <el-form label-position="top" style="width: 100%">
            <el-row>                
                <el-col :span="24">
                    <el-form-item label="Nome">
                        <el-input v-model="nome" autocomplete="off" />
                    </el-form-item>
                </el-col>
            </el-row>            
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="onClose">Cancel</el-button>
                <el-button type="primary" @click="handleEditar">
                    Salvar
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { defineEmits, ref, defineProps, computed, watch } from 'vue';

interface IProps {
    nome: string
    id: string | number
    showDialog: boolean
}

const props = defineProps<IProps>();

const showDialog = computed(() => props.showDialog)

const nome = ref<string>('');
const id = ref<string | number>();

watch(props, (newValue) => {
    nome.value = newValue.nome;
    id.value = props.id
})

const emits = defineEmits<{
    (event: "handleFechar"): void;
    (event: "handleEditar", nome: string, id: string | number): void;
}>();

const onClose = () => {
    nome.value = ''
    id.value = ''
    emits('handleFechar');
}

const handleEditar = () => {
    if(!nome.value) return
    emits('handleEditar', nome.value, id.value);
}
</script>
