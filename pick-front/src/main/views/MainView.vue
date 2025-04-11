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
    </div>
</template>
  
<script setup>
  import { ref } from 'vue'
  import MatchingSearch from '@/components/matching/MatchingSearch.vue';
  const currentSlide = ref(0)
  
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
</style>  