<template>
  <div class="member-profile-container">
    <div class="mypage-main">
      <h1>꼼곰보</h1>

      <div class="mypage-level">
        <p>31</p>
        <v-progress-linear color="blue-lighten-3" model-value="20" height="20" rounded></v-progress-linear>
        <br />
      </div>

      <div class="mypage-rate">
        <p>3.5</p>
        <v-progress-linear color="blue-lighten-3" model-value="20" height="20" rounded></v-progress-linear>
        <br />
      </div>

      <!-- 통계 섹션 -->
      <v-row class="stats-section">
        <v-col cols="4" sm="4" md="4" class="stat-item">
          <span class="stat-label">완료 프로젝트</span>
          <div class="stat-value">7개</div>
        </v-col>
        <v-col cols="4" sm="4" md="4" class="stat-item">
          <span class="stat-label">함께한 팀원</span>
          <div class="stat-value">30명</div>
        </v-col>
        <v-col cols="4" sm="4" md="4" class="stat-item">
          <span class="stat-label">보유 뱃지 수</span>
          <div class="stat-value">2개</div>
        </v-col>
      </v-row>

      <!-- 자기소개, 선호 분야, 수상 경력 섹션 -->
      <v-row class="intro-section">
        <!-- 왼쪽 열: 자기소개 -->
        <v-col cols="12" md="6" class="intro-col">
          <v-card class="intro-card">
            <v-card-title>자기소개</v-card-title>
            <v-card-text class="scrollable">
              컴퓨터 공학과 어떻게 졸업 <br />
              프로젝트 경험 N회<br />
              프론트 - 백엔드 전향<br />
              하고싶은건 주도적으로 하는 편이에요<br />
              추후 사이드 이펙트까지 확인하는 편이에요<br />
              기획 단계에 모이고 개발 후부터는 각자 하는 것을 신호해요
            </v-card-text>
          </v-card>
        </v-col>

        <!-- 오른쪽 열: 선호 분야와 수상 경력 -->
        <v-col cols="12" md="6" class="intro-col">
          <v-row>
            <!-- 선호 분야 -->
            <v-col cols="12" class="sub-intro-col">
              <v-card class="intro-card">
                <v-card-title>선호 분야</v-card-title>
                <v-card-text class="scrollable">
                  안드로이드 기반의 어플리케이션 관련 선호<br />
                  안드로이드 기반 커뮤니티 앱 게임 앱 제작<br />
                  안드로이드 기반 커뮤니티 앱 게임 앱 제작<br />
                  안드로이드 기반 커뮤니티 앱 게임 앱 제작<br />
                  안드로이드 기반 커뮤니티 앱 게임 앱 제작
                </v-card-text>
              </v-card>
            </v-col>

            <!-- 수상 경력 -->
            <v-col cols="12" class="sub-intro-col">
              <v-card class="intro-card">
                <v-card-title>수상 경력</v-card-title>
                <v-card-text class="scrollable">
                  2023 사이버공격방어대회 청소년 우승, 국가 정보원장상<br />
                  2022-2024 NO비에이 BE Engineer 지적<br />
                  2023 사이버공격방어대회 청소년 우승, 국가 정보원장상<br />
                  2022-2024 NO비에이 BE Engineer 지적<br />
                  2023 사이버공격방어대회 청소년 우승, 국가 정보원장상
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>

    <div class="mypage-image">
      <v-avatar size="200">
        <img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" alt="Profile" />
      </v-avatar>
    </div>

    <h2>최근 프로젝트</h2>
    <v-row>
      <v-col cols="3" sm="3" md="4">
        <v-card>
          <v-img src="https://via.placeholder.com/150" height="150px"></v-img>
          <v-card-title>Pick</v-card-title>
          <v-card-subtitle>개발자를 위한 사이드 프로젝트 플랫폼</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="3" sm="3" md="4">
        <v-card>
          <v-img src="https://via.placeholder.com/150" height="150px"></v-img>
          <v-card-title>To Do List</v-card-title>
          <v-card-subtitle>할 일을 미루는 이들을 위한 체크리스트</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { VAvatar, VRow, VCol, VCard, VCardTitle, VCardSubtitle, VImg, VProgressLinear } from 'vuetify/components';
</script>

<style scoped>
.member-profile-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
}

.mypage-image {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  right: 470px;
  bottom: 420px;
}

.mypage-main {
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  position: relative;
  left: 300px;
  top: 35px;
}

h1 {
  font-size: 28px;
  color: #333;
  margin: 20px 0 10px;
}

h2 {
  font-size: 22px;
  color: #333;
  margin: 30px 0 10px;
}

p {
  font-size: 18px;
  color: #666;
  line-height: 1.6;
}

.v-progress-linear {
  margin: 10px 0;
  height: 10px;
  border-radius: 5px;
  max-width: 400px;
}

/* 통계 섹션 스타일 */
.stats-section {
  justify-content: flex-start;
  margin-top: 20px;
  margin-bottom: 20px;
  max-width: 500px;
}

.stat-item {
  text-align: center;
  border-right: 1px solid #d9d9d9;
}

.stat-item:last-child {
  border-right: none;
}

.stat-label {
  font-size: 14px;
  color: #333;
  display: block;
}

.stat-value {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 5px;
}

/* 자기소개, 선호 분야, 수상 경력 섹션 스타일 */
.intro-section {
  margin-top: 20px;
  margin-bottom: 20px;
}

.intro-col {
  display: flex;
  flex-direction: column;
}

.intro-card {
  margin-bottom: 20px;
  height: 300px; /* 고정 높이 설정 */
}

.scrollable {
  max-height: 240px; /* 카드 제목을 제외한 스크롤 영역 높이 */
  overflow-y: auto; /* 세로 스크롤 활성화 */
  padding-right: 10px; /* 스크롤바와 내용 간격 */
}

/* 오른쪽 열의 선호 분야와 수상 경력 */
.sub-intro-col {
  flex: 1;
}

.sub-intro-col .intro-card {
  height: 150px; /* 오른쪽 열의 카드는 높이를 반으로 나눔 */
}

.sub-intro-col .scrollable {
  max-height: 90px; /* 카드 제목을 제외한 스크롤 영역 높이 */
}
</style>