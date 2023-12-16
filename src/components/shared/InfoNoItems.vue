<template>
    <div class="col-md-12">
        <div class="mensagem_nao_contem_produto">
            <img src="../../assets/img/empty.png" alt="empty">
            <div>
                <p>Não existe nenhuma {{ props.nome }} cadastrada.</p>
                <p>Clique em Adicionar para cadastrar sua primeira {{ props.nome }}.</p>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
    nome: {
        type: String,
        default: 'item'
    }
})
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