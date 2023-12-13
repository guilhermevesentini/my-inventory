<template>
  <div>
    <div class="inventory__actions">
      <div class="inventory__actions___breadCrumb col-md-4">
        <BreadCrumb :name="name" />
      </div>
      <div class="inventory__actions___filters col-md-8">

        <!-- <BarraDePesquisa class="inventory__actions___filters--pesquisa" @filtroMudou="HandleAtualizarFiltro"
          v-if="pesquisa" /> -->

        <div class="inventory__actions___actions col-md-8">
          <div class="btn" @click="HandleVoltar" v-if="btnVoltar">
            <i class="material-icons">keyboard_return</i>
          </div>
          <div class="btn" @click="HandleLimpar" v-if="btnLimpar">
            <i class="material-icons">cleaning_services</i>
          </div>
          <div class="btn" @click="HandleSalvar" v-if="btnSalvar">
            <i class="material-icons">save</i>
          </div>
          <div class="btn" @click="HandleCriar" v-if="btnCriar">
            <i class="material-icons">add</i>
          </div>
          <div class="btn" @click="HandleCriarEvento" v-if="btnCriarNovoEvento">
            <i class="material-icons">add</i> Adicionar
          </div>
          <div class="btn" @click="HandleCriarReceitas" v-if="btnCriarNovaReceita">
            <i class="material-icons">add</i> Adicionar
          </div>
          <div class="btn" @click="HandleCriarDespesa" v-if="btnCriarNovaDespesa">
            <i class="material-icons">add</i> Adicionar
          </div>
          <div class="btn" @click="HandleCriarOrdem" v-if="btnCriarNovaOrdem">
            <i class="material-icons">add</i> Adicionar
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import BreadCrumb from './BreadCrumb.vue';
import { defineProps, defineEmits, ref, watchEffect } from 'vue';

const props = defineProps({
  BreadCrumbName: {
    type: String,
  },
  name: {
    type: String,
    default: ""
  },
  pesquisa: {
    type: Boolean,
    default: false
  },
  btnVoltar: {
    type: Boolean,
    default: false
  },
  btnLimpar: {
    type: Boolean,
    default: false
  },
  btnSalvar: {
    type: Boolean,
    default: false
  },
  btnCriar: {
    type: Boolean,
    default: false
  },
  btnCriarNovoEvento: {
    type: Boolean,
    default: false
  },
  btnCriarNovaReceita: {
    type: Boolean,
    default: false
  },
  btnCriarNovaDespesa: {
    type: Boolean,
    default: false
  },
  btnCriarNovaOrdem: {
    type: Boolean,
    default: false
  },
  adicionar: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits<{
  (event: "clickVoltar"): void;
  (event: "clickLimpar"): void;
  (event: "clickSalvar"): void;
  (event: "clickCriar"): void;
  (event: "clickCriarNovoEvento"): void;
  (event: "clickCriarNovaReceita"): void;
  (event: "clickCriarNovaDespesa"): void;
  (event: "clickCriarNovaOrdem"): void;
  (event: "update:atualizarFiltro"): void;
}>();

const HandleVoltar = () => {
  emit('clickVoltar')
}
const HandleLimpar = () => {
  emit('clickLimpar')
}
const HandleSalvar = () => {
  emit('clickSalvar')
}
const HandleCriar = () => {
  emit('clickCriar')
}
const HandleCriarEvento = () => {
  emit('clickCriarNovoEvento')
}
const HandleCriarReceitas = () => {
  emit('clickCriarNovaReceita')
}
const HandleCriarDespesa = () => {
  emit('clickCriarNovaDespesa')
}
const HandleCriarOrdem = () => {
  emit('clickCriarNovaOrdem')
}
const HandleAtualizarFiltro = () => {
  emit('update:atualizarFiltro')
}

</script>