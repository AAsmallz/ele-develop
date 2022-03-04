import {
    createApp
} from 'vue'
import App from './App.vue'

// 引入路由
import router from './router/index.js'
// 引入axios
import axios from './http/config.js'
// 引入 store
import store from './store/index.js'
// 引入plugin中的方法
import formatImgSrc from './plugin/fomatImgSrc.js'
import vFixed from './plugin/fixedDireactive.js'
import autoTop from './plugin/autoTop.js'

// vue2.x全局配置axios
// vue.prototype.$axios = axios

const app = createApp(App)
// vue3.x全局配置axios
app.config.globalProperties.$axios = axios
app.config.globalProperties.$formatImgSrc = formatImgSrc
app.config.globalProperties.$autoTop = autoTop
// 注册路由
app.use(router)
// 注册store（也就是把store实例作为插件进行安装）
app.use(store)
// 注册全局自定义指令 v-fixed
app.directive('fixed', vFixed)

// 挂载根元素
app.mount('#app')