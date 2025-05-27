<template>
    <el-table :data="friends" style="width: 100%" border>
        <el-table-column prop="name" label="名称" width="180" align="center">
            <template #default="scope">
                <a :href="scope.row.url || scope.row.link" target="_blank" class="friend-link">{{ scope.row.name }}</a>
            </template>
        </el-table-column>
        <el-table-column prop="link" label="链接" width="300" align="center">
            <template #default="scope">
                <a :href="scope.row.url || scope.row.link" target="_blank" class="friend-link">{{ scope.row.url ||
                    scope.row.link }}</a>
            </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center">
            <template #default="scope"><span class="description">{{ scope.row.description }}</span></template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="js">
import { friends } from '@/stores/noteStoreLocal'
</script>

<style scoped>
.el-table {
    margin-top: 16px;
}

.el-table th,
.el-table td {
    text-align: center !important;
}

.friend-link {
    color: #333333;
    font-size: 20px;
    text-decoration: none;
}

.friend-link:visited {
    color: #333333;
}

.friend-link:hover {
    color: #333333;
}

.friend-link:active {
    color: #333333;
}

.description {
    font-size: 18px;
    color: #333333;
}
</style>