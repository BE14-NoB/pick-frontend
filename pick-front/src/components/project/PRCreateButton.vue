<template>
    <v-btn class="pr-create-btn" color="primary" variant="tonal" prepend-icon="mdi-source-branch-plus" @click="handleClick">
      PR 생성하기
    </v-btn>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/project/review-pull-request')
  }
  </script>
  
  <style scoped>
  .pr-create-btn {
    float: right;
    font-weight: 600;
    margin-bottom: 16px;
    text-transform: none;
  }
  </style>
  