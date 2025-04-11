<template>
    <article style="margin-left:300px">
        <div v-if="!singlePost">
            <!-- 게시판 제목 -->
            <h2>{{ categoryKor }} 게시판</h2>
            <!-- 게시판 짧은 설명 -->
            <p>{{ categoryDescription }}</p>
        </div>
        <!-- 검색창 + 글쓰기 버튼 -->
        <div style="display:flex; flex-direction: row; align-items: center;">
            <SearchBox @return-result="showSearchResult"/>
            <div style="width:200px;"></div>
            <button class="blue" onclick="location.href='/post/write'">글쓰기</button>
        </div>
        <!-- 게시글 목록 -->
        
        <!-- 페이지네이션 + 페이지 목록 수 콤보박스 -->
    </article>
</template>

<script setup>
    import SearchBox from '@/components/post/SearchBox.vue';
    import SinglePost from '@/components/post/SinglePost.vue';

    import { ref, reactive } from 'vue';
    import { useRoute } from 'vue-router';

    const currentRoute = useRoute();
    // console.log('currentRoute:', currentRoute);
    const category = ref('');
    category.value = currentRoute.params.category;

    const categoryKor = ref('');
    switch (category.value) {
        case 'free':
            categoryKor.value = '자유';
            break;
        case 'recruit':
            categoryKor.value = '모집';
            break;
        case 'qna':
            categoryKor.value = 'Q&A';
            break;
    }

    const categoryDesc = reactive([
        {
            category: 'free',
            desc: '자유롭게 의견을 나누는 공간입니다.'
        },
        {
            category: 'recruit',
            desc: '팀원을 모집하는 공간입니다.'
        },
        {
            category: 'qna',
            desc: '모르는 부분을 물어보는 공간입니다.'
        }
    ]);

    const categoryDescription = ref('');
    for (let i = 0; i < categoryDesc.length; i++) {
        if (category.value == categoryDesc[i].category) {
            categoryDescription.value = categoryDesc[i].desc;
        }
    }
    const singlePost = ref(false);
    function togglePost(category) {
        
    }

    function showSearchResult(result) {
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