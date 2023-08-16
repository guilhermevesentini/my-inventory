<template>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="$emit('prevPage')" :disabled="currentPage === 1">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li class="page-item" v-for="page in totalPageCount" :key="page" :class="{ active: currentPage === page }">
        <button class="page-link" @click="changePage(page)">{{ page }}</button>
      </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPageCount }">
          <button class="page-link" @click="$emit('nextPage')" :disabled="currentPage === totalPageCount">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  </template>
  
  <script lang="ts" setup>
  import { defineProps,defineEmits, ref, watch } from 'vue';
  
  const props = defineProps({
    currentPage: {
      type: Number,
      required: true,
    },
    totalPageCount: {
      type: Number,
      required: true,
    },
  });

  const emit = defineEmits<{
    (event: "currentPageChanged", value: number): void;
  }>();
  
  const current = ref(props.currentPage);
  
  const setCurrentPage = (page: number) => {
    current.value = page;
  };
  
  watch(() => props.currentPage, (newValue) => {
    current.value = newValue;
  });

  const changePage = (page: number) => {
  // Emit the custom event to the parent with the selected page number
    emit('currentPageChanged', page);
    };
  </script>
  