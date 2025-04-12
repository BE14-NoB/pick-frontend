<template>
    <div class="dashboard-container">
    <div class="dashboard-grid">
        <div class="box a">
            <GitWidgetCard
            type="commit"
            :data="{ 
                commitMetaList: commit['commit-list'], 
                branchList: commit.branch['branch-list'] 
            }"
            :button="{ branches: commit.branch['branch-list'] }"
            />

            <GitWidgetCard
            type="issue"
            :data="{ open: issue.count.open, closed: issue.count.closed }"
            :button="{ link: '/project/issues', text: '이슈 보기' }"
            />

            <GitWidgetCard
            type="pull-request"
            :data="{ open: pullRequest.count.open, closed: pullRequest.count.closed }"
            :button="{ link: '/project/pull-requests', text: 'PR 목록' }"
            />
        </div>
        <div class="box b">
            
            <ScheduleWidget  class="dashboard-schedule"/>

            <div class="dashboard-dday" >
                <v-card text="dday" class="dday-button" flat />
                <v-card text="dday" class="dday-button" flat />
            </div>
        </div>
        <div class="box c">
            <MeetingWidget class="meeting-widget"/>
            <MemberWidget class="member-widget"/>
        </div>
    </div>

</div>
</template>

<script setup>
    import GitWidgetCard from '@/components/project/GitWidgetCard.vue'
    import MeetingWidget from '@/components/project/MeetingWidget.vue';
    import ScheduleWidget from '@/components/project/ScheduleWidget.vue';
    import MemberWidget from '@/components/project/MemberWidget.vue';
    import {ref, onMounted, computed} from 'vue';
    import {useRoute} from 'vue-router';

    const route = useRoute()
    // const id = route.params.id  
    const id = 1;       //
    const gitInfo = ref(null)

    const commit = computed(() => gitInfo.value?.commit || {
    branch: { "branch-list": [], count: 0 },
    "commit-list": []
    })

    const issue = computed(() => gitInfo.value?.issue || { count: { open: 0, closed: 0 } })
    const pullRequest = computed(() => gitInfo.value?.['pull-request'] || {count : {open: 0, closed:0}})

    // 프로젝트 깃 정보 가져오기
    onMounted(async () => {
      try {
        const res = await fetch('http://localhost:8083/git-info')
        if (!res.ok) throw new Error('네트워크 응답 실패')

        const data = await res.json()
        gitInfo.value = data
        console.log(data)
      } catch (err) {
        console.error('❌ Git 정보 가져오기 실패:', err)
      }
    })
    

</script>


<style>
.dashboard-container{
    /* background-color: yellow; */
    height: 600px;
    padding-top: 20px;
    width: 100%;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: 40% 60%;
  gap: 8px;
  height: 100%;
}


.box {
  /* background-color: #ccc; */
  /* border: 2px solid #000; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* justify-content: space-around; */
  font-weight: bold;
}

/* Grid area 지정 */
.a {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  width: 100%;
}
.b {
    display: flex;
    flex-direction: column;
    grid-column: 2 / 3;
    grid-row: 1 / 3; /* B는 세로로 두 칸 차지 */
    gap: 15px;
}
.c {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
}
.meeting-widget{
    width: 50%;
}
.member-widget{
    width: 50%;
}
.d {
  display: none; /* 필요 없다면 제거 */
}
.dashboard-schedule {
    border-radius: 10px;
    width: 100%;
    height: 65%;
}
.dashboard-dday {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 35%;
    /* background-color: yellow; */
    gap:8px;
}
.dday-button{
    border-radius: 10px;
    height: 50%;
    background: linear-gradient(to right, #dcebf5, #ffffff);
}


</style>