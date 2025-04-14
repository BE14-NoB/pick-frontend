<template>
    <div>
        <div class="commentHeader">
            <h4>댓글 {{ commentNum }}</h4>
        </div>
        <div>
            <div v-for="comment in mappedShowableComments" :key="id">
                <div class="commentBox">
                    <div class="commentBoxHeader">
                        <div>
                            {{ comment.nickname }}
                        </div>
                        <div>
                            {{ comment.upload_at }} | 신고 | 답글
                        </div>
                    </div>
                    <div class="commentBoxBody">
                        {{ comment.content }}
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="commentInsertBox">
                <div class="commentInsertBoxHeader">
                    댓글 작성 <span style="color: #d5d5d5;">{{ nickname }}</span>
                </div>
                <div class="commentInsertBoxBody">
                    <textarea name="commentContent" id="commentContent"></textarea>
                    <button class="blue" onclick="" style="">작성하기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import commentList from '@/json/comment_list.json';
    import {ref, onMounted, computed} from 'vue';

    const nickname = ref('꼼곰보');

    const props = defineProps({
        postId: String
    });
    
    console.log('postId', props.postId);

    // 임시 멤버 데이터
    const memberList = ref([
        { id: 1, nickname: '꼼곰보' },
        { id: 2, nickname: '혬부기' },
        { id: 3, nickname: '석킼키킼키' },
        { id: 4, nickname: '민선' },
        { id: 5, nickname: 'Bluesky' },
        { id: 6, nickname: '시냥주' },
        { id: 7, nickname: 'VeRiTaS' },
        { id: 8, nickname: '개발하는햄스터' },
        { id: 9, nickname: '쿼리장수' },
        { id: 10, nickname: '열정개발러' }
    ]);
    
    const commentData = ref(commentList);
    
    const showableComments = computed(() => {
        const statusFilter = commentData.value.filter(comment => comment.status === 0);
        const idFilter = statusFilter.filter(comment => comment.post_id === Number(props.postId));
        return idFilter;
    });
    
    const mappedShowableComments = computed(() => {
        return showableComments.value.map(comment => {
            const member = memberList.value.find(m => m.id === comment.member_id);
            return {
                id: comment.id,
                content: comment.content,
                upload_at: comment.upload_at,
                nickname: member ? member.nickname : '알 수 없음'
            }
        });
    });
    
    const commentNum = computed(() => mappedShowableComments.value.length);

</script>

<style scoped>
    .commentHeader {
        border-bottom: 1px solid #d5d5d5;
        margin-bottom: 10px;
        padding-left: 10px;
    }

    .commentBox {
        border: 1px solid #d5d5d5;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 10px;
    }

    .commentBoxHeader {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #d5d5d5;
        padding: 5px;
        padding-left: 10px;
    }

    .commentBoxBody {
        padding: 5px;
        padding-left: 10px;
    }

    .commentInsertBox {
        border: 1px solid #d5d5d5;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 10px;
    }

    .commentInsertBoxHeader {
        border-bottom: 1px solid #d5d5d5;
        padding: 5px;
        padding-left: 10px;
    }

    .commentInsertBoxBody {
        display: flex;
        flex-direction: column;
        align-items: end;
        padding: 5px;
        padding-left: 10px;
    }

    #commentContent {
        width: 100%;
        height: 100%;
        resize: none;
        outline: none;
    }

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