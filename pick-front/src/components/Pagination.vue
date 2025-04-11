<template>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">&#60;</button>
  
      <button
        v-for="page in totalPages"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
  
      <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">&#62;</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    currentPage: Number,
    totalPages: Number
  })
  
  const emit = defineEmits(['update:currentPage'])
  
  const changePage = (page) => {
    emit('update:currentPage', page)
  }
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 20px;
  }
  
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 16px;
    color: #999;
  }
  
  button.active {
    font-weight: bold;
    color: black;
  }
  
  button:disabled {
    color: #ccc;
    cursor: default;
  }
  </style>
  