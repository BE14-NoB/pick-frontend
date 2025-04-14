<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <div class="tab-container">
            <div class="tab active">
              <i class="mdi mdi-account-group"></i>
              <span>Random Matching</span>
            </div>
            <div class="tab">
              <i class="mdi mdi-account-lock"></i>
              <span>Private Matching</span>
            </div>
          </div>
        </div>
  
        <div class="modal-body">
          <div class="form-group">
            <div class="input-group">
              <i class="mdi mdi-account-group"></i>
              <div class="input-wrapper">
                <label>최대 인원</label>
                <div class="select-wrapper">
                  <select v-model="maxMembers">
                    <option value="">Select</option>
                    <option v-for="n in 10" :key="n" :value="n">{{ n }}명</option>
                  </select>
                </div>
              </div>
            </div>
  
            <div class="input-group">
              <i class="mdi mdi-clock-outline"></i>
              <div class="input-wrapper">
                <label>프로젝트 기간</label>
                <div class="select-wrapper">
                  <select v-model="duration">
                    <option value="">Select</option>
                    <option v-for="n in 12" :key="n" :value="n">{{ n }}개월</option>
                  </select>
                </div>
              </div>
            </div>
  
            <div class="input-group">
              <i class="mdi mdi-handshake"></i>
              <div class="input-wrapper">
                <label>매칭 레벨 범위</label>
                <div class="select-wrapper">
                  <select v-model="levelRange">
                    <option value="">Select</option>
                    <option value="1-10">Lv.1-10</option>
                    <option value="11-20">Lv.11-20</option>
                    <option value="21-30">Lv.21-30</option>
                    <option value="31-40">Lv.31-40</option>
                    <option value="41+">Lv.41+</option>
                  </select>
                </div>
              </div>
            </div>
  
            <div class="category-group">
              <div class="input-wrapper">
                <label>상위 카테고리</label>
                <div class="select-wrapper-large">
                  <select v-model="mainCategory">
                    <option value="">Select Category</option>
                    <option value="PC">PC/Web</option>
                    <option value="Mobile">Mobile/iOS</option>
                    <option value="Game">Game</option>
                  </select>
                </div>
              </div>
  
              <div class="input-wrapper">
                <label>하위 카테고리</label>
                <div class="select-wrapper-large">
                  <select v-model="subCategory">
                    <option value="">Select Category</option>
                    <option v-if="mainCategory === 'PC'" value="Web">Web</option>
                    <option v-if="mainCategory === 'PC'" value="App">App</option>
                    <option v-if="mainCategory === 'Mobile'" value="iOS">iOS</option>
                    <option v-if="mainCategory === 'Mobile'" value="Android">Android</option>
                    <option v-if="mainCategory === 'Game'" value="Unity">Unity</option>
                    <option v-if="mainCategory === 'Game'" value="Unreal">Unreal</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
  
          <div class="button-group">
            <button class="primary-button" @click="handleCreate">
              랜덤 매칭 생성
            </button>
            <!-- <MeetingSaveButton
              :id="id"
              :hostLevel: "10"
              :hostName="hostName"
              :currentMember="currentMembers"
              :maxMembers="maxMembers"
              :duration="duration"
              :mainCategory="mainCategory"
              :subCategory="subCategory
              :members="members"
              :levelRange="levelRange"
              /> 
              {
    hostLevel: 10,
    hostName: '카드값줘체리',
    currentMembers: 3,
    maxMembers: 6,
    duration: 6,
    mainCategory: 'PC',
    subCategory: '게임',
    members: [
    {
    name: '봇치더코드',
    level: 30,
    rating: 4.4,
  },
  {
    name: '체인소개발자',
    level: 27,
    rating: 4.7,
  },
  {
    name: '코드코드체인지',
    level: 35,
    rating: 4.2,
  }
    ]
  },
            -->
            <button class="secondary-button" @click="$emit('close')">
              <i class="mdi mdi-undo-variant"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const emit = defineEmits(['close', 'create'])
  
  const maxMembers = ref('')
  const duration = ref('')
  const levelRange = ref('')
  const mainCategory = ref('')
  const subCategory = ref('')
  
  const handleCreate = () => {
    emit('create', {
      maxMembers: maxMembers.value,
      duration: duration.value,
      levelRange: levelRange.value,
      mainCategory: mainCategory.value,
      subCategory: subCategory.value
    })
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #FFFFFF;
    border-radius: 12px;
    width: 440px;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .modal-header {
    border-bottom: 1px solid #020725;
  }
  
  .tab-container {
    display: flex;
    height: 80px;
  }
  
  .tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 16px;
    cursor: pointer;
    background: rgba(217, 217, 217, 0.4);
    color: #020725;
    font-weight: 600;
    font-size: 18px;
  }
  
  .tab.active {
    background: #FFFFFF;
    color: #5D8AC1;
  }
  
  .tab i {
    font-size: 24px;
  }
  
  .modal-body {
    padding: 12px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .input-group {
    display: flex;
    gap: 7px;
    padding: 16px;
    align-items: center;
  }
  
  .input-group i {
    font-size: 24px;
    color: #020725;
  }
  
  .input-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .input-wrapper label {
    font-weight: 600;
    font-size: 18px;
    color: #020725;
  }
  
  .select-wrapper {
    width: 80px;
    position: relative;
  }
  
  .select-wrapper-large {
    width: 180px;
    position: relative;
  }
  
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #020725;
    border-radius: 6px;
    font-size: 16px;
    appearance: none;
    background: #FFFFFF;
  }
  
  .category-group {
    display: flex;
    gap: 10px;
    padding: 2px 1px;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 10px 17px;
    margin-top: 20px;
  }
  
  .primary-button {
    background: #133E86;
    color: #FFFFFF;
    border: none;
    border-radius: 12px;
    padding: 12px 24px;
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;
    width: 300px;
  }
  
  .secondary-button {
    background: #133E86;
    color: #FFFFFF;
    border: none;
    border-radius: 12px;
    width: 51px;
    height: 51px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .secondary-button i {
    font-size: 24px;
  }
  </style> 