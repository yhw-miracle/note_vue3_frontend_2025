<template>
    <div class="sidebar-container">
        <el-menu :default-active="activeMenu" class="sidebar-menu" @select="handleSelect" @open="handleOpen"
            @close="handleClose">
            <el-sub-menu index="categories">
                <template #title>
                    <el-icon v-if="!openedMenus.includes('categories')">
                        <Folder />
                    </el-icon>
                    <el-icon v-else>
                        <FolderOpened />
                    </el-icon>
                    <span>分类</span>
                </template>
                <el-menu-item v-for="category in categories" :key="category.category_id"
                    :index="'category-' + category.category_id">
                    <el-icon>
                        <Folder />
                    </el-icon>{{ category.name }}
                </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="tags">
                <template #title>
                    <el-icon>
                        <CollectionTag />
                    </el-icon>
                    <span>标签</span>
                </template>
                <el-menu-item v-for="tag in tags" :key="tag.tag_id" :index="'tag-' + tag.tag_id">
                    <el-icon>
                        <CollectionTag />
                    </el-icon>{{ tag.name }}
                </el-menu-item>
            </el-sub-menu>
        </el-menu>

        <div class="sidebar-footer">
            <el-menu :default-active="activeFooter">
                <el-menu-item index="friends" @click="handleSelect('friends')">
                    <el-icon>
                        <Link />
                    </el-icon>
                    <span>友链</span>
                </el-menu-item>
                <el-menu-item index="aboutme" @click="handleSelect('aboutme')">
                    <el-icon>
                        <User />
                    </el-icon>
                    <span>关于我</span>
                </el-menu-item>
                <el-menu-item v-if="0" index="visitinfo" @click="handleSelect('visitinfo')">
                    <el-icon>
                        <DataAnalysis />
                    </el-icon>
                    <span>访客统计</span>
                </el-menu-item>
            </el-menu>
            <div class="copyright">
                &copy;2016 - 2025<br />by yhw-miracle
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { categories, tags } from '@/stores/noteStoreLocal'

const router = useRouter()
const route = useRoute()

const activeMenu = computed(() => {
    if (route.name === 'category') {
        return 'category-' + route.params.id
    } else if (route.name === 'tag') {
        return 'tag-' + route.params.id
    }
    return ''
})
const activeFooter = computed(() => {
    if (route.name === 'friends') return 'friends'
    if (route.name === 'about') return 'about'
    return ''
})

// 用于记录当前打开的菜单
const openedMenus = ref<string[]>([])

const handleOpen = (index: string) => {
    if (!openedMenus.value.includes(index)) {
        openedMenus.value.push(index)
    }
}
const handleClose = (index: string) => {
    openedMenus.value = openedMenus.value.filter(i => i !== index)
}

const handleSelect = (index: string) => {
    if (index === 'friends') {
        router.push({ name: 'friends' })
    }
    else if (index === 'aboutme') {
        router.push({ name: 'aboutme' })
    }
    else if (index === 'visitinfo') {
        router.push({ name: 'visitinfo' })
    }
    else if (index.startsWith('category-')) {
        const categoryId = index.replace('category-', '')
        router.push({ name: 'category', params: { id: categoryId } })
    } else if (index.startsWith('tag-')) {
        const tagId = index.replace('tag-', '')
        router.push({ name: 'tag', params: { id: tagId } })
    }
}
</script>

<style scoped>
.sidebar-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #fff7e6 0%, #ffe0b2 100%);
    border-radius: 12px;
    box-shadow: 0 2px 12px 0 rgba(251, 140, 0, 0.08);
    padding: 12px 0 0 0;
    margin: 0 8px 0 0;
    min-width: 180px;
    border: 1px solid #ffe0b2;
}

.sidebar-menu {
    flex: 1;
    border-right: none;
    background: transparent;
    --el-menu-bg-color: transparent;
    --el-menu-item-hover-fill: #fff3e0;
    --el-menu-active-color: var(--main-color);
    --el-menu-item-active-bg-color: #ffe0b2;
    --el-menu-item-active-color: var(--main-color);
}

.el-menu-item {
    border-radius: 6px;
    margin: 2px 8px;
    transition: background 0.2s, color 0.2s;
}

.el-menu-item.is-active {
    background: #ffe0b2 !important;
    color: var(--main-color) !important;
    font-weight: bold;
}

.el-menu-item:hover {
    background: #fff3e0 !important;
    color: var(--main-color) !important;
}

.el-sub-menu__title {
    font-weight: bold;
    color: #fb8c00;
    font-size: 15px;
    letter-spacing: 1px;
}

.el-menu-item i,
.el-sub-menu__title i {
    color: var(--main-color);
    margin-right: 6px;
}

.sidebar-footer {
    margin-top: auto;
    border-top: 1px solid #ffe0b2;
    padding-top: 8px;
    background: #fffbe6;
    border-radius: 0 0 12px 12px;
}

.sidebar-footer .el-menu {
    background: transparent;
    border: none;
}

.sidebar-footer .el-menu-item {
    border-radius: 6px;
    margin: 2px 8px;
}

.copyright {
    margin-top: 18px;
    color: #555555;
    font-size: 15px;
    text-align: center;
    letter-spacing: 1px;
    padding-bottom: 8px;
    user-select: none;
}
</style>