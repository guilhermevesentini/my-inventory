<template>
    <div>
        <label>{{ label }}</label>
        <select class="form-control" v-model="selectedValue" placeholder="Selecione...">
            <option disabled value="">{{ placeholder }}</option>
            <option v-for="option in categoriasList" :value="option.nome" :key="option._id">{{ option.nome }}</option>
        </select>
    </div>    
</template>
  
<script setup lang="ts">
import { ICategorias } from "@/@types/types";
import { ref, watch, defineProps, defineEmits, PropType, reactive, watchEffect } from "vue";

let categoriasList: ICategorias[] = reactive([]);

const buscarCategorias = async (data: any) => {
    try {
        const response = await fetch(`http://localhost:3001/${data}`);
        if (response.ok) {
            const data = await response.json();
            categoriasList.length = 0;
            // Popule a lista categorias apenas com os _id das categorias
            categoriasList.push(...data);
        } else {
            // Trate o erro, se necessário
            console.error("Erro ao buscar categorias");
        }
    } catch (error) {
        // Trate o erro, se necessário
        console.error("Erro ao buscar categorias", error);
    }
};

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Selecione uma opção",
  },
  options: {
    type: Array as PropType<ICategorias[]>,
    default: () => [],
  },
  valueKey: {
    type: String,
    default: "_id",
  },
  textKey: {
    type: String,
    default: "nome",
  },
  modelValue: {
    type: String
  },
  data: {
    type: String
  }
});

const selectedValue = ref(props.modelValue);
const endPointName = ref(props.data);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

watch(selectedValue, (newValue) => {
    emit("update:modelValue", newValue);
});

watchEffect(() => {
  buscarCategorias(endPointName.value);
  if(props.modelValue){
    selectedValue.value = props.modelValue
  }
});
</script>






