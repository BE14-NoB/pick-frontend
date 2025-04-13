<template>
    <div class="project-info-page">
      <div class="grid-2-layout">
        <!-- 왼쪽: 프로젝트 입력 폼 -->
        <v-form class="grid-2-col">
          <v-text-field v-model="project.name" label="프로젝트명" class="col-span-2" :readonly="!isEditing" />
          <v-text-field v-model="project.introduction" label="한 줄 소개" class="col-span-2" :readonly="!isEditing" />
          <v-textarea v-model="project.content" label="프로젝트 설명" rows="6" class="col-span-2" :readonly="!isEditing" />
  
          <v-text-field v-model="formattedStartDate" label="시작일" :readonly="!isEditing" />
          <v-text-field v-model="formattedEndDate" label="종료일" :readonly="!isEditing" />
  
          <v-text-field
            v-model.number="project.maximum_participant"
            label="최대 인원"
            type="number"
            :readonly="!isEditing"
          />
  
          <v-text-field
            v-model="project.session_code"
            label="입장 코드"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'"
            :readonly="!isEditing"
          />
  
          <v-select
            v-model="techStack"
            label="기술 분류"
            :items="['PC - WEB', 'MOBILE - APP', 'SERVER - API']"
            :disabled="!isEditing"
          />
  
         
        </v-form>
  
        <!-- 오른쪽: 썸네일 + 링크 -->
        <div class="thumbnail-panel">
          <h3 class="thumb-title">썸네일</h3>
          <ThumbnailUploader v-model:url="thumbnailUrl" :disabled="!isEditing" />
  
          <v-text-field
            v-model="project.project_url"
            label="사이트 링크"
            class="link"
            :readonly="!isEditing"
          />
          <v-text-field
            v-model="project.repo_url"
            label="깃허브 레포지토리"
            class="link"
            :readonly="!isEditing"
          />
        </div>

      </div>
      <v-btn color="primary" @click="toggleEdit" class="update-btn" variant="tonal" prepend-icon="mdi-tag-plus">
            {{ isEditing ? '수정 완료' : '수정하기' }}
        </v-btn>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import dayjs from 'dayjs'
  import projectDummy from '@/json/project_entry.json';
  import ThumbnailUploader from '@/components/project/ThumbnailUploader.vue'
  
  const route = useRoute()
  const projectId = route.query.id
  
  const project = ref({})
  const showPassword = ref(false)
  const techStack = ref('')
  const thumbnailUrl = ref('')
  const formattedStartDate = ref('')
  const formattedEndDate = ref('')
  const isEditing = ref(false)
  
  onMounted(async () => {
    try {
      const res = await fetch(`http://localhost:8080/projects/${projectId}`)
      if (!res.ok) throw new Error('데이터 없음')
      const data = await res.json()
      project.value = data
    } catch (err) {
      console.warn('⚠️ 서버에서 프로젝트 데이터를 가져오지 못했습니다. 더미 데이터로 대체합니다.')
      project.value = projectDummy[0];
    }
  
    techStack.value = `${project.value.main_category} - ${project.value.sub_category}`
    formattedStartDate.value = dayjs(project.value.start_date).format('YY.MM.DD')
    formattedEndDate.value = dayjs(project.value.end_date).format('YY.MM.DD')
    thumbnailUrl.value = project.value.thumbnail_image || new URL('@/assets/img/pick_title.png', import.meta.url).href
  })
  
  const toggleEdit = async () => {
    if (!isEditing.value) {
      isEditing.value = true
      return
    }
  
    const [main, sub] = techStack.value.split(' - ')
  
    const updatedData = {
      ...project.value,
      start_date: dayjs(formattedStartDate.value).format('YYYY-MM-DD'),
      end_date: dayjs(formattedEndDate.value).format('YYYY-MM-DD'),
      main_category: main,
      sub_category: sub,
      thumbnail_image: thumbnailUrl.value
    }
  
    try {
      await fetch(`http://localhost:8080/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      })
      alert('✅ 수정 완료')
      isEditing.value = false
    } catch (err) {
      console.error(err)
      alert('❌ 수정 실패')
    }
  }
  </script>
  
  <style scoped>
  .project-info-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px;
  }
  
  .grid-2-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  
  .grid-2-col {
    padding-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .col-span-2 {
    grid-column: span 2;
  }
  .update-btn {
    float: right;
    font-weight: 600;
    width: fit-content;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 16px;
    text-transform: none;
  }
  
  .thumbnail-panel {
    padding-bottom: 20px;
    border-radius: 10px;
    gap: 10px;
    justify-content: flex-start;
  }
  
  .thumb-title {
    font-size: 16px;
    font-weight: 600;
    padding-top: 20px;
    padding-bottom: 20px;
    margin: 0;
    color: #4c4c4c;
    font-weight: 700;
  }
  
  .link {
    padding-bottom: 18px;
  }
  </style>
  