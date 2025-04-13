<template>
    <p class="desc">
        PICK 에서 총 <strong>{{ meetingData.length }}</strong>개의 회의록을 작성하셨어요! ✨
    </p>
    <div class="meeting-header">
        <MeetingCreateButton @click="onClickCreateMeeting" />
    </div>
    <div class="list-card">
        <List
            :headers="['번호', '제목', '작성일', '템플릿' , '작성자', '참여자']"
            :items="paginatedMeetings.map(({ content,  updatedAt,  ...rest }) => rest)"
            @row-click="goToDetail"
        >
        <template #template="{ value }">
            <v-chip :color="getTypeColor(value)" variant="tonal" size="small">
                {{ value }}
            </v-chip>
        </template>
        <template #author="{ value }">
            <div class="profile-wrapper">
            <img :src="meetingMaker" class="profile-img" />
            <span>{{ value }}</span>
            </div>
        </template>
        <!-- 참여자 아바타 리스트 -->
        <template #participants="{ value }">
        <div class="avatar-group">
            <v-avatar
            v-for="(participant, index) in value.slice(0, 3)"
            :key="index"
            size="24"
            class="avatar-overlap"
            >
            <img :src="meetingMaker" />
            </v-avatar>
            <span v-if="value.length > 3" class="extra-count">+{{ value.length - 3 }}</span>
        </div>
        </template>
        </List>
    </div>
        <Pagination class="pagination" v-model:currentPage="openPage" :totalPages="openTotalPages" />

</template>

<script setup>
    import {ref, onMounted, computed} from 'vue';
    import Pagination from '@/components/Pagination.vue'
    import List from '@/components/List.vue'
    import meetingJson from '@/json/project_meeting_list.json';
    import meetingMaker from '@/assets/img/avatar.png';
    import MeetingCreateButton from '@/components/project/MeetingCreateButton.vue';
    import { useRouter } from 'vue-router'
    
    const router = useRouter()


    const meetingData = ref([])
    const openPage = ref(1)
    const itemsPerPage = 5

    // json server
    onMounted(async () => {
      try {
        const res = await fetch('http://localhost:8080/meetings')
        const data = await res.json()

        // 유효하지 않은 항목 필터링 (title, content 없는 경우 제외)
        meetingData.value = data.filter(meeting =>
          meeting.title?.trim() &&
          meeting.content?.trim()
        )

        console.log('✅ meetings 불러옴:', meetingData.value)
        console.log(meetingData)
      } catch (err) {
        console.error('❌ 회의록 불러오기 실패:', err)
      }
    })

    // onMounted(() => {
    //     meetingData.value = meetingJson.map(meeting => ({
    //         ...meeting,
    //         // creator: meetingMaker
    //     }))
    //     console.log(meetingData)
    // })

    const paginatedMeetings = computed(() => {
    const start = (openPage.value - 1) * itemsPerPage
    return meetingData.value.slice(start, start + itemsPerPage)
    })

    const openTotalPages = computed(() =>
    Math.ceil(meetingData.value.length / itemsPerPage)
    )

    const onClickCreateMeeting = () => {
      console.log('회의록 작성 클릭됨!')
    }


    const getTypeColor = (type) => {
        if (type === '정기 회의') return 'blue'
        if (type === '스프린트 킥오프') return 'amber'
        if (type === '코드 리뷰') return 'red'
        if (type === '회고 회의') return 'cyan'
        return 'grey'
    }

    function goToDetail(row) {
      const id = row.id
      router.push(`/project/meeting/${id}`)
    }
        

</script>


<style scoped>
.desc {
  font-size: 14px;
  color: #666;
  margin: 16px 0;
}

.meeting-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.list-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}


  .profile-wrapper {
    display: flex;
    align-items: center;
    gap: 1px;
    justify-content: center;
  }
.profile-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
}

.pagination {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}
.avatar-group {
  display: flex;
  justify-content: center;
}

.avatar-overlap {
  margin-left: -8px;
  border: 2px solid white;
  z-index: 1;
}
.avatar-overlap:first-child {
  margin-left: 0;
}
.extra-count {
  font-size: 12px;
  margin-left: 4px;
  color: #555;
}
</style>