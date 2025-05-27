<template>
    <el-card class="about-card">
        <template #header>
            <div class="card-header">
                <span>关于我</span>
            </div>
        </template>
        <div class="about-content">
            <ul>
                <li v-for="item in aboutMeList" :key="item.about_me_id">
                    <el-icon>
                        <List />
                    </el-icon>
                    {{ item.content }}
                </li>
            </ul>
        </div>
    </el-card>
</template>

<script setup lang="js">
import { aboutMeList } from '@/stores/noteStoreLocal'
</script>

<style scoped>
.about-card {
    margin-top: 16px;
}

.card-header {
    font-size: 18px;
    font-weight: bold;
}

.about-content {
    line-height: 1.8;
}

.about-content ul {
    padding-left: 20px;
}

.about-content li {
    font-size: 18px;
    margin-bottom: 5px;
    list-style: none;
}
</style>