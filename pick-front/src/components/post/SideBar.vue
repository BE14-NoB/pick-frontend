<template>
    <div class="sideBar">
        <div class="sideBarTitle">게시판</div>
        <button @click="changeRouter('free')"><div class="sideBarSection">자유 게시판</div></button>
        <button @click="changeRouter('recruit')"><div class="sideBarSection">모집 게시판</div></button>
        <button @click="changeRouter('qna')"><div class="sideBarSection">Q&A 게시판</div></button>
    </div>
</template>

<script setup>
    import {useRouter} from 'vue-router';

    const router = useRouter();

    function changeRouter(path) {
        router.push(`/post/list/${path}`);
    }
</script>

<style scoped>
    .sideBar {
        border-radius: 10px;
        border: 1px solid #d9d9d9;
        width: 250px;
        padding-bottom: 10px;
    }
    .sideBarTitle {
        text-align: center;
        font-size: 24px;
        align-content: center;
        height: 100px;
        border-bottom: 1px solid #d9d9d9;
    }
    .sideBarSection {
        border-bottom: 1px solid #d9d9d9;
        text-align: left;
        align-content: center;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .sideBarSection:hover {
        background-color: #efefef;
    }
    a {
        text-decoration: none;
        color: black;
    }
    .active {
        background-color: #d9d9d9;
    }
    #last {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    button {
        width: 250px;
    }
</style>
