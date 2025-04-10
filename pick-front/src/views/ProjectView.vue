<template>
    <div>프로젝트 페이지</div>

    <div class="project-layout">
        <aside class="sidebar">
        <router-link to="/project/dashboard">대시보드</router-link>
        <router-link to="/project/info">프로젝트 정보</router-link>
        <!-- <router-link to="/project/meeting">회의록</router-link>
        <router-link to="/project/members">팀원</router-link>
        <router-link to="/project/reviews">프로젝트 후기</router-link>
        <router-link to="/project/issues">이슈</router-link>
        <router-link to="/project/pr">PR</router-link>
        <router-link to="/project/commit">커밋</router-link> --> 
        </aside>

        <section class="main-content">
        <router-view /> <!-- 🔥 핑크색 영역 (children이 여기에 렌더링됨) -->
        </section>
    </div>




  


</template>
  
<script setup>


</script>
  
<style scoped>
  .card-list {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
    padding: 20px;
  }
</style>
  