<template>
    <div class="search-container">
        <div class="header">
            <div class="tab-group">
                <button class="tab-button" :class="{ active: activeTab === 'random' }" @click="setActiveTab('random')">
                    <span class="icon">
                        <!-- 아이콘 이미지 수정 예정 -->
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M15 12H12M12 12H9M12 12V15M12 12V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </span>
                    <label>Random Matching</label>
                </button>
                <button class="tab-button" :class="{ active: activeTab === 'private' }" @click="setActiveTab('private')">
                    <span class="icon">
                        <!-- 아이콘 이미지 수정 예정 -->
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    <label>Private Matching</label>
                </button>
            </div>
            <button class="create-project-button">프로젝트 생성</button>
        </div>
        <div v-if="activeTab === 'random'" class="search-form">
            <div class="form-group">
                <span class="icon">
                    <!-- 아이콘 이미지 -->
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
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
                <span class="icon">
                    <!-- 아이콘 -->
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
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
            
            <div class="form-group">
                <!-- 아이콘 -->
                <span class="icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 9H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 21V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            <div class="input-group">
                <label>상위 카테고리</label>
                <div class="select-wrapper select-wrapper-large">
                    <select v-model="category" @focus="hidePlaceholder = true" @blur="hidePlaceholder = false">
                        <option value="" disabled :hidden="hidePlaceholder">Select Category</option>
                            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                    </select>
                </div>
            </div>
        </div>
        
        <div class="divider"></div>  
        
        <div class="form-group">
            <span class="icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 7L15 12L9 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
            <div class="input-group">
                <label>하위 카테고리</label>
                <div class="select-wrapper select-wrapper-large">
                    <select v-model="subcategory" :disabled="!category" @focus="hidePlaceholder = true" @blur="hidePlaceholder = false">
                        <option value="" disabled :hidden="hidePlaceholder">Select Category</option>
                        <option v-for="subcat in subcategories" :key="subcat" :value="subcat">{{ subcat }}</option>
                    </select>
                </div>
            </div>
        </div>
        <button class="search-button">
            <span class="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21 21L16.65 16.65" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
        </button>
    </div>
    <div v-if="activeTab === 'private'" class="search-form">
        <div class="form-group">
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
import { ref, computed, nextTick } from 'vue'

const activeTab = ref('random')
const minPeople = ref('')
const maxPeople = ref('')
const minDuration = ref('')
const maxDuration = ref('')
const category = ref('')
const subcategory = ref('')
const hidePlaceholder = ref(false)
const inviteInput = ref(null)

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
</script>

<style scoped>
    .search-container {
        padding: 30px;
        border-radius: 12px;
        max-width: fit-content;
        min-width: fit-content;
        margin: 0 auto;
        flex-direction: column;
        background-color: rgba(222, 222, 222, 0.7);
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .tab-group {
        display: flex;
        gap: 0;
    }

    .tab-button {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 16px;
        background: rgba(2, 7, 37, 0.1);
        border: none;
        cursor: pointer;
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
        font-size: 18px;
        color: rgba(2, 7, 37, 0.4);
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
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: #ffffff;
        border-radius: 0 12px 12px 12px;
        box-shadow: 0 2px 8px rgba(2, 7, 37, 0.05);
        min-width: 1260px;
        min-height: 120px;
    }
    
    .form-group {
        display: flex;
        gap: 7px;
        padding: 16px;
        background: white;
        border-radius: 8px;
        white-space: nowrap;
    }
    
    .input-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    
    .invite {
        display: flex;
        gap: 20px;
    }

    .invite-input {
        border: 2px solid #5d8ac1;
        border-radius: 8px;
        min-width: 1000px;
        padding: 1px;
        padding-left: 10px;
        display: inline-block
    }

    .invite-input input {
        border: none;
        outline: none;
    }
    
    .divider {
        width: 1px;
        height: 40px;
        background: rgba(2, 7, 37, 0.1);
    }
    
    label {
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
        font-size: 18px;
        color: #020725;
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
        font-size: 18px;
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
    
    .search-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        background: #133E86;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    .search-button:hover {
        background: #1a4ca8;
    }
    
    .create-project-button {
        padding: 8px 16px;
        background: rgba(93, 138, 193, 0.7);
        border: none;
        border-radius: 8px;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-top: 8px;
        margin-right: 8px;
    }
    
    .create-project-button:hover {
        background: rgba(93, 138, 193, 0.85);
    }

    .invite-button {
        padding-left: 12px;
        padding-right: 12px;
        background: #133E86;
        border: none;
        border-radius: 8px;
        font-family: sans-serif;
        font-weight: 500;
        font-size: 18px;
        color: #fff;
    }
    
    .icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .people-range,
    .duration-range {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .range-separator {
        color: #020725;
        font-size: 18px;
        font-weight: 600;
    }
    
    select:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style> 