<template>
    <div class="mockup-wrapper">
      <!-- 목업 이미지 -->
      <img src="@/assets/img/mack-mock.png" alt="mockup" class="mockup-image" />
  
      <!-- 썸네일 이미지 (업로드된 것 or 기본 이미지) -->
      <img :src="thumbnailUrl" alt="thumbnail" class="thumbnail-overlay" />
  
      <!-- 이미지 업로드 인풋 -->
      <div class="thumbnail-actions">
        <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" hidden />
        <!-- <v-btn size="small" @click="triggerUpload">썸네일 업로드</v-btn> -->
        <v-btn size="small" color="error" @click="removeThumbnail">삭제</v-btn>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 기본 썸네일 이미지 경로
  const defaultThumbnail = new URL('@/assets/img/pick_title.png', import.meta.url).href
  
  // 현재 표시 중인 썸네일 URL
  const thumbnailUrl = ref(defaultThumbnail)
  
  // 파일 input 접근용
  const fileInput = ref(null)
  
  function triggerUpload() {
    fileInput.value?.click()
  }
  
  function onFileChange(event) {
    const file = event.target.files[0]
    if (!file) return
  
    // 브라우저에서 즉시 미리보기용 URL 생성
    thumbnailUrl.value = URL.createObjectURL(file)
  
    // 👉 서버 업로드가 필요하다면 아래 FormData 활용 가능
    // const formData = new FormData()
    // formData.append('file', file)
    // await fetch('/upload-endpoint', { method: 'POST', body: formData })
  }
  
  function removeThumbnail() {
    thumbnailUrl.value = defaultThumbnail
  }
  </script>
  
  <style scoped>
  .mockup-wrapper {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: auto;
    text-align: center;
    padding-bottom: 25px;
  }
  
  .mockup-image {
    width: 100%;
    display: block;
  }
  
  .thumbnail-overlay {
    position: absolute;
    top: 7%;
    left: 11.8%;
    width: 76.6%;
    height: 63%;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .thumbnail-actions {
    margin-top: 16px;
    display: flex;
    justify-content: space-around;
    gap: 10px;
  }
  .file-input{
    margin-top: 25px;
  }
  </style>
  