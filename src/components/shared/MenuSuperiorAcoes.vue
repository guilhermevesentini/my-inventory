<template>
  <el-row class="row-bg" justify="space-between">
    <el-col :span="6"><BreadCrumb :name="props.name" /></el-col>
    <el-col :span="6" style="display: flex;flex-wrap: wrap; justify-content: flex-end;">
      <el-button plain v-if="btnVoltar" @click="HandleVoltar" :icon="TopLeft" round>Voltar</el-button>
      <el-button plain v-if="btnLimpar" @click="HandleLimpar" :icon="Brush" round>Limpar</el-button>
      <el-button type="primary" plain v-if="btnSalvar" @click="HandleSalvar" :icon="Plus" round>Adicionar</el-button>
      <el-button type="primary" plain v-if="btnCriar" @click="HandleCriar" :icon="Plus" round>Adicionar</el-button>
      <el-button type="primary" plain v-if="btnCriarNovoEvento" @click="HandleCriarEvento" :icon="Plus" round>Adicionar</el-button>
      <el-button type="primary" plain v-if="btnCriarNovoProduto" @click="HandleCriarProduto" :icon="Plus" round>Adicionar</el-button>
      <el-button type="primary" plain v-if="btnCriarNovaReceita" @click="HandleCriarReceitas" :icon="Plus" round>Adicionar</el-button>
      <el-button type="primary" plain v-if="btnCriarNovaDespesa" @click="HandleCriarDespesa" :icon="Plus" round>Adicionar</el-button>
      <el-button type="primary" plain v-if="btnCriarNovaOrdem" @click="HandleCriarOrdem" :icon="Plus" round>Adicionar</el-button>
      <el-button type="primary" plain v-if="btnCriarCadastro" @click="HandleCriarCadastro" :icon="Plus" round>Adicionar</el-button>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import BreadCrumb from './BreadCrumb.vue';
import { defineProps, defineEmits } from 'vue';
import {
  Plus,
  TopLeft,
  Brush
} from '@element-plus/icons-vue';
import { ICadastroItem } from '@/views/Cadastros/types';

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
  btnCriarNovoProduto: {
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
  btnCriarCadastro: {
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
  (event: "clickCriarNovoEvento"): ICadastroItem;
  (event: "clickCriarNovoProduto"): ICadastroItem;
  (event: "clickCriarNovaReceita"): ICadastroItem;
  (event: "clickCriarNovaDespesa"): ICadastroItem;
  (event: "clickCriarNovaOrdem"): ICadastroItem;
  (event: "clickCriarCadastro"): ICadastroItem;
  (event: "update:atualizarFiltro"): ICadastroItem;
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
const HandleCriarProduto = () => {
  emit('clickCriarNovoProduto')
}
const HandleCriarDespesa = () => {
  emit('clickCriarNovaDespesa')
}
const HandleCriarOrdem = () => {
  emit('clickCriarNovaOrdem')
}
const HandleCriarCadastro = () => {
  emit('clickCriarCadastro')
}

</script>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
  padding: 10px 10px 25px 10px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>