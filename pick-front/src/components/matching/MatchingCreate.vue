<template>
  <div class="modal-overlay">
  <div class="search-container">
      <div class="header">
          <div class="tab-group">
              <button class="tab-button" :class="{ active: activeTab === 'random' }" @click="setActiveTab('random')">
                  Random Matching
              </button>
              <button class="tab-button" :class="{ active: activeTab === 'private' }" @click="setActiveTab('private')">
                  Private Matching
              </button>
          </div>
      </div>
      <div v-if="activeTab === 'random'" class="search-form">
          <div class="form-group">
              <div class="input-group">
                <label>프로젝트 인원</label>
                <input type="number" v-model="maxPeople" min="2" class="range-input">
                <span>명</span>
              </div>
          </div>
          <div class="divider"></div>
          <div class="form-group">
              <div class="input-group">
                  <label>프로젝트 기간</label>
                  <input type="number" v-model="duration" min="1" class="range-input">
                  <span>개월</span>
              </div>
          </div>  
  
          <div class="divider"></div>
          <div class="form-group">
              <div class="input-group">
                  <label>매칭 레벨 범위</label>
                  <input type="number" v-model="levelRange" min="1" class="range-input">
                  <span>Lv</span>
              </div>
          </div>  
  
          <div class="divider"></div>
          
          <div class="category-group">
            <div class="form-group">
            <div class="category">
                <label>상위 카테고리</label>
                <div class="select-wrapper">
                    <select v-model="category" @focus="hidePlaceholder = true" @blur="hidePlaceholder = false">
                        <option value="" disabled :hidden="hidePlaceholder">Select Category</option>
                            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                    </select>
                </div>
            </div>
          </div>
      
          <div class="form-group">
            <div class="category">
                <label>하위 카테고리</label>
                <div class="select-wrapper">
                    <select v-model="subcategory" :disabled="!category" @focus="hidePlaceholder = true" @blur="hidePlaceholder = false">
                        <option value="" disabled :hidden="hidePlaceholder">{{subcategoryPlaceholder}}</option>
                        <option v-for="subcat in subcategories" :key="subcat" :value="subcat">{{ subcat }}</option>
                    </select>
                </div>
            </div>
          </div>
        </div>
      <div class="divider"></div>  
      <div class="btn-group">
        <button class="create-project-button matching-button" @click="createMatching">
          매칭 생성
        </button>
        <button class="search-button matching-button" @click="closeMatching">
          취소
        </button>
      </div>
    </div>
  <div v-if="activeTab === 'private'" class="search-form">
    <div class="form-group">
              <div class="text-group">
                  <label>프로젝트 명</label>
                  <textarea v-model="projectTitle" class="text-input"
                    placeholder="프로젝트 이름을 적어주세요"
                    @input="autoResize"
                  ></textarea>

              </div>
          </div>    

          <div class="form-group">
              <div class="text-group">
                  <label>프로젝트 소개</label>
                  <textarea v-model="projectComment" class="text-input"
                    placeholder="프로젝트 소개를 적어주세요"
                    @input="autoResize"
                  ></textarea>
              </div>
          </div>    
          <div class="form-group">
              <div class="input-group">
                <label>프로젝트 인원</label>
                <input type="number" v-model="maxPeople" min="2" class="range-input">
                <span>명</span>
              </div>
          </div>
          <div class="divider"></div>
          <div class="form-group">
              <div class="input-group">
                  <label>프로젝트 기간</label>
                  <input type="number" v-model="duration" min="1" class="range-input">
                  <span>개월</span>
              </div>
          </div>    
  
          <div class="divider"></div>
          
          <div class="category-group">
            <div class="form-group">
            <div class="category">
                <label>상위 카테고리</label>
                <div class="select-wrapper">
                    <select v-model="category" @focus="hidePlaceholder = true" @blur="hidePlaceholder = false">
                        <option value="" disabled :hidden="hidePlaceholder">Select Category</option>
                            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                    </select>
                </div>
            </div>
          </div>
      
          <div class="form-group">
            <div class="category">
                <label>하위 카테고리</label>
                <div class="select-wrapper">
                    <select v-model="subcategory" :disabled="!category" @focus="hidePlaceholder = true" @blur="hidePlaceholder = false">
                        <option value="" disabled :hidden="hidePlaceholder">{{subcategoryPlaceholder}}</option>
                        <option v-for="subcat in subcategories" :key="subcat" :value="subcat">{{ subcat }}</option>
                    </select>
                </div>
            </div>
          </div>
        </div>
      <div class="divider"></div>  
      <div class="btn-group">
        <button class="create-project-button matching-button" @click="createMatching">
          매칭 생성
        </button>
        <button class="search-button matching-button" @click="closeMatching">
          취소
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'

const activeTab = ref('random')
const maxPeople = ref('')
const duration = ref('')
const levelRange = ref('')
const category = ref('')
const subcategory = ref('')
const hidePlaceholder = ref(false)
const inviteInput = ref('')
const subcategoryPlaceholder = ref('Select Category')
const emit = defineEmits(['close'])
// 읽어오기
const categories = ['개발', '디자인', '기획', '마케팅']
const subcategoriesMap = {
  '개발': ['웹', '모바일', '백엔드', '프론트엔드'],
  '디자인': ['UI/UX', '그래픽', '브랜딩'],
  '기획': ['서비스 기획', '전략 기획', 'PM'],
  '마케팅': ['디지털 마케팅', '콘텐츠 마케팅', '브랜드 마케팅']
}

