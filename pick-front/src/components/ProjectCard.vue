<template>
    <v-card class="mx-auto" max-width="344">
      <v-img
        height="200px"
        :src="imgSrc"
        alt="프로젝트 이미지"
        cover
      ></v-img>
  
      <v-card-title>{{ title }}</v-card-title>
  
      <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
  
      <v-card-actions>
        <v-btn color="orange-lighten-2" text="Explore" />
        <v-spacer />
        <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show" />
      </v-card-actions>
  
      <v-expand-transition>
        <div v-show="show">
          <v-divider />
          <v-card-text>{{ detail }}</v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const show = ref(false)
  
  defineProps({
    title: String,
    subtitle: String,
    imgSrc: String,
    detail: String,
  })
  </script>
  