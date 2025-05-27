<template>
    <div class="markdown-container" id="markdown-editor"></div>
</template>

<script setup lang="js">
import { onMounted } from 'vue'
import Cherry from 'cherry-markdown'
import cherryEditorConfig from '@/utils/initEditor'
import { notes } from '@/stores/noteStoreLocal'

const props = defineProps({
    noteId: {
        type: String,
        default: null
    },
    model: {
        type: String,
        default: "edit&preview"
    }
})

let cherryInstance = null

onMounted(() => {
    let content = null
    if (props.noteId != null) {
        const currentNote = notes.filter(note => note.note_id === props.noteId)
        if (currentNote != null) {
            content = currentNote[0].content
        } else {
            content = '无内容......'
        }

    } else {
        content = '# 记录现在的想法......'
    }
    cherryEditorConfig.value = content
    cherryEditorConfig.editor.defaultModel = props.model
    initEditor(content, props.model)
})

const initEditor = (content, model) => {
    try {
        cherryEditorConfig.value = content
        cherryEditorConfig.editor.defaultModel = model
        cherryInstance = new Cherry(cherryEditorConfig)
    } catch (error) {
        console.error('Cherry Markdown初始化失败:', error)
    }
}
</script>

<style scoped>
.markdown-container {
    width: 100%;
    max-height: 200px;
    box-sizing: border-box;
    padding: 10px;
}
</style>