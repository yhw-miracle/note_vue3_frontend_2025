<template>
    <div class="note-list-container">
        <el-card v-for="note in filteredNotes" :key="note.note_id" class="note-card">
            <template #header>
                <div class="card-header">
                    <span>{{ note.title }}</span>
                </div>
            </template>
            <div class="card-content">
                <div class="note-meta">
                    <span>创建时间: {{ note.create_time }}</span>
                    <span v-if="note.update_time">更新时间: {{ note.update_time }}</span>
                    <span>分类: <el-tag>{{ getCategoryName(note.category_id) }}</el-tag></span>
                    <span v-if="note.tags && note.tags.length">
                        标签:
                        <el-tag v-for="tag in note.tags" :key="tag.tag_id">
                            {{ getTagName(tag.tag_id) }}
                        </el-tag>
                    </span>
                </div>
                <div class="note-actions">
                    <el-button class="note-action" type="primary" size="small" @click="handleRead(note)">
                        继续阅读
                    </el-button>
                    <el-button v-if="0" class="note-action" type="info" size="small" @click="handleEdit(note)">
                        编辑
                    </el-button>
                    <el-button v-if="0" class="note-action" type="danger" size="small" @click="handleDelete(note)">
                        删除
                    </el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="js">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { notes, categories, tags } from '@/stores/noteStoreLocal'

const route = useRoute()
const router = useRouter()

const filteredNotes = computed(() => {
    if (route.name === 'category') {
        return notes.filter(note => note.category_id === route.params.id)
    } else if (route.name === 'tag') {
        return notes.filter(note => {
            const noteTags = note.tags || []
            return noteTags.some(tag => tag.tag_id === route.params.id)
        })
    }
    return notes
})

const getCategoryName = (id) => {
    return categories.find((c) => c.category_id === id)?.name || '未知分类'
}

const getTagName = (id) => {
    return tags.find((t) => t.tag_id === id)?.name || '未知标签'
}

const handleRead = (note) => {
    // noteStore.currentNote = note
    router.push({
        name: 'view',
        params: { id: note.note_id },
        query: { mode: 'view' }
    })
}

const handleEdit = (note) => {
    // noteStore.currentNote = note
    router.push({
        name: 'edit',
        params: { id: note.note_id },
        query: { mode: 'edit' }
    })
}

const handleDelete = (note) => {
    notes.splice(notes.indexOf(note), 1)
    // notes.value = notes.value.filter((n: any) => n.note_id !== note.note_id)
}
</script>
<style scoped>
.note-list-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
    padding: 10px;
}

.note-card {
    max-width: 100%;
    width: 100%;
    margin: 0;
    min-height: 200px;
    display: flex;
    flex-direction: column;
}

.card-header {
    font-weight: bold;
    font-size: 16px;
}

.card-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 10px;
    flex: 1;
}

.note-meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
    font-size: 12px;
    color: #666;
    min-height: 60px;
}

.note-meta span {
    font-size: 16px;
    margin: 0 5px 0 5px;
}

.note-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: auto;
}

.note-action {
    font-size: 16px;
}
</style>