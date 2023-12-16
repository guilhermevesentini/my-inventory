<template>
    <div class="row" style="margin: 10px 0;"> 
        <div class="col-md-12">
            <div class="inventory__actions">
                <div class="inventory__actions___breadCrumb col-md-4">
                    <BreadCrumb />
                </div>
                <div class="inventory__actions___actions col-md-8">
                    <div class="btn" @click="Voltar">
                        <i class="material-icons">keyboard_return</i>                        
                    </div>
                    <div class="btn" @click="Limpar">
                        <i class="material-icons">cleaning_services</i>                        
                    </div>
                    <div class="btn" @click="Salvar">
                        <i class="material-icons">save</i>                        
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-4">
                    <input class="form-control" type="text" placeholder="Digite o nome do cadastro" v-model="ItemName" />
                </div>
                <div class="col-md-6">
                    <input class="form-control" type="text" placeholder="Digite o nome do item" v-model="nome" />
                </div>
                <div class="col">
                    <button class="btn btn-primary btn-sm" @click="Adicionar">
                        <i class="material-icons">add</i>
                    </button>  
                </div>                              
            </div>
        </div>
        <div class="col-md-12">
        <div class="table-responsive custom-scrollbar" style="
             max-height: calc(100vh - 195px); overflow-y: auto; margin: 10px 0;
              ">
          <table id="table-desktop" class="table table-bordered table-responsive">
            <thead>
              <tr>
                <th>Nome</th>
                <th colspan="2"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cadastro in listaDeCadastros" :key="cadastro.id">
                <td>{{ cadastro.nome }}</td>                
                <!-- <td style="text-align: center; width: 40px;">
                  <i class="material-icons" @click="selecionarLinha(cadastro.id)" title="Editar">edit</i>
                </td>
                <td style="text-align: center; width: 40px;">
                  <i class="material-icons" @click="deletarProduto(cadastro.id)" title="deletar">delete</i>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "@vue/runtime-core"
import router from "@/router";
import BreadCrumb from "../../shared/BreadCrumb.vue";

interface IItem {
    item: Array<{
        nome: string;
        id: string;
        _id: string;
    }>;
}

let nome = ref('')

const ItemName = ref('');

const listaDeCadastros = reactive<Array<IItem>>([]);

    const Adicionar = () => {
    const isDuplicated = listaDeCadastros.some(item => item.nome === nome.value);
    if (!isDuplicated) {
        listaDeCadastros.push({ nome: nome.value, id: 'novoId', _id: '' });
        nome.value = '';
    } else {
        alert('Item duplicado');
    }
};

const validarProduto = (cadastro: unknown) => {
    if (cadastro.length <= 0) return true;

    const hasInvalidName = cadastro.some((element: unknown) => element.nome.length > 20 || element.nome === '');
    if (hasInvalidName) {
        alert("Nome ou descrição não deve conter mais do que 20 caracteres!");
        return false;
    }

    return true;
};

const criarObjetoParaSalvar = () => {
  const objetoParaSalvar = {};

  // Convert the reactive proxy array to a plain JavaScript array using slice
  const listaDeCadastrosArray = listaDeCadastros.slice();

  listaDeCadastrosArray.forEach(category => {
    if (Array.isArray(category.items)) {
      objetoParaSalvar[category.itemName] = category.items.map(item => {
        return {
          nome: item.nome,
          id: item.id,
          _id: item._id
        };
      });
    } else {
      console.warn(`Items for category "${category.itemName}" is not an array.`);
    }
  });

  return objetoParaSalvar;
};


const Salvar = async () => {
    if (!validarProduto(listaDeCadastros)) {
        alert("Preencha todos os campos do produto!");
        return;
    }
    const getUser = localStorage.getItem('user');
    const idUsuario = JSON.parse(getUser);

    // Assuming you want to set _id for each item in the list.
    listaDeCadastros.forEach(item => item._id = idUsuario._id);

    const objetoParaSalvar = criarObjetoParaSalvar();

    const dataJson = JSON.stringify(objetoParaSalvar);

    try {
        const req = await fetch("http://localhost:3001/cadastros", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: dataJson,
        });
        
        if (req.ok) {
            router.push('/inventory_config');
        } else {
            alert('Failed to save data.');
        }
    } catch (error) {
        console.error("Error while saving data:", error);
        alert('An error occurred while saving data.');
    }
};

const Voltar = () => {
    router.push('/inventory_config');
};

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
    }
    .input_form {
    margin: 10px 0;
    }

    .acoes {
        display: flex;
        margin: 10px 0;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
    }
}
</style>