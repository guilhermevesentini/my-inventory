<template>
  <div class="row" style="margin: 10px 0;">
    <div class="col-md-12">
      <MenuSuperiorAcoes name="Financeiro" />
    </div>

    <div class="col-md-12">
      <br>
      
      <button id="show-modal" @click="showModal = true">Show Modal</button>
      
      <br>
      <br>

      <div class="modal-mask" v-show="showModal" transition="modal">
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
                <button class="modal-default-button" @click="showModal = false">
                  OK
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
// Coloque a lógica do script aqui

import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import { ref } from "vue";

let showModal = ref(false)
</script>
  
<style lang="scss" scoped>
/* Coloque os estilos SCSS específicos do componente aqui */
</style>
  