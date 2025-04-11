<template>
    <v-container class="pa-0">
        <v-tabs v-model="tab" background-color="white" color="primary" grow slider-color="primary" class="border-b">
            <v-tab value="commit" class="text-h6 font-weight-bold">{{ commitLabel }}</v-tab>
            <v-tab value="file" class="text-h6 font-weight-bold">{{ fileLabel }}</v-tab>
        </v-tabs>

        <v-window v-model="tab">
            <v-window-item value="commit">
                <slot name="commit" />
            </v-window-item>
            <v-window-item value="file">
                <slot name="file" />
            </v-window-item>
        </v-window>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
    commitLabel: {
        type: String,
        default: '커밋',
    },
    fileLabel: {
        type: String,
        default: '파일 변경',
    },
})

const tab = ref('commit')
</script>

<style scoped>
.border-b {
    border-bottom: 1px solid #cbd5e1;
}
</style>