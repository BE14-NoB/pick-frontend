<template>
  <div class="page-layout">
    <MyHeader />

    <div class="main-content">
      <!-- 사이드바 -->
      <MemberSideBar class="side" />

      <!-- 본문 -->
      <div class="content-area">
        <div class="title-wrapper">
          <h2 class="page-title">일일미션</h2>
        </div>

        <v-card class="mission-box" elevation="1">
          <v-card-title>
            <TodayDate />
          </v-card-title>

          <ProgressBar :total="missions.length" :completed="completedCount" />

          <v-divider />

          <v-card-text>
            <div class="mission-list">
              <v-row
                v-for="(mission, index) in missions"
                :key="index"
                class="d-flex align-center justify-space-between py-2"
              >
                <div class="d-flex align-center">
                  <v-btn
                    icon
                    :color="mission.isCompleted ? 'primary' : 'blue-grey-lighten4'"
                    density="compact"
                    style="min-width: 32px; height: 32px; pointer-events: none; cursor: default;"
                  >
                    <v-icon size="20">
                      {{ mission.isCompleted ? 'mdi-checkbox-marked-circle' : 'mdi-checkbox-blank-circle-outline' }}
                    </v-icon>
                  </v-btn>
                  <span
                    class="mission-text ml-2"
                    :class="{ completed: mission.isCompleted }"
                  >
                    {{ mission.title }}
                  </span>
                </div>
                <span class="xp mr-2">{{ mission.expPoint }} xp</span>
              </v-row>
            </div>
          </v-card-text>
        </v-card>

        <MyFooter />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import MemberSideBar from '@/components/MemberSideBar.vue'
import ProgressBar from '@/components/dailymission/components/ProgressBar.vue'
import TodayDate from '@/components/dailymission/components/TodayDate.vue'
import DailyMission from '@/json/dailymission.json'

const today = new Date().toISOString().slice(0, 10)

// JSON을 reactive 배열로 변환
const missions = reactive(DailyMission.map(m => ({ ...m })))

const completedCount = computed(() =>
  missions.filter(m => m.isCompleted).length
)
</script>

<style scoped>
.page-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
}

.side {
  width: 240px;
  background-color: #ffffff;
  border-right: 1px solid #ddd;
}

.content-area {
  flex: 1;
  padding: 40px;
}

.title-wrapper {
  display: flex;
  justify-content: flex-start;
  max-width: 800px;
  margin: 0 auto 8px auto;
}

.page-title {
  font-size: 30px;
  font-weight: bold;
  color: #333;
}

.mission-box {
  padding: 24px;
  background-color: #e0efff;
  border-radius: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.mission-text {
  font-size: 15px;
  color: #333;
}

.mission-text.completed {
  text-decoration: line-through;
  color: #999;
}

.xp {
  font-size: 14px;
  font-weight: 500;
  color: #555;
}
</style>
