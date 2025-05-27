<template>
    <div class="new-note-vertical">
        <Operation @save="handleSave" />
        <Editor :model="model" @upload-media="handleUploadMedia" />
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Operation from '@/components/Operation.vue';
import Editor from '@/components/Editor.vue';
import { useNoteStore } from '@/stores/noteStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const noteStore = useNoteStore()
const { categories, tags } = storeToRefs(noteStore)
const model = "edit&preview"

const content = ref('')
const saving = ref(false)
const selectedCategory = ref('')
const selectedTags = ref<string[]>([])

// 上传图片/视频，返回 file_id
async function handleUploadMedia(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    const resp = await fetch('/api/upload', { method: 'POST', body: formData })
    const data = await resp.json()
    return data.file_id
}

// 新建笔记
async function handleSave() {
    if (!content.value || !selectedCategory.value) return
    saving.value = true
    try {
        const resp = await fetch('/api/note', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: content.value,
                category_id: selectedCategory.value,
                tags: selectedTags.value
            })
        })
        if (resp.ok) {
            await noteStore.loadNotes()
            router.push({ name: 'home' })
        }
    } finally {
        saving.value = false
    }
}
</script>
<style scoped>
.new-note-vertical {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.new-note-vertical>*:first-child {
    margin-bottom: 16px;
}

.markdown-container {
    max-height: 500px;
}
</style>
