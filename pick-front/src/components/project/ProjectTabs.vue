<template>
    <div>
        <v-tabs v-model="model" background-color="transparent" class="custom-tabs" slider-color="#003366">
            <v-tab v-for="(tab, index) in tabs" :key="index" :value="tab.value" class="custom-tab"
                :class="{ 'selected-tab': model === tab.value }">
                <v-icon start v-if="tab.icon">{{ tab.icon }}</v-icon>
                {{ tab.label }}
            </v-tab>
        </v-tabs>

        <v-window v-model="model" class="mt-4">
            <v-window-item v-for="(tab, index) in tabs" :key="index" :value="tab.value">
                <slot :name="tab.value" />
            </v-window-item>
        </v-window>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: String,
    tabs: Array,
})
const emit = defineEmits(['update:modelValue'])

const model = computed({
    get: () => props.modelValue || props.tabs[0]?.value,
    set: (val) => emit('update:modelValue', val),
})
</script>

<style scoped>
.custom-tabs {
    border-bottom: 1px solid #dce5f3;
}

.custom-tab {
    font-weight: bold;
    color: rgba(0, 51, 102, 0.3);
    text-transform: none;
}

.custom-tab.selected-tab {
    color: #003366;
}

::v-deep(.v-tabs-slider) {
    height: 3px;
}
</style>