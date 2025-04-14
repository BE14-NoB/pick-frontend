<template>
    <v-btn
      color="primary"
      variant="tonal"
      class="matching-create-btn"
      prepend-icon="mdi-tag-plus"
      @click="saveNote"
    >
      {{ props.id ? '수정하기' : '저장하기' }}
    </v-btn>
  </template>
    
  <script setup>
  import { useRouter } from 'vue-router'
  import { defineProps } from 'vue'
  import dayjs from 'dayjs'
  
  const router = useRouter()
  
  const props = defineProps({
    id: String, // 🔸 추가된 부분
    title: String,
    content: String,
    template: String,
    author: Object,
    participants: Array,
    createdAt: String
  })
  
  async function saveNote() {
    const now = dayjs().format('YYYY.MM.DD HH:mm:ss')
  
    // 👉 기본 유효성 검사
    if (!props.title?.trim()) {
      alert('📌 회의록 제목을 입력해주세요!')
      return
    }
    if (!props.content?.trim()) {
      alert('📌 회의 내용을 작성해주세요!')
      return
    }
  
    const payload = {
      id: props.id,
      title: props.title,
      create_date: props.createdAt || now,
      updatedAt: now,
      content: props.content,
      template: props.template,
      author: props.author?.name,
      participants: props.participants.map(p => p.name)
    }
  
    const isEdit = !!props.id
    const url = isEdit
      ? `http://localhost:8080/meetings/${props.id}`
      : `http://localhost:8080/meetings`
    const method = isEdit ? 'PUT' : 'POST'
  
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
  
      if (!res.ok) throw new Error('저장 실패')
  
      const result = await res.json()
      console.log(isEdit ? '✅ 수정 완료:' : '✅ 저장 완료:', result)
  
      router.push('/project/meeting')
    } catch (err) {
      console.error('❌ 저장 실패:', err)
    }
  }
  </script>
    
  <style scoped>
  .issue-create-btn {
    float: right;
    font-weight: 600;
    margin-bottom: 16px;
    text-transform: none;
  }
  </style>
  