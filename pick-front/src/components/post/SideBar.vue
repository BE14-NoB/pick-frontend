<template>
    <div class="sideBar">
        <div class="sideBarTitle">게시판</div>
        <button @click="changeRouter('free')"><div class="sideBarSection" :class="{active: isActive('free')}">자유 게시판</div></button>
        <button @click="changeRouter('recruit')"><div class="sideBarSection" :class="{active: isActive('recruit')}">모집 게시판</div></button>
        <button @click="changeRouter('qna')"><div class="sideBarSection" :class="{active: isActive('qna')}">Q&A 게시판</div></button>
    </div>
</template>

<script setup>
    import {computed} from 'vue';
    import {useRoute, useRouter} from 'vue-router';
    import postList from '@/json/post_list.json';

    const route = useRoute();
    const router = useRouter();

    function changeRouter(path) {
        router.push(`/post/list/${path}`);
    }
    
    const currentPost = computed(() => {
        const postId = Number(route.params.id);
        return postList.find(post => post.id === postId);
    });

    const currentCategory = computed(() => currentPost.value?.category);

    const currentCategoryName = computed(() => {
        switch(currentCategory.value) {
            case 0 : return 'free';
            case 1 : return 'recruit';
            case 2 : return 'qna';
        }
    });

    const isActive = (category) => {
        return route.params.category === category || currentCategoryName.value === category;
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
