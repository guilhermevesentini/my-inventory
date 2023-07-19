<template>
    <div class="container_pesquisar" >
      <input type="search" placeholder="Digite o item" v-model="filtro" :class="{ dark_mode_on: darkMode, light_mode_on: !darkMode }"/>
    </div>
</template>
<script lang="ts" setup>
import { defineEmits, ref, watch } from 'vue'
import { darkMode } from "@/composables/shared/darkMode";
let filtro = ref('')

const emitters = defineEmits({
  filtroMudou: (filtro: string) => true
})

watch(() => filtro.value, (novoFiltro: string) => {
    emitters('filtroMudou', novoFiltro)
})

</script>

<style scoped>
.light_mode_on {
    background-color: #fff;
    color: #333;
}

.dark_mode_on {
    background-color: #333;
    color: #fff;
}
.container_pesquisar input {
  width: 100%;
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #80808061;
}
</style>@/composables/shared/darkMode