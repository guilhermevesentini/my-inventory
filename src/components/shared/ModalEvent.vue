<template>
    <div class="modal modal-mask" v-show="modalShow" transition="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <slot name="header">
                        default header
                    </slot>
                    <button type="button" class="btn-close" @click="modalShow = false"></button>
                </div>
                <div class="modal-body">
                    <slot name="body">
                        default body
                    </slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        default footer
                    </slot>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-mask" v-show="modalShow" transition="modal">
        <div class="modal-wrapper">
            <div class="modal-container">

                <div class="modal-header">
                    <slot name="header">
                        default header
                    </slot>
                </div>

                <div class="modal-body">
                    <slot name="body">
                        default body
                    </slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        default footer
                    </slot>
                </div>
            </div>
        </div>
    </div>
    <div>
    </div>
</template>
  
<script lang="ts" setup>

import { defineProps, defineEmits, ref, computed } from 'vue';

const modalShow = ref(false)

const props = defineProps({
    modalId: {
        type: String
    },
    title: {
        type: String
    },
    modalShow:{
        type: Boolean
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
  