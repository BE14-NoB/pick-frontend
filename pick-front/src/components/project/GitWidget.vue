<template>
    <v-card class="commit-card" elevation="0" rounded="xl">
      <!-- 상단 아이콘 -->
      <div class="icon-wrapper">
        <v-icon size="40" color="white">mdi-source-branch</v-icon>
      </div>
  
      <!-- 텍스트 정보 -->
      <div class="text-content">
        <h3 class="commit-title">Commit</h3>
        <p class="commit-subtitle">120 Commits</p>
      </div>
  
      <!-- 브랜치 드롭다운 -->
      <div class="branch-selector">
        <v-btn variant="outlined" color="white" class="branch-btn" rounded="pill">
          <v-icon start size="20">mdi-source-branch</v-icon>
          main
          <v-icon end size="16">mdi-chevron-down</v-icon>
        </v-btn>
      </div>
    </v-card>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .commit-card {
    width: 200px;
    padding: 24px;
    background: linear-gradient(to bottom, #FDF7F2, #FBEBE1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  
  .icon-wrapper {
    background-color: #F77E36;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .text-content {
    text-align: center;
  }
  
  .commit-title {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: #1A1446;
  }
  
  .commit-subtitle {
    margin: 0;
    font-size: 14px;
    color: #8e8e8e;
  }
  
  .branch-selector {
    margin-top: auto;
  }
  
  .branch-btn {
    background-color: white;
    color: black;
    font-weight: 500;
    text-transform: none;
  }
  </style>
  