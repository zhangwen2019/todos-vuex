import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: 'selected',
  linkExactActiveClass: 'selected'
})

// 导出路由
export default router
