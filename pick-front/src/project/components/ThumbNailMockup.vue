<template>
    <div class="mockup-wrapper">
      <!-- 배경: 맥북 목업 -->
      <img src="@/assets/img/mack-mock.png" alt="mockup" class="mockup-image" />
  
      <!-- 동적으로 바뀌는 썸네일 -->
      <img :src="thumbnailUrl" alt="thumbnail" class="thumbnail-overlay" />
    </div>
</template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 동적으로 바꿀 썸네일 이미지 URL
  const thumbnailUrl = ref(new URL('@/assets/img/pick_title.png', import.meta.url).href)

//   const thumbnailUrl = ref('@/assets/img/pick_title.png') // 나중에 props로 받아도 OK
  </script>
  
  <style scoped>
  .mockup-wrapper {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: auto;
  }
  
  .mockup-image {
    width: 100%;
    display: block;
  }
  
  /* 썸네일을 mockup 안 화면 영역에 정확히 위치시키기 */
  .thumbnail-overlay {
    position: absolute;
    top: 15.5%;
    left: 11.8%;
    width: 76.6%;
    height: 63%;
    object-fit: cover;
    border-radius: 4px;
  }
  </style>
  