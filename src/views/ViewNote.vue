<template>
    <Operation />
    <Editor :noteId="route.params.id" :model="model" />
</template>
<script setup lang="ts">
import Operation from '@/components/Operation.vue'
import Editor from '@/components/Editor.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const model = "previewOnly"
</script>
<style scoped>
.markdown-container {
    max-height: 500px;
}
</style>
