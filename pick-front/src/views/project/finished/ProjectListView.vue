<template>
    <!-- 캐러셀 -->
    <section class="carousel-section">
      <v-carousel hide-delimiters show-arrows style="background-color:#133E86; height:424px; width:100vw;">
        <v-carousel-item v-for="(chunk, index) in carouselChunks" :key="index">
          <div class="carousel-card-group">
            <ProjectCard
              v-for="(card, idx) in chunk"
              :key="idx"
              :id="Number(card.id)"
              :title="card.name"
              :subtitle="card.introduction"
              :imgSrc="card.thumbnail_image || defaultImage"
              :mainCategory="card.main_category"
              :subCategory="card.sub_category"
            />
          </div>
        </v-carousel-item>
      </v-carousel>
    </section>
  
    <div class="project-page" >

      <!-- 검색 + 필터 + 정렬 -->
      <!-- <div class="search-filter-bar" style="width: 100%;">
        <div class="searchBox" style="width:50%;">
          <SearchComboBox hidden/>
          <input v-model="searchQuery" placeholder="제목 검색..." type="text" style="width:70%; height:25px;" />
          <button @click="search" style="width:25px; height:25px;">
              <img src="@/assets/post/icons8-search.svg" alt="돋보기 아이콘" width="25px" height="25px">
          </button>
        </div>

        <v-select v-model="selectedTemplate" :items="templateOptions" label="템플릿" density="compact" class="select" />
        <v-select v-model="selectedAuthor" :items="authorOptionsWithAll" label="작성자" density="compact" class="select" />
        <v-select v-model="sortOrder" :items="sortOptions" label="정렬" density="compact" class="select" />
      </div> -->
  
      <!-- 로딩 상태일 때만 보여줄 스피너 -->
      <v-container v-if="loading" class="text-center my-12">
        <v-progress-circular indeterminate color="primary" size="64" />
      </v-container>
      <template v-else>
      <!-- 프로젝트 카드 리스트 -->
      <div class="grid-wrapper">
        <ProjectCard
          v-for="(card, index) in paginatedData"
          :key="index"
          :id="Number(card.id)"
          :title="card.name"
          :subtitle="card.introduction"
          :imgSrc="card.thumbnail_image || defaultImage"
          :mainCategory="card.main_category"
          :subCategory="card.sub_category"
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

      </div>
    </template>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import projectDummy from '@/json/project_list.json'
  import ProjectCard from '@/components/common/ProjectCard.vue'
  import projectCommonDummy from '@/json/projects.json';
  import SearchBox from '@/components/common/SearchBox.vue'
  import SearchComboBox from '@/components/common/SearchComboBox.vue'
  
  const loading = ref(true)

  const cardData = ref([])
  const search = ref('')
  const page = ref(1)
  const itemsPerPage = 12
  
  const defaultImage = new URL('@/assets/member/default-image.png', import.meta.url).href
  
  const carouselChunks = ref([])
  
  // 기본 placeholder 카드 정의
  const placeholderCard = {
    id: 'placeholder',
    name: '프로젝트 준비 중',
    introduction: '곧 멋진 프로젝트가 등록될 예정입니다!',
    mainCategory: 'main',
    subCategory: 'sub',
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
    loading.value = true
    try {
      const res = await fetch('http://localhost:8080/project_list')
      const result = await res.json()
      if (Array.isArray(result.project_list)) {
        cardData.value = result.project_list.map(project => ({
          ...project,
          thumbnail_image: imageMap[project.thumbnail_image] || project.thumbnail_image, // 동적 이미지 처리
        }));

      } else {
        throw new Error('Invalid server response format')
      }
    } catch (err) {
      console.error('🚨 fetch 실패, 더미 데이터로 대체합니다.', err)
      cardData.value = projectDummy.project_list.map(project => ({
        ...project,
        thumbnail_image: imageMap[project.thumbnail_image] || project.thumbnail_image, // 동적 이미지 처리
      }));

    } finally {
      loading.value = false
    }
  })

  // 이미지 
  const images = import.meta.glob('@/assets/member/*.png', { eager: true });
  const imageMap = Object.fromEntries(
    Object.entries(images).map(([path, module]) => [
      `/assets/member/${path.split('/').pop()}`,
      module.default,
    ])
  );

  </script>
  
  <style scoped>
  .grid-wrapper {
    max-width: 60%;
    margin:0 auto;
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
    color: white;
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

    
  .search-filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
    width: 100%;
  }
  .search-filter-bar input {
    flex: 2;
    padding: 8px 12px;
    border-radius: 6px;
  }
  .select {
    /* min-width: 150px; */
    max-width: 180px;
  }
  
  .pagination-wrapper {
    display: flex;
    justify-content: center;
    margin: 40px 0;
  }
  </style>
  