<template>
  <el-container class="main-container">
    <el-header class="header"><Header /></el-header>
    <el-container>
      <el-aside class="sidebar"><Sidebar /></el-aside>
      <el-main class="main">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
</script>

<style scoped>
.main-container {
  height: 100vh;
  color: #cccccc;
}
.header {
  background-color: #409EFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
}
.el-container {
  flex: 1;
  min-height: 0;
}
.sidebar {
  background-color: #cccccc;
  border-right: 1px solid #b0b0b0;
  padding: 10px 10px;
  width: 15vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: visible;
  z-index: 10;
}
.main {
  padding: 20px;
  background-color: #cccccc;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  overflow: visible;
}
</style>