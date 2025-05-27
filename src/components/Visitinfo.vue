<template>
    <div class="visitor-content">
        <div class="stats-header">
            <el-card class="stat-card">
                <div class="stat-title">总访问量</div>
                <div class="stat-value">{{ totalVisits }}</div>
            </el-card>
            <el-card class="stat-card">
                <div class="stat-title">覆盖国家</div>
                <div class="stat-value">{{ countryCount }}</div>
            </el-card>
            <el-card class="stat-card">
                <div class="stat-title">覆盖城市</div>
                <div class="stat-value">{{ cityCount }}</div>
            </el-card>
        </div>
        <div class="map-section">
            <el-card>
                <div class="map-title">全球访客地图</div>
                <div class="map-placeholder">
                    <div id="amap-container" class="amap-container"></div>
                </div>
                <div class="map-desc">访客数据每24小时更新一次。位置信息基于IP地址估算，可能与实际位置有偏差。</div>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const totalVisits = ref(12345)
const countryCount = ref(18)
const cityCount = ref(56)

// 模拟IP地理位置数据
const heatmapData = [
    { "count": 1, "lat": "52.132633", "lng": "5.291266" }
]

onMounted(() => {
    // // 加载高德地图JS API
    // if (!window._amap_loaded) {
    //     const script = document.createElement('script')
    //     script.src = 'https://webapi.amap.com/maps?v=2.0&key=af3367214ba8280f921b333bf48664b7&plugin=AMap.HeatMap'
    //     script.onload = () => {
    //         window._amap_loaded = true
    //         initMap()
    //     }
    //     document.body.appendChild(script)
    // } else {
    //     initMap()
    // }
})

function initMap() {
    // @ts-ignore
    const map = new window.AMap.Map('amap-container', {
        zoom: 2,
        center: [105, 37],
        mapStyle: 'amap://styles/whitesmoke',
        viewMode: '3D',
        resizeEnable: true
    })
    // @ts-ignore
    window.AMap.plugin(['AMap.HeatMap'], function () {
        // @ts-ignore
        const heatmap = new window.AMap.HeatMap(map, {
            radius: 25,
            opacity: [0.2, 0.8]
        })
        heatmap.setDataSet({ data: heatmapData, max: 100 })
    })
}
</script>

<style scoped>
.visitor-content {
    margin-top: 16px;
}

.stats-header {
    display: flex;
    gap: 24px;
    margin-bottom: 5px;
    justify-content: center;
}

.stat-card {
    flex: 1;
    min-width: 160px;
    text-align: center;
    background: #fffbe6;
    border: 1px solid #ffe0b2;
}

.stat-title {
    font-size: 15px;
    color: #fb8c00;
    margin-bottom: 8px;
}

.stat-value {
    font-size: 28px;
    font-weight: bold;
    color: #fb8c00;
}

.map-section {
    margin-top: 5px;
}

.map-title {
    font-size: 16px;
    font-weight: bold;
    color: #fb8c00;
    margin-bottom: 5px;
    text-align: center;
}

.map-placeholder {
    min-height: 400px;
    margin-bottom: 8px;
}

.amap-container {
    width: 100%;
    height: 400px;
    border-radius: 8px;
    overflow: hidden;
    margin: 0 auto;
}

.map-desc {
    margin-top: 16px;
    color: #888;
    font-size: 13px;
    text-align: center;
}
</style>