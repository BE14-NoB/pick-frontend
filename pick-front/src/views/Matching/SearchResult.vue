<template>
        <div class="page-header">
            <h1 class="page-header-title">프로젝트 매칭</h1>
        </div>
        <div class="content-wrapper">
            <main class="content">
                <div class="sidebar">
                    
                </div>
                <div class="result-content">
                    <MatchingResult />
                </div>
                <div class="sidebar">
                    <MatchingSideBar />
                </div>
            </main>
        </div>
</template>

<script setup>
    import MatchingResult from '@/components/matching/MatchingResult.vue'
    import MatchingSideBar from '@/components/matching/MatchingSideBar.vue';
</script>

<style>
    .page-header {
        background-color: #cfe3f2;
        padding: 20px 0px 0px 200px;
        margin: 0;
    }

    .page-header-title {
        font-size: 32px;
        font-weight: bold;
        border: 60% 80% 10% 10%;
        margin: 80px 0px 30px 0px;
    }

    .page-title {
    font-size: 24px;
    font-weight: bold;
    }
    .content {
        display: flex;
    }
    .result-content {
        flex: 3;
    }

    .sidebar {
        flex: 1;
        position: sticky;
        top: 100px; /* 헤더 높이에 맞춰 조정 */
        bottom: 100px;
        align-self: flex-start;
    }
</style>