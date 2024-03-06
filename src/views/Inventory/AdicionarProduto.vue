<template>
    <el-row>
        <el-col :span="24">
            <MenuSuperiorAcoes name="Novo Produto" :btnVoltar="true" :btnLimpar="true"
                @clickVoltar="Voltar" @clickLimpar="Limpar" />
        </el-col>
        <el-col :span="24">
            <FormProduto 
            :produto="produto"
            @click-salvar="Salvar"
            @click-voltar="Voltar"
            ></FormProduto>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { computed, reactive, inject } from "@vue/runtime-core"
import { IProduto } from '@/@types/types'
import router from "@/router";
import useGerarId from "@/composables/shared/useCriarRandomId"
import { IGerarId } from "@/composables/types";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import InventoryHttpGateway from "@/services/Inventory/gateways/InventoryHttpGateway";
import FormProduto from "./FormProduto.vue";


const invetoryGateway = inject('invetoryGateway') as InventoryHttpGateway;

const config: IGerarId = {
    quantidade: 16,
    tipo: 'string'
}

let produtoDetails: IProduto = reactive({
    id: 0,
    _id: '',
    _id_Produto: '',
    nome: "",
    descricao: "",
    codigo: "",
    marca: "",
    modelo: "",
    categoria: "",
    quantidade: 0,
    preco: 0,
    fornecedor: "",
    dataAquisicao: "",
    localizacao: "",
    tag: "",
    observacao: '',
    total: 0,
})

let produto = computed(() => produtoDetails)

const validarProduto = ((produto: IProduto) => {
    var validateName = produto.nome.length > 20 ? true : false;
    var validateDescricao = produto.descricao.length > 20 ? true : false;

    var hasLength = validateName || validateDescricao;

    if (hasLength) {
        alert("Nome ou descrição não deve conter mais do que 20 caracters!");
        return false
    }

    if (!produto.nome || !produto.descricao || !produto.quantidade || !produto.preco) {
        return false;
    }
    return true;
});



const Salvar = (async () => {
    if (!validarProduto(produto.value)) {
        alert("Preencha os campos obrigatórios!");
        console.log('teste')
        return;
    }
    const novoId = useGerarId(config);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getUser: any = localStorage.getItem('user')
    const idUsuario = JSON.parse(getUser);

    // Alterar o valor do campo "_id" do objeto "produto.value"
    produto.value._id_Produto = novoId;
    produto.value._id = idUsuario._id
    
    const req = await invetoryGateway.salvarProduto(produto.value);
    //const res = await req.json();
    if (req) {
        Limpar()
        router.push('/inventory')
    }
})

const Limpar = (() => {
    produtoDetails.nome = '';
    produtoDetails.descricao = '';
    produtoDetails.categoria = '';
    produtoDetails.quantidade = 0;
    produtoDetails.preco = 0;
})

const Voltar = (() => {
    Limpar()
    router.push('/inventory')
})
</script>

<style lang="scss" scoped></style>