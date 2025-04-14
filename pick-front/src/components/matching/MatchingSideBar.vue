<template>
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
                  <div class="people-range">
                      <div class="select-wrapper select-wrapper-small">
                          <select v-model="minPeople" @focus="hidePlaceholder = true" @blur="hidePlaceholder = false" class="select-drop">
                              <option value="" disabled :hidden="hidePlaceholder">최소</option>
                              <option v-for="n in 10" :key="n" :value="n">{{ n === 10 ? '10명 이상' : n + '명' }}</option>
                          </select>
                      </div>
                      <span class="range-separator">~</span>
                      <div class="select-wrapper select-wrapper-small">
                          <select v-model="maxPeople" :disabled="!minPeople" @focus="hidePlaceholder = true" @blur="hidePlaceholder = false" class="select-drop">
                              <option value="" disabled :hidden="hidePlaceholder">최대</option>
                              <option v-for="n in maxPeopleOptions" :key="n" :value="n">{{ n === 10 ? '10명 이상' : n + '명' }}</option>
                          </select>
                      </div>
                  </div>
              </div>
          </div>
          <div class="divider"></div>
          <div class="form-group">
              <div class="input-group">
                  <label>프로젝트 기간</label>
                  <div class="duration-range">
                      <div class="select-wrapper select-wrapper-small">
                          <select v-model="minDuration" @focus="hidePlaceholder = true" @blur="hidePlaceholder = false" class="select-drop">
                              <option value="" disabled :hidden="hidePlaceholder">최소</option>
                              <option v-for="duration in durationOptions" :key="duration.value" :value="duration.value">{{ duration.label }}</option>
                          </select>
                      </div>
                      <span class="range-separator">~</span>
                      <div class="select-wrapper select-wrapper-small">
                          <select v-model="maxDuration" :disabled="!minDuration" @focus="hidePlaceholder = true" @blur="hidePlaceholder = false" class="select-drop">
                              <option value="" disabled :hidden="hidePlaceholder">최대</option>
                              <option v-for="duration in maxDurationOptions" :key="duration.value" :value="duration.value">
                                  {{ duration.label }}
                              </option>
                          </select>
                      </div>
                  </div>
              </div>
          </div>  
  
          <div class="divider"></div>
          
          <div class="category-group">
            <div class="form-group">
            <div class="input-group">
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
            <div class="input-group">
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
        <button class="search-button matching-button" @click="searchMatching">
          매칭 조회
        </button>
        <button class="create-project-button matching-button" @click="createMatching">
          매칭 생성    
          <MatchingCreate 
            v-if="showModal"
            @close="showModal = false"
            @create="handleCreateMatching"
            />
        </button>
      </div>
    </div>
  <div v-if="activeTab === 'private'" class="search-form">
      <div class="invite-group">
          <div class="invite">
              <label>입장 코드</label>
              <div class="invite-input">
                  <input ref="inviteInput" type="text" placeholder="입장 코드를 입력하세요">
              </div>
              <button class="invite-button">입장하기</button>
          </div>
      </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import MatchingCreate from './MatchingCreate.vue'

const router = useRouter()
const activeTab = ref('random')
const minPeople = ref('')
const maxPeople = ref('')
const minDuration = ref('')
const maxDuration = ref('')
const category = ref('')
const subcategory = ref('')
const hidePlaceholder = ref(false)
const inviteInput = ref(null)
const subcategoryPlaceholder = ref('Select Category')
const showModal = ref(false);

// 읽어오기
const categories = ['개발', '디자인', '기획', '마케팅']
const subcategoriesMap = {
  '개발': ['웹', '모바일', '백엔드', '프론트엔드'],
  '디자인': ['UI/UX', '그래픽', '브랜딩'],
  '기획': ['서비스 기획', '전략 기획', 'PM'],
  '마케팅': ['디지털 마케팅', '콘텐츠 마케팅', '브랜드 마케팅']
}
const durationOptions = [
  { value: '1w', label: '1주' },
  { value: '2w', label: '2주' },
  { value: '1m', label: '1개월' },
  { value: '2m', label: '2개월' },
  { value: '3m', label: '3개월' },
  { value: '6m', label: '6개월' }
]

const subcategories = computed(() => {
  return category.value ? subcategoriesMap[category.value] : []
})

const maxPeopleOptions = computed(() => {
  return minPeople.value ? Array.from({ length: 10 - minPeople.value + 1 }, (_, i) => i + Number(minPeople.value)) : []
})

const maxDurationOptions = computed(() => {
  if (!minDuration.value) return []
  const currentIndex = durationOptions.findIndex(d => d.value === minDuration.value)
  return durationOptions.slice(currentIndex)
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
          minPeople.value = ''
          maxPeople.value = ''
          minDuration.value = ''
          maxDuration.value = ''
          category.value = ''
          subcategory.value = ''
          hidePlaceholder.value = false
          inviteInput.value = null
          subcategoryPlaceholder.value = 'Select Category'
      }
  })

  const searchMatching = () => {
    if (router.currentRoute.value.path === '/match/result') {
    window.location.reload()
  } else {
    router.push('/match/result')
  }
  }

  const createMatching = () => {
    showModal.value = !showModal.value;
  }
  // 이부분에 api 요청 구현
  // const searchMatching = async () => {
  // if (activeTab.value === 'random') {
  //     // Create search parameters object
  //     const searchParams = {
  //         minPeople: minPeople.value,
  //         maxPeople: maxPeople.value,
  //         minDuration: minDuration.value,
  //         maxDuration: maxDuration.value,
  //         category: category.value,
  //         subcategory: subcategory.value
  //     }

  //     // Convert to query string, including null values
  //     const queryString = Object.entries(searchParams)
  //         .map(([key, value]) => `${key}=${value === null ? 'null' : value}`)
  //         .join('&')

  //     // Navigate to result page with search parameters
  //     router.push(`/match/result?${queryString}`)
  // }
//}
</script>

<style scoped>
  .search-container {
    justify-items: center;
      padding: 20px;
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
      padding-bottom: 12px;
      background: white;
      border-radius: 8px;
      white-space: nowrap;
      margin: 0;
  }
  
  .input-group {
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
</style> 