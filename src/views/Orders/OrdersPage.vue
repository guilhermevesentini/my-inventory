<template>
  <div class="row" style="margin: 10px 0;">
    <div class="col-md-12">
      <MenuSuperiorAcoes name="Ordens" :btnCriarNovaOrdem="true" @clickCriarNovaOrdem="adicionarOrdem" />
    </div>

    <InfoNoItems v-if="listaDeOrdens.length <= 0" nome="ordem" />

    <table id="table-desktop" class="table table-bordered table-responsive">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Recorrênte</th>
          <th>Frequência</th>
          <th>Previsão</th>
          <th colspan="2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in listaDeOrdens" :key="item.id">
          <td>{{ item.nome }}</td>
          <td>{{ item.descricao }}</td>          
          <td>{{ item.recorrente }}</td>
          <td>{{ item.frequencia }}</td>
          <td>{{ item.previsao }}</td>
          <td>{{ item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
          <td style="text-align: center; width: 40px;">
            <i class="material-icons" @click="editarOrdem(item.id)" title="Editar">edit</i>
          </td>
          <td style="text-align: center; width: 40px;">
            <i class="material-icons" @click="deletarOrdem(item.id)" title="deletar">delete</i>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="5">Total</th>
          <th>{{ totalPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</th>
          <th colspan="3"></th>
        </tr>
      </tfoot>
    </table>


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
</template>
    
<script lang="ts" setup>
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import InfoNoItems from "@/components/shared/InfoNoItems.vue";
import { onMounted, computed } from "@vue/runtime-core";
import { ref } from "vue";
import router from "@/router";

let showModal = ref(false)

interface IOrdens {
  id: string
  nome: string
  descricao: string
  valor: number
  recorrente: string
  previsao: string
  frequencia: string
  observacao: string
}

const listaDeOrdens = ref<Array<IOrdens>>([]);

const adicionarOrdem = () => {
  router.push('/Adicionar_Ordem')
}

const editarOrdem = ((produto: string) => {
  console.log(produto);
  
  router.push({ path: `/Editar_Ordem/${produto}` });
})

const deletarOrdem = async (productId: string) => {
  const req = await fetch(`http://localhost:3001/orders/${productId}`, {
    method: "DELETE",
  });

  if (req.ok) {
    obterOrdens();
  }
}

const obterOrdens = async () => {
  const req = await fetch(`http://localhost:3001/orders`);
  const response = await req.json();

  //const produtosDoUsuario = response.filter(produto => produto._id === userId.toString());
  //console.log(produtosDoUsuario);

  listaDeOrdens.value = response;
}

const totalPreco = computed(() => {
  const valores = listaDeOrdens.value.map(t => t.valor)
  return valores.reduce((valor, valores) => {
    return valor + valores;
  }, 0);
});

onMounted(() => {
  obterOrdens()
})
</script>
    
<style lang="scss" scoped></style>
    