import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

interface Note {
    note_id: string
    title: string,
    content: string,
    content_hash: string,
    create_time: number
    update_time: number | null
    category_id: string
    tags?: object[],
    files?: object[]
}

export const useNoteStore = defineStore('notes', () => {
    const notes = ref<Note[]>([])
    const currentNote = ref<Note | null>(null)
    const categories = ref<any[]>([])
    const tags = ref<any[]>([])
    const files = ref<any[]>([])
    const friends = ref<any[]>([])
    const aboutMeList = ref<any[]>([])

    const backend_api = import.meta.env.VITE_BACKEND_API

    const loadNotes = async () => {
        try {
            const response = await fetch(`${backend_api}/api/note`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            // const response = await fetch('/tests_data/note.json')
            const result = await response.json()
            if (result.code == 200) {
                ElMessage.success('加载笔记成功')
                const notesData = result.result

                notes.value = notesData.map((note: any) => ({
                    ...note,
                    title: decodeUnicode(note.title),
                    content_hash: note.content_hash,
                    create_time: formatTimestamp(note.create_time),
                    update_time: note.update_time ? formatTimestamp(note.update_time) : null,
                    tags: note.tags || [],
                    files: note.files || []
                }))
                localStorage.setItem('notes', JSON.stringify(notes.value))
            } else {
                ElMessage.error(result.message)
            }
        } catch (error) {
            ElMessage.error(`${error}`)
            // 尝试从本地存储恢复
            const localNotes = localStorage.getItem('notes')
            if (localNotes) {
                notes.value = JSON.parse(localNotes)
            }
        }
    }

    const loadNote = async (note_id: string): Promise<Note | undefined> => {
        try {
            const response = await fetch(`${backend_api}/api/note`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'note_id': note_id })
            })
            // const response = await fetch(`/tests_data/note/${note_id}.json`)
            const result = await response.json()
            if (result.code == 200) {
                ElMessage.success('加载笔记成功')
                const note = result.result
                return note
            } else {
                ElMessage.error(result.message)
            }
        } catch (error) {
            ElMessage.error(`${error}`)
        }
    }

    const loadCategories = async () => {
        try {
            const response = await fetch(`${backend_api}/api/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            // const response = await fetch('/tests_data/category.json')
            const result = await response.json()
            if (result.code == 200) {
                categories.value = result.result
            } else {
                ElMessage.error(result.message)
            }
        } catch (error) {
            ElMessage.error(`${error}`)
        }
    }

    const loadTags = async () => {
        try {
            const response = await fetch(`${backend_api}/api/tag`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            // const response = await fetch('/tests_data/tag.json')
            const result = await response.json()
            if (result.code == 200) {
                tags.value = result.result
            } else {
                ElMessage.error(result.message)
            }
        } catch (error) {
            ElMessage.error(`${error}`)
        }
    }

    const loadFriendLinks = async () => {
        try {
            const response = await fetch(`${backend_api}/api/friend_link`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            // const response = await fetch('/tests_data/friend_link.json')
            const result = await response.json()
            if (result.code == 200) {
                friends.value = result.result
            } else {
                ElMessage.error(result.message)
            }
        } catch (error) {
            ElMessage.error(`${error}`)
        }
    }

    const loadAboutMe = async () => {
        try {
            const response = await fetch(`${backend_api}/api/about_me`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            // const response = await fetch('/tests_data/about_me.json')
            const result = await response.json()
            if (result.code == 200) {
                aboutMeList.value = result.result
            } else {
                ElMessage.error(result.message)
            }
        } catch (error) {
            ElMessage.error(`${error}`)
        }
    }

    const decodeUnicode = (str: string) => {
        return str.replace(/\\u[\dA-F]{4}/gi,
            match => String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16)))
    }

    const formatTimestamp = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleString()
    }

    return {
        notes,
        currentNote,
        categories,
        tags,
        files,
        friends,
        aboutMeList,
        loadNotes,
        loadNote,
        loadCategories,
        loadTags,
        loadFriendLinks,
        loadAboutMe
    }
})