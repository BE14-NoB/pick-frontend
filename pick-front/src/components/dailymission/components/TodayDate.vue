<template>
    <div class="today-wrapper">
      <span class="label">TODAY</span>
      <span class="date">{{ formattedDate }}</span>
    </div>
  </template>
  
  <script setup>
  const today = new Date()
  const days = ['일', '월', '화', '수', '목', '금', '토']
  
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const date = String(today.getDate()).padStart(2, '0')
  const day = days[today.getDay()]
  
  const formattedDate = `${year}. ${month}. ${date}. (${day})`
  </script>
  
  <style scoped>
  .today-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 18px;
  }
  
  .label {
    font-weight: 600;
    color: #2c3e50;
    letter-spacing: 1px;
  }
  
  .date {
    font-weight: 500;
    color: #34495e;
  }
  </style>
  