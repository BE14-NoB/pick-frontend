<template>
    <div>프로젝트 페이지</div>
  
    <div class="card-list">
      <ProjectCard
        v-for="(card, index) in cardData"
        :key="index"
        :title="card.name"
        :subtitle="card.duration_time"
        :imgSrc="defaultImage"
        :detail="card.content"
      />
    </div>
</template>
  


<script setup>
  import { ref, onMounted } from 'vue'
  import ProjectCard from '@/components/ProjectCard.vue'
  
  // 썸네일이 없는 경우 쓸 기본 이미지
  const defaultImage = new URL('@/assets/img/pick_title.png', import.meta.url).href
  
  const cardData = ref([])
  
  onMounted(async () => {
    try {
      const response = await fetch('http://localhost:8080/project_room', {
        method: 'GET',
      })
      const result = await response.json()
  
      // 서버 응답 구조에 따라 파싱
      cardData.value = result.project_room
    } catch (error) {
      console.error('프로젝트 목록을 불러오는 중 오류 발생:', error)
    }
  })
</script>
  
<style scoped>
  .card-list {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
    padding: 20px;
  }
</style>
  