<template>
    <v-card class="calendar-card">
      <!-- 우측 상단 떠있는 토글 버튼 -->
      <v-btn
        icon
        variant="elevated"
        class="floating-toggle"
        @click="toggleView"
        elevation="3"
        size="small"
        color="white"
      >
        <v-icon color="black">{{ showCalendar ? 'mdi-chart-bar' : 'mdi-calendar' }}</v-icon>
      </v-btn>
  
      <template v-if="showCalendar">
        <v-date-picker show-adjacent-months class="calendar">
          <template #title></template>
        </v-date-picker>
      </template>
      <template v-else>
        <div class="content-box">
          <WeeklyChart />
        </div>
      </template>
    </v-card>
  </template>
  
  
  <script setup>
  import WeeklyChart from '@/components/project/WeeklyChart.vue'
  import { ref } from 'vue'
  
  const showCalendar = ref(true)
  
  function toggleView() {
    showCalendar.value = !showCalendar.value
  }
  </script>
  <style scoped>
  .calendar-card {
    position: relative; /* 🔥 떠 있는 버튼 기준이 됨 */
    display: flex;
    flex-direction: column;
    padding: 24px;
    height: 100%;
  }
  
  .floating-toggle {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
    background-color: #f0f0f0;
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
  
  .calendar {
    width: 100%;
    height: 100%;
  }
  
  .content-box {
    width: 100%;
  }
  
  /* Vuetify 내부 타이틀 제거 */
  :deep(.v-picker-title) {
    display: none !important;
  }
  :deep(.v-date-picker-header) {
    margin-top: 0 !important;
  }
  </style>
  