const subcategories = computed(() => {
  return category.value ? subcategoriesMap[category.value] : []
})


const setActiveTab = (tab) => {
  activeTab.value = tab
  if (tab === 'private') {
      nextTick(() => {
          inviteInput.value.focus()
      })
  }
}
// Watch for changes in category to reset subcategory and update placeholder
  watch(category, (newValue) => {
      if (newValue) {
          subcategory.value = ''
          subcategoryPlaceholder.value = 'Select Category'
      }
  })
  watch(activeTab, (newValue) => {
      if(newValue) {
          maxPeople.value = ''
          duration.value = ''
          levelRange.value = ''
          category.value = ''
          subcategory.value = ''
          hidePlaceholder.value = false
          inviteInput.value = null
          subcategoryPlaceholder.value = 'Select Category'
      }
  })

  const closeMatching = () => {
    emit('close')
  }

  const createMatching = () => {
    const confirmed = window.confirm('생성하시겠습니까?');
    if(confirmed)
      emit('close')
  }
  const projectTitle = ref('')
  const projectComment = ref('')

  const autoResize = (event) => {
  const textarea = event.target
  textarea.style.height = 'auto' // 높이 초기화
  textarea.style.height = textarea.scrollHeight + 'px' // 스크롤 높이만큼 늘리기
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 배경 어둡게 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
  .search-container {
    justify-items: center;
      border-radius: 12px;
      max-width: fit-content;
      min-width: fit-content;
      margin: 0 auto;
      background-color: rgba(255, 255, 255, 0.7);
  }

  .header {
      display: flex;
      justify-content: center;
      width: 280px;
  }

  .tab-group {
      display: flex;
      gap: 0;
  }

  label {
      font-family: 'Open Sans', sans-serif;
      font-weight: 600;
      font-size: 14px;
      color: #020725;
  }

  .tab-button {
      align-items: center;
      justify-items: center;
      width: 140px;
      gap: 5px;
      padding: 6px;
      background: rgba(111, 111, 111, 0.3);
      border: none;
      cursor: pointer;
      font-family: 'Open Sans', sans-serif;
      font-weight: 600;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
  }
  
  .tab-button:first-child {
      border-radius: 12px 0 0 0;
  }
  
  .tab-button:last-child {
      border-radius: 0 12px 0 0;
  }
  
  .tab-button:hover {
      background: rgba(255, 255, 255, 0.8);
      color: #020725;
  }
  
  .tab-button.active {
      background: #fff;
      color: #020725;
  }
  
  .search-form {
      align-items: center;
      justify-items: center;
      padding: 12px;
      background: #ffffff;
      border-radius: 0 0 12px 12px;
      box-shadow: 0 2px 8px rgba(2, 7, 37, 0.05);
      width: 280px;
  }
  
  .form-group {
      display: flex;
      gap: 7px;
      padding-top: 12px;
      justify-items: space-between;
      padding-bottom: 12px;
      background: white;
      border-radius: 8px;
      white-space: nowrap;
      margin: 0;
  }
  
  .input-group {
    display: flex;
    width: 100%;
      gap: 20px;
  }
  .category {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .invite-input {
      font-size: 12px;
      border: 2px solid #5d8ac1;
      border-radius: 8px;
      width: 256px;
      padding: 1px;
      padding-left: 10px;
      display: inline-block
  }

  .invite-input input {
      border: none;
      outline: none;
  }
  
  .divider {
      width: 256px;
      height: 1px;
      background: rgba(2, 7, 37, 0.1);
  }
  
  .select-wrapper {
      position: relative;
      display: flex;
      align-items: center;
  }
  
  .select-wrapper-small {
      min-width: 100px;
      width: 100px;
  }
  
  .select-wrapper-large {
      min-width: 180px;
      width: 180px;
  }
  
  .select-wrapper::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;
      background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23020725' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
      pointer-events: none;
      opacity: 0.6;
  }
  
  select {
      width: 100%;
      font-family: 'Open Sans', sans-serif;
      font-size: 12px;
      color: rgba(2, 7, 37, 0.8);
      border: none;
      background: transparent;
      padding-right: 24px;
      padding-left: 3px;
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
  }
  
  select::-ms-expand {
      display: none;
  }
  
  .chevron-down {
      display: none;
  }
  
  .matching-button {
      padding: 8px 16px;
      background: #133E86;
      width: 120px;
      border: none;
      border-radius: 8px;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: 12px;
      color: #fff;
      cursor: pointer;
      transition: background-color 0.3s ease;
      margin-top: 8px;
      margin-right: 8px;
  }
  
  .matching-button:hover {
      background: rgba(93, 138, 193, 0.85);
  }

  .invite-button {
    padding: 8px 16px;
      background: #133E86;
      width: 256px;
      border: none;
      border-radius: 8px;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: 12px;
      color: #fff;
      cursor: pointer;
      transition: background-color 0.3s ease;
      margin-top: 8px;
      margin-right: 8px;
  }
  
  .people-range,
  .duration-range {
      display: flex;
      align-items: center;
      gap: 8px;
  }
  
  .range-separator {
      color: #020725;
      font-size: 12px;
      font-weight: 600;
  }
  
  select:disabled {
      opacity: 0.5;
      cursor: not-allowed;
  }
  .category-group {
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: row;
    gap: 16px;
    height: 80px;
  }
  .range-input {
    width: 100px;
    justify-items: right;
  }
  .text-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 240px;
  }
  .text-input {
    border: 1px solid #020725;
    border-radius: 6px;
  }
</style> 