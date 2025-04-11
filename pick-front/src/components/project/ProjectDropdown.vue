<template>
    <div class="v-select-wrapper">
        <v-select :model-value="modelValue" @update:modelValue="$emit('update:modelValue', $event)" :label="label"
            :items="options" item-title="label" item-value="value" variant="outlined" density="comfortable"
            class="v-select-box" />
    </div>
</template>

<script setup>
defineProps({
    modelValue: [String, Number],
    label: String,
    options: {
        type: Array,
        required: true,
    },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.v-select-wrapper {
    margin-bottom: 1rem;
}
</style>