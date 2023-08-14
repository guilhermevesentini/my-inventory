<template>
    <div>
        <div class="modal fade" :id="modalId" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Cadastro de {{ title }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="input_form col-md-12">
                                    <label>Nome:</label>
                                    <input class="form-control" type="text" placeholder="Digite ao nome" v-model="nome" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-primary" @click="handleSalvar">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>

import { defineProps, defineEmits, ref, computed } from 'vue';

const props = defineProps({
    modalId: {
        type: String
    },
    title: {
        type: String
    }
})

let nome = ref('')

const emits = defineEmits<{
    (event: "clickSalvar", nome: string): void;
}>();

const handleSalvar = () => {
    emits('clickSalvar', nome.value)
    nome.value = ''
}

</script>
  
<style lang="scss" scoped>
/* Coloque os estilos SCSS específicos do componente aqui */
</style>
  