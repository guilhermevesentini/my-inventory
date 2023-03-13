<template>
    <div class="container_pesquisar">
      <input type="search" placeholder="Digite o item" v-model="filtro"/>
    </div>
</template>
<script lang="ts" setup>
import { defineEmits, ref, watch } from 'vue'

let filtro = ref('')

const emitters = defineEmits({
  filtroMudou: (filtro: string) => true
})

watch(() => filtro.value, (novoFiltro: string) => {
    emitters('filtroMudou', novoFiltro)
})

</script>

<style scoped>
.container_pesquisar input {
  width: 100%;
  margin: 10px 0;
  padding: 8px;
}
</style>