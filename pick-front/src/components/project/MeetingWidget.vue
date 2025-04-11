<template>
    <v-card class="widget-container" >
      <div class="header">
        <span class="meeting-title">회의록</span>
        <RouterLink
            to="/project/create-issue"
            >
        <v-btn icon class="edit-btn" size="small" variant="text">
          <v-icon>mdi-pen</v-icon>
        </v-btn>
        </RouterLink>
      
      </div>
  
      <div class="meeting-list">
        <RouterLink
            to="/meeting/1"
            class="meeting-card primary"
        >
            <span class="tag">스프린트</span>
            <div class="meeting-content">
            <div class="title">프론트엔드 UI/UX 설계 회의</div>
            <div class="date">25.03.31</div>
            </div>
        </RouterLink>

        <RouterLink
            to="/meeting/2"
            class="meeting-card"
        >
            <div class="title">프론트엔드 UI/UX 설계 회의</div>
        </RouterLink>
        <RouterLink
            to="/meeting/2"
            class="meeting-card"
        >
            <div class="title">프론트엔드 UI/UX 설계 회의</div>
        </RouterLink>
        </div>

  
      <div class="indicator">● ○ ○</div>
    </v-card>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .widget-container {
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .meeting-title {
    font-size: 20px;
    font-weight: bold;
    color: #4C4C4C;
  }
  
  .edit-btn {
    background-color: #2e2e2e;
    color: white;
    border-radius: 50%;
  }
  
  .meeting-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

/* 핵심: 링크 기본 스타일 제거 + block 처리 */
.meeting-card {
  display: block;
  text-decoration: none;
  color: inherit;

  background-color: #e8f1f8;
  border-radius: 12px;
  padding: 12px 16px;
  transition: background 0.2s;
}

/* hover 효과 */
.meeting-card:hover,
.meeting-card.primary:hover {
  background-color: #ABCFE7;
  cursor: pointer;
}

.meeting-card.primary {
  background-color: #d9e9f4;
  position: relative;
  padding-top: 32px;
}

.tag {
  position: absolute;
  top: 8px;
  left: 12px;
  background-color: #c2ddef;
  color: white;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
}

.title {
  font-size: 15px;
  color: #333;
  font-weight: 500;
}

.date {
  font-size: 12px;
  color: #888;
  text-align: right;
}

  
  .indicator {
    text-align: center;
    font-size: 14px;
    color: #999;
    margin-top: 10px;
  }

  </style>
  