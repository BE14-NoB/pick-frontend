<template>
    <v-card-actions class="chip-wrapper px-6 pb-4 pt-0">
      <v-chip class="custom-chip" :ripple="false" :clickable="true" variant="flat" >
        # {{ mainCategory }}
      </v-chip>
      <v-chip class="custom-chip" :ripple="false" :clickable="true" variant="flat">
        # {{ subCategory }}
      </v-chip>
    </v-card-actions>
</template>



<script setup>
defineProps({
    mainCategory: String,
    subCategory: String
})
</script>


<style>


.chip-wrapper {
  /* display: flex; */
  /* justify-content: flex-end; */
  gap: 8px;
  padding: 0 16px 16px;
}

.custom-chip {
  background-color: #f5f5f5;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  color: #444;
  text-transform: none;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;
}

.custom-chip:hover {
  background-color: #e0e0e0;
}


</style>