<template>
    <div class="operation-bar">
        <div class="operation-left">
            <el-button v-if="!['home'].includes(route.name as string)" type="primary" size="small" @click="go_home">
                <el-icon>
                    <Back />
                </el-icon>
                返回
            </el-button>
            <template v-if="0">
                <el-select v-model="selectedCategory" placeholder="选择或新建分类" class="op-select" size="small" filterable
                    allow-create>
                    <el-option v-for="cat in categories" :key="cat.category_id" :label="cat.name"
                        :value="cat.category_id" />
                </el-select>
                <el-select v-model="selectedTags" multiple placeholder="选择或新建标签" class="op-select" size="small"
                    filterable allow-create>
                    <el-option v-for="tag in tags" :key="tag.tag_id" :label="tag.name" :value="tag.tag_id" />
                </el-select>
            </template>
        </div>
        <div class="operation-right" v-if="0">
            <el-button v-if="route.name == 'view'" type="info" size="small" @click="onEdit">
                <el-icon>
                    <Edit />
                </el-icon>
                编辑
            </el-button>
            <el-button v-if="['home', 'new', 'edit'].includes(route.name as string)" type="success" size="small"
                @click="onSave">
                <el-icon>
                    <SuccessFilled />
                </el-icon>
                保存
            </el-button>
            <el-button v-if="['new', 'edit'].includes(route.name as string)" size="small" @click="onCancel">
                <el-icon>
                    <Close />
                </el-icon>
                取消
            </el-button>
            <el-button v-if="route.name == 'home'" size="small" @click="onMaximize">
                <el-icon>
                    <FullScreen />
                </el-icon> 最大化
            </el-button>
        </div>
    </div>
    <div class="operation-selected" v-if="!['friends', 'aboutme', 'visitinfo'].includes(route.name as string)">
        <span v-if="selectedCategory">
            分类：<el-tag closable @close="removeCategory">{{ getCategoryName(selectedCategory) }}</el-tag>
        </span>
        <span v-if="selectedTags.length">
            标签：
            <el-tag v-for="tag in selectedTags" :key="tag" closable @close="removeTag(tag)">{{ getTagName(tag)
            }}</el-tag>
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { categories, tags } from '@/stores/noteStoreLocal'

const selectedCategory = ref('')
const selectedTags = ref<string[]>([])

const getCategoryName = (id: string) => {
    return categories.find((c: any) => c.category_id === id)?.name || id
}
const getTagName = (id: string) => {
    return tags.find((t: any) => t.tag_id === id)?.name || id
}
const router = useRouter()
const route = useRoute()

const go_home = () => {
    router.push({ name: 'home' })
}
const onNew = () => { }
const onDelete = () => { }
const onCancel = () => { }
const onSave = () => { }
const onEdit = () => { }
const onMaximize = () => {
    router.push({ name: 'new' })
}
const removeCategory = () => {
    selectedCategory.value = ''
}
const removeTag = (tag: string) => {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
}
</script>

<style scoped>
.operation-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
    flex-wrap: wrap;
}

.operation-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.operation-right {
    display: flex;
    align-items: center;
    gap: 12px;
}

.op-select {
    min-width: 120px;
}

.operation-selected {
    color: #000000;
    margin-bottom: 12px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
}
</style>