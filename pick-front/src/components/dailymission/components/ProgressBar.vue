<template>
    <div class="progress-container">
      <v-progress-linear
        :model-value="progressPercent"
        color="primary"
        height="15"
        rounded
      />
    </div>
  </template>
  
  <script setup>
  import { computed, defineProps } from 'vue'
  
  const props = defineProps({
    total: Number,
    completed: Number
  })
  
  const progressPercent = computed(() =>
    props.total > 0 ? Math.round((props.completed / props.total) * 100) : 0
  )
  </script>
  
  <style scoped>
  .progress-container {
    margin: 10px 0;
  }
  </style>
  