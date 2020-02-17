import Vue from 'vue'
import App from './App.vue'
// 导入store
import store from './store'
// 导入路由
import router from './route'

// 导入todos的css样式
import './styles/base.css'
import './styles/index.css'

// 全局导入组件
import TodoHeader from './components/TodoHeader'
import TodoMain from './components/TodoMain'
import TodoFooter from './components/TodoFooter'

// 注册组件(第一个参数为名字)
Vue.component('TodoHeader', TodoHeader)
Vue.component('TodoMain', TodoMain)
Vue.component('TodoFooter', TodoFooter)

Vue.config.productionTip = false

new Vue({
  // 挂载store
  store,
  // 挂载路由
  router,
  render: h => h(App)
}).$mount('#app')
