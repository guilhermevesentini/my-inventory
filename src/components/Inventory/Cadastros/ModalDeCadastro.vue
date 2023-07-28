<template>
    <div>
        <div class="modal fade" :id="modalId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">{{ title }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <slot>
                            
                        </slot>
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

import { defineProps, defineEmits, ref } from 'vue';
  
const props = defineProps({
    modalId: {
        type: String
    },
    title: {
        type: String
    }
})

const emits = defineEmits<{
  (event: "clickSalvar"): void;
}>();

const handleSalvar = () => {
    emits('clickSalvar')
}
  
</script>
  
<style lang="scss" scoped>
/* Coloque os estilos SCSS específicos do componente aqui */
</style>
  