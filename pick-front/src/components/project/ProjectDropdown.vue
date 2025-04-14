<template>
    <div class="v-select-wrapper">
        <v-select :model-value="modelValue" @update:modelValue="$emit('update:modelValue', $event)" :label="label"
            :items="options" :disabled="disabled" item-title="label" item-value="value" variant="outlined"
            density="comfortable" class="v-select-box" />
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
    disabled: {
        type: Boolean,
        default: false,
    },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.v-select-wrapper {
    margin-bottom: 1rem;
}

.v-select[disabled] {
    opacity: 0.6;
    pointer-events: none;
}
</style>