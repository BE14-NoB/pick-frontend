<template>
  <v-footer class="footer py-4" :color="footerColor">
    <v-container>
      <v-row>
        <!-- 프로젝트 매칭 섹션 -->
        <v-col cols="12" md="3">
          <h3 class="footer-title">프로젝트 매칭</h3>
          <ul>
            <li v-for="(item, index) in projectMatching" :key="index">
              <router-link :to="item.path" class="footer-link">
                {{ item.label }}
              </router-link>
            </li>
          </ul>
        </v-col>

        <!-- 전체 프로젝트 섹션 -->
        <v-col cols="12" md="2">
          <h3 class="footer-title">전체 프로젝트</h3>
          <ul>
            <li>
              <router-link :to="allProjects.path" class="footer-link">
                {{ allProjects.label }}
              </router-link>
            </li>
          </ul>
        </v-col>

        <!-- 게시판 섹션 -->
        <v-col cols="12" md="3">
          <h3 class="footer-title">게시판</h3>
          <ul>
            <li v-for="(item, index) in board" :key="index">
              <router-link :to="item.path" class="footer-link">
                {{ item.label }}
              </router-link>
            </li>
          </ul>
        </v-col>

        <!-- 뱃지 섹션 -->
        <v-col cols="12" md="2">
          <h3 class="footer-title">뱃지</h3>
          <ul>
            <li v-for="(item, index) in badges" :key="index">
              <router-link :to="item.path" class="footer-link">
                {{ item.label }}
              </router-link>
            </li>
          </ul>
        </v-col>

        <!-- Contacts 섹션 -->
        <v-col cols="12" md="2">
          <h3 class="footer-title">Contacts</h3>
          <ul>
            <li v-for="(contact, index) in contacts" :key="index" class="contact-item">
              <v-icon small class="contact-icon">{{ contact.icon }}</v-icon>
              <span class="footer-link">{{ contact.label }}</span>
            </li>
          </ul>
        </v-col>
      </v-row>

      <!-- 저작권 정보 -->
      <v-divider class="my-4" thickness="1" color="#b0b0b0"></v-divider>
      <div class="text-center copyright">
        {{ copyrightText }}
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
defineProps({
  projectMatching: {
    type: Array,
    default: () => [
      { label: "랜덤 매칭", path: "/match/random" },
      { label: "사설 매칭", path: "/match/private" },
      { label: "방 생성", path: "/match/create-room" },
      { label: "사설 매칭 입장", path: "/match/join-private" },
    ],
  },
  allProjects: {
    type: Object,
    default: () => ({
      label: "전체 프로젝트",
      path: "/project",
    }),
  },
  board: {
    type: Array,
    default: () => [
      { label: "자유게시판", path: "/post/list/free" },
      { label: "Q&A 게시판", path: "/post/list/qna" },
      { label: "모집게시판", path: "/post/list/recruit" },
    ],
  },
  badges: {
    type: Array,
    default: () => [
      { label: "전체", path: "/badge/all" },
      { label: "도전과제", path: "/badge/challenges" },
      { label: "현업", path: "/badge/career" },
      { label: "자격증", path: "/badge/certifications" },
      { label: "학력", path: "/badge/education" },
      { label: "Git", path: "/badge/git" },
    ],
  },
  contacts: {
    type: Array,
    default: () => [
      { icon: "mdi-map-marker", label: "87, Boramae-ro, Dongjak-gu, Seoul" },
      { icon: "mdi-phone", label: "+82 10 8119 2377" },
      { icon: "mdi-email", label: "ohgraffers1431@gmail.com" },
    ],
  },
  footerColor: {
    type: String,
    default: "#ffffff",
  },
  copyrightText: {
    type: String,
    default: `Copyright © ${new Date().getFullYear()}. All rights reserved.`,
  },
});
</script>

<style scoped>
.footer {
  color: rgb(255, 255, 255);
}

.footer-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #73ACDE;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.footer-link {
  color: #73ACDE;
  text-decoration: none;
  font-size: 14px;
}

.footer-link:hover {
  color: #b6c8d7;
}

.contact-item {
  display: flex;
  align-items: center;
}

.contact-icon {
  margin-right: 10px;
  color: #b0b0b0;
  font-size: 14px; /* 아이콘 크기를 텍스트와 맞춤 */
}

.copyright {
  color: #b0b0b0;
  font-size: 12px;
}
</style>