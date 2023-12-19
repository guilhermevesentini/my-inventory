<template>
    <el-row>
        <el-col :span="24">
            <MenuSuperiorAcoes name="Novo Produto" :btnVoltar="true" :btnLimpar="true"
                @clickVoltar="Voltar" @clickLimpar="Limpar" />
        </el-col>
        <el-col :span="24">
            <el-form :model="produtoDetails" label-position="top" style="width: 100%">
                <el-row :gutter="10">
                    <el-col :span="6">
                        <el-form-item label="Nome">
                            <el-input v-model="produtoDetails.nome" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="Descrição">
                            <el-input v-model="produtoDetails.descricao" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="Categoria">
                            <el-select v-model="produtoDetails.categoria" placeholder="Categoria" style="width: 100%">
                                <el-option v-for="categoria in categoriaList" :key="categoria.id" :label="categoria.nome"
                                    :value="categoria.id" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="Código">
                            <el-input v-model="produtoDetails.codigo" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="Marca">
                            <el-input v-model="produtoDetails.marca" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="Modelo">
                            <el-input v-model="produtoDetails.modelo" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="Quantidade" prop="number" :rules="[
                                { required: true, message: 'Campo obrigatório' },
                                { type: 'number', message: 'Quantidade deve ser um número' },
                            ]">
                            <el-input v-model="produtoDetails.quantidade" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="Preço" prop="number" :rules="[
                                { required: true, message: 'Campo obrigatório' },
                                { type: 'number', message: 'Preço deve ser um número' },
                            ]">
                            <el-input v-model="produtoDetails.preco" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="Fornecedores">
                            <el-select v-model="produtoDetails.fornecedor" placeholder="Fornecedore" style="width: 100%">
                                <el-option v-for="fornecedor in fornecedoresList" :key="fornecedor.id" :label="fornecedor.nome"
                                    :value="fornecedor.id" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="Data de Aquisição">
                            <el-date-picker
                                v-model="produtoDetails.dataAquisicao"
                                type="date"
                                placeholder="Selecione a data"
                                style="width: 100%"
                                />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="Unidades">
                            <el-select v-model="produtoDetails.localizacao" placeholder="Unidade" style="width: 100%">
                                <el-option v-for="unidades in unidadesList" :key="unidades.id" :label="unidades.nome"
                                    :value="unidades.id" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="Tags">
                            <el-select v-model="produtoDetails.tag" placeholder="Tag" style="width: 100%">
                                <el-option v-for="tags in tagsList" :key="tags.id" :label="tags.nome"
                                    :value="tags.id" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="Observação">
                            <el-input v-model="produtoDetails.observacao" type="textarea" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-button>Cancel</el-button>
                        <el-button type="primary" @click="Salvar">Salvar</el-button>                        
                    </el-col>
                </el-row>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { computed, reactive, ref, inject, onMounted } from "@vue/runtime-core"
import { IProduto } from '@/@types/types'
import router from "@/router";
import useGerarId from "@/composables/shared/useCriarRandomId"
import { IGerarId } from "@/composables/types";
import MenuSuperiorAcoes from "@/components/shared/MenuSuperiorAcoes.vue";
import SharedHttpGateway from "../../services/shared/gateways/SharedHttpGateway"

const sharedGateway = inject('sharedGateway') as SharedHttpGateway;

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const categoriaList: any = ref([])
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fornecedoresList: any = ref([])
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const unidadesList: any = ref([])
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tagsList: any = ref([])

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

const obterCategorias = async () => {
    const [ categorias, fornecedores, unidades, tags ] = await Promise.all([
    sharedGateway.obterCategoriasList(), sharedGateway.obterFornecedoresList(), sharedGateway.obterUnidadesList(), sharedGateway.obterTagsList() 
  ]); 

    categoriaList.value = categorias
    fornecedoresList.value = fornecedores
    unidadesList.value = unidades
    tagsList.value = tags
}

const Salvar = (async () => {
    if (!validarProduto(produto.value)) {
        alert("Preencha todos os campos do produto!");
        console.log('teste')
        return;
    }
    console.log('teste')
    const novoId = useGerarId(config);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getUser: any = localStorage.getItem('user')
    const idUsuario = JSON.parse(getUser);

    // Alterar o valor do campo "_id" do objeto "produto.value"
    produto.value._id_Produto = novoId;
    produto.value._id = idUsuario._id

    const dataJson = JSON.stringify(produto.value);
    console.log('teste')
    const req = await fetch("http://localhost:3001/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
    });
    //const res = await req.json();
    if (req.ok) {
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

const updateProdutoDetails = (updatedProduto) => {
    produtoDetails = updatedProduto;
};

onMounted(async () => {
    await obterCategorias()
})

</script>

<style lang="scss" scoped></style>