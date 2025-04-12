<template>
    <v-card class="git-widget-card"  rounded="xl" :style="{ background: cardGradient }" flat>
      <!-- 상단 아이콘 -->
      <div class="icon-wrapper" :style="{ backgroundColor: iconBgColor }">
        <v-icon size="40" color="white">{{ iconName }}</v-icon>
      </div>
  
      <!-- 텍스트 정보 -->
      <div class="text-content">
        <h3 class="card-title">{{ title }}</h3>
        <p class="card-subtitle">{{ subtitle }}</p>
      </div>
  
      <!-- 버튼 영역: 드롭다운 또는 라우터 링크 -->
      <div class="bottom-action">
        <template v-if="type === 'commit'">
          <v-menu offset-y>
            <template #activator="{ props }">
              <v-btn v-bind="props" class="branch-btn" rounded="pill" variant="flat" color="white">
                <v-icon start size="18" color="black">mdi-source-branch</v-icon>
                <span class="branch-text">{{ selectedBranch }}</span>
                <v-icon end size="14" color="black">mdi-chevron-down</v-icon>
              </v-btn>
            </template>
  
            <v-list>
              <v-list-item
                v-for="branch in button.branches"
                :key="branch"
                @click="selectedBranch = branch"
              >
                <v-list-item-title>{{ branch }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-else>
          <RouterLink :to="button.link">
            <v-btn class="link-btn" rounded="pill" variant="flat" color="white">
              <span>{{ button.text }}</span>
            </v-btn>
          </RouterLink>
        </template>
      </div>
    </v-card>
  </template>
  
  <script setup>
  import { ref, computed, defineProps } from 'vue'
  
  const props = defineProps({
    type: { type: String, required: true }, // 'commit', 'pull-request', 'issue'
    data: { type: Object, required: true },
    button: { type: Object, required: true }
  })
  
  // commit용 selected branch
  const selectedBranch = ref(props.button.branches?.[0] || 'main')
  const branchCommitCount = computed(() => {
      const found = props.data.commitMetaList?.find(b => b.branch === selectedBranch.value)
      return found?.count || 0
  })
  
  // 카드 제목 및 서브타이틀
  const title = computed(() => {
    if (props.type === 'commit') return 'Commit'
    if (props.type === 'pull-request') return 'Pull Request'
    return 'Issue'
  })
  
  const subtitle = computed(() => {
    if (props.type === 'commit') return `${branchCommitCount.value} Commits`
    if (props.type === 'pull-request') return `opened ${props.data.open} closed ${props.data.closed}`
    return `opened ${props.data.open} closed ${props.data.closed}`
  })

  
  // 아이콘 및 배경색
  const iconName = computed(() => {
    if (props.type === 'commit') return 'mdi-source-branch'
    if (props.type === 'pull-request') return 'mdi-git'
    return 'mdi-alert-circle-outline'
  })
  
  const iconBgColor = computed(() => {
    if (props.type === 'commit') return '#F77E36'
    if (props.type === 'pull-request') return '#4793E6'
    return '#5BC0FE'
  })
  
  const cardGradient = computed(() => {
    if (props.type === 'commit') {
      return 'linear-gradient(to bottom, #FDF7F2, #FBEBE1)'
    } else if (props.type === 'pull-request') {
      return 'linear-gradient(to bottom, #F5F6FF, #E5EBF8)'
    } else if (props.type === 'issue') {
      return 'linear-gradient(to bottom, #F3F9FE, #E3F4FE)'
    }
    return 'white'
  })
  </script>
  
  
  <style scoped>
  .git-widget-card {
    width: 200px;
    padding: 24px;
    height: 100%;
    background: linear-gradient(to bottom, #FDF7F2, #FBEBE1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    cursor: pointer; /* 커서 변경 */
  }
  
  .git-widget-card:hover {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  }
  
  .icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .text-content {
    text-align: center;
  }
  
  .card-title {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: #1A1446;
  }
  
  .card-subtitle {
    margin-top: 0;
    font-size: 14px;
    color: #8e8e8e;
    font-weight: lighter;
  }
  
  .bottom-action {
    margin-top: auto;
  }
  
  .branch-btn,
  .link-btn {
    width: 140px;
    background-color: white !important;
    color: black;
    font-weight: 500;
    text-transform: none;
    padding: 0 16px;
    height: 36px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  .branch-text {
    margin: 0 4px;
    /* 말줄임 처리 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    max-width: 72px;
    vertical-align: middle;
  }

  </style>
  