<template>
    <div class="page-header">
            <h1 class="page-header-title">PICK</h1>
    </div>
    <div class="content-wrapper">
        <main class="main-content">
            <MatchingResult/>
        </main>
    </div>
</template>

<script setup>
    import MatchingResult from '@/components/matching/MatchingResult.vue'
</script>

<style>
    .project-layout {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

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
</style>