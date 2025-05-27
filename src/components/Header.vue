<template>
    <div class="header-container">
        <div class="header-content">
            <el-avatar class="header-icon" shape="square" :size="100" :src="avatar_icon"></el-avatar>
            <div class="header-texts">
                <span class="header-main"><a href="/">yhw-miracle 笔记集</a></span>
                <br />
                <span class="header-sub">每一个人的生命中，都有最艰难的那一年，将人生变得美好而辽阔。</span>
            </div>
        </div>
        <div class="header-tools">
            <span>主题颜色:</span>
            <el-color-picker v-model="mainColor" @change="changeColor" :predefine="predefineColors" />
            <!-- <el-select v-model="fontFamily" class="font-select" size="small" @change="changeFont">
                <el-option label="得到今楷" value="DedaoJinKaiW03" />
                <el-option label="系统默认" value="inherit" />
            </el-select> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import avatar_icon from '../assets/favicon.ico'

const mainColor = ref(getComputedStyle(document.documentElement).getPropertyValue('--main-color') || '#FB8C00')
const predefineColors = ['#FB8C00', '#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399']

const fontFamily = ref('DedaoJinKaiW03')
const changeColor = (color: string) => {
    document.documentElement.style.setProperty('--main-color', color)
}
const changeFont = (font: string) => {
    if (font === 'inherit') {
        document.documentElement.style.removeProperty('--main-font-family')
    } else {
        document.documentElement.style.setProperty('--main-font-family', `'${font}'`)
    }
}
watch(mainColor, (val) => {
    changeColor(val)
})
watch(fontFamily, (val) => {
    changeFont(val)
})
</script>

<style scoped>
.header-container {
    width: 100%;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 0 5px 0 0;
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
}

.header-icon {
    display: flex;
    margin-right: 24px;
}

.header-texts {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    align-items: center;
    text-align: center;
    line-height: 30px;
}

.header-main {
    font-size: 50px;
    font-weight: bold;
}

.header-sub {
    color: #333333;
    font-size: 20px;
    font-weight: normal;
    display: inline-block;
    margin-top: 2px;
    word-break: break-all;
}

.header-tools {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    display: flex;
    gap: 12px;
    align-items: center;
    color: #333333;
}

.font-select {
    min-width: 120px;
}

a {
    text-decoration: none;
}

a:visited {
    color: #333333;
}
a:link a:hover {
    color: #333333;
}
a:active {
    color: #333333;
}
</style>