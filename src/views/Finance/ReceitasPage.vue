<template>
    <div class="row" style="margin: 10px 0;">
      <div class="col-md-12">
        <MenuSuperiorAcoes name="Receitas" :adicionar="true"/>
      </div>
  
      <div class="col-md-12">
        <div class="mensagem_nao_contem_produto" v-if="listaDeReceitas.length <= 0">
        <img src="../../assets/img/empty.png" alt="empty">
        <div>
          <p>Não existe nenhuma receita cadastrada.</p>
          <p>Clique em Adicionar para cadastrar sua primeira receita.</p>
        </div>
      </div>

        <TableComponent :items="listaDeReceitas" :showPagination="true"
              v-if="listaDeReceitas.length > 0" @deletar="deletarProduto"/>
  
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
    import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
    import TableComponent from "@/components/shared/TableComponent.vue";
    import { ref } from "vue";
  
    let showModal = ref(false)

    const listaDeReceitas = ref<Array<any>>([]); 

        const deletarProduto = () => {
            console.log('delete');
            
        }
  </script>
    
  <style lang="scss" scoped>
  .mensagem_nao_contem_produto {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 166px);
  padding: 20px 10px;
  background-color: #ffffff;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: center;

  img {
    width: 400px;
    margin: 1em;
  }

  p {
    text-align: center;
  }
}
  </style>
    