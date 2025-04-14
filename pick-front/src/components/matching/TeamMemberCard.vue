<template>
  <div class="team-member-list">
    <div class="team-member" v-for="(member, index) in members" :key="index">
      <!-- <div class="profile-img">

      </div> -->
      <div class="info">
        <div class="name">Lv.{{ member.level }} {{ member.name }}</div>
      </div>
      <div class="rating">
        <span class="star">★</span>
        {{ member.rating.toFixed(1) }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  members: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.team-member-list {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.team-member {
  display: flex;
  align-items: center;
  border: 1px solid #020725;
  padding: 10px 14px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.profile-img {
  width: 40px;
  height: 40px;
  border: 1px solid #020725;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.info {
  flex-grow: 1;
  font-weight: 500;
  font-size: 16px;
  color: #020725;
}

.rating {
  font-size: 14px;
  font-weight: 600;
  color: #444;
  display: flex;
  align-items: center;
  gap: 4px;
}

.star {
  color: #FFD700;
}
</style>