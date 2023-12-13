<template>
    <div class="col-md-12">
        <div class="row" style="margin: 10px 0;">
            <div class="col-md-12">
                <MenuSuperiorAcoes name="teste" adicionar:true />
            </div>

            <div class="col-md-12">
                <div class="col-md-12">
      <div class="mensagem_nao_contem_produto" v-if="produtosFiltrados.length <= 0">
        <img src="../../../assets/img/background-registrar.jpg" alt="empty">
        <div>
          <p>Não existe nenhum produto cadastrado.</p>
          <p>Clique em Adicionar para cadastrar seu primeiro produto.</p>
        </div>
      </div>
      <div class="table-responsive custom-scrollbar" v-if="produtosFiltrados.length > 0" style="
           max-height: calc(100vh - 195px); overflow-y: auto; margin: 10px 0;
            ">
        <!-- <BarraDePesquisa @filtroMudou="atualizarFiltro" /> -->
        <table id="table-desktop" class="table table-bordered table-responsive">
          <thead>
            <tr>
              <!-- <th></th> -->
              <th>Id</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Total</th>
              <th colspan="2">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="produto in produtosFiltrados" :key="produto.id" style="max-width: 25px;">
              <!-- <td @click="toggleIconExpand" style="max-width: 25px;">
                <a data-bs-toggle="collapse" href="#subLinha" role="button" aria-expanded="false"
                    aria-controls="subLinha">
                    <i class="material-icons" title="eye">{{ isExpanded ? 'expand_less' : 'expand_more' }}</i>
                  </a>
                </td> -->
              <td>{{ produto.id }}</td>
              <td>{{ produto.nome }}</td>
              <td>{{ produto.categoria }}</td>
              <td>{{ produto.quantidade }}</td>
              <td>{{ produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
              <td>{{ produto.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
              <td style="text-align: center; max-width: 25px;">
                <i class="material-icons" @click="selecionarLinha(produto.id)" title="Editar">edit</i>
              </td>
              <td style="text-align: center; max-width: 25px;">
                <i class="material-icons" @click="deletarProduto(produto.id)" title="deletar">delete</i>
              </td>
            </tr>
            <!-- <tr>
              <td colspan="10" class="collapse" id="subLinha">
                <div>adawdwad</div>
              </td>              
            </tr> -->
          </tbody>
          <tfoot>
            <tr>
              <th colspan="3">Total</th>
              <th>{{ totalQuantidade }}</th>
              <th></th>
              <th>{{ totalPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</th>
              <th colspan="2"></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import MenuSuperiorAcoes from '@/components/shared/MenuSuperiorAcoes.vue';

</script>

<style lang="scss" scoped>

</style>