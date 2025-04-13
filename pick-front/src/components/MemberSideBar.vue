<template>
  <div class="custom-sidebar">
    <!-- 사이드 메뉴 카드 -->
    <v-card class="menu-box" elevation="1">
      <v-list v-model:opened="opened" nav density="compact">
        <!-- 상단 메뉴 -->
        <v-list-item
          prepend-icon="mdi-account-check"
          title="회원"
          value="회원"
          @click="goTo('/member/info')"
        />
        <v-list-item
          prepend-icon="mdi-bell-alert-outline"
          title="신고 및 규제"
          value="신고 및 규제"
          @click="goTo('/member/report')"
        />
        <v-list-item
          prepend-icon="mdi-medal"
          title="뱃지"
          value="뱃지"
          @click="goTo('/badge')"
        />
        <v-list-item
          prepend-icon="mdi-target"
          title="도전 과제"
          value="도전 과제"
          @click="goTo('/achievement')"
        />
        <v-list-item
          prepend-icon="mdi-format-list-checks"
          title="일일 미션"
          value="일일 미션"
          @click="goTo('/dailymission')"
        />

        <!-- 프로젝트 토글 메뉴 -->
        <v-list-group value="프로젝트" prepend-icon="mdi-calendar-month-outline">
          <template #activator="{ props }">
            <v-list-item v-bind="props" title="프로젝트" />
          </template>
          <v-list-item
            title="모집 중 프로젝트"
            value="모집 중 프로젝트"
            @click="goTo('/project/recruiting')"
          />
          <v-list-item
            title="승인 대기 프로젝트"
            value="승인 대기 프로젝트"
            @click="goTo('/project/pending')"
          />
          <v-list-item
            title="참여 중 프로젝트"
            value="참여 중 프로젝트"
            @click="goTo('/project/active')"
          />
          <v-list-item
            title="참여 완료 프로젝트"
            value="참여 완료 프로젝트"
            @click="goTo('/project/completed')"
          />
        </v-list-group>

        <!-- 게시글 -->
        <v-list-item
          prepend-icon="mdi-post-outline"
          title="게시글"
          value="게시글"
          @click="goTo('/post/list/all')"
        />
      </v-list>
    </v-card>

    <!-- 프로젝트 매칭 카드 (유지) -->
    <v-card class="matching-box" elevation="1">
      <img src="@/assets/matchingImg.png" alt="매칭 이미지" class="matching-img" />
      <div class="matching-label">프로젝트 매칭하기</div>
      <v-btn class="matching-btn" color="primary" block @click="handleProjectClick">
        매칭하기
      </v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const opened = ref([])

const goTo = (path) => {
  router.push(path)
}

const handleProjectClick = () => {
  router.push('/match')
}
</script>

<style scoped>
.custom-sidebar {
  margin-top: 24px;
  margin-left: 40px;
  width: 240px;
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.menu-box {
  padding: 12px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
}

::v-deep(.v-list-item--active) {
  background-color: transparent !important;
  color: #1e3a8a !important;
}

::v-deep(.v-list-item--active .v-icon) {
  color: #1e3a8a !important;
}

.matching-box {
  padding: 16px;
  background-color: #f8f9ff;
  border-radius: 16px;
  border: 1px solid #d0d4f0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.matching-img {
  width: 80px;
  margin-bottom: 12px;
}

.matching-label {
  color: #888;
  font-size: 14px;
  margin-bottom: 12px;
}

.matching-btn {
  font-weight: bold;
}
</style>
