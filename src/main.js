import { createApp } from 'vue'
import { createPinia } from 'pinia'
// element-plus
import ElementPlus, { cardProps } from 'element-plus'
// import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/index.css'
// import './assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// router
import router from './router'

import App from './App.vue'
import '@/assets/theme.css'
import '@/assets/font.css'
import '@/assets/base.css'

// cherry-markdown
import 'cherry-markdown/dist/cherry-markdown.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.use(createPinia())
app.use(ElementPlus, { locale })
app.mount("#app")