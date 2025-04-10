<template>
    <v-card
      class="project-card"
      flat
      rounded="lg"
    >
      <v-img
        :src="imgSrc"
        height="200"
        cover
        alt="프로젝트 이미지"
      />
  
      <v-card-text class="py-4 px-6">
        <h3 class="text-h6 font-weight-bold mb-1">{{ title }}</h3>
        <div class="text-body-2 text-grey-darken-1">{{ subtitle }}</div>
      </v-card-text>
  
      <v-card-actions class="px-6 pb-4 pt-0 justify-start">
        <v-btn variant="flat" class="hashtag" size="small" icon>
          <span># 상위</span>
        </v-btn>
        <v-btn variant="flat" class="hashtag" size="small" icon>
          <span># 하위</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    subtitle: String,
    imgSrc: String,
  })
  </script>
  
  <style scoped>
  .project-card {
    width: 353px;
    height: 408px;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  }
  
  .hashtag {
    background-color: #f5f5f5;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #444;
    text-transform: none;
    padding-left: 12px;
    padding-right: 12px;
    margin-right: 8px;
  }
  </style>
  