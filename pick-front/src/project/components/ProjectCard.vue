<template>
    <v-card
      class="project-card"
      flat
      rounded="md"
      @click="goToDetail"
    >
      <!-- 이미지 -->
      <v-img
        :src="imgSrc"
        height="200"
        cover
        alt="프로젝트 이미지"
      />
  
      <!-- 텍스트 콘텐츠 -->
      <v-card-text class="card-body">
        <!-- 제목 툴팁 -->
        <v-tooltip location="top">
          <template #activator="{ props }">
            <h3
              class="text-h8 font-weight-bold mb-1 ellipsis"
              v-bind="props"
            >
              {{ title }}
            </h3>
          </template>
          <span>{{ title }}</span>
        </v-tooltip>
  
        <!-- 서브타이틀 툴팁 -->
          <template #activator="{ props }">
            <div
              class="text-body-2 text-grey-darken-1 ellipsis"
              v-bind="props"
              style="font-size: 13px;"
            >
              {{ subtitle }}
            </div>
          </template>
          <span>{{ subtitle }}</span>
      </v-card-text>
  
      <v-spacer />
  
      <!-- 칩 -->
      <v-card-actions class="chip-wrapper px-6 pb-4 pt-0">
        <v-chip class="custom-chip" :ripple="false" :clickable="true" variant="flat">
          # {{ category }}PC
        </v-chip>
        <v-chip class="custom-chip" :ripple="false" :clickable="true" variant="flat">
          # {{ category }}WEB
        </v-chip>
      </v-card-actions>
    </v-card>
  </template>
  
<script setup>
  import { useRouter } from 'vue-router'
  const props = defineProps({
    id: Number,
    title: String,
    subtitle: String,
    imgSrc: String,
    category: {
      type: String,
      default: '',
    },
  })
  const router = useRouter()
  
  const goToDetail = () => {
    router.push(`/project/${props.id}/detail`)
  }
</script>


<style scoped>
  .project-card {
    width: 252px;
    height: 340px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  }
  
  .card-body {
    flex-grow: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-size: 13px;
  }
  
  /* 한 줄만 보이고 넘치면 ... */
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  /* 칩 정렬 */
  .chip-wrapper {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 0 16px 16px;
  }
  
  /* 칩 스타일 */
  .custom-chip {
    background-color: #f5f5f5;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 500;
    color: #444;
    text-transform: none;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s;
  }
  
  .custom-chip:hover {
    background-color: #e0e0e0;
  }
</style>
  