<template>
    <v-dialog v-model="isOpen" max-width="800" content-class="dialog-content">
      <v-card class="review-modal">
        <v-card-title class="headline">프로젝트 후기</v-card-title>
        <v-card-subtitle class="subtitle">
          참여한 프로젝트는 어떠셨나요? 프로젝트에 대한 총 평가를 남겨주세요. 🌱
        </v-card-subtitle>
  
        <v-card-text class="modal-body">
          <div class="review-form">
            <v-textarea
              v-model="content"
              rows="8"
              variant="outlined"
              placeholder="후기를 입력해주세요"
            />
          </div>
        </v-card-text>
  
        <v-card-actions class="justify-end">
          <v-btn color="gray" variant="tonal" @click="close">작성 취소</v-btn>
          <v-btn color="primary" variant="tonal" @click="submit" :disabled="!content">
            작성 완료
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    modelValue: Boolean
  })
  const emit = defineEmits(['update:modelValue', 'submit'])
  
  const isOpen = ref(props.modelValue)
  watch(() => props.modelValue, val => (isOpen.value = val))
  watch(isOpen, val => emit('update:modelValue', val))
  
  const content = ref('')
  
  function close() {
    isOpen.value = false
    content.value = ''
  }
  
  function submit() {
    const confirmed = window.confirm('한 번 작성한 후기는 수정할 수 없습니다.\n계속 작성하시겠습니까?')

    if (!confirmed) return
  
    emit('submit', {
      content: content.value
    })
    close()
  }
  </script>
  
  <style scoped>
  .dialog-content {
    border-radius: 30px !important;
    overflow: hidden;
  }
  .review-modal {
    padding: 50px;
    border-radius: 30px;
  }
  .modal-body {
    display: flex;
    margin-top: 20px;
  }
  .headline {
    font-size: 28px;
    font-weight: bold;
  }
  .subtitle {
    font-size: 14px;
    color: #4c4c4c;
    margin-bottom: 20px;
  }
  .review-form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  
  </style>
  