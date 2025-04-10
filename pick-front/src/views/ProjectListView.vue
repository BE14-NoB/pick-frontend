<template>
      
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
    import { ref, onMounted } from 'vue';
    import ProjectCard from '@/components/ProjectCard.vue'
    
    // 기본 이미지 경로
    const defaultImage = new URL('@/assets/img/pick_title.png', import.meta.url).href
    
    const cardData = ref([])
    
    onMounted(async () => {
    try {
        const response = await fetch('http://localhost:8080/project_room', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
        })
        const result = await response.json()

        console.log('✅ 전체 응답:', result)

        if (Array.isArray(result)) {
        cardData.value = result
        } else {
        console.warn('⚠️ 예상치 못한 응답 구조:', result)
        }
    } catch (error) {
        console.error('❌ 프로젝트 목록 불러오기 실패:', error)
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