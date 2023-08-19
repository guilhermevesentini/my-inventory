<template>
  <div>
    <div class="inventory__actions">
      <div class="inventory__actions___breadCrumb col-md-4">
        <BreadCrumb :name="name" />
      </div>
      <div class="inventory__actions___filters col-md-8">

        <BarraDePesquisa class="inventory__actions___filters--pesquisa" @filtroMudou="HandleAtualizarFiltro"
          v-if="pesquisa" />

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
          <router-link class="inventory__actions___filters--link" to="/novoProduto" v-slot="{ navigate }"
            v-if="adicionar">
            <div class="inventory__actions___filters--btn-Adicionar" @click="navigate">
              <i class="material-icons">add</i>
              Adicionar
            </div>
          </router-link>
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
<style lang="scss" scoped>
.inventory__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4em;
  border-bottom: 1px solid #80808040;
  margin-bottom: 1.5rem;

  .inventory__actions___actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0;

    .btn {
      display: flex;
      margin-left: 5px;
    }
  }
}

.inventory__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4em;
  border-bottom: 1px solid #80808040;
  margin-bottom: 1.5rem;

  .inventory__actions___filters {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .inventory__actions___filters--link {
      text-decoration: none;
    }

    .inventory__actions___filters--btn-Adicionar {
      display: flex;
      padding: 5px;
      margin: 5px;
      border-radius: 5px;
      color: #333;

      i {
        text-decoration: none;
      }
    }

    .inventory__actions___filters--btn-Adicionar:hover {
      border: 1px solid #0067ff;
      color: #0067ff;
      transition: ease-in-out 0.5s;
    }
  }
}

.adicionar_produto {
  display: flex;
  float: right;
  margin: 10px 0;
  padding: 7px;
  flex-direction: row;
  align-content: center;
  align-items: center;
}

.adicionar_produto i {
  margin-right: 5px;
}
</style>
