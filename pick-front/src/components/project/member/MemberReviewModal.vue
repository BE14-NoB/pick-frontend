<template>
    <v-dialog v-model="isOpen" max-width="800" content-class="dialog-content">
      <v-card class="review-modal">
        <v-card-title class="headline">팀원 후기</v-card-title>
        <v-card-subtitle class="subtitle">프로젝트에 함께 하신 팀원은 어떠셨나요? 팀원들에게 후기를 남겨주세요. 🌱</v-card-subtitle>
  
        <v-card-text class="modal-body">
          <!-- 좌측: 팀원 선택 -->
          <div class="team-list">
            <div class="team-label">팀원 선택</div>
            <div
              v-for="member in members"
              :key="member.name"
              :class="['team-item', { disabled: member.reviewDone, selected: member.name === selectedMember?.name }]"
              @click="selectMember(member)"
            >
              <v-avatar size="32" class="mr-2">
                <img :src="profile" alt="avatar" />
              </v-avatar>
              <div style="display:flex; flex-direction: column;">
                <div>{{ member.name }}</div>
                <div v-if="member.reviewDone" class="done-label" >후기 작성 완료</div>
              </div>
              
            </div>
          </div>
  
          <!-- 우측: 후기 작성 -->
          <div class="review-form">
            <div class="form-to">To. <span class="dimmed">{{ selectedMember?.name || '팀원을 선택해주세요.' }}</span></div>
            <v-textarea
              v-model="content"
              :disabled="!selectedMember || selectedMember.reviewDone"
              rows="8"
              variant="outlined"
              placeholder="후기를 입력해주세요"
            />
            <div class="rating-box">
                
                <v-rating
                half-increments
                hover
                :length="5"
                :size="30"
                v-model="rating"
                active-color="amber"
                />
                <span> {{ rating }} / 5</span>
            </div>
            
          </div>
          
        </v-card-text>
        <div>
            
        </div>
        
  
        <v-card-actions class="justify-end">
          <v-btn color="gray" variant="tonal" @click="close" >작성 취소</v-btn>
          <v-btn color="primary" variant="tonal" @click="submit" :disabled="!selectedMember || !content || selectedMember.reviewDone">작성 완료</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
<script setup>
    import { ref, watch } from 'vue'
    import profile from '@/assets/img/avatar.png'

    const props = defineProps({
        modelValue: Boolean,
        members: Array,
    })
    const emit = defineEmits(['update:modelValue', 'submit'])

    const rating = ref(5);  // 회원 평점 초기값은 5점
    
    const isOpen = ref(props.modelValue)
    watch(() => props.modelValue, val => isOpen.value = val)
    watch(isOpen, val => emit('update:modelValue', val))
    
    const selectedMember = ref(null)
    const content = ref('')
    
    function selectMember(member) {
        if (!member.reviewDone) selectedMember.value = member
    }
    
    function close() {
        isOpen.value = false
        selectedMember.value = null
        content.value = ''
    }
    
    function submit() {
        const confirmed = window.confirm('한 번 작성한 후기는 수정할 수 없습니다.\n계속 작성하시겠습니까?')

        if (!confirmed) return
  
        emit('submit', {
            to: selectedMember.value.name,
            content: content.value,
            rating: rating.value
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
        gap: 20px;
        margin-top: 20px;
    }
    .headline {
        font-size: 28px;
        font-weight: bold;
        font-weight: bold;
    }
    .subtitle {
        font-size: 14px;
        color: #4c4c4c;
        margin-bottom: 20px;
    }
    .team-list {
        width: 30%;
        border-right: 1px solid #eee;
    }
    .team-label {
        font-weight: bold;
        margin-bottom: 10px;
    }
    .team-item {
        display: flex;
        align-items: center;
        padding: 8px;
        cursor: pointer;
        border-radius: 6px;
    }
    .team-item:hover {
        background: #f5f5f5;
    }
    .team-item.selected {
        background: #e3f2fd;
    }
    .team-item.disabled {
        opacity: 0.4;
        pointer-events: none;
    }
    .done-label {
        font-size: 12px;
        color: #1976d2;
        margin-left: auto;
    }
    .review-form {
        width: 70%;
        display:flex;
        flex-direction: column;
    }
    .form-to {
        font-weight: bold;
        margin-bottom: 8px;
    }
    .dimmed {
        color: #aaa;
    }
    .rating-box {
        display: flex;              /* 한 줄 정렬 */
        align-items: center;        /* 수직 가운데 정렬 */
        gap: 8px;                   /* 별과 텍스트 간 간격 */
        margin-top: 12px;           /* 위쪽 여백 */
    }

</style>
  