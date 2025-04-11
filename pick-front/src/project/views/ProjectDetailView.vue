<template>
    <div class="project-detail-page" v-if="projectData">
      <main class="main-content">
        <section class="project-intro">
            <div class="left-text">
                <div class="project-name">{{ projectData.name }}</div>
                <p class="project-introduction">{{ projectData.introduction }}</p>
                <p class="date">{{ projectData.start_date }} ~ {{ projectData.end_date }}</p>
                <div class="tag-list">
                <!-- <span class="tag">최대 인원: {{ projectData.maximum_participant }}명</span>
                <span class="tag">기간: {{ projectData.duration_time }}</span>
                <span class="tag">카테고리 ID: {{ projectData.technology_category_id }}</span> -->
                <div>
                    
                </div>
                <CategoryChips 
                        :mainCategory="projectData.main_category" 
                        :subCategory="projectData.sub_category" 
                    
                        />
                </div>

            </div>
            <div class="right-image">
                <ThumbNailMockup />
                <!-- <img
                v-if="projectData.thumbnail_image"
                :src="projectData.thumbnail_image"
                alt="프로젝트 썸네일"
                />
                <span v-else>이미지 없음</span> -->
            </div>
        </section>
        <v-divider class="my-4" style="border-color: #333;" />

        <section class="project-content">
          <div>
            <div class="subtitle">프로젝트 설명</div>
            <div v-html="marked(projectData.content)" class="markdown-content" > </div>
          </div>

          <div>
            <div class="subtitle">팀원 소개</div>
            <div class="team-list">
              <div class="member" v-for="(member, index) in projectData.participants" :key="index">
                <v-avatar size="60">
                  <v-img :src="avatarUrl" :alt="member" />
                </v-avatar>
                <span class="member-name">{{ member }}</span>
              </div>
            </div>
          </div>

          <div>
            <div class="subtitle">프로젝트 후기</div>
          </div>

        </section>
        <section>
            

        </section>

  
      </main>
    </div>
  
    <div v-else>로딩 중...</div>
  </template>
  
  



<script setup>
    import { marked } from 'marked'
    import {ref, computed, onMounted, watch} from 'vue';
    import { useRoute } from 'vue-router';
    import CategoryChips from '@/project/components/CategoryChip.vue';
import ThumbNailMockup from '../components/ThumbNailMockup.vue';


    //아바타
    const avatarUrl = new URL('@/assets/img/avatar.png', import.meta.url).href
    
    const route = useRoute()
    const id = route.params.id  
    const projectData = ref(null)

    onMounted(async () => {
        try {
            const res = await fetch(`http://localhost:8081/${id}`)
            const result = await res.json()
            projectData.value = result
        } catch (err) {
            console.error('🚨 fetch 실패', err)
        }
    })

    console.log(projectData)
    console.log(projectData.value)



</script>

<style>
.project-detail-page{
    background-color: #F2F2F2;
    width: 55%;
    margin: 0 auto;
    padding: 5% 5%;
}

.project-intro {
  display: grid;
  grid-template-columns: 1fr 1.4fr; /* 2등분 */
  gap: 40px;
  align-items: center;
  padding: 40px 0;
  
}
.project-content {
  display: flex;
  flex-direction: column; 
  gap: 40px; 
}
.subtitle{
    color:#4C4C4C;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
}
.content{
    color:#4C4C4C;
    font-size: 13px;
}


/* 왼쪽 텍스트 스타일 */
.left-text {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.project-name{
    font-size: 30px;
    font-weight: bold;
}
.project-introduction {
    font-size: 14px;
    color: #4C4C4C;
}
.date{
    color: #B3B3B3;
    font-size: 14px;
    font-weight: normal;
}

/* 오른쪽 이미지 스타일 */
.right-image {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eaeaea;
  border-radius: 12px;
  padding: 16px;
  min-height: 200px;
}

.right-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

/* 태그 스타일 예시 */
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #133E86;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
}


/* 마크다운 */
.markdown-content p {
  margin-bottom: 1em;
  line-height: 1.7;
}

.markdown-content ul {
  padding-left: 1.5rem;
  margin-bottom: 1em;
}

.markdown-content li {
  list-style-type: disc;
  margin-bottom: 0.4em;
}

.markdown-content strong {
  font-weight: bold;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3 {
  margin: 1em 0 0.5em;
  font-weight: bold;
}

.markdown-content {
  color: #4C4C4C;
  font-size: 14px;
}

/* 팀원 소개 */
.team-list {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.member {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  gap:10px;
}

.member-name {
  margin-top: 3px;
  font-size: 13px;
  color: #4C4C4C;
  text-align: center;
  word-break: keep-all;
}



</style>


