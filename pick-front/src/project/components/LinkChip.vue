<template>
    <v-btn
      :href="href"
      target="_blank"
      rel="noopener"
      append-icon="mdi-web"
      variant="tonal"
    >
      {{ label }}
    </v-btn>
  </template>

<script setup>
    import { ref } from 'vue';

    const link = ref('');
    const name = ref('');
    const icon = ref('');

    defineProps({
    href: { type: String, required: true },
    label: { type: String, default: "사이트 바로가기"},
    icon: { type: String, default: 'mdi-link' }
    })


</script>