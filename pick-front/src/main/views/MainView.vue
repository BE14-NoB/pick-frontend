<template>
    <div class="main-view">
      <!-- 캐러셀 -->
      <section class="carousel-section">
        <v-carousel
          v-model="currentSlide"
          hide-delimiters
          show-arrows
          :style="{ backgroundColor: `#${carouselImages[currentSlide].bgColor}`, height: '424px', width: '100vw' }"
        >
          <v-carousel-item
            v-for="(img, index) in carouselImages"
            :key="index"
          >
            <v-img
              :src="img.src"
              :alt="img.alt"
              class="carousel-slide"
              contain
            />
          </v-carousel-item>
        </v-carousel>
        <!-- MatchingSearch 컴포넌트를 절대 위치로 배치 -->
        <div class="search-overlay">
          <MatchingSearch />
        </div>
      </section>
        <section class="project-preview">
      <div class="project-card-group">
        <ProjectCard
              v-for="(card, idx) in previewCards"
              :key="idx"
              :id="Number(card.id)"
              :title="card.name"
              :subtitle="card.introduction"
              :imgSrc="card.imgSrc || defaultImage"
              :mainCategory="card.main_category"
              :subCategory="card.sub_category"
            />
      </div>
    </section>
    <div class="more-project-button-wrapper">
      <router-link to="/project-list" class="btn-more">
        더 많은 프로젝트 보기
      </router-link>
    </div>  
    </div>
</template>
  
<script setup>
  import { ref, onMounted, computed } from 'vue'
  import MatchingSearch from '@/components/matching/MatchingSearch.vue';
  import ProjectCard from '@/components/common/ProjectCard.vue';
  import projectDummy from '@/json/project_list.json'
  const currentSlide = ref(0)
  const cardData = ref([])
  const defaultImage = new URL('@/assets/img/pick_title.png', import.meta.url).href
  const placeholderCard = {
    id: 'placeholder',
    name: '프로젝트 준비 중',
    introduction: '곧 멋진 프로젝트가 등록될 예정입니다!',
    mainCategory: 'main',
    subCategory: 'sub',
    imgSrc: defaultImage
  }

  const carouselImages = [
    {
      src: new URL('@/assets/img/main-img-1.png', import.meta.url).href,
      alt: '메인 배너 1',
      bgColor: '5D8AC1'
    },
    {
      src: new URL('@/assets/img/main-img-2.png', import.meta.url).href,
      alt: '메인 배너 2',
      bgColor: 'CBDCEB'
    },
    {
      src: new URL('@/assets/img/main-img-3.png', import.meta.url).href,
      alt: '메인 배너 3',
      bgColor: '020725'
    }
  ]
  // 데이터 fetch
  onMounted(async () => {
    try {
      const res = await fetch('http://localhost:8080/project_list')
      const result = await res.json()
      if (Array.isArray(result.project_list)) {
        cardData.value = result.project_list
      } else {
        throw new Error('Invalid server response format')
      }
    } catch (err) {
      console.error('🚨 fetch 실패, 더미 데이터로 대체합니다.', err)
      cardData.value = projectDummy.project_list
    }
  })

  const previewCards = computed(() => {
    const shuffled = [...cardData.value].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 3)
  })
  
</script>


<style scoped>
  .carousel-section {
    height: 693px;
    position: relative;
  }
  .carousel-slide {
    height: 424px;
    width: 100%;
  }
  .carousel-slide >>> .v-img__img {
    object-fit: contain !important;
    background-color: transparent;
  }
  .search-overlay {
    position: absolute;
    bottom: 140px; /* 캐러셀 하단에서 아래로 겹치게 */
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
  .project-preview {
    display: flex;
    justify-content: center;
  }
  .project-card-group {
    display: flex;
    gap: 40px;
    margin-bottom: 50px;
  }
  .more-project-button-wrapper {
    display: flex;
    justify-content: center;
  }
  .btn-more {
  padding: 12px 24px;
  background-color: #5D8AC1;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-more:hover {
  background-color: #4171a5;
}
</style>  