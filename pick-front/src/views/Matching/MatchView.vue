<template>
<div class="matching-view">

      <section class="matching-header">
        <div class="page-header">
          <div class="main-text">프로젝트 매칭</div>
          <div class="sub-text">매칭을 조회하거나 생성된 프로젝트에 참여할 수 있습니다.</div>
        </div>
        <!-- MatchingSearch 컴포넌트를 절대 위치로 배치 -->
        <div class="search-overlay">
          <MatchingSearch />
        </div>
      </section>
    </div>
</template>
  

<script setup>
  import { ref } from 'vue'
  import MatchingSearch from '@/components/matching/MatchingSearch.vue';
</script>

<style scoped>
  .page-header {
    height: 300px;
    background-color: #cfe3f2;
    margin: 0;
    display: flex;
    justify-content: center; /* 가로 가운데 */
  }

  .matching-header {
    height: 693px;
    position: relative;
  }
  .search-overlay {
    position: absolute;
    bottom: 260px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
  .main-text {
    position: absolute;
    top: 90px;
    left: 330px;
    color: #020725;
    font-size: 32px;
    font-weight: bold;
  }
  .sub-text {
    position: absolute;
    color: #020725;
    font-size: 16px;
    top: 150px;
    left: 330px;
  }
</style>