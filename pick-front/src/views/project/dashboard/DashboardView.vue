<template>
    <div class="dashboard-container">
    <div class="dashboard-grid">
        <div class="box a">
            <GitWidgetCard
            type="commit"
            :data="{ commitCount: 120 }"
            :button="{ branches: ['main', 'dev', 'feature/ui-update'] }"
            />

            <GitWidgetCard
            type="issue"
            :data="{ open: 5, closed: 12 }"
            :button="{ link: '/project/issues', text: '이슈 보기' }"
            />

            <GitWidgetCard
            type="pull-request"
            :data="{ open: 3, closed: 7 }"
            :button="{ link: '/project/pull-requests', text: 'PR 목록' }"
            />
        </div>
        <div class="box b">
            <ScheduleWidget  class="dashboard-schedule"/>
            <!-- <v-card
            title="Card title"
            subtitle="Subtitle"
            text="..."
            variant="tonal"
            class="dashboard-schedule"
            >
            <v-card-actions>
                <v-btn>Click me</v-btn>
            </v-card-actions>
            </v-card> -->

            <div class="dashboard-dday" >
                <v-card text="..." class="dday-button" flat />
                <v-card text="..." class="dday-button" flat />
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