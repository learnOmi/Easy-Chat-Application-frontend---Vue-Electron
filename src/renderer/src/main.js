import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/cust-elementplus.scss'
import '@/assets/icon/iconfont.css'
import '@/assets/base.scss'
import router from '@/router'
import Utils from '@/utils/utils.js'
import Verify from '@/utils/verify.js'

const app = createApp(App)
app.use(ElementPlus).use(router)
app.config.globalProperties.Utils = Utils
app.config.globalProperties.Verify = Verify
app.mount('#app')
