<template>
    <!-- 캐러셀 -->
    <section class="carousel-section">
      <v-carousel hide-delimiters show-arrows style="background-color:#133E86; height:424px; width:100vw;">
        <v-carousel-item v-for="(chunk, index) in carouselChunks" :key="index">
          <div class="carousel-card-group">
            <ProjectCard
              v-for="(card, idx) in chunk"
              :key="idx"
              :id="card.id"
              :title="card.name"
              :subtitle="card.introduction"
              :imgSrc="card.imgSrc || defaultImage"
              :category="card.category"
            />
          </div>
        </v-carousel-item>
      </v-carousel>
    </section>
  
    <div class="project-page" >
      <div style="background-color: yellow;">
        검색 & 필터 영역
      </div>
      <!-- 검색 & 필터 -->
      <!-- <section class="search-section">
        <v-text-field
          v-model="search"
          placeholder="검색어를 입력하세요."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          class="search-input"
        />
        <v-btn icon><v-icon>mdi-view-grid</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-filter-variant</v-icon></v-btn>
      </section> -->
  
      <!-- 프로젝트 카드 리스트 -->
      <div class="grid-wrapper">
        <ProjectCard
          v-for="(card, index) in paginatedData"
          :key="index"
          :id="card.id"
          :title="card.name"
          :subtitle="card.introduction"
          :imgSrc="defaultImage"
          :category="card.category"
        />
      </div>
  
      <!-- 페이지네이션 -->
      <div class="text-center my-6">
        <!-- 페이지가 있을 때만 렌더링 -->
        <v-pagination
        v-if="pageCount > 1"
        v-model="page"
        :length="pageCount"
        :total-visible="Math.min(5, pageCount)"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
        @update:model-value="handlePageChange"
        />


            <!-- <v-pagination
            v-if="pageCount > 1"
            v-model="page"
            :length="pageCount"
            :total-visible="7"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
            @update:model-value="handlePageChange"
            /> -->
        <!-- <v-pagination
          v-model="page"
          :length="pageCount || 1"
          :total-visible="7"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
          @update:model-value="handlePageChange"
        /> -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import ProjectCard from '@/project/components/ProjectCard.vue'
  
  const cardData = ref([])
  const search = ref('')
  const page = ref(1)
  const itemsPerPage = 12
  
  const defaultImage = new URL('@/assets/img/pick_title.png', import.meta.url).href
  
  const carouselChunks = ref([])
  
  // 기본 placeholder 카드 정의
  const placeholderCard = {
    id: 'placeholder',
    name: '프로젝트 준비 중',
    introduction: '곧 멋진 프로젝트가 등록될 예정입니다!',
    category: '기타',
    imgSrc: defaultImage
  }
  
  // 캐러셀 데이터 설정
  watch(cardData, (newVal) => {
    const shuffled = [...newVal].sort(() => 0.5 - Math.random()).slice(0, 9)
    while (shuffled.length < 9) {
        shuffled.push({ ...placeholderCard, id: `placeholder-${shuffled.length}` })
    }
    console.log('👉 캐러셀 카드 목록:', shuffled)

    const chunks = []
    for (let i = 0; i < shuffled.length; i += 3) {
        chunks.push(shuffled.slice(i, i + 3))
    }
    carouselChunks.value = chunks
    },
    { immediate: true }  // cardData가 비어 있어도 즉시 한 번 실행됨 
)

  // 페이지네이션
  const pageCount = computed(() => Math.ceil(cardData.value.length / itemsPerPage))
  const paginatedData = computed(() => {
    const start = (page.value - 1) * itemsPerPage
    return cardData.value.slice(start, start + itemsPerPage)
  })
  
  const handlePageChange = (newPage) => {
    page.value = newPage
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  // 데이터 fetch
  onMounted(async () => {
    try {
      const res = await fetch('http://localhost:8080/project_room')
      const result = await res.json()
      cardData.value = Array.isArray(result) ? result : []
    } catch (err) {
      console.error('🚨 fetch 실패', err)
    }
  })
  </script>
  
  <style scoped>
  .grid-wrapper {
    justify-content: center;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, auto);
    gap: 24px;
    padding: 40px;
    justify-items: center;
    min-height: 600px;
  }
  
  .project-page {
    max-width: 1200px;
    margin: auto;
  }
  
  .carousel-section {
    margin-bottom: 48px;
  }
  
  .carousel-card-group {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 24px;
    padding: 20px;
  }
    /* 캐러셀 좌우 버튼 반투명 처리 + 아이콘 하얗게 */
    ::v-deep(.v-carousel .v-btn) {
    opacity: 0.5;
    color: white; /* ✅ 아이콘을 흰색으로 */
    transition: opacity 0.3s ease;
    }

    /* 호버 시 진하게 */
    ::v-deep(.v-carousel .v-btn:hover) {
    opacity: 0.8;
    }
  .search-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
    gap: 12px;
  }
  
  .search-input {
    flex: 1;
  }
  
  .pagination-wrapper {
    display: flex;
    justify-content: center;
    margin: 40px 0;
  }
  </style>
  