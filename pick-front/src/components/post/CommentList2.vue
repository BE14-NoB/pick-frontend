<!-- CommentList.vue -->
<template>
    <div class="commentHeader">
        <h4 >댓글 {{ commentNum }}</h4>
    </div>
    <CommentChild
        v-for="comment in nestedComments"
        :key="comment.id"
        :comment="comment"
        :depth="0"
    />
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
</template>

<script setup>
    import { ref, computed } from 'vue';
    import CommentChild from './CommentChild.vue'; // 재귀 컴포넌트 import
    import commentList from '@/json/comment_list.json';
    import postMember from '@/json/post_member.json';

    const commentData = ref(commentList);
    const memberList = ref(postMember);

    const props = defineProps({
        postId: String
    });
    
    const showableComments = computed(() => {
        const statusFilter = commentData.value.filter(comment => comment.status === 0);
        const idFilter = statusFilter.filter(comment => comment.post_id === Number(props.postId));
        return idFilter;
    });
    
    const comments = computed(() => {
        return showableComments.value.map(comment => {
            const member = memberList.value.find(m => m.id === comment.member_id);
            return {
                id: comment.id,
                root_comment_id: comment.root_comment_id,
                content: comment.content,
                upload_at: comment.upload_at,
                update_at: comment.update_at,
                nickname: member ? member.nickname : '알 수 없음'
            }
        });
    });
    
    // 계층 구조로 변환
    const nestedComments = computed(() => {
        const map = {}
        const roots = []
    
        // 댓글 ID로 매핑
        for (const comment of comments.value) {
        map[comment.id] = { ...comment, children: [] }
        }
    
        for (const comment of comments.value) {
        if (comment.root_comment_id) {
            map[comment.root_comment_id]?.children.push(map[comment.id]);
        } else {
            roots.push(map[comment.id]);
        }
        }
    
        return roots;
    })

    const commentNum = computed(() => comments.value.length);
    const emit = defineEmits(["commentNumber"]);
    emit("commentNumber", commentNum);

    const nickname = ref('꼼곰보');

</script>

<style scoped>
    .commentHeader {
        border-bottom: 1px solid #d5d5d5;
        margin-bottom: 10px;
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