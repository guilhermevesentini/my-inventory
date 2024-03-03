<template>
    <div>
      <el-select
        v-model="selectedValue"
        placeholder="Selecione..."
      >
      <el-option v-for="option in categoriasList" :value="option.nome" :key="option._id">{{ option.nome }}</el-option>
      </el-select>
    </div>    
</template>
  
<script setup lang="ts">
import { ICategorias } from "@/@types/types";
import { ref, watch, defineProps, defineEmits, PropType, reactive, watchEffect } from "vue";

let categoriasList: ICategorias[] = reactive([]);

const buscarCategorias = async (data: unknown) => {
    try {
        const response = await fetch(`http://localhost:3001/${data}`);
        if (response.ok) {
            const data = await response.json();
            categoriasList.length = 0;
            categoriasList.push(...data);
        } else {
            console.error("Erro ao buscar categorias");
        }
    } catch (error) {
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
  (event: "update:modelValue", value: string | undefined): void;
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






