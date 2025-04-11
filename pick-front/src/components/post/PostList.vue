<template>
    <article style="margin-left:300px">
        <div v-if="!singlePost">
            <!-- 게시판 제목 -->
            <h2>{{ categoryKor }} 게시판</h2>
            <!-- 게시판 짧은 설명 -->
            <p>{{ categoryDesc }}</p>
        </div>
        <!-- 검색창 + 글쓰기 버튼 -->
        <div style="display:flex; flex-direction: row; align-items: center;">
            <SearchBox @return-result="showSearchResult"/>
            <div style="width:200px;"></div>
            <button class="blue" onclick="location.href='/post/write'">글쓰기</button>
        </div>
        <!-- 게시글 목록 -->
        <List :headers="headers" :items="items"/>
        <!-- 페이지네이션 + 페이지 목록 수 콤보박스 -->
    </article>
</template>

<script setup>
    import SearchBox from '@/components/common/SearchBox.vue';
    import SinglePost from '@/components/post/SinglePost.vue';
    import List from '@/components/post/List.vue';

    import { ref, reactive, computed } from 'vue';
    import { useRoute } from 'vue-router';

    const currentRoute = useRoute();

    const singlePost = ref(false);

    const categoryKor = computed(() => {
        switch (currentRoute.params.category) {
            case 'free': return '자유';
            case 'recruit': return '모집';
            case 'qna': return 'Q&A';
        }
    });

    const categoryDesc = computed(() => {
        switch (currentRoute.params.category) {
            case 'free': return '자유롭게 의견을 나누는 공간입니다.';
            case 'recruit': return '팀원을 모집하는 공간입니다.';
            case 'qna': return '모르는 부분을 물어보는 공간입니다.';
        }
    });

    const headers = ref(['번호', '제목', '작성 시간', '작성자']);

    const items = ref([]);

    const togglePost = (category) => {
        
    }

    const showSearchResult = (result) => {
        // 게시글 목록에 전달
    }
</script>

<style scoped>
    button.blue {
        border-radius: 10px;
        background-color: #133286;
        color: white;
        height: 30px;
        width: auto;
        padding-left: 25px;
        padding-right: 25px;
    }
</style>