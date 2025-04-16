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
                <v-card class="dday-button" flat>
                <div class="d-flex justify-space-between align-center px-4 py-1">
                    <div class="text-h5 font-weight-bold">
                    <span v-if="dday > 0">D - {{ dday }}</span>
                    <span v-else-if="dday === 0">D-Day</span>
                    <span v-else>+ {{ Math.abs(dday) }}days</span>
                    </div>
                    <div class="text-right">
                    <div class="text-subtitle-2">프로젝트 마감일까지</div>
                    <div class="text-caption text-grey">{{ endDate }}</div>
                    </div>
                </div>
                </v-card>

                <v-card class="dday-button" flat>
                  <div class="d-flex justify-space-between align-center px-4 py-1">
                    <div class="text-h5 font-weight-bold">+ {{ elapsedDays }}days</div>
                    <div class="text-right">
                      <div class="text-subtitle-2">프로젝트 시작한 지</div>
                      <div class="text-caption text-grey">{{ startDate }} ~ ing</div>
                    </div>
                  </div>
                </v-card>
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
    import GitWidgetCard from '@/components/project/dashboard/GitWidgetCard.vue'
    import MeetingWidget from '@/components/project/MeetingWidget.vue';
    import ScheduleWidget from '@/components/project/ScheduleWidget.vue';
    import MemberWidget from '@/components/project/MemberWidget.vue';
    import gitDummy from '@/json/project_git_info.json';
    import projectDummy from '@/json/project_entry.json';
    import {ref, onMounted, computed} from 'vue';
    import {useRoute} from 'vue-router';
    import dayjs from 'dayjs'

    const route = useRoute()
    // const id = route.params.id  
    const id =0;       //
    const gitInfo = ref(null)
    const project = ref(null)


    const dday = computed(() => {
      if (!project.value) return 0
      const end = dayjs(project.value.end_date).endOf('day')
      return end.diff(dayjs(), 'day') // or +1 if needed
    })

    const elapsedDays = computed(() => {
      if (!project.value) return 0
      const start = dayjs(project.value.start_date).startOf('day')
      return dayjs().diff(start, 'day')
    })

    const startDate = computed(() =>
      project.value?.start_date ? dayjs(project.value.start_date).format('YY.MM.DD') : ''
    )
    const endDate = computed(() =>
      project.value?.end_date ? dayjs(project.value.end_date).format('YY.MM.DD') : ''
    )

    const commit = computed(() => gitInfo.value?.commit || {
    branch: { "branch-list": [], count: 0 },
    "commit-list": []
    })

    const issue = computed(() => gitInfo.value?.issue || { count: { open: 0, closed: 0 } })
    const pullRequest = computed(() => gitInfo.value?.['pull-request'] || {count : {open: 0, closed:0}})

    // 프로젝트 정보 & 깃 정보 가져오기
    onMounted(async () => {
      try {
          const [gitRes, projectRes] = await Promise.all([
              fetch('http://localhost:8083/git-info'),
              fetch(`http://localhost:8081/${id}`)
          ])

          if (!gitRes.ok || !projectRes.ok) throw new Error('요청 실패')

          gitInfo.value = await gitRes.json()
          project.value = await projectRes.json()

          console.log('✅ Git Info:', gitInfo.value)
          console.log('✅ Project Info:', project.value)
      } catch (err) {
          console.error('❌ 데이터 불러오기 실패:', err)
          gitInfo.value = gitDummy['git-info'];
          project.value = projectDummy[0];

      }
    })

    console.log(projectDummy[0])

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
  column-gap: 15px; 
  row-gap: 8px;
  height: 100%;
}


.box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}

/* Grid area 지정 */
.a {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  width: 100%;
  gap: 15px;
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
  gap: 15px;
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
  gap: 8px;
}
.dday-button {
  border-radius: 10px;
  padding : 5px;
  height: 50%;
  background: linear-gradient(to right, #dcebf5, #ffffff);
  cursor: pointer;
}

  
.dday-button:hover {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  }

</style